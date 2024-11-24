import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Image, StyleSheet, useWindowDimensions, ScrollView, ActivityIndicator} from 'react-native';
import Logo from '../../../assets/images/Logo_1.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {router, Stack} from "expo-router"
import { makeRequest } from '../../utils/requestUtils';


const SignInScreen = () => {

    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [checkingToken, setCheckingToken] = useState(true);

    const { height } = useWindowDimensions(); // gets the window dimensions of the device

    //this is to check if a token already exists and valid, if it is then out redirect home.
    useEffect(() => {
        const checkToken = async () => {
            console.log("Checking if there is a valid token...");
            try {
                const refreshToken = await AsyncStorage.getItem('refreshToken');
                if (refreshToken) {
                    const data = await makeRequest({
                        url: 'http://192.168.1.221:3000/api/auth/sign-in',
                        method: 'GET',
                        token: refreshToken
                    });

                    if (data?.message === 'valid token') {
                        console.log("Token found. Redirecting to home...");
                        router.replace("/home");
                        return;
                    }
                }
                console.log("Token not found or invalid. Staying on login.");
            } catch (error) {
                console.error("Error checking token validity:", error);
            } finally {
                setCheckingToken(false); // Token check complete
            }
        };

        checkToken();
    }, []); // empty array to run this effect only once.

    // this function sends the login data to the server. 
    const SignInPressed = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://192.168.1.221:3000/api/auth/sign-in', {
                    method : 'POST',
                    headers: {
                        'content-type' : 'application/json',
                    },
                    body: JSON.stringify({
                        username: Username,
                        password : Password,
                    }),
                });
                if (response.status === 200) { 
                    const data = await response.json();
                    const accessToken = data.accessToken;
                    const refreshToken = data.refreshToken;

                    await AsyncStorage.setItem('accessToken', accessToken);// adds the token into the async storage
                    await AsyncStorage.setItem('refreshToken', refreshToken)
                    console.log('Login successful, AcessToken stored:', accessToken);
                    console.log('Refresh Token', refreshToken);

                    router.replace("/home")
                }
                else
                {
                    alert("error")
                }
            }
            catch (error){
                console.error('Error logging in:', error);
                alert('An error occured. please try again.')
            }
            finally{
                setIsLoading(false)
            }
        }

        if (checkingToken) {
            // Show a loading indicator while checking the token
            return (
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color="white" />
                </View>
            );
        }
    return (
        <>
            <Stack.Screen
            options={{
                headerShown: false,
            }}
            />

        <View style={styles.root}>
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.mainContent}>
                    <Image
                        source={Logo}
                        style={[styles.logo, { height: height * 0.3 }]}
                        resizeMode="contain"
                    />

                    <CustomInput
                        placeholder='Username'
                        value={Username}
                        setValue={setUsername}
                        secureTextEntry={false}
                    />
                    <CustomInput
                        placeholder='Password'
                        value={Password}
                        setValue={setPassword}
                        secureTextEntry={true}
                    />

                    <CustomButton
                        text="Sign In"
                        onPress= {SignInPressed}
                        type="PRIMARY"
                        loading={isLoading}
                    />

                    <CustomButton
                        text="Forgot password?"
                        onPress= {() => router.push("/forgot-password/Forgot")}
                        type="TERTIARY"
                    />

                </View>
            </ScrollView>

                {/* Separator Line */}
                <View style={styles.separatorLine} />

            <CustomButton
                text="Don't have an account? Create one"
                onPress= {() => router.push("/sign-up")}
                type="TERTIARY"
            />
        </View>
        </>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1, // Ensures the container fills the screen
        justifyContent: 'space-between', // Spacing to keep the "Sign Up" button at the bottom
        marginBottom : 10,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20, 
    },
    mainContent: {
        width:'100%',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 100,
        marginVertical: 15,
    },
    separatorLine: {
        height: 1, // Thickness of the line
        width: '95%', 
        backgroundColor: '#CCC', // Color of the line
        marginVertical: 5, // Vertical spacing around the line
        alignSelf: 'center'
    },
    centered: {
        flex: 1, // Ensures the container fills the screen
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
    },
});

export default SignInScreen;

