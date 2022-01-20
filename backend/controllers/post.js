const Post = require("../models/post");

exports.createPost = (req, res) => {
    console.log("Logged request.body -> " , req.body);
    const post = new Post({
        title: req.body.title,
        type: req.body.type,
        content: req.body.content,
        img: req.body.img,
        userId: req.body.userId,
    });
    post.save().then(
        () => {
            res.status(201).json({message : "post saved"})
        }
    ).catch(
        (err) => {
            res.status(400).json(
                {error: err}
            )
        }
    )
}

exports.getAllPost = (req, res) => {
    Post.find().then(
        (posts) => {
            res.status(200).json(posts);
        }
    ).catch(
        (err) => {
            res.status(400).json({
                error: err
            })
        }
    )
}

exports.getOnePost = (req, res) => {
    Post.findOne({ _id: req.params.id}).then(
        (post) => {
            res.status(200).json(post)
        }
    ).catch(
        (err) => {
            res.status(400).json({
                error: err
            })
        }
    )
};

exports.deletePost = (req, res) => {
    Post.deleteOne({_id: req.params.id}).then(
        () => {
            res.status(200).json({
                message: "Post deleted"
            })
        }
    ).catch(
        (err) => {
            res.status(400).json({
                error: err
            })
        }
    )
};

exports.updatePost = (req, res) => {
    const post = new Post({
        _id: req.params.id,
        title: req.body.title,
        type: req.body.type,
        content: req.body.content,
        img: req.body.img,
        userId: req.body.userId,
    });
    Post.updateOne({_id: req.params.id}, post).then(
        () => {
            res.status(201).json({
                message: 'post updated'
            })
        }
    ).catch(
        (err) => {
            res.status(400).json({
                error: err
            })
        }
    )
}