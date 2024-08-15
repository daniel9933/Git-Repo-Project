import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

const SignUpScreen = () => {
    const [Username, setUsername] = useState(''); // initial state of username,password,email
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [passwordRepeat , setPasswordRepeat ] = useState('');


    const onRegisterPressed = () => { // function that sends a warning when sign in is pressed
        console.warn("Sign in");
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
                    <Text style = {styles.title}> Create an account</Text>

                    <CustomInput
                        placeholder='Username'
                        value={Username}
                        setValue={setUsername}
                        secureTextEntry={false}
                    />

                    <CustomInput
                        placeholder='nigger@gmail.com'
                        value={email}
                        setValue={setEmail}
                        secureTextEntry={false}
                    />

                    <CustomInput
                        placeholder='Password'
                        value={password}
                        setValue={setPassword}
                        secureTextEntry={true}
                    />

                    <CustomInput
                        placeholder='Repeat Password'
                        value={passwordRepeat}
                        setValue={setPasswordRepeat}
                        secureTextEntry={false}
                    />

                    <CustomButton
                        text="Register"
                        onPress={onRegisterPressed}
                        type="PRIMARY"
                    />

                    <Text style = {styles.text}>
                        By registering , you confirm that you
                        accept our <Text style = {styles.link}>Terms of Use </Text> 
                        and <Text style = {styles.link}>Privacy Policy</Text>
                    </Text>

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
    separatorLine: {
        height: 1, // Thickness of the line
        width: '95%', 
        backgroundColor: '#CCC', // Color of the line
        marginVertical: 5, // Vertical spacing around the line
        alignSelf: 'center'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color : '#051C60',
        margin : 10,
    },
    text : {
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075'
    }

});

export default SignUpScreen;