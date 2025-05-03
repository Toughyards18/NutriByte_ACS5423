// file: backend/middleware/authMiddleware.js
// This file contains middleware for authentication and authorization.
// It checks if the user is authenticated by verifying the JWT token in the request headers.
// If the token is valid, it allows the request to proceed; otherwise, it returns a 401 Unauthorized response.

import jwt from 'jsonwebtoken'; // Import jsonwebtoken for token verification

const protect = (req, res, next) =>
{
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Not authorized' });

    try
    {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err)
    {
        res.status(401).json({ message: 'Token failed' });
    }
};
export default protect;

