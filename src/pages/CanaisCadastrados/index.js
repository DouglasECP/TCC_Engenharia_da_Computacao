import React, {useState, useEffect, useContext} from "react";
import { View,
    StyleSheet, 
    KeyboardAvoidingView,
    TouchableOpacity,
    Text,
    FlatList,
    StatusBar,
    Image,
    Modal,
    TextInput
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import Header from "../../component/Header";
import { AuthContext } from "../../component/contexts/auth";

export default function CanaisCadastrados(){

    const {signOut, getCanal, CadastrarCanal, canal} = useContext(AuthContext);
    const [visibleModal,setVisibleModal] = useState(false);
    const [inputNameCanal,setInputNameCanal] = useState("");
    const [inputTokenCanal,setInputTokenCanal] = useState("");
    const [newCanal,setNewCanal] = useState(false);

    const isFocused = useIsFocused(); //fica true quando esta no foco na tela ou false quando ñ


    useEffect(()=>{ //Busca as salas cadastradas assim que carregar a tela
        getCanal();
    },[isFocused,newCanal]);

    function handleSingOut(){
        signOut();
    }

    function AddCanal(){
        if(inputNameCanal === '' && inputTokenCanal === '') return;
        CadastrarCanal(inputNameCanal,inputTokenCanal);
        setNewCanal(!newCanal);
        setVisibleModal(false);
    }

    return(

        <View style={styles.container}>

            <StatusBar backgroundColor={'#44C3EB'}/>

            <View style={styles.containerTitle}>
                <Header name="Canais Cadastrados"/>

                <TouchableOpacity style={styles.btnSair} onPress={handleSingOut}>
                    <Image
                        source={require('../../Image/Header/SairApp.png')}
                        style={styles.imgSair}
                    />
                </TouchableOpacity>

            </View>

            <Modal
            visible={visibleModal}
            animationType="slide"
            transparent={true}
            >
                <View style={styles.viewModal}>

                    <View style={{marginTop:10, alignItems:'center'}}>
                        <Text style={styles.textCadastroCanal}>Nome do canal</Text>
                        <TouchableOpacity style={styles.btnInput}>
                            <TextInput
                                value={inputNameCanal}
                                onChangeText={(text)=>setInputNameCanal(text)}
                                style={styles.textInput}
                                autoCapitalize={'none'}
                            />
                        </TouchableOpacity>
                    </View>


                    <View style={{marginTop:10, alignItems:'center'}}>
                        <Text style={styles.textCadastroCanal}>Token do canal</Text>
                        <TouchableOpacity style={styles.btnInput}>
                            <TextInput
                                value={inputTokenCanal}
                                onChangeText={(text)=>setInputTokenCanal(text)}
                                style={styles.textInput}
                                autoCapitalize={'none'}
                                secureTextEntry={true}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.areabtn}>
                        <TouchableOpacity onPress={()=>setVisibleModal(!visibleModal)} style={styles.btnModal2}>
                            <Text style={styles.textBtnModal}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>AddCanal()} style={styles.btnModal}>
                            <Text style={[styles.textBtnModal]}>Continuar</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </Modal>

            {visibleModal ? '' : 
                <View style={styles.containerBtn} zIndex={1}>
                    <TouchableOpacity style={styles.Btn} onPress={()=>setVisibleModal(!visibleModal)}>
                        <Text style={styles.textBtn}>+</Text>
                    </TouchableOpacity>
                </View>
            }

            <FlatList
                data={canal}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <TelaHardware data={item}/>}
            />

        </View>
    )
}

function TelaHardware(props){
    const navigation = useNavigation();
    return(
        <TouchableOpacity onPress={()=>navigation.navigate('Canal',{canal:props.data.Hardware})} style={styles.viewCanal}>
            <Text style={styles.textCanal}>{props.data.Hardware}</Text>
        </TouchableOpacity>
    )
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
    containerBtn:{
        backgroundColor:'#44C3EB',
        position:'absolute',
        bottom:30,
        right:20,
        width:55,
        height:55,
        borderRadius:27
    },
    Btn:{
        justifyContent:'center',
        alignItems:'center',
        bottom:6
    },
    textBtn:{
        color:'#fff',
        fontWeight:"bold",
        fontSize:45
    },
    btnSair:{
        position:'absolute',
        right:'35%',
    },
    imgSair:{
        width:60,
        height:60
    },
    viewModal:{
        height:'100',
        width:'97%',
        marginTop:"30%",
        marginHorizontal:6,
        backgroundColor:'#CDEDEF',
        alignItems:"center",
        borderRadius:6,
        borderWidth:1,
        borderColor:'#287897',
        
    },
    textInput:{
        color:"#F1F7ED",
        fontSize:15
    },
    btnInput:{
        backgroundColor: '#C1CBCD',
        width:350,
        height:40,
        borderRadius:8,
        paddingLeft:6,
        marginTop:2
    },
    areabtn:{
        flexDirection:'row'
    },
    btnModal:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#44C3EB',
        width:150,
        height:40,
        borderRadius:8,
        margin:20,
    },
    textBtnModal:{
        color: "#F1F7ED",
        fontSize:20,
        fontWeight:'bold'
    },
    textCadastroCanal:{
        color:"#000",
        fontSize:17,
        fontWeight:"bold",
        textAlign:'center',
    },
    btnModal2:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#ff4500',
        width:150,
        height:40,
        borderRadius:8,
        margin:20,
    },
    viewCanal:{
        backgroundColor: '#C1CBCD',
        width:370,
        height:37,
        borderRadius:8,
        paddingLeft:6,
        marginBottom:9,
        justifyContent:'center'
    },
    textCanal:{
        color:'#fff',
        fontSize:16,
        fontWeight:'bold'
    }
})