import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../src/components/CustomButton';
import {router, Stack} from "expo-router"
import { View, StyleSheet } from 'react-native';

//todo: implement loading login.

const LogOutPressed = async() =>{
  try{
    await AsyncStorage.removeItem('token');
    console.log("success")
    router.replace("/sign-in")
  }
  catch (error){
    console.log("error: ", error)
  }
}

const tempPressed = async() =>{
  try {
    const jwtToken = await AsyncStorage.getItem('token');
    if (jwtToken){
    const response = await fetch("http://192.168.1.221:3000/api/home", {
        method: "GET",
        headers: {
        'content-type' : 'application-json',
        'authorization' : `Bearer ${jwtToken}`,
          },
        })
      
      if (response.status === 200){
        console.log('Success: token valid.')
      }
      else if (response.status === 401){
        console.log("Request Failed. token invalid or expired."),
        router.push("/sign-in")
      }
      else {
        console.log("Request Failed.", response.status);
      };
    }

    else{
      console.log("no token found.");
      router.push("/sign-in")
    }}
    catch (error) {
      alert("error")
    }
};

const HomeScreen = () =>{
  return(
    <>
    <Stack.Screen
    options={{
        headerShown: false,
    }}
    />

      <View style={styles.container}>
        <Button
          text="Press here"
          onPress={tempPressed}
          type="PRIMARY"
        />
        <Button
          text = "Log Out"
          onPress={LogOutPressed}
          type = "TERTIARY"
        />
      </View>
    </>
  );
};

    const styles = StyleSheet.create({
      container: {
        flex: 1, // Takes full height
        justifyContent: 'center', // Centers vertically
        alignItems: 'center', // Centers horizontally
        padding : 40,
      },
    });
export default HomeScreen;