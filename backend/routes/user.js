const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');

router.post('/auth/signup', userCtrl.signup);
router.post('/auth/login', userCtrl.login);
router.delete('/auth/deleteOneUser', auth, userCtrl.deleteUser);

module.exports = router;