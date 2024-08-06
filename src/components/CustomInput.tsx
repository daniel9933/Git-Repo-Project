import React from "react";
import { View, Text , TextInput , StyleSheet} from 'react-native'

interface CustomInputProps { 
    value:string;
    setValue: (value: string) => void;
    placeholder : string;
    secureTextEntry: boolean
}

const CustomInput: React.FC<CustomInputProps> = ({ value, setValue, placeholder, secureTextEntry }) => { //need to understand what that does
    return (
        <View style = {styles.container}>
            <TextInput
                value = {value}
                onChangeText = {setValue}
                placeholder = {placeholder}
                secureTextEntry = {secureTextEntry}
                style = {styles.input} 
            />
        </View>
    )
}

const styles = StyleSheet.create({    
    container:{
        backgroundColor: 'white',
        width: '100%',
        padding:5,
        
        borderColor:'#e8e8e8',
        borderWidth: 1,
        borderRadius: 5, // makes the corners round

        paddingHorizontal: 10, 
        marginVertical: 5, //prevents two custom inputs being on top of each other
    },
    input:{

    },
});

export default CustomInput