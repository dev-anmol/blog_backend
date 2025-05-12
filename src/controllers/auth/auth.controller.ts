import {Request, Response, RequestHandler} from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

export const login: RequestHandler = async (req: Request, res: Response) => {
    const {username, password} = req.body;
    if (username !== process.env["ADMIN_USERNAME"]) {
        res.status(401).json({message: "Invalid username:("})
        return;
    }

    const isValid = await bcrypt.compare(password, process.env["ADMIN_PASSWORD"]!)
    if (!isValid) {
        res.status(401).json({message: "Invalid password:("})
        return;
    }

    try {
        const token = jwt.sign({username}, process.env.JWT_SECRET!, {expiresIn: '1h'});
        res.json({isAuthorized: 'authorized' ,token});

    } catch (error) {
        res.status(401).json({message: 'error in login'})
    }
}