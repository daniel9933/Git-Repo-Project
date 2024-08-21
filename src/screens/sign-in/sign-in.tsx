import React, { useState } from 'react';
import { View, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import Logo from '../../../assets/images/Logo_1.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {router, Stack} from "expo-router"


const SignInScreen = () => {
    <>
        <Stack.Screen
        options={{
            title: 'sign in',
            headerShown: false,
        }}
        />
    </>
    const [Username, setUsername] = useState(''); // initial state of username and password
    const [password, setPassword] = useState('');

    const { height } = useWindowDimensions(); // gets the window dimensions of the device

   // const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();//ensure type safety


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
                        onPress= {() => router.push("/home")}
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