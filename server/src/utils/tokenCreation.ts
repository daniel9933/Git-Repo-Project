import { createAccessToken, createRefreshToken, encryptToken } from '../utils/tokenUtils';

// this function handles the creation proccess of the access token
// it creates the token , encrypts it and sends it back.
export const genAndEncryptAccessToken = async (userId:string) => {
    try {
        const accessToken = await createAccessToken(userId);
        const encryptedAccessToken = await encryptToken(accessToken);
        console.log("encrypted access token")

        return encryptedAccessToken
    } catch (error) {
        console.error('Error creating Access token:', error);
    }
}
// this function handles the creation proccess of the refresh token
// it creates the token , encrypts it and sends it back.
export const genAndEncryptRefreshToken = async (userId:string) => {
    try {
        const refreshToken = await createRefreshToken(userId);
        const encryptedRefreshToken = await encryptToken(refreshToken);
        console.log("encrypted refresh token")
        
        return encryptedRefreshToken
    }

    catch (error) {
        console.error('Error creating access token:', error);
    }
}