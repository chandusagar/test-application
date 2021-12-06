require("dotenv").config();
import JWT from 'jsonwebtoken';
import { apiAuthrizationError } from '../utilits/Errors';

const verifyToken =async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['authorization'];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decode = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decode;
    } catch (err) {
        return apiAuthrizationError(res)
    }
    return next();
    
}

export default verifyToken

