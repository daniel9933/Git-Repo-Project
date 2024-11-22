import AsyncStorage from '@react-native-async-storage/async-storage';
import {router} from "expo-router"

interface requestOptions {
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    token: string,
    body? : any; // optional because we might send a request without a body.
}

export const makeRequest = async({url, method, token, body}: requestOptions): Promise<any> =>{
    // we set up the headers
    const headers: Record<string, string> = { // Record<string, string> is for key and value type safety.
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
    };

    // we set up the configuration of our request, the method of the request(GET, POST...) and the headers.
    // RequestInit is an interface in typescript of fetch api which ensures the method is string etc...
    const options: RequestInit = {
        method,
        headers,
    };

    if (body){
        options.body = JSON.stringify(body);
    }

    try{
        const response = await fetch(url, options);
        if (response.ok){
            console.log("successful request.")
        }

        if (response.status === 401){
            console.log("access token had expired. attempting to refresh...");
            const newToken = await refreshAccessToken();
            if(!newToken){
                console.log("failed to refresh the token.")
                return null;
            }

            return await makeRequest({url, method, token: newToken, body})
        }
    }
    catch(error) {
        console.error("error during request.", error);
        return null;
    }
}  
    

 const refreshAccessToken = async (): Promise<string | null> => {
    console.log("fetching refresh token now.")
    try {
        const refreshToken = await AsyncStorage.getItem('refreshToken'); // Adjust storage based on your setup
        if (!refreshToken) {
            console.log("No refresh token available.")
            throw new Error('No refresh token available');
        }

        const response = await fetch('http://192.168.1.221:3000/api/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${refreshToken}`
            },
        });

        if (response.ok){
            const data = await response.json();
            console.log("Token refreshed succssfully:", data.accessToken);
            await AsyncStorage.setItem('accessToken', data.accessToken);
            return data.accessToken
        }

        if (response.status === 401) {
           console.log("Refresh token invalid. logging out...")
           handleSessionExpired()
           return null;
        }

        throw new Error(`unexpected error during refresh: ${response.status}`);
    }
    catch (error) {
        console.error("error refreshing token.", error)
        handleSessionExpired()
        return null;
    }
};


const handleSessionExpired = () =>{
    AsyncStorage.removeItem('accessToken');
    AsyncStorage.removeItem('refreshToken');
    console.log("Redirecting to login... tokens removed.");
    router.replace("/sign-in")
}




/* todo: compare.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";

// Custom error type for better debugging
class TokenRefreshError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "TokenRefreshError";
    }
}

interface RequestOptions {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    token?: string; // Token can be optional if handled inside makeRequest
    body?: Record<string, unknown>; // Stricter type for body
}

export const makeRequest = async ({ url, method, token, body }: RequestOptions): Promise<any> => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const options: RequestInit = {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    };

    try {
        const response = await fetch(url, options);

        if (response.status === 401) {
            console.log("Access token expired. Attempting to refresh...");
            const newToken = await refreshAccessToken();

            if (!newToken) {
                throw new TokenRefreshError("Unable to refresh token");
            }

            return makeRequest({ url, method, token: newToken, body });
        }

        if (response.ok) {
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            return null; // Return null if no content
        }

        throw new Error(`HTTP Error: ${response.status}`);
    } catch (error) {
        console.error("Error during request:", error);
        throw error;
    }
};

const refreshAccessToken = async (): Promise<string | null> => {
    try {
        const refreshToken = await AsyncStorage.getItem('refreshToken'); // Await the storage call
        if (!refreshToken) {
            console.log("No refresh token available");
            handleSessionExpired();
            return null;
        }

        const response = await fetch('/auth/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Token refreshed successfully:", data.accessToken);
            await AsyncStorage.setItem('accessToken', data.accessToken);
            return data.accessToken;
        }

        if (response.status === 401) {
            console.log("Invalid refresh token. Logging out...");
            handleSessionExpired();
            return null;
        }

        throw new Error(`Unexpected error during refresh: ${response.status}`);
    } catch (error) {
        console.error("Error refreshing token:", error);
        handleSessionExpired();
        return null;
    }
};

const handleSessionExpired = (): void => {
    AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
    console.log("Redirecting to login...");
    router.replace("/sign-in");
};
*/