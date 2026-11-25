const errorMiddleware = (err, req, res, next) => {
    if (err.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid id' });
    }
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error"
    })
}
module.exports = errorMiddleware;