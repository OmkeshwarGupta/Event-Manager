const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Retrieve token from Authorization header or cookies
    let token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null;
    if (!token) {
        token = req.cookies.token || req.body.token; // Check cookies and body as fallback
    }

    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Save the decoded token to request for later use
        console.log("decoded",decoded);
        next(); // Call next middleware or route handler
    } catch (err) {
        res.status(401).json({ error: 'Token is not valid' });
    }
};
