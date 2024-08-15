import React, { useState } from 'react';
import { View, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import Logo from '../../../assets/images/Logo_1.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

const SignInScreen = () => {
    const [Username, setUsername] = useState(''); // initial state of username and password
    const [password, setPassword] = useState('');

    const { height } = useWindowDimensions(); // gets the window dimensions of the device

    const onSignInPressed = () => { // function that sends a warning when sign in is pressed
        console.warn("Sign in");
    };

    const OnForgotPasswordPressed = () => { // function that sends a warning when forgot password is pressed
        console.warn("OnForgotPasswordPressed");
    };

    const onSignUpPressed = () => { // function that sends a warning when sign up is pressed
        console.warn("Sign up");
    };

    return (
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
                        style = {styles.input}
                        placeholder='Username'
                        value={Username}
                        setValue={setUsername}
                        secureTextEntry={false}
                    />
                    <CustomInput
                        placeholder='Password'
                        value={password}
                        setValue={setPassword}
                        secureTextEntry={true}
                    />

                    <CustomButton
                        text="Sign In"
                        onPress={onSignInPressed}
                        type="PRIMARY"
                    />

                    <CustomButton
                        text="Forgot password?"
                        onPress={OnForgotPasswordPressed}
                        type="TERTIARY"
                    />

                </View>
            </ScrollView>

                {/* Separator Line */}
                <View style={styles.separatorLine} />

            <CustomButton
                text="Don't have an account? Create one"
                onPress={onSignUpPressed}
                type="TERTIARY"
            />
        </View>
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
    input: {
        color: 'white'
    }

});

export default SignInScreen;