var db = require('../dbConnections');
var connection = db();

exports.createPost = (req, res) => {
    const postData = req.body;
    console.log("Logged postData in the correct way -> " , postData.post);
    const {title, type, content, img, userId} = postData.post;
    console.log("LOGGED title " , title , "LOGGED type " , type , "LOGGED userId " , userId);
    // There was a problem inside this request, it gave me CANNOT GET with the wrong url request
    // The problem was a bad request (400)
    try {
        connection.query("INSERT INTO post (title, type, content, img, User_id_User) VALUES (?, ?, ?, ?, ?)", [title, type, content, img, userId], (err, results, fields) => {
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
            console.log("This is all the avaible posts : " , results)
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
    console.log("LOGGED req.params -> " , req.params)
    const postID = req.params.id;
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
    const {title, type, content, img, userId} = req.body;
    // #WORK need to test it
    try {
        connection.query("UPDATE post SET title = ? WHERE User_id_User = ?" , [title, type, content, img, userId], (err, results, fields) => {
            if (err) {
                console.log("An error has occured during updatePost request -> " , err);
                return res.status(400).send()
            }
            return res.status(200).json({ message : 'Post updated successfully'})
        })
    } catch {
        console.log("An error has occcured for updatePost request -> " , err);
        return res.status(500).send()
    }
}

exports.likedPost = (req, res) => {
    // #WORK need further testing + delete comments when finsihed
    // I need to make it change depending on req.body.like
    console.log("logged req.body -> ", req.body);
    // body: JSON.stringify({like: 0, post: posts[postNumber], userId: userData.userData.userId})
    const userId = req.body.userId;
    const post = req.body.post;
    console.log("LOGGED userId -> ", userId);
    console.log("LOGGED post -> ", post);
    let userLikedPosts = "";
    // This is to check if it already exists, then if it does change query
    try {
        connection.query("SELECT * FROM liked WHERE User_id_User = ?", [userId], (err, results, fields) => {
            if (err) {
                console.log("An error has occured during likedPost request -> ", err);
                return res.status(400).send()
            }
            console.log("Those are the results of the user's liked post -> ", results);
            userLikedPosts = results;
            // This is to check if the post is inside the liked table or not
            console.log("seen1");
            console.log("userLikedPosts -> ", userLikedPosts); // Looks like userLikedPosts has nothing
            for (let x = 0; x < userLikedPosts.length; x++) {
                if (userLikedPosts[x].Post_id_Post == post.id_Post) {
                    // The post was in the liked table so we update it
                    try {
                        console.log("User liked/disliked the post but it already exists");
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
                        console.log("User liked/disliked the post for the first time");
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
    // #WORK for some reasons, I don't know why it doesn't let me get params.id
    // params: { id : '8' },
    // there is also a problem with JSON.parse ?
    const postId = req.params.id;
    console.log("LOGGED postId -> ", postId);
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