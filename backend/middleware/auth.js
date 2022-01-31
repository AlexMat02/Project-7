const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log(".body.userId -> " , req.body.userId)
    console.log(".headers -> " , req.headers)
    try {
        const token = req.headers.authorization;
        console.log("LOGGED token -> " , token);
        const decodedToken = jwt.verify(token, 'SUPER_SECRET_TOKEN');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'invalid user ID';
        } else {
            next()
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request')
        })
    }
}