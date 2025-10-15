import { StyleSheet, Text, View,SafeAreaView, FlatList, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DATA } from './MESSAGESCREEN'
import { faLocationArrow, faPaperPlane, faSeedling } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { collection,query,orderBy, onSnapshot,addDoc} from 'firebase/firestore';
import { db } from './SETTINGS/FirebaseSettings';
import useFETCHMESSAGES from './FUNCTIONS/useFETCHMESSAGES';
// import { SafeAreaView } from 'react-native-safe-area-context'


export function PERSONALCHAT({route,navigation}) {
  const[placeHolder, setPlaceHolder] =useState ("START CHAT");
  const [text, setText] = useState("");
  const {senderId, recieverId,receiver} = route.params;
  const chatId = [senderId,recieverId].sort().join("_");

  const {message} = useFETCHMESSAGES(chatId)
 const sendMessage = async () => {
    if (text.trim() === "") return;
    await addDoc(collection(db, "Charts", chatId.replaceAll("/","_"), "Messages"), {
      text: text,
      senderId: senderId,
      receiverId: recieverId,
      createdAt: new Date(),
    });
    setText("");
  };

  useEffect(()=>{
    if (receiver?.profile?.name?.firstName){
      navigation.setOptions({
        title:receiver.profile.name.firstName || "charts",
      });
    };
  },[senderId,receiver])

  return (
    <SafeAreaView style={styles.personalChatBody}>
      <FlatList
      showsVerticalScrollIndicator={false}
      data={message}
      renderItem={({item})=>{
        return(
          <View style={[styles.messageBody,
            item.senderId ===senderId? styles.me : styles.messageBody
          ]}>
            <View style={[styles.profileImageView]}>
              <Image source={require("../assets/myPicture.jpg")} style={styles.profileImage}/>
            </View>
            <View style={[styles.messageView, 
              item.senderId ===senderId? styles.mymessageView : null
            ]}>
              <Text style={[styles.message, 
                item.senderId ===senderId? styles.mymessageView : null
              ]} >{item.text}</Text>
              <Text style={item.senderId == senderId ? {alignSelf:"flex-end",color:"white", paddingRight:2} : {alignSelf:"flex-start",paddingLeft:2}}>{item.createdAt.toDate().toLocaleTimeString([], {hour:"2-digit", minute:"2-digit", hour12:true})}</Text>
            </View>
          </View>
        )
      }}
      />
      <View style={styles.messageTextView}>
        <TextInput value={text} placeholder={placeHolder} placeholderTextColor={"blue"} style={styles.messageText} onChangeText={(value)=>{setText(value)}} onFocus={()=>setPlaceHolder("")} onBlur={()=>{ if (text===""){setPlaceHolder("START CHAT")}}}/>
        <TouchableOpacity onPress={()=>sendMessage()} style={styles.sendButton}>
          <FontAwesomeIcon icon={faLocationArrow} color='blue'  size={40} 
            style={styles.sendIcon}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    personalChatBody:{
      backgroundColor:"white",
      height:"100%",
      width:"100%",
      // borderWidth:2,
      // borderColor:"red",
      paddingHorizontal:2
    },
    messageBody:{
      // backgroundColor:"white",
      height:"100%",
      width:"85%",
      // borderColor:"green",
      // borderWidth:2,
      margin:4,
      flex:1,
      flexDirection:"row",
      alignItems:"center",
      borderRadius:15,
    },
    messageTextView:{
      height:"13%",
      marginLeft:3,
      justifyContent:"space-between",
      alignItems:"center",
      flexDirection:"row",
    },
    messageText:{
      backgroundColor:"#e7e6e6",
      marginLeft:0,
      padding:10,
      height:"80%",
      width:"85%",
      borderRadius:20,
      fontWeight:"400",
      fontSize:20,
    },
      sendButton:{
        backgroundColor:"white",
        padding:5,
        borderRadius:"50%",
        width:"14%"
      },
      sendIcon:{
        borderRadius:"50%",
        transform:[{rotate:"45deg"}]
      },
      profileImageView:{
        width:30,
        height:30,
        borderRadius:20,
        // borderWidth:2,
        justifyContent:"center",
        alignItems:"center",
        margin:2,
      },
      profileImage:{
        borderRadius:50,
        height:"100%",
        width:"100%"
      },
      messageView:{
        // borderWidth:2,
        // borderColor:"green",
        borderRadius:20,
        height:"100%",
        justifyContent:"center",
        alignItems:"center",
        padding:5,
        backgroundColor:"#e4dfdf",
        width:"85%"
      },
      message:{
        borderRadius:10,
        padding:5
      },
      me:{
        alignSelf:"flex-end",
        flexDirection:"row-reverse",
      },
      mymessageView:{
        backgroundColor:"blue",
        color:"white",
      },
})