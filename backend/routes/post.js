const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const auth = require('../middleware/auth');

const postCtrl = require("../controllers/post");

const multer = require("../middleware/multer-config");
const multerConfig = require("../middleware/multer-config");

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

router.use((req, res, next) => {
    console.log("A request has been asked");
    next();
})

router.post('/api/posting', auth, jsonParser, multer, postCtrl.createPost);

router.post('/api/likedPost/:id', auth, postCtrl.likedPost);
 
router.get('/api/posts', postCtrl.getAllPost);

router.put('/api/updatePost/:id', auth, jsonParser, multer, postCtrl.updatePost);

router.delete('/api/posts/:id', auth, jsonParser, postCtrl.deletePost);

router.get('/api/posts/:id', postCtrl.getOnePost);

router.get('/api/howManyLikes/:id', postCtrl.howManyLikes);

module.exports = router;