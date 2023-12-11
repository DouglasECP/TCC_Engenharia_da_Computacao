import React, {useState, useEffect} from "react";
import { View,Text, StyleSheet } from "react-native";
import MapView, {Marker} from "react-native-maps";

export default function ViewMapHistorico({route}){

    const {dados} = route.params;
    

    const [region,setRegion] = useState(null);

    useEffect(()=>{
        setRegion({
            latitude: dados.Lat,
            longitude: dados.Long,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0091,
        });
        console.log(region);
    },[]);

    return(

        <View style={styles.container}>
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
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})