import React from "react";

import { View, Image, StyleSheet, Text } from "react-native";

export default function Header({name}){
    return(
        <View style={styles.container}>

            <Image
                source={require('../../Image/Header/Header_Fundo.png')}
                style={styles.imgHeaderFundo}
            />

            <Image
                source={require('../../Image/Header/logo.png')}
                style={styles.imgLogo}
            />

            <Text style={styles.textTitle}>
                {name}
            </Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
    },
    imgLogo:{
        width:120,
        height:120,
        position:'absolute',
        bottom:'37%',
    },
    imgHeaderFundo:{
        width:420,
        height:180
    },
    textTitle:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:20,
        position:'absolute',
        bottom:'32%'
    }
})