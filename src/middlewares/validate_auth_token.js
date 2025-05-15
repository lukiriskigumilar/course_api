import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { customResponse } from '../utils/custom_response.js';

export const authenticationToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) {
        return customResponse(res, 401, 'Unauthorized', null);
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return customResponse(res, 403, 'Token is invalid or expired', null);
        }
        req.user = user;
        next();
    })

}