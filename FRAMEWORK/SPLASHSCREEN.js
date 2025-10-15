import { Animated, StyleSheet, Text, View, Image, StatusBar } from 'react-native'
import React, { useEffect, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGINSCREEN } from './LOGINSCREEN';
import { HOMESCREEN } from './HOMESCREEN';

export default function SPLASHSCREEN({navigation}) {
    const fadeAnimate = useRef(new Animated.Value(0)).current
    useEffect(()=>{
        Animated.timing(fadeAnimate,{
            useNativeDriver:true,
            toValue:1,
            duration:1000
        }).start();
        const timer = setTimeout(async()=>{
            const currentUser = await AsyncStorage.getItem("currentUser").then(
                ()=>{
                    if(currentUser){
                        navigation.replace("HOMESCREEN")
                    }else {
                        navigation.replace("LOGINSCREEN")
                    }
                }
            )
        },4000)
        return()=>clearTimeout(timer)
    },[])
    return(
 <View style={styles.container}>
    <StatusBar backgroundColor={"blue"}/>
      <Animated.View style={[styles.content, { opacity: fadeAnimate }]}>
        <Image
          source={require("../assets/fugaLogo.jpg")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>FUGA</Text>
        <Text style={styles.subtitle}>Communication App</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#004d00", // university green tone
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    padding:5
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
    borderRadius:100
  },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    color: "white",
    fontSize: 16,
    marginTop: 5,
  },
});