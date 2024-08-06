import React from "react";
import {View, Text , StyleSheet, Pressable} from 'react-native'


interface CustomButtonProps{
    text: string;
    onPress: () => void;
    type?: 'PRIMARY' | 'TERTIARY';// optional
}

const CustomButton: React.FC<CustomButtonProps> = ({ onPress, text, type }) => {
    return (
        <Pressable onPress={onPress} style={[styles.container, type ? styles[`container_${type}`] : {}]}>
            <Text style={[styles.text, type ? styles[`text_${type}`] : {}]}>{text}</Text>
        </Pressable>
    );
};


const styles = StyleSheet.create({
    container:{
        width : '100%',

        padding: 15,
        marginVertical:2,

        alignItems: 'center',
        borderRadius: 5,
    },

    container_PRIMARY: {
        backgroundColor: '#3B71F3',
         
    },

    container_TERTIARY: {
        backgroundColor: 'transparent',
    },

    
    text_PRIMARY: {
        color: 'white'
    },

    text_TERTIARY: {
        color: 'gray',
    },
    
    text: {
        fontWeight: 'bold',
        color : 'white',
    },
});


export default CustomButton