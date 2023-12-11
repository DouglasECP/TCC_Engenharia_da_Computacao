import React,{useContext} from "react"
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../../component/contexts/auth";

export default function FlatlistLocalizacao({data}){

    const {modalVisible,setModalVisible} = useContext(AuthContext);

    const navigation = useNavigation();

    return(
        <View style={styles.container}>

            <TouchableOpacity onPress={()=>{
                setModalVisible(false);
                navigation.navigate('ViewMapHistorico', {dados:data})}
            }>
                <Text style={styles.textDados}>Data: {data.Data}  Hora: {data.Hora}</Text>
            </TouchableOpacity>

            <View style={styles.separador}></View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center'
    },
    separador:{
        marginBottom:3,
        backgroundColor:'#000',
        width:'100%',
        height:2
    },
    textDados:{
        fontSize:16
    }
})