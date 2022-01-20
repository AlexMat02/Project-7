const express = require("express");
const router = express.Router();

const auth = require('../middleware/auth');

const postCtrl = require("../controllers/post");

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

router.post('/api/posting', auth, postCtrl.createPost);
 
router.get('/api/posts', postCtrl.getAllPost);

router.put('/api/posts/:id', auth, postCtrl.updatePost);

router.delete('/api/posts/:id', auth, postCtrl.deletePost);

router.get('/api/posts/:id', postCtrl.getOnePost);

module.exports = router;