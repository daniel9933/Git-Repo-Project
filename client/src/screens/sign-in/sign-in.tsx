import React, { useState } from 'react';
import { View, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import Logo from '../../../assets/images/Logo_1.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {router, Stack} from "expo-router"


const SignInScreen = () => {

    const [Username, setUsername] = useState(''); // initial state of username and password
    const [Password, setPassword] = useState('');

    const { height } = useWindowDimensions(); // gets the window dimensions of the device

    // this function sends the login data to the server. 
    const SignInPressed = async () => {
        try {
            const response = await fetch('http://192.168.1.221:3000/api/auth/sign-in', {
                    method : 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({
                        username: Username,
                        password : Password,
                    }),
                });
                console.log(response.status)
                if (response.status == 200) { 
                    router.push("/home")
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
        }

    return (
        <>
            <Stack.Screen
            options={{
                headerShown: true,
            }}
            />

        <View style={styles.root}>
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={styles.scrollViewContent}
            >
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

