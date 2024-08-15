import React from 'react';
import {Text, View } from 'react-native';
import SignInScreen from '../screens/SignInScreen/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen/ForgotPasswordScreen';
import EmailConfirmScreen from '../screens/EmailConfirmScreen/EmailConfirmScreen';
import PasswordResetScreen from '../screens/PasswordResetScreen/PasswordResetScreen';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const CustomTheme = {
  ...DarkTheme, // Properly extend the DarkTheme
  colors: {
    ...DarkTheme.colors, // Spread the existing dark theme colors
    background: '#0c0f14', // Customize the background color
  },
};


const Navigation = () => {
  return (
    <NavigationContainer theme = {CustomTheme}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name = "SignIn" component={SignInScreen}/>
        <Stack.Screen name = "SignUp" component={SignUpScreen}/>
        <Stack.Screen name = "ConfirmEmail" component={EmailConfirmScreen}/>
        <Stack.Screen name = "ForgotPassword" component={ForgotPasswordScreen}/>
        <Stack.Screen name = "ResetPassword" component={PasswordResetScreen}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

