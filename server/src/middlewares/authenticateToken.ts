import { Request, Response, NextFunction } from 'express';
import dotenv, { decrypt } from 'dotenv';
import { decryptToken } from '../utils/tokenUtils';
import * as jose from 'jose';

dotenv.config();

const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);
if (!secretKey) throw new Error("KEY is not defined in the environment variables");


interface AuthRequest extends Request {
    userId: string;
};

// todo: functions to verify access token, refresh token, 
export const authenticateAccessToken = async (req : Request, res : Response, next : NextFunction) => {
    // this function verifies the access token
    if (req.headers['authorization'])
    {
        try{    
            const authHeader = await decryptToken(req.headers['authorization'])
            console.log(authHeader)
            if (authHeader && typeof authHeader === 'string'){
                const token = authHeader.split(' ')[1];
                if (token){
                    try{
                        const { payload } = await jose.jwtVerify(token, secretKey);
                        if (typeof payload.userId === 'string'){
                            (req as AuthRequest).userId = payload.userId
                            next();
                        }
                        else{
                            console.log("userId is invalid.")
                            return res.status(401).send("userId is invalid.")
                        }
                    }
                    catch (error)
                    {
                        console.log("Invalid Token", error)
                        return res.status(401).send("Invalid Token");
                    }
                    }
                else {
                        return res.status(401).send("no token")
                    }
                }
            }
            catch (err){
                console.log("Token decryption failed.", err);
                return res.status(401).send("Token decryption failed.")
            }
        }
        else {
            return res.status(401).send("No authorization header");
        }
    }


// todo: change the verifaction process to jose
// todo: whole verifaction process of the refresh token, 