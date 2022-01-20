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

exports.deleteUser = (req, res, next) => {
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