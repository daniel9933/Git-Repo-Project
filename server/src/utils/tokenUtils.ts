import { Request, Response } from 'express';
import dotenv from 'dotenv';
import * as jose from 'jose';

dotenv.config();

const secretKey = process.env.SECRET_KEY;
const encryptionKey = process.env.ENCRYPTION_KEY;
if (!secretKey || !encryptionKey) throw new Error("KEY is not defined in the environment variables");


export const createAccessToken = async (userId: string , username: string) : Promise<string> => {
    return new jose.SignJWT({ userId: userId, username: username })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime('20m')
    .setIssuedAt()
    .sign(new TextEncoder().encode(secretKey));
};

export const createRefreshToken = async (userId: string) : Promise<string> =>{
    return new jose.SignJWT({ userId: userId })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime('7d')
    .setIssuedAt()
    .sign(new TextEncoder().encode(secretKey));
};

export const encryptToken = async (token : string) : Promise<string> =>{
    const ekey = await jose.importJWK({
        kty: 'dir',
        k: Buffer.from(encryptionKey).toString('base64')
    }, 'A256GCM');

    return new jose.CompactEncrypt(
        new TextEncoder().encode(token)
    )
        .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
        .encrypt(ekey);
};

export const decryptToken = async (enryptedToken : string): Promise<string> => {
    const ekey = await jose.importJWK({
        kty: 'dir',
        k: Buffer.from(encryptionKey).toString('base64')
    }, 'A256GCM');

    const { plaintext } = await jose.compactDecrypt(enryptedToken, ekey);
    return new TextDecoder().decode(plaintext);
};



