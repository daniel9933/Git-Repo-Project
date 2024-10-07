import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const secretKey = process.env.SECRET_KEY;
if (!secretKey) throw new Error("SECRET_KEY is not defined in the environment variables");


export const signIn = (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (username === 'Daniel' && password === '1234')
    {
        const token = jwt.sign({ userId : "1" ,username: username }, secretKey, { expiresIn: '1h' }); // later the id changes do the _id in the database.
        return res.status(200).json({ token });
    } 

    else
    {
        return res.status(401).send('Invalid credentials.');
    }
};

//todo: encrypt the token
//todo: verify the token when it comes back from the client