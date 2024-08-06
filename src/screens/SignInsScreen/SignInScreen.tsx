import React, {useState} from 'react';
import { View , Text , Image , StyleSheet, useWindowDimensions} from 'react-native';
import Logo from '../../../assets/images/Logo_1.png';
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'

const SignInScreen = () => {

    const [Username,setUsername] = useState('');//initial state of username and password
    const [password,setPassword] = useState('');

    const {height} = useWindowDimensions();//gets the window dimensions of the device

    const onSignInPressed = () =>{ //function that sends a warning when sign in is pressed
        console.warn("Sign in");
    }

    const OnForgotPasswordPressed = () =>{//funcction that sends a warning when forgot password is pressed
        console.warn("OnForgotPasswordPressed");
    }



    return (
        <View style = {styles.root}>

            <Image source = {Logo}
             style={[styles.logo, {height: height * 0.3}]} 
             resizeMode="contain"/>

            <CustomInput 
            placeholder ='Username' 
            value = {Username} 
            setValue = {setUsername}
            secureTextEntry = {false}
            />
            <CustomInput
             placeholder ='Password' 
             value = {password} 
             setValue = {setPassword}
             secureTextEntry = {true}
            />

            <CustomButton text = 'Sign In' onPress = {onSignInPressed} type = "PRIMARY"/>

            <CustomButton text = 'Forgot password?' onPress = {OnForgotPasswordPressed} type = "TERTIARY"/>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,

    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 100,
        marginVertical:15,
    },
});

export default SignInScreen;