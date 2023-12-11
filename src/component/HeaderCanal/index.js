import React from "react";

import { View, Image, StyleSheet, Text } from "react-native";

export default function HeaderCanal({hardware}){
    return(
        <View style={styles.container}>

            <Image
                source={require('../../Image/Header/Header_Fundo.png')}
                style={styles.imgHeaderFundo}
            />

            <View style={styles.containerMaterial}>

                <View style={styles.containerLogo}>
                    <Image
                        source={require('../../Image/Header/logo.png')}
                        style={styles.imgLogo}
                    />

                    <Text style={styles.textTitle}>
                        CANAL
                    </Text>
                </View>

                <View style={styles.textConteudoCanal}>
                    <Text style={styles.textNameCanal}>{hardware}</Text>
                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginBottom:100
    },
    containerMaterial:{
        flexDirection:'row',
        bottom:'3%'
    },
    containerLogo:{
        alignItems:'center',
        justifyContent:'center',
        bottom:76,
        left:19
    },
    imgLogo:{
        width:120,
        height:120,
        position:'absolute',
        bottom:'40%',
    },
    imgHeaderFundo:{
        width:420,
        height:180
    },
    textTitle:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:23,
    },
    textConteudoCanal:{
        alignItems:"center",
        bottom:'30%',
        left:70
    },
    textNameCanal:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:23,
        right:-70,
        bottom:-20
    }
})