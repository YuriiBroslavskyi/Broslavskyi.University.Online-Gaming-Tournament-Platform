const { Storage } = require('@google-cloud/storage');
const { bucketName, projectId } = require('../config/config');
const { User } = require('../models/user');

const storage = new Storage({
    projectId,
    credentials: {
        private_key: process.env.PRIVATE_KEY,
        client_email: process.env.SERVICE_ACCOUNT_EMAIL
    },
});

const bucket = storage.bucket(bucketName);

const uploadPicture = async (picture, bucket) => {
    const pictureName = `${Date.now()}_${picture.originalname}`;
    const file = bucket.file(pictureName);
    const stream = file.createWriteStream({
        metadata: {
            contentType: picture.mimetype,
        },
    });

    return await new Promise((resolve, reject) => {
        stream.on('error', reject);
        stream.on('finish', () => {
            const pictureURL = `https://storage.googleapis.com/${bucket.name}/${pictureName}`;
            resolve(pictureURL);
        });

        stream.end(picture.buffer);
    });
};

const deletePicture = async (picture, bucket) => {
    const [exists] = await bucket.file(picture).exists();

    if (exists) {
        await bucket.file(picture).delete();
    }
};

const addFieldIfTruthy = (updateFields, fieldName, value) => {
    if (value) {
        updateFields[fieldName] = value;
    }
};

const handleProfilePictureUpdate = async (existingPicture, newFile, bucket) => {
    if (existingPicture) {
        const prevPictureName = existingPicture.split('/').pop();
        await deletePicture(prevPictureName, bucket);
    }
    return await uploadPicture(newFile, bucket);
};

const updateUser = async (req, res, next) => {
    const { displayName } = req.body;
    const updateFields = {};

    addFieldIfTruthy(updateFields, 'displayName', displayName);

    if (req.file) {
        updateFields.picture = await handleProfilePictureUpdate(
            req.user.picture,
            req.file,
            bucket
        );
    }

    try {
        const isDisplayNameUsed = await User.isDisplayNameUsed(
            req.user,
            displayName
        );

        if (isDisplayNameUsed) {
            return res
                .status(400)
                .json({ message: 'Username is already taken.' });
        }

        const user = await User.findOneAndUpdate(
            { _id: req.user._id },
            updateFields,
            { new: true }
        );

        return res.json(user);
    } catch (error) {
        next(error);
    }
};

module.exports = { updateUser };