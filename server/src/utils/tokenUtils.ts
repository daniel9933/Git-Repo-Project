import dotenv from 'dotenv';
import * as jose from 'jose';

dotenv.config();

const secretKey = process.env.SECRET_KEY;
const encryptionKey = process.env.ENCRYPTION_KEY;
if (!secretKey || !encryptionKey) throw new Error("KEY is not defined in the environment variables");


export const createAccessToken = async (userId: string) : Promise<string> => {
    return new jose.SignJWT({ userId: userId })
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


export const encryptToken = async (token: string): Promise<string> => {
    // Import the encryption key
    const ekey = await jose.importJWK(
        {
            kty: 'oct',
            k: Buffer.from(encryptionKey, 'hex').toString('base64url'), // Convert from hex to base64url
        },
        'A256GCM' // Encryption algorithm
    );

    // Encrypt the token
    return await new jose.CompactEncrypt(
        new TextEncoder().encode(token) // Convert token to Uint8Array
    )
        .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' }) // Set the header
        .encrypt(ekey);
};


export const decryptToken = async (encryptedToken: string): Promise<string> => {
    try {
        // Import the decryption key
        const ekey = await jose.importJWK(
            {
                kty: 'oct',
                k: Buffer.from(encryptionKey, 'hex').toString('base64url'), // Convert from hex to base64url
            },
            'A256GCM' // Encryption algorithm
        );

        // Decrypt the token
        const { plaintext, protectedHeader } = await jose.compactDecrypt(encryptedToken, ekey);

        // Convert the decrypted plaintext back to string
        return new TextDecoder().decode(plaintext);
    } catch (error) {
        console.error('Token decryption failed:', error);
        throw new Error('Failed to decrypt the token.');
    }
};

    
