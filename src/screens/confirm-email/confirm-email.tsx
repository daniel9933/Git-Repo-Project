import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { router, Stack } from "expo-router";


const EmailConfirmScreen = () => {
    const [code, setCode] = useState(''); // initial state of code 

const onResendPressed = () => {
    console.warn("resend");
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
                contentContainerStyle={styles.scrollViewContent}
            >
                <View style={styles.mainContent}>
                    <Text style = {styles.title}> Confirm Your Email</Text>

                    <CustomInput
                        placeholder='Code'
                        value={code}
                        setValue={setCode}
                        secureTextEntry={false}
                    />

                    <CustomButton
                        text="Confirm"
                        onPress= {() => router.push("/home")}
                        type="PRIMARY"
                    />

                    <CustomButton
                    text="Resend code"
                    onPress={onResendPressed}
                    type="SECONDARY"
                    />

                </View>
            </ScrollView>


            <CustomButton
                text="Back to Sign Up"
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

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color : 'white',
        margin : 10,
    },

});

export default EmailConfirmScreen;