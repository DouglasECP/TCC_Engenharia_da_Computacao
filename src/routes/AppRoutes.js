import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CanaisCadastrados from "../pages/CanaisCadastrados";
import Canal from "../pages/Canal";
import ViewMapHistorico from "../pages/ViewMapHistorico";

const AuthStack = createNativeStackNavigator();

export default function AppRoutes(){
    return(
        <AuthStack.Navigator initialRouteName="CanaisCadastrados">

            <AuthStack.Screen
                name="CanaisCadastrados"
                component={CanaisCadastrados}
                options={{headerShown:false}}
            />
            
            <AuthStack.Screen
                name="Canal"
                component={Canal}
                options={{headerShown:false}}
            />

            <AuthStack.Screen
                name="ViewMapHistorico"
                component={ViewMapHistorico}
                options={{headerShown:false}}
            />

        </AuthStack.Navigator>
    )
    
}