import React from "react";
import {View, Text , StyleSheet, Pressable, ActivityIndicator} from 'react-native'


interface CustomButtonProps{
    text: string;
    onPress: () => void;
    type?: 'PRIMARY' | 'TERTIARY' | 'SECONDARY';// optional
    loading? : boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onPress, text, type, loading }) => {
    return (
        <Pressable onPress={onPress} style={[styles.container, type ? styles[`container_${type}`] : {}]} disabled = {loading}>
            {loading? 
            (<ActivityIndicator size = "small" color = "white"/> ) : 
            (<Text style={[styles.text, type ? styles[`text_${type}`] : {}]}>{text}</Text>)}
        </Pressable>
    );
};


const styles = StyleSheet.create({
    container:{
        width : '100%',
        
        padding: 15,
        marginVertical:5,

        alignItems: 'center',
        borderRadius: 5,
    },

    container_PRIMARY: {
        backgroundColor: '#3B71F3',
    },

    container_SECONDARY: {
        borderColor: '#3B71F3',
        borderWidth : 2,
    },

    container_TERTIARY: {
        backgroundColor: 'transparent',
    },

    
    text_PRIMARY: {
        color: 'white'
    },

    text_SECONDARY: {
        color: '#3B71F3'
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