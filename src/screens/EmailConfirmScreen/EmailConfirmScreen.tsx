import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation} from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/routeParameterList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';




const EmailConfirmScreen = () => {
    const [code, setCode] = useState(''); // initial state of code 

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const onConfirmPressed = () => { 
        console.warn("Confirm");
        //redirect to home page
    };

    const onSignUpPressed = () => { 
        navigation.navigate('SignUp');
    };

    const onResendPressed = () => { 
        console.warn("Resend");
        //resend the code through email
    };


    return (
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
                        onPress={onConfirmPressed}
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

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color : 'white',
        margin : 10,
    },

});

export default EmailConfirmScreen;