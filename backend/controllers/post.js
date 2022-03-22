const Post = require("../models/post");
var db = require('../dbConnections');
const user = require("../models/user");
var connection = db();

exports.createPost = (req, res) => {
    const postData = req.body;
    console.log("Logged postData in the correct way -> " , postData.post);
    const {title, type, content, img, userId} = postData.post;
    console.log("LOGGED title " , title , "LOGGED type " , type , "LOGGED userId " , userId);
    // #WORK
    try {
        connection.query("INSERT INTO post (title, type, content, img, User_id_User) VALUES (?, ?, ?, ?, ?)", [title, type, content, img, userId], (err, results, fields) => {
            if (err) {
                console.log("Error on createPost inserting -> " , err);
                return res.status(400).send()
            }
            return res.status(201).json({message : "Post created"})
        })
    } catch (err) {
        console.log("Error on createPost -> " , err);
        return res.status(500).send()
    }
}

exports.getAllPost = (req, res) => {
    try {
        connection.query("SELECT * FROM post", function(err, results, fields) {
            if (err) {
                console.log("An error has occured -> " , err);
                return res.status(400).send()
            }
            console.log("This is all the avaible posts : " , results)
            res.status(200).json(results);
        });
    } catch (err) {
        console.log("An error has been occured : " , err);
        return res.status(500).send()
    }
}

exports.getOnePost = (req, res) => {
    const postID = req.params.id;
    try {
        connection.query("SELECT * FROM post WHERE id_Post = ?", [postID], (err, results, fields) => {
            if (err) {
                console.log("Error getting one post -> " , err);
                return res.status(400).send()
            }
            return res.status(200).json(results)
        })
    } catch {
        console.log("An error has occured for getOnePost -> " , err);
        return res.status(500).send()
    }
};

exports.deletePost = (req, res) => {
    console.log("LOGGED req.params -> " , req.params)
    const postID = req.params.id;
    try {
        connection.query("DELETE FROM post WHERE id_Post = ?", [postID], (err, results, fields) => {
            if (err) {
                console.log("Error deleting a post -> " , err);
                return res.status(400).send()
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message : 'No post with that id'})
            }
            return res.status(200).json({ message : 'Post deleted successfully'})
        })
    } catch {
        console.log("An error has occured for deletePost -> " , err);
        return res.status(500).send()
    }
};

exports.updatePost = (req, res) => {
    const {title, type, content, img, userId} = req.body;
    // #WORK
    try {
        connection.query("UPDATE post SET title = ? WHERE User_id_User = ?" , [title, type, content, img, userId], (err, results, fields) => {
            if (err) {
                console.log("Error while updatePost request -> " , err);
                return res.status(400).send()
            }
            return res.status(200).json({ message : 'Post updated successfully'})
        })
    } catch {
        console.log("An error has occcured in updatePost -> " , err);
        return res.status(500).send()
    }
}

exports.likedPost = (req, res) => {
    // #WORK need to change it to SQL
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