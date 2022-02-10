const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = (req, res, next) => {
    console.log("signup has been asked")
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            const user = new User({
                email: req.body.email,
                password: hash,
                username: req.body.username,
            });
            user.save().then(
                () => {
                    res.status(201).json({
                        message: 'success'
                    })
                }
            ).catch(
                (err) => {
                    res.status(500).json({
                        error: err
                    })
                }
            )
        }
    )
};

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email}).then(
        (user) => {
            if (!user) {
                return res.status(401).json({
                    error: new Error('user not found')
                })
            }
            bcrypt.compare(req.body.password, user.password).then(
                (valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            error: new Error('Incorrect Password')
                        })
                    }
                    const token = jwt.sign({userId: user._id}, 'SUPER_SECRET_TOKEN', {expiresIn: '24h'});
                    res.status(200).json({
                        userId: user._id,
                        token: token,
                    });
                }
            ).catch(
                (err) => {
                    res.status(500).json({
                        error: err
                    })
                }
            )
        }
    ).catch(
        (err) => {
            res.status(500).json({
                error: err
            })
        }
    )
};

exports.deleteUser = (req, res) => {
    User.deleteOne({_id: req.params.id}).then(
        () => {
            res.status(200).json({
                message: "user deleted"
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

exports.getAllUser = (req, res) => {
    User.find().then(
        (users) => {
            res.status(200).json(users);
        }
    ).catch(
        (err) => {
            res.status(400).json({
                error: err
            })
        }
    )
}

exports.postSighted = (req, res) => {
    User.findOne({_id: req.params.id}).then(
        (user) => {
            console.log("LOGGED user BEFORE update -> " , user);
            user.postsSighted.push(req.body.post._id);
            // need to update post here otherwise it seems to be working
            const uuser = {
                email: user.email,
                password: user.password,
                username: user.username,
                img: user.img,
                description: user.description,
                postsSighted: user.postsSighted,
            }
            User.updateOne({_id: req.params.id}, uuser).then(
                () => {
                    console.log("LOGGED UUSER -> " , uuser);
                    res.status(200).json({
                        message: 'Post sighted'
                    })
                }
            )
        }
    ).catch(
        (err) => {
            res.status(400).json({
                error: err
            })
        }
    )
}