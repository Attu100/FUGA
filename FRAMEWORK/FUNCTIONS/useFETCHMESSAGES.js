import { StyleSheet, Text, View } from 'react-native';
import {collection,query,orderBy, onSnapshot} from 'firebase/firestore';
import React from 'react'
import { db } from '../SETTINGS/FirebaseSettings';
import { useEffect, useState } from 'react'

export default function useFETCHMESSAGES(chatId) {
    const [message,setMessage] =useState([]);
    const [lastMessage,setLastMessage] = useState()
    
      useEffect(()=>{
        if (!chatId) return;
        const q = query(collection(db,"Charts", chatId.replaceAll("/","_"), "Messages"),
        orderBy("createdAt","asc")
    )
    const onsnap = onSnapshot(q, (snapshot)=>{
      const msg = snapshot.docs.map(doc =>({
        id:doc.id,
        ...doc.data()
      }))
      setMessage(msg);
      const last = msg[msg.length-1]
      setLastMessage(last?.text)
    });
    return () => onsnap()
      
    },[chatId]);
  return {message, lastMessage }
}