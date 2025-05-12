import {Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: string;
}

export const authenticateToken = (req: AuthRequest, res:Response, next:NextFunction): any => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if(!token) return res.status(401).json({message : 'Missing token'});

    try{
        jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
            if(err) return res.status(403).json({message : 'Invalid token'});
            req.user = (user as any).username;
            next();
        });
    } catch (error) {
        return res.status(403).json({message: 'Forbidden'});
    }
}
