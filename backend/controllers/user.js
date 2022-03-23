const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var db = require('../dbConnections');
var connection = db();

exports.signup = (req, res, next) => {
    console.log("signup has been asked")
    const { email , username } = req.body;
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            try {
                connection.query("INSERT INTO user (email, password, username) VALUES (?, ?, ?)", [email, hash, username], (err, results, fields) => {
                    if (err) {
                        console.log("Error while signing up -> " , err);
                        return res.status(400).send()
                    }
                    return res.status(201)
                })
            } catch {
                console.log("An error has occured on signup -> " , err);
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
                console.log("Error while login -> ", err);
                return res.status(400).send()
            }
            console.log("results test -> " , results[0].id_User); // THIS WORKS, I DONT UNDERSTAND ?????
            bcrypt.compare(pw, results[0].password).then(
                (valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            message: "Incorrect Password"
                        })
                    }
                    const token = jwt.sign({userId: results[0].id_User}, 'SUPER_SECRET_TOKEN', {expiresIn: '24h'});
                    return res.status(200).json({
                        userId: results[0].id_User,
                        token: token,
                    });
                }
            )
        })
    } catch {
        console.log("An error has occured for login -> ", err);
        return res.status(500).send()
    }
};

exports.deleteUser = (req, res) => {
    const userId = req.params.id;
    try {
        connection.query("DELETE FROM user WHERE id_User = ?", [userId], (err, results, fields) => {
            if (err) {
                console.log("Error while deleting a user -> " , err);
                return res.status(400).send()
            }
            return res.status(200).json({ message: 'User deleted successfully' })
        })
    } catch {
        console.log("An error has occured on deleting a user -> ", err);
        return res.status(500).send()
    }
};

exports.getAllUser = (req, res) => {
    try {
        connection.query("SELECT * FROM user", (err, results, fields) => {
            if (err) {
                console.log("An error has occured inside the request getAllUser -> " , err);
                return res.status(400).send()
            }
            return res.status(200).json(results);
        })
    } catch (err) {
        console.log("An error has occured for the request getAllUser -> " , err);
        return res.status(500).send()
    }
}

exports.postSighted = (req, res) => {
    // #WORK need to see if SQL work + need to delete old
    // Might need to add another request to check if post has been seen
    const userId = req.body.userId; // change those to the correct ID, those are just temporary
    const postId = req.body.post.id_Post;
    try {
        connection.query("INSERT INTO seen (User_id_User, Post_id_Post) VALUES (?, ?)", [userId, postId], (err, results, fields) => {
            if (err) {
                console.log("An error has occured inside the request psotSighted -> ", err);
                return res.status(400).send()
            }
            return res.status(200).json({ message : "Post has been seen by the user"})
        })
    } catch {
        console.log("An error has occured for the request postSighted -> ", err);
        return res.status(500).send()
    }
}

exports.whichPostsSighted = (req, res) => {
    // this route is for getting the seen table
    // #WORK need to test it
    const userId = req.params.id;
    try {
        connection.query("SELECT * FROM seen WHERE User_id_User = ?", [userId],(err, results, fields) => {
            if (err) {
                console.log("An error has occured during the request whichPostsSighted -> ", err);
                return res.status(400).send()
            }
            console.log("those are the results -> ", results); 
            res.status(200).json(results);
        })
    } catch {
        console.log("An error has occured for the request whichPostsSighted -> " , err);
        return res.status(500).send()
    }
}