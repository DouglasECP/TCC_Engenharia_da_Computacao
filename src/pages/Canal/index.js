import React, {useState, useEffect, useContext} from "react";
import { View,
    StyleSheet, 
    KeyboardAvoidingView,
    Text,
    StatusBar,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Modal
} from "react-native";
import database from '@react-native-firebase/database';
import MapView, {Marker} from "react-native-maps";

import { AuthContext } from "../../component/contexts/auth";
import HeaderCanal from "../../component/HeaderCanal";
import FlatlistLocalizacao from "../../component/FlatlistLocalizacao";

export default function Canal({route}){

    const {modalVisible,setModalVisible} = useContext(AuthContext);

    const [leitura, setLeitura] = useState([{}]);
    const [ultimaAtt, setUltimaAtt] = useState([{}]);
    const [region, setRegion] = useState(null);
    const [loading,setLoadin] = useState(true);
    //const [modalVisible,setModalVisible] = useState(false);

    const dadoscanal = "/"+route.params.canal;

    useEffect(() => {
        function getLocalizacao() {
          database()
            .ref(dadoscanal)
            .on('value', snapshot => {
              const dados = snapshot.val();
      
              const novasCoordenadas = Object.entries(dados)
                .map(([dataHora, item]) => {
                  // Extrair informações de data, hora, id, latitude e longitude
                  const data = dataHora.slice(0, -8);
                  const hora = dataHora.slice(-8);
                  const id = Object.keys(item)[0];
                  const { Lat, Long } = item[id];
      
                  // Verificar se Lat e Long são diferentes de 0 antes de incluir no resultado
                  if (parseFloat(Lat) !== 0 && parseFloat(Long) !== 0) {
                    return {
                      Data: data,
                      Hora: hora,
                      Id: id,
                      Lat: parseFloat(Lat),
                      Long: parseFloat(Long),
                    };
                  }
      
                  return null; // Não incluir no resultado se Lat ou Long forem 0
                })
                .filter(Boolean) // Filtrar para remover elementos nulos
                .sort((a, b) => {
                  // Ordenar por data e hora, das mais recentes para as mais antigas
                  const dataHoraA = new Date(`${a.Data} ${a.Hora}`);
                  const dataHoraB = new Date(`${b.Data} ${b.Hora}`);
                  return dataHoraB - dataHoraA;
                });
                //console.log(novasCoordenadas);
                setLeitura(novasCoordenadas);
                setLoadin(false);
            });
        }
      
        getLocalizacao();
      }, []);
            
      useEffect(()=>{

        if (leitura.length > 0) {
            const ultimaLeitura = leitura[0]; // Pega a última leitura (a mais recente)
    
            setRegion({
                latitude: ultimaLeitura.Lat,
                longitude: ultimaLeitura.Long,
                latitudeDelta: 0.0122,
                longitudeDelta: 0.0091,
            });

            setUltimaAtt(ultimaLeitura);
            
        }    

      },[leitura])
    

    return(
        
        <KeyboardAvoidingView behavior="position" style={styles.container}>

            <StatusBar backgroundColor={'#44C3EB'}/>

            <HeaderCanal hardware={'GPS01'}/>

            <Modal 
            visible={modalVisible} 
            animationType="slide"
            transparent={true}
            >

                <View style={styles.containerModal}>

                    <TouchableOpacity 
                    style={styles.btnFecharModal}
                    onPress={()=>setModalVisible(!modalVisible)}>
                        <Text style={styles.textBtnFecharModal}>Voltar</Text>
                    </TouchableOpacity>

                    <View style={styles.containerList}>
                        <FlatList
                            data={leitura}
                            renderItem={({ item }) => <FlatlistLocalizacao data={item}/>}
                           // keyExtractor={(item) => item.id}
                        />
                    </View> 

                </View>

            </Modal>

            <TouchableOpacity
                style={styles.btnHistorico}
                onPress={()=>setModalVisible(true)}
            >
                <Text style={styles.textHistorico}>Histórico de Localização</Text>
            </TouchableOpacity>

            <View style={styles.containerMapa}>

                <Text style={styles.textHistorico}>MAPA</Text>

                <View style={styles.Mapa}>

                    {loading ? <ActivityIndicator size={45} color="#008577" /> :
                        <MapView
                            style={{width:"100%", height: "100%", borderRadius:17}}
                            initialRegion={region}
                            showsUserLocation={true}
                            zoomEnabled={true}
                            loadingEnabled={true}
                        >
                            <Marker
                                coordinate={{ latitude: region?.latitude, longitude: region?.longitude }}
                                title={"GPS01"}
                                description={"Localização do dispositivo"}
                            />
                        </MapView>                    
                    }



                </View>

                <View>
                {loading ? <Text></Text> :
                    <Text style={styles.textAtualizacao}>Ultima atualização: Hora: {ultimaAtt?.Hora} Data: {ultimaAtt?.Data}</Text>}
                </View>   

            </View>


        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#CDEDEF',
        alignItems:'center',
    },
    containerTitle:{
        alignItems:'center',
        marginBottom:220
    },
    containerList:{
        flex:1,
        paddingBottom:10
    },
    btnHistorico:{
        backgroundColor:'#C1CBCD',
        height:30,
        width:380,
        marginLeft:20,
        marginBottom:20,
        borderRadius:7,
        alignItems:'center',
        justifyContent:'center'
    },
    textHistorico:{
        color:'#F1F7ED',
        fontWeight:'bold',
        fontSize:18
    },
    containerMapa:{
        backgroundColor:'#C1CBCD',
        height:'58%',
        alignItems:'center',
        marginHorizontal:'5%',
        borderRadius:17,
        marginBottom:"5%"
    },
    Mapa:{
        backgroundColor:'#fff',
        height:'89%',
        width:'95%',
        borderRadius:17,
        overflow:'hidden',
        marginTop:2,
        justifyContent:'center'
    },
    textAtualizacao:{
        color:'#F1F7ED',
        fontSize:12,
        fontWeight:'bold',
        marginLeft:64,
    },
    containerModal:{
        height:'80%',
        width:'70%',
        margin:"15%",
        backgroundColor:'#CDEDEF',
        alignItems:"center",
        borderRadius:6,
        borderWidth:1,
        borderColor:'#287897'
    },
    btnFecharModal:{
        backgroundColor:'#44C3EB',
        marginTop:10,
        marginBottom:10,
        width:'73%',
        alignItems:'center',
        borderRadius:3
    },
    textBtnFecharModal:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:20
    }
})