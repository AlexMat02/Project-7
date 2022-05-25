var db = require('../dbConnections');
var connection = db();
const multer = require('multer');
const fs = require("fs");

exports.createPost = (req, res) => {
    const postData = req.body;
    const url = req.protocol + '://' + req.get('host');
    const v = url + '/images/' + req.file.filename;
    const title = postData.title; 
    const type = postData.type; 
    const content = postData.content; 
    const userId = postData.userId; 
    try {
        connection.query("INSERT INTO post (title, type, img, content,User_id_User) VALUES (?, ?, ?, ?, ?)", [title, type, v, content, userId], (err, results, fields) => {
            if (err) {
                console.log("An error has occured during createPost request -> " , err);
                return res.status(400).send()
            }
            return res.status(201).json({message : "Post created"})
        })
    } catch (err) {
        console.log("An error has occured for createPost request -> " , err);
        return res.status(500).send()
    }
}

exports.getAllPost = (req, res) => {
    try {
        connection.query("SELECT * FROM post", function(err, results, fields) {
            if (err) {
                console.log("An error has occured during getAllPost request -> " , err);
                return res.status(400).send()
            }
            res.status(200).json(results);
        });
    } catch (err) {
        console.log("An error has occured for getAllPost request -> " , err);
        return res.status(500).send()
    }
}

exports.getOnePost = (req, res) => {
    const postID = req.params.id;
    try {
        connection.query("SELECT * FROM post WHERE id_Post = ?", [postID], (err, results, fields) => {
            if (err) {
                console.log("An error has occured during getOnePost request -> " , err);
                return res.status(400).send()
            }
            return res.status(200).json(results)
        })
    } catch {
        console.log("An error has occured for getOnePost request -> " , err);
        return res.status(500).send()
    }
};

exports.deletePost = (req, res) => {
    const postID = req.params.id;
    const postData = req.body;
    const filename = postData.img.split("/images/")[1];
    fs.unlink("images/" + filename ,(err) => {
        if (err) {
            console.log("err -> ", err)
        }
    })
    // this is to delete the Foreign Key inside Liked
    try {
        connection.query("DELETE FROM Liked WHERE Post_id_Post = ?", [postID], (err, results, fields) => {
            if (err) {
                console.log("An error has occured during deletePost request -> " , err);
                return res.status(400).send()
            }
        })
    } catch {
        console.log("An error has occured for deletePost request -> " , err);
        return res.status(500).send()
    }
    // This is to delete the Foreign Key inside Seen
    try {
        connection.query("DELETE FROM Seen WHERE Post_id_Post = ?", [postID], (err, results, fields) => {
            if (err) {
                console.log("An error has occured during deletePost request -> " , err);
                return res.status(400).send()
            }
        })
    } catch {
        console.log("An error has occured for deletePost request -> " , err);
        return res.status(500).send()
    }
    // This is to delete the Post since it has no Foreign Key left
    try {
        connection.query("DELETE FROM post WHERE id_Post = ?", [postID], (err, results, fields) => {
            if (err) {
                console.log("An error has occured during deletePost request -> " , err);
                return res.status(400).send()
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message : 'No post with that id'})
            }
            res.status(200).json({ message : 'Post deleted successfully'})
        })
    } catch {
        console.log("An error has occured for deletePost request -> " , err);
        return res.status(500).send()
    }
};

exports.updatePost = (req, res) => {
    postData = req.body;
    const title = postData.title; 
    const type = postData.type; 
    const content = postData.content;   
    const postId = req.params.id
    try {
        connection.query("UPDATE post SET title = ? WHERE id_Post = ?" , [title, postId], (err, results, fields) => {
            if (err) {
                console.log("An error has occured during updatePost request -> " , err);
                return res.status(400).send()
            }
            try {
                connection.query("UPDATE post SET type = ? WHERE id_Post = ?" , [type, postId], (err, results, fields) => {
                    if (err) {
                        console.log("An error has occured during updatePost request -> " , err);
                        return res.status(400).send()
                    }
                    try {
                        connection.query("UPDATE post SET content = ? WHERE id_Post = ?" , [content, postId], (err, results, fields) => {
                            if (err) {
                                console.log("An error has occured during updatePost request -> " , err);
                                return res.status(400).send()
                            }
                            try {
                                if (req.file) {
                                    const url = req.protocol + '://' + req.get('host');
                                    const changedIMG = url + '/images/' + req.file.filename;
                                    connection.query("UPDATE post SET img = ? WHERE id_Post = ?", [changedIMG, postId], (err, results, fields) => {
                                        if (err) {
                                            console.log("An error has occured during updatePost request -> ", err);
                                            return res.status(400).send()
                                        }
                                        res.status(200).json({ message : 'Post updated successfully'})  
                                    })
                                } else {
                                    res.status(200).json({ message : 'Post updated successfully'})  
                                }
                            } catch {
                                console.log("An error has occured for updatePost request -> ", err);
                                return res.status(500).send()
                            }
                        })
                    } catch {
                        console.log("An error has occcured for updatePost request -> " , err);
                        return res.status(500).send()
                    }
                })
            } catch {
                console.log("An error has occcured for updatePost request -> " , err);
                return res.status(500).send()
            }
        })
    } catch {
        console.log("An error has occcured for updatePost request -> " , err);
        return res.status(500).send()
    }
}

exports.likedPost = (req, res) => {
    const userId = req.body.userId;
    const post = req.body.post;
    let userLikedPosts = "";
    // This is to check if it already exists, then if it does change query
    try {
        connection.query("SELECT * FROM liked WHERE User_id_User = ?", [userId], (err, results, fields) => {
            if (err) {
                console.log("An error has occured during likedPost request -> ", err);
                return res.status(400).send()
            }
            userLikedPosts = results;
            // This is to check if the post is inside the liked table or not
            // Check if userLikedPosts is empty
            if (userLikedPosts.length < 1) {
                try {
                    connection.query("INSERT INTO liked (Liked, User_id_User, Post_id_Post) VALUES (?, ?, ?)", [req.body.like, userId, post.id_Post], (err, results, fields) => {
                        if (err) {
                            console.log("An error has occured during the request likedPost -> ", err);
                            return res.status(400).send()
                        }
                        res.status(200).json({ message: 'Post like/dislike inserted'})
                    })
                } catch {
                    console.log("An error has occured for the request likedPost -> ", err);
                    return res.status(500).send()
                }
            } else {
                // find if the post is inside Liked
                let correctPost;
                for (let x = 0; x < userLikedPosts.length; x++) { 
                    if (userLikedPosts[x].Post_id_Post == post.id_Post) {
                        correctPost = userLikedPosts[x].Post_id_Post;   
                    }
                }
                if (correctPost != undefined && correctPost != null && correctPost != "") {
                    // The post was in the liked table so we update it
                    try {
                        connection.query("UPDATE liked SET Liked = ? WHERE User_id_User = ? AND Post_id_Post = ?", [req.body.like, userId, post.id_Post], (err, results, fields) => {
                            if (err) {
                                console.log("An error has occured during the request likedPost -> ", err);
                                return res.status(400).send()
                            }
                            res.status(200).json({ message: 'Post like/dislike updated'})
                        })
                    } catch {
                        console.log("An error has occured for the request likedPost -> ", err);
                        return res.status(500).send()
                    }
                } else {
                    // The post wasn't in the liked table so we insert it
                    try {
                        connection.query("INSERT INTO liked (Liked, User_id_User, Post_id_Post) VALUES (?, ?, ?)", [req.body.like, userId, post.id_Post], (err, results, fields) => {
                            if (err) {
                                console.log("An error has occured during the request likedPost -> ", err);
                                return res.status(400).send()
                            }
                            res.status(200).json({ message: 'Post like/dislike inserted'})
                        })
                    } catch {
                        console.log("An error has occured for the request likedPost -> ", err);
                        return res.status(500).send()
                    }
                }
            }
        })
    } catch {
        console.log("An error has occured for likedPost request -> ", err);
        return res.status(500).send()
    } 
};

exports.howManyLikes = (req, res) => {
    const postId = req.params.id;
    try {
        connection.query("SELECT * FROM liked WHERE Post_id_Post = ?", [postId], (err, results, fields) => {
            if (err) {
                console.log("An error has occured during howManyLikes request -> ", err);
                return res.status(400).send()
            }
            res.status(200).json(results)
        })
    } catch {
        console.log("An error has occured for howManyLikes request -> ", err);
        return res.status(500).send()
    }
}