import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { router ,Stack } from "expo-router";

const ForgotPasswordScreen = () => {
    const [Username, setUserName] = useState(''); // initial state of the code 

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
                contentContainerStyle={styles.scrollViewContent}
            >
                <View style={styles.mainContent}>
                    <Text style = {styles.title}>Reset your password</Text>

                    <CustomInput
                        placeholder='Enter your username'
                        value={Username}
                        setValue={setUserName}
                        secureTextEntry={false}
                    />

                    <CustomButton
                        text="Send"
                        onPress= {() => router.push("/reset-password/Reset")}
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

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color : 'white',
        margin : 10,
    },

});

export default ForgotPasswordScreen;