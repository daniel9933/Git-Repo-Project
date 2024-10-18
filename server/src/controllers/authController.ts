import { Request, Response } from 'express';
import dotenv from 'dotenv';
import * as jose from 'jose';
import { createAccessToken, createRefreshToken, encryptToken, decryptToken } from '../utils/tokenUtils';

dotenv.config();

const secretKey = process.env.SECRET_KEY;
const encryptionKey = process.env.ENCRYPTION_KEY;
if (!secretKey || !encryptionKey) throw new Error("KEY is not defined in the environment variables");

export const signIn = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (username === 'Daniel' && password === '1234') {
        try {
            const userId = '1';
            const accessToken = await createAccessToken(userId, username);
            const refreshToken = await createRefreshToken(userId);

            const encryptedAccessToken = await encryptToken(accessToken);
            const encryptedRefreshToken = await encryptToken(refreshToken);

            return res.status(200).json({ 
                accessToken: encryptedAccessToken, 
                refreshToken: encryptedRefreshToken 
            });

        } catch (error) {
            console.error('Error creating tokens:', error);
            return res.status(500).send('Error creating tokens.');
        }
    } else {
        return res.status(401).send('Invalid credentials.');
    }
};
