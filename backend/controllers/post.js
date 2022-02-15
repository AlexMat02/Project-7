const Post = require("../models/post");

exports.createPost = (req, res) => {
    console.log("Logged request.body -> " , req.body);
    const post = new Post({
        title: req.body.title,
        type: req.body.type,
        content: req.body.content,
        img: req.body.img,
        userId: req.body.userId,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
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
    console.log("LOGGED req.params -> " , req.params)
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

exports.likedPost = (req, res) => {
    Post.findOne({ _id: req.params.id}).then(
        (post) => {
            if (req.body.like === 1) {
                post.usersLiked.push(req.body.userId)
                const ppost = new Post({
                    _id: post._id,
                    userId: post.userId,
                    title: post.title,
                    content: post.content,
                    img: post.img,
                    type: post.type,
                    likes: post.likes += 1,
                    dislikes: post.dislikes,
                    usersLiked: post.usersLiked,
                    usersDisliked: post.usersDisliked 
                })
                Post.updateOne({_id: req.params.id}, ppost).then(
                    () => {
                        res.status(200).json({
                            message: "Post Liked"
                        });
                    }
                )
            } else if (req.body.like === 0) {
                for (n = 0; n < post.likes; n++) {
                    if ( post.usersLiked[n] == req.body.userId ) {
                        post.usersLiked.splice(n, 1)
                        const ppost = new Post({
                            _id: post._id,
                            userId: post.userId,
                            title: post.title,
                            content: post.content,
                            img: post.img,
                            type: post.type,
                            likes: post.likes -= 1,
                            dislikes: post.dislikes,
                            usersLiked: post.usersLiked,
                            usersDisliked: post.usersDisliked 
                        })
                        Post.updateOne({_id: req.params.id}, ppost).then(
                            () => {
                                res.status(200).json({
                                    message: "post Liked Removed"
                                });
                            }
                        )
                    }
                }
                for (a = 0; a < post.dislikes; a++) {
                    if (post.usersDisliked[a]  == req.body.userId ) {
                        post.usersDisliked.splice(a, 1)
                        const ppost = new Post({
                            _id: post._id,
                            userId: post.userId,
                            title: post.title,
                            content: post.content,
                            img: post.img,
                            type: post.type,
                            likes: post.likes,
                            dislikes: post.dislikes -= 1,
                            usersLiked: post.usersLiked,
                            usersDisliked: post.usersDisliked 
                        })
                        Post.updateOne({_id: req.params.id}, ppost).then(
                            () => {
                                res.status(200).json({
                                    message: "Post disliked removed"
                                });
                            }
                        )
                    }
                }
            } else if (req.body.like === -1) {
                post.usersDisliked.push(req.body.userId);
                const ppost = new Post({
                    _id: post._id,
                    userId: post.userId,
                    title: post.title,
                    content: post.content,
                    img: post.img,
                    type: post.type,
                    likes: post.likes,
                    dislikes: post.dislikes += 1,
                    usersLiked: post.usersLiked,
                    usersDisliked: post.usersDisliked 
                })
                Post.updateOne({_id: req.params.id}, ppost).then(
                    () => {
                        res.status(200).json({
                            message: "Post Disliked"
                        });
                    }
                )
            };
        }
    ).catch(
        () => {
            res.status(400).json({
                error: "An error as occured"
            });
        }
    )
};

/* Sauce.findOne({ _id: req.params.id}).then(
    (sauce) => {
        if (req.body.like === 1) {
            sauce.usersLiked.push(req.body.userId)
            const ssauce = new Sauce({
                _id: sauce._id,
                userId: sauce.userId,
                name: sauce.name,
                manufacturer: sauce.manufacturer,
                description: sauce.description,
                mainPepper: sauce.mainPepper,
                imageUrl: sauce.imageUrl,
                heat: sauce.heat,
                likes: sauce.likes += 1,
                dislikes: sauce.dislikes,
                usersLiked: sauce.usersLiked,
                usersDisliked: sauce.usersDisliked 
            })
            Sauce.updateOne({_id: req.params.id}, ssauce).then(
                () => {
                    console.log("Logged sauce READ-1-1 : " , ssauce);
                    res.status(200).json({
                        message: "Sauce Liked"
                    });
                }
            ) */