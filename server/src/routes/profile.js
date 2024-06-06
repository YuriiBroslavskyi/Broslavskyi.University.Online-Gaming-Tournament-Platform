const { Router } = require('express');
const { isLoggedIn } = require('../utils/utils');
const { updateUser } = require('../contollers/userController');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.put('/', isLoggedIn, upload.single('picture'), updateUser);

module.exports = router;
