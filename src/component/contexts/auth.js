import React,{useState, createContext, useEffect} from "react";
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from "@react-native-firebase/firestore";

export const AuthContext = createContext({});

export default function AuthProvider({children}){

    const navigation = useNavigation();
    const [loadingAuth, setLoadinAuth] = useState(false);
    const [loadingInit, setLoadingInit] = useState(true); //Loading ao abrir o App p/ AsyncStorage
    const [user,setUser] = useState(null); //Dados do user logado
    const [canal,setCanal] = useState({}); //Recebe os canais cadastrados no User
    const [modalVisible,setModalVisible] = useState(false); //Controla o modal do Historico

    useEffect(()=>{
        async function loadingStoarge(){
            const storageUser = await AsyncStorage.getItem('@User');

            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoadingInit(false);
                //console.log(user);
            }
            setLoadingInit(false);
        }

        loadingStoarge();
    },[])

    async function CadastrarCanal(nome, token) {
        try {
          const consultaExistencia = await firestore()
            .collection('PermisaoUser')
            .where('Hardware', '==', nome)
            .where('Uid', '==', user.uid)
            .get();
      
          if (!consultaExistencia.empty) {
            alert('Usuário já tem acesso a esse hardware.');
            return;
          }
      
          const consulta = await firestore()
            .collection('Hardware')
            .where('Hardware', '==', nome)
            .where('Token', '==', token)
            .get();
      
          if (!consulta.empty) {
            console.log('Está cadastrado.');
      
            // Use doc().set para criar um documento com uma chave gerada automaticamente
            await firestore().collection('PermisaoUser').doc().set({
              Hardware: nome,
              Uid: user.uid,
              nome: user.nome,
            });
      
            console.log('Uid adicionado à coleção PermisaoUser.');
          } else {
            alert('Nome ou token incorretos.');
          }
        } catch (error) {
          console.error('Erro ao cadastrar canal:', error);
        }
        getCanal();
      }
      
      


      async function getCanal() {
        try {
          const userUid = user.uid; // Substitua pelo método correto de obter o Uid do usuário logado
          const consulta = await firestore()
            .collection('PermisaoUser')
            .where('Uid', '==', userUid)
            .get();
      
          const canaisPermitidos = consulta.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              Uid: data.Uid,
              Nome: data.nome,
              Hardware: data.Hardware,
            };
          });
          setCanal(canaisPermitidos)
          //console.log('Canais permitidos:', canal);
          return canaisPermitidos;
        } catch (error) {
          //console.error('Erro ao obter os canais:', error);
          return [];
        }
      }
      
      

    async function signUp(email,senha,nome){
        setLoadinAuth(true);
        await auth().createUserWithEmailAndPassword(email,senha)
        .then(async(user)=>{
            user.user.updateProfile({
                displayName: nome
            }).then(()=>{
                setLoadinAuth(false);
                navigation.navigate('Login');
            })
        })
        .catch((error)=>{
            setLoadinAuth(false);
            if (error.code === 'auth/email-already-in-use') {
                alert('Esse endereço de email já esta em uso!');
              }
          
              if (error.code === 'auth/invalid-email') {
                alert('Esse endereço de e-mail é inválido!');
              }
        })
    }

    async function signIn(email,senha){
        setLoadinAuth(true);
        await auth().signInWithEmailAndPassword(email,senha)
        .then(async(value)=>{
            const data = {
                email: email,
                nome: value.user.displayName,
                uid: value.user.uid
            }
            setUser(data);
            storageUser(data);
        })
        .then(()=>{
            setLoadinAuth(false);
            navigation.navigate('CanaisCadastrados');
        })
        .catch((error)=>{
            alert('Não foi possivel localizar sua conta as credenciais fornecidas');
            setLoadinAuth(false);
        })
    }

    async function signOut(){
        setUser(null);
        auth().signOut()
        .then(()=>{
            navigation.navigate("Login");
        })
        .catch((e)=>{
            console.log(e);
            alert("Algo de errado aconteceu, feche e abre o App!!");
        })
    }

    async function storageUser(data){
        await AsyncStorage.setItem('@User',JSON.stringify(data))
    }

    return(
        <AuthContext.Provider value={{signed:!!user,signUp,signIn,signOut,loadingAuth,loadingInit,getCanal,CadastrarCanal,canal,modalVisible, setModalVisible}}>
            {children}
        </AuthContext.Provider>
    )
}