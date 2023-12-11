//Rotas liberados para usuários não logogados/autenticados

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../pages/Login";
import CadastroUser from "../pages/CadastroUser/CadastroUser";
import CanaisCadastrados from "../pages/CanaisCadastrados";
import Canal from "../pages/Canal";


const AuthStack = createNativeStackNavigator();

export default function AuthRoute(){
    return(
        <AuthStack.Navigator>

            <AuthStack.Screen
                name="Login"
                component={Login}
                options={{headerShown:false}}
            />

            <AuthStack.Screen
                name="CadastroUser"
                component={CadastroUser}
                options={{headerShown:false}}
            />


        </AuthStack.Navigator>
    )
    
}