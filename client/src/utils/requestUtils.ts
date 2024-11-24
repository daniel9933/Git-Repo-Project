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
            const data = await response.json();
            return data
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
