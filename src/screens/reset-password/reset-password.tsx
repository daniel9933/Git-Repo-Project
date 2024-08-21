import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {router} from "expo-router";

const PasswordResetScreen = () => {
    const [code, setCode] = useState(''); // initial state of the code 
    const [newPassword, setNewPassword] = useState('');


    const onSubmitPressed = () => { 
        console.warn("Submit");
    };


    return (
        <View style={styles.root}>
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={styles.scrollViewContent}
            >
                <View style={styles.mainContent}>
                    <Text style = {styles.title}>Reset your password</Text>

                    <CustomInput
                        placeholder='Code'
                        value={code}
                        setValue={setCode}
                        secureTextEntry={false}
                    />

                    <CustomInput
                        placeholder='Enter your new password'
                        value={newPassword}
                        setValue={setNewPassword}
                        secureTextEntry={false}
                    />

                    <CustomButton
                        text="Submit"
                        onPress={onSubmitPressed}
                        type="PRIMARY"
                    />

                </View>
            </ScrollView>


            <CustomButton
                text="Back to Sign In"
                onPress= {() => router.push("/sign-in")}
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

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color : 'white',
        margin : 10,
    },

});

export default PasswordResetScreen;