import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import Logo from '../../../assets/images/Logo_1.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {router, Stack} from "expo-router"


const SignInScreen = () => {

    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { height } = useWindowDimensions(); // gets the window dimensions of the device

    //this is to check if a token already exists and valid, if it is then out redirect home.
    useEffect(() => {
        const checkToken = async() => {
            const jwtToken = await AsyncStorage.getItem('token');
            if (jwtToken) {
                const response = await fetch('http://192.168.1.221:3000/api/auth/sign-in', {
                    method: 'GET',
                    headers: {
                        'content-type' : 'application/json',
                        'authorization' : `Bearer ${jwtToken}`,
                    }
                });
                if (response.status === 200)
                {
                    console.log('token found, redirecting to home...');
                    router.replace("/home");
                }
            }
        };
        checkToken();
    }, []); // empty array to run this effect only once.

    // this function sends the login data to the server. 
    //todo: store the refresh token in a secure storage.
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
                    const token = data.token;

                    await AsyncStorage.setItem('token', token);// adds the token into the async storage
                    console.log('Login successful, token stored:', token);

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
    

});

export default SignInScreen;

