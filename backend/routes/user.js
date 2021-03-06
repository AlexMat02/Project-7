const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');

router.post('/auth/signup', userCtrl.signup);
router.post('/auth/login', userCtrl.login);
router.delete('/auth/deleteOneUser/:id', auth, userCtrl.deleteUser);
router.get('/auth/users', userCtrl.getAllUser);
router.post('/auth/postSighted', auth, userCtrl.postSighted);
router.get('/auth/whichPostsSighted/:id', auth, userCtrl.whichPostsSighted);
router.get('/auth/whichPostsLiked/:id', auth, userCtrl.whichPostsLiked);
router.post('/auth/userDescription/:id', auth, userCtrl.changeDescription);

module.exports = router;