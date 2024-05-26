const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    _id: {
        type: String,
    },
    displayName: { type: String, required: true },
    email: { type: String, required: true },
    picture: { type: String, required: true },
    password: { type: String, required: false },
});

UserSchema.statics.findOrCreate = async function (id, doc) {
    const user = await User.findById(id);

    if (user) return user;

    const newUser = await User.create({
        _id: doc.id,
        displayName: doc.displayName,
        email: doc.email,
        picture: doc.picture,
        password: doc?.password,
    });

    return newUser;
};

const User = model('User', UserSchema, 'users');

module.exports = { User };
