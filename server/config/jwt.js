const jwt = require('jsonwebtoken');

async function generateTokens(payload) {
        try {
            // Access token (short-lived)
            const accessToken = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_ACCESS_EXPIRY }
            );
            
            // Refresh token (long-lived)
            const refreshToken = jwt.sign(
                { ...payload, type: 'refresh' },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_REFRESH_EXPIRY }
            );
            
            return { accessToken, refreshToken };
        } catch (error) {
            throw new Error('Token generation failed');
        }
    }
    
 async function verifyToken(token, isRefreshToken = false) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Additional validation for refresh tokens
            if (isRefreshToken && decoded.type !== 'refresh') {
                throw new Error('Invalid token type');
            }
            
            return decoded;
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                throw new Error('Invalid token');
            }
            if (error.name === 'TokenExpiredError') {
                throw new Error('Token expired');
            }
            throw error;
        }
    }
    
   async function decodeToken(token) {
        return jwt.decode(token);
    }


module.exports = {generateTokens,verifyToken,decodeToken};