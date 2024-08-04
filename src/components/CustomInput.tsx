import React from "react";
import { View, Text , TextInput , StyleSheet} from 'react-native'

const CustomInput = (value: string , setValue: string, placeholder: string) => {
    return (
        <View style = {styles.container}>
            <TextInput
                value = {value}
                onChangeText= {setValue}
                placeholder = {placeholder}
                style = {styles.input} 
            />
        </View>
    )
}

const styles = StyleSheet.create({    
    container:{
        backgroundColor: 'white',
        width: '100%',
        
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