import React,{useState, useEffect, useContext} from "react";
import auth from '@react-native-firebase/auth'

import AuthRoute from "./AuthRoute";
import AppRoutes from "./AppRoutes";

import { AuthContext } from "../component/contexts/auth";
import { ActivityIndicator, View } from "react-native";

export default function Routes(){

    const {signed, loadingInit} = useContext(AuthContext);

    if(loadingInit){
        return(
            <View 
            style={{
                flex:1,
                justifyContent:'center',
                alignItems:'center',
                backgroundColor:'#CDEDEF'
            }}>
                <ActivityIndicator size={50} color='#44C3EB'/>
            </View>
        )
    }

    return(
        signed ? <AppRoutes/> : <AuthRoute/>
    );

}