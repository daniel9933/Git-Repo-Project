import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const secretKey = process.env.SECRET_KEY;
if (!secretKey) throw new Error("SECRET_KEY is not defined in the environment variables");


interface AuthRequest extends Request {
    userId: string;
};


export const authenticateToken = (req : Request, res : Response, next : NextFunction) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader)
    if (authHeader && typeof authHeader === 'string'){
    const token = authHeader.split(' ')[1];
    if (token){
    try{
        const decoded = jwt.verify(token, secretKey) as AuthRequest;
        (req as AuthRequest).userId = decoded.userId
        next();
    }
    catch (error)
    {
        res.status(401).send("Invalid Token");
    }
    }
    else {
    res.status(401).send("no token")
    }
    }
}