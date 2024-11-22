import { Request, Response } from 'express';
import {genAndEncryptAccessToken, genAndEncryptRefreshToken} from '../utils/tokenCreation'
import {AuthRequest} from '../middlewares/authenticateToken'

export const signIn = async (req: Request, res: Response) => {
    const { username, password } = req.body;
// later we need to implement it with a db and send the username and the userId
    if (username === 'Daniel' && password === '1234') {
        try {
            const userId = '1';

            const encryptedAccessToken = await genAndEncryptAccessToken(userId)
            const encryptedRefreshToken = await genAndEncryptRefreshToken(userId);

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

//this function reasigned a new access token to the user after it had expired.
export const reasignAccessToken = async(req: Request, res: Response) => {
    const userId = (req as AuthRequest).userId;

    if (!userId){
        return res.status(400).send("No userId available.");
    }

    try {
        const newEncryptedAccessToken = await genAndEncryptAccessToken(userId)// later we need to query the database inorder to fetch the username.\
        console.log("new token ------>",newEncryptedAccessToken)
        res.status(200).json({ accessToken: newEncryptedAccessToken });
    }
    catch (error) {
        console.error("Error generating access token:", error);
        res.status(500).send("Error generating access token.");
    }
}
