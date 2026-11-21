const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        const decoded= jwt.verify(token,process.env.SECRET_KEY);
        req.userId= decoded.id;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};
module.exports = authMiddleware;