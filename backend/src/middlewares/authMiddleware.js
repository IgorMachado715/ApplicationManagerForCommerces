const jwt = require('jsonwebtoken');
const { isBlackListed } = require('../controllers/authController');

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded) {
                if (!isBlackListed(token)) {
                    res.locals.token = decoded;
                    return next();
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    res.sendStatus(401);
}