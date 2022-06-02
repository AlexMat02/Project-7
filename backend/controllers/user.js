const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var db = require('../dbConnections');
var connection = db();

exports.signup = (req, res, next) => {
    const { email , username } = req.body;
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            try {
                connection.query("INSERT INTO user (email, password, username) VALUES (?, ?, ?)", [email, hash, username], (err, results, fields) => {
                    if (err) {
                        console.log("An error has occured during signup request -> " , err);
                        return res.status(400).send()
                    }
                    return res.status(201)
                })
            } catch {
                console.log("An error has occured for signup request -> " , err);
                return res.status(500).send();
            }
        }
    )
};

exports.login = (req, res, next) => {
    const username = req.body.username;
    const pw = req.body.password;
    try {
        connection.query("SELECT * FROM user WHERE username = ?", [username], (err, results, fields) => {
            if (err) {
                console.log("An error has occured during login request -> ", err);
                return res.status(400).send()
            }
            if (results.length < 1) {
                return res.status(500).json({
                    message: "No user found with those logs" , results
                })
            }
            bcrypt.compare(pw, results[0].password).then(
                (valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            message: "Incorrect Password"
                        })
                    }
                    const token = jwt.sign({userId: results[0].id_User}, process.env.secretToken, {expiresIn: '24h'});
                    return res.status(200).json({
                        userId: results[0].id_User,
                        token: token,
                    });
                }
            )
        })
    } catch {
        console.log("An error has occured for login request -> ", err);
        return res.status(500).send()
    }
};

exports.deleteUser = (req, res) => {
    const userId = req.params.id;
    // This is to delete the Foreign Key inside Seen
    try {
        connection.query("DELETE FROM seen WHERE User_id_User = ?", [userId], (err, results, fields) => {
            if (err) {
                console.log("An error has occured during deleteUser request -> " , err);
                return res.status(400).send()
            }
        })
    } catch {
        console.log("An error has occured for deleteUser request -> ", err);
        return res.status(500).send()
    }
    // This is to delete the Foreign Key inside Liked
    try {
        connection.query("DELETE FROM liked WHERE User_id_User = ?", [userId], (err, results, fields) => {
            if (err) {
                console.log("An error has occured during deleteUser request -> " , err);
                return res.status(400).send()
            }
        })
    } catch {
        console.log("An error has occured for deleteUser request -> ", err);
        return res.status(500).send()
    }
    // This is to delete the Foreign Key inside Post
    try {
        connection.query("DELETE FROM post WHERE User_id_User = ?", [userId], (err, results, fields) => {
            if (err) {
                console.log("An error has occured during deleteUser request -> " , err);
                return res.status(400).send()
            }
        })
    } catch {
        console.log("An error has occured for deleteUser request -> ", err);
        return res.status(500).send()
    }
    // This is to delete the user
    try {
        connection.query("DELETE FROM user WHERE id_User = ?", [userId], (err, results, fields) => {
            if (err) {
                console.log("An error has occured during deleteUser request -> " , err);
                return res.status(400).send()
            }
            res.status(200).json({ message: 'User deleted successfully' })
        })
    } catch {
        console.log("An error has occured for deleteUser request -> ", err);
        return res.status(500).send()
    }
};

exports.getAllUser = (req, res) => {
    try {
        connection.query("SELECT * FROM user", (err, results, fields) => {
            if (err) {
                console.log("An error has occured during getAllUser request -> " , err);
                return res.status(400).send()
            }
            return res.status(200).json(results);
        })
    } catch (err) {
        console.log("An error has occured for getAllUser request -> " , err);
        return res.status(500).send()
    }
}

exports.changeDescription = (req, res) => {
    const userId = req.params.id;
    const newDescription = req.body.description;
    try {
        connection.query("UPDATE user SET description = ? WHERE id_User = ?", [newDescription, userId], (err, results, fields) => {
            if (err) {
                console.log("An error has occured during changeDescription request -> ", err);
                return res.status(400).send()
            }
            res.status(200).send()
        })
    } catch {
        console.log("An error has occured for changeDescription request -> ", err);
        return res.status(500).send()
    }
}

exports.postSighted = (req, res) => {
    const userId = req.body.userId;
    const postId = req.body.post.id_Post;
    try {
        connection.query("INSERT INTO seen (User_id_User, Post_id_Post) VALUES (?, ?)", [userId, postId], (err, results, fields) => {
            if (err) {
                console.log("An error has occured during postSighted request -> ", err);
                return res.status(400).send()
            }
            return res.status(200).json({ message : "Post has been seen by the user"})
        })
    } catch {
        console.log("An error has occured for postSighted request -> ", err);
        return res.status(500).send()
    }
}

exports.whichPostsSighted = (req, res) => {
    const userId = req.params.id;
    try {
        connection.query("SELECT * FROM seen WHERE User_id_User = ?", [userId],(err, results, fields) => {
            if (err) {
                console.log("An error has occured during whichPostsSighted request -> ", err);
                return res.status(400).send()
            } 
            res.status(200).json(results);
        })
    } catch {
        console.log("An error has occured for whichPostsSighted request -> " , err);
        return res.status(500).send()
    }
}

exports.whichPostsLiked = (req, res) => {
    const userId = req.params.id;
    try {
        connection.query("SELECT * FROM liked WHERE User_id_User = ?", [userId], (err, results, fields) => {
            if (err) {
                console.log("An error has occured during whichPostsLiked request -> ", err);
                return res.status(400).send()
            }
            res.status(200).json(results);
        })
    } catch {
        console.log("An error has occured for whichPostsLiked request -> ", err);
        return res.status(500).send()
    }
}