var db = require('../dbConnections');
var connection = db();

exports.createPost = (req, res) => {
    const postData = req.body;
    console.log("Logged postData in the correct way -> " , postData.post);
    const {title, type, content, img, userId} = postData.post;
    console.log("LOGGED title " , title , "LOGGED type " , type , "LOGGED userId " , userId);
    // There was a problem inside this request, it gave me CANNOT GET with the wrong url request
    // The problem was a bad request (400)
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
    // #WORK need to see if SQL work + need to delete old
    // I might need to add a way to check if it already exists, then the query will change into update
    console.log("logged req.body -> ", req.body);
    // body: JSON.stringify({like: 0, post: posts[postNumber], userId: userData.userData.userId})
    const userId = req.body.userId;
    const post = req.body.post;
    console.log("LOGGED userId -> ", userId);
    console.log("LOGGED post -> ", post);
    try {
        console.log("User has liked the post");
        connection.query("INSERT INTO liked (Liked, User_id_User, Post_id_Post) VALUES (?, ?, ?)", [req.body.like, userId, post.id_Post], (err, results, fields) => {
            if (err) {
                console.log("An error has occured during the request likedPost -> ", err);
                return res.status(400).send()
            }
            return res.status(200).json({ message: 'Post liked/disliked'})
        })
    } catch {
        console.log("An error has occured for the request likedPost -> ", err);
        return res.status(500).send()
    }
};