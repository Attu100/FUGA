import { 
  Image, 
  SafeAreaView, 
  StatusBar, 
  StyleSheet, 
  Text, 
  TextInput,
  TouchableOpacity, 
  View,
  Dimensions, 
  Alert,
  BackHandler,
  ToastAndroid
} from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import { collection, doc,getDocs, query, where } from 'firebase/firestore';
import { db } from './SETTINGS/FirebaseSettings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useFetchProfileImage from './FUNCTIONS/useFetchProfileImage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useFocusEffect } from '@react-navigation/native';
import { AppContext } from './COMPONENT/globalVariable';

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("window").height;

export function LOGINSCREEN ({navigation}){
  const [showPassword,setShowPassword] = useState(true)
  const {profileImage,getProfileImage} = useFetchProfileImage();
  const {setPreLoader} = useContext(AppContext);
  useEffect(()=>{
    getProfileImage()
  },[])

useFocusEffect(
  React.useCallback(() => {
    let backPressCount = 0;

    const onBackPress = () => {
      if (backPressCount === 0) {
        backPressCount += 1;
        ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);

        setTimeout(() => {
          backPressCount = 0; // reset after 2 seconds
        }, 2000);
        return true; // prevent immediate exit
      } else {
        BackHandler.exitApp(); // exit the app on 2nd press
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => backHandler.remove();
  }, [])
);

   
  const ShowPassword = ()=>{
    if (showPassword){
      setShowPassword(false)
    }else setShowPassword(true)
  }
  const HandleLogin = async ()=>{
    if (!matric || !password){
    Alert.alert("                     " +"Empty", "please fill the empty space",[{text:"ok", style:"default"}],)
    return;
  }
  try {
    setPreLoader(true)
        const UsersRef = collection(db,"Users");
        const  result = query(UsersRef, 
          where("profile.school.matricNumber", "==",matric.trim()),
          where("profile.authentication.password", "==",password.trim())
        );
        const resultValue = await getDocs(result);
        if (resultValue.empty){
          setPreLoader(false)
          Alert.alert("Not Registered", "Registration detail not found");
          return;
        } else{
          resultValue.forEach(element => {
            const current = async ()=> {await AsyncStorage.setItem("currentUser", matric.trim())}
            current();
            
            const detail = element.data();
            setPreLoader(false)
            navigation.navigate("HOMESCREEN");
          });
          setMatric("");
          setPassword("")
        }
      } catch (error) {
        console.log(error)
      }
    
  }
  const statusBarHeight = StatusBar.currentHeight;
  const [matric, setMatric] = useState("")
  const [password, setPassword] = useState("")
  return (
    <SafeAreaView style={styles.LoginBackground}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="blue" 
      />
      <View style={{height:screenHeight*0.27, justifyContent:"center", alignItems:"center"}}>
        <View style={styles.fuga}>
          <Text style={styles.fugaText}>FUGA</Text>
        </View>
        <View style={styles.profileImageView}>
          <View style={styles.profileImage2}>
            <Image source={{uri:profileImage}} style={styles.Image}/>
          </View>
        </View>
      </View>
      <Text style={styles.welcomeText}>WELCOME TO FUGA YOUR HOME OF COMMUNICATION</Text>
      <View style={styles.LoginField}>
        <Text style={styles.placeholder}>Matric number</Text>
        <TextInput value={matric} onChangeText={(value)=>{setMatric(value)}} style={styles.input}/> 
        <Text style={styles.placeholder}>Password</Text>
        <View style={{flexDirection:"row",alignItems:"center",marginBottom:20}}>
          <TextInput value={password} onChangeText={(value)=>{setPassword(value)}} secureTextEntry={showPassword}style={[styles.input, {marginBottom:0,marginRight:4}]}/>
          <TouchableOpacity onPress={()=>ShowPassword()}>
            <FontAwesomeIcon icon={faEye} color='blue' size={20}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={()=>HandleLogin()} style={styles.Login}><Text style={{color:"white"}}>LOGIN</Text></TouchableOpacity>
        <View style={{flexDirection:"row",alignItems:"center"}}>
        <Text style={{fontSize:15}}> Don't have account </Text>  
          <TouchableOpacity onPress={()=>{navigation.navigate("SIGNUP")}} style={{backgroundColor:"blue",padding:5,borderRadius:10}}>
            <Text style={{color:"white", fontSize:13}}> 
               SIGN UP 
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    LoginBackground:{
        backgroundColor:"white",
        height:"100%",
        width: "99%",
        borderRadius:20,
        marginBottom:3,
        borderTopRightRadius:0,
        borderTopLeftRadius:0,

    },
     input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        width:"90%"
    },
    fuga:{
      justifyContent:"center",
      padding:10,
      height:"50%"
    },
    fugaText:{
      color:"green",
      fontSize:20

    },
    profileImageView:{
      borderRadius:40,
      width:"25%",
      height:"40%",
      margin:2
    },
    profileImage2:{
      borderWidth:2,
      borderRadius:"50%", 
      flex:1,
      borderColor:"green"
    },
    Image:{
        flex:1, 
        width:"100%", 
        height:"100%",
        borderRadius:50, 
        backgroundColor:"white"
    },
    welcomeText:{
      marginTop:40,
      marginBottom:5,
      color:"blue",
      alignSelf:"center"
    },
    LoginField:{
      width:"95%",
      paddingLeft:30,
      borderRadius:10,
      backgroundColor:"#f5f1f1",
      // margin:0,
      alignSelf:"center",
      padding:5,
    },
    placeholder:{
      color:"blue"
    },
    Login:{
    borderRadius:10,
    padding:10,
    alignSelf:'center',
    width:"30%",
    height:40, 
    alignItems:"center",
    justifyContent:"center",
    marginBottom:10,
    backgroundColor:"#1f1ff8"}

})