import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LOGINSCREEN } from '../LOGINSCREEN';
import { HOMESCREEN } from '../HOMESCREEN';
import { SIGNUP } from '../SIGNUPSCREEN';
import  MESSAGESCREEN from '../MESSAGESCREEN';
import { CHARTSCREEN } from '../CHARTSCREEN';
import { PERSONALCHAT } from "../PERSONALCHAT";
import { FRIENDS } from '../FRIENDS';
import { AppContext } from '../COMPONENT/globalVariable';
import { useContext } from 'react';
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import SPLASHSCREEN from '../SPLASHSCREEN';
// import { FRIENDS } from '../FRIENDS';

const Stack = createNativeStackNavigator();
export function STACKNAVIGATION() {
  const {profile}=useContext(AppContext)
  return (
    <Stack.Navigator initialRouteName='SPLASHSCREEN'>
        <Stack.Screen name='SPLASHSCREEN' component={SPLASHSCREEN} options={{headerShown:false,gestureEnabled:false}}/>
        <Stack.Screen name='LOGINSCREEN' component={LOGINSCREEN} 
          options={{
            headerTitle:"",
            headerShown:true,
            headerTintColor:"green",
            headerTitleAlign:"center",
            gestureEnabled:false
          }}/>
        <Stack.Screen name='SIGNUP' component={SIGNUP} options={{headerTitle:"FUGA",headerShown:true, headerTintColor:"green", headerTitleAlign:"center",gestureEnabled:false}}/>
        <Stack.Screen name='HOMESCREEN' component={HOMESCREEN} options={{headerTitle:"FUGA",headerShown:true, headerTintColor:"green",headerTitleAlign:"center",headerBackVisible:false}}/>
        <Stack.Screen name='MESSAGESCREEN' component={MESSAGESCREEN} options={{headerTitleAlign:"center",headerTitle:"Charts",headerShown:true,headerTintColor:"green"}}/>
        <Stack.Screen name='PERSONALCHAT' component={PERSONALCHAT} options={{headerTitleAlign:"center",headerTintColor:"green"}}/>
        <Stack.Screen name = "FRIENDS" component={FRIENDS} options={{headerTitleAlign:"center",headerTintColor:"green"}}/>
        <Stack.Screen name='CHARTSCREEN' component={CHARTSCREEN} options={{headerShown:true, headerTintColor:"green"}}/>
    </Stack.Navigator>
  )
}