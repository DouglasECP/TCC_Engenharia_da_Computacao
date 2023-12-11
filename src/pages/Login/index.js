import React, {useState, useContext} from "react";
import { View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    TextInput, 
    KeyboardAvoidingView,
    StatusBar,
    ActivityIndicator
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";

import Header from "../../component/Header";
import { AuthContext } from "../../component/contexts/auth";

export default function Login(){

    const navigation = useNavigation();

    const {signIn, loadingAuth} = useContext(AuthContext);

    const [inputEmail,setInputEmail] = useState("");
    const [inputSenha,setInputSenha] = useState("");


    function handleLogin(){
        if(inputEmail ==='' && inputEmail ==='') return;

        signIn(inputEmail,inputSenha);
    }

    return(

        <KeyboardAvoidingView behavior="position" style={styles.container}>
            
            <StatusBar backgroundColor={'#44C3EB'}/>
            
            <View style={styles.containerTitle}>

                <Header name="Monitoramento de Pessoas Vulneráveis"/>

            </View>

            <View style={styles.containerInput}>

                <Text style={styles.text}>E-mail</Text>
                <TouchableOpacity style={styles.btnInput}>
                    <TextInput
                        value={inputEmail}
                        onChangeText={(text)=>setInputEmail(text)}
                        style={styles.textInput}
                        autoCapitalize={'none'}
                    />
                </TouchableOpacity>

                <Text style={styles.text}>Senha</Text>
                <TouchableOpacity style={styles.btnInput}>
                    <TextInput
                        value={inputSenha}
                        onChangeText={(text)=>setInputSenha(text)}
                        style={styles.textInput}
                        autoCapitalize={'none'}
                        secureTextEntry={true}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>navigation.navigate('CadastroUser')}>
                    <View style={styles.btnCriarConta}>
                        <Text style={styles.textCriarAcc}>Criar conta</Text>
                    </View>       
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnEntrar} onPress={handleLogin}>
                    <View style={styles.btnEntrarView}>
                        {loadingAuth ? (<ActivityIndicator size={20} color='#fff'/>):
                        <Text style={[styles.textEntrar]}>Entrar</Text>
                    }
                        
                    </View>                    
                </TouchableOpacity>



            </View>
            

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#CDEDEF',
        alignItems:'center'
    },
    containerTitle:{
        alignItems:'center',
        marginBottom:220
    },
    containerInput:{
        marginTop:'13%',
        alignItems:'center'
    },
    text:{
        color:"#000",
        fontSize:17,
        fontWeight:"bold",
        marginTop:15,
        textAlign:'center',
    },
    btnInput:{
        backgroundColor: '#C1CBCD',
        width:350,
        height:40,
        borderRadius:8,
        paddingLeft:6,
        marginTop:2,
    },
    textInput:{
        color:"#F1F7ED",
        fontSize:15,
    },
    btnEntrarView:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#44C3EB',
        width:150,
        height:40,
        borderRadius:8,
        marginTop:20
    },
    textEntrar:{
        color: "#F1F7ED",
        fontSize:20,
        fontWeight:'bold'
    },
    btnCriarConta:{
        marginTop:7,
        paddingStart:'67%'
    },
    textCriarAcc:{
        color:"#000", 
        fontSize:17, 
        fontWeight:'bold'
    }
})