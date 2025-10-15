import { Alert, FlatList, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react';
import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './SETTINGS/FirebaseSettings';
import { AppContext } from './COMPONENT/globalVariable';
import { useContext } from 'react';
import { PERSONALCHAT } from './PERSONALCHAT';
// const friendList = [
//   {
//     name:"Attu Raphael",
//     matricNumber:"U2O/CPS/1003",
//     image:require("../assets/fugaLogo.jpg")
//   },
//   {
//     name:"Attu Raphael",
//     matricNumber:"U2O/CPS/1003",
//     image:require("../assets/myPicture.jpg")
//   },
//   {
//     name:"Attu Raphael",
//     matricNumber:"U2O/CPS/1003",
//     image:require("../assets/fugaLogo.jpg")
//   },
//   {
//     name:"Attu Raphael",
//     matricNumber:"U2O/CPS/1003",
//     image:require("../assets/myPicture.jpg")
//   },
//   {
//     name:"Attu Raphael",
//     matricNumber:"U2O/CPS/1003",
//     image:require("../assets/fugaLogo.jpg")
//   },
//   {
//     name:"Attu Raphael",
//     matricNumber:"U2O/CPS/1003",
//     image:require("../assets/myPicture.jpg")
//   },
// ]


export function FRIENDS({navigation,route}) {
const {senderId}=route.params;
const [user, setUser] = useState ([])
const {setPreLoader} = useContext(AppContext)
useEffect(() => {
  const fetchUsers = async () => {
    try {
      setPreLoader(true)
      const snapshot = await getDocs(collection(db, "Users"));
      const mappedUsers = snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data()
      }));

      const filteredUsers = mappedUsers.filter(user =>{
        const matric = user.profile?.school?.matricNumber?.trim();
        setPreLoader(false)
          return matric && matric !== senderId?.trim()
        }
      );

      setUser(filteredUsers);
    } catch (err) {
      console.log("Error fetching users:", err);
    }
  };

  fetchUsers();
}, [senderId]);



  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.searchView}>
        <TextInput placeholder='Search' placeholderTextColor={"blue"} s style={styles.searrchBox}/>
        <TouchableOpacity style={styles.searchBotton}><Text style={styles.searchBottonText}>search</Text></TouchableOpacity>
      </View>
        <View style={styles.headerView}>
            <View style={styles.allFriendView}>
              <TouchableOpacity><Text style={styles.allFriendBottonText}>ALL</Text></TouchableOpacity>
            </View>
            <View style={styles.myFriendView}>
                <TouchableOpacity><Text style={styles.allFriendBottonText}>FRIENDS</Text></TouchableOpacity>
            </View>
          </View>
            <FlatList
            style={{marginBottom:10}}
            showsVerticalScrollIndicator={false}
            data={user}
            renderItem={({item})=>{
              return(
                <View style={styles.friendsBodyView}>
                  <View style={styles.imagestyle}>
                    <View style={styles.imageView}>
                      <Pressable onPress={()=>{navigation.navigate("")}}>
                        <Image source={require("../assets/myPicture.jpg")} style={styles.image}/>
                      </Pressable>
                    </View>
                    <Pressable  onPress={()=> {
                      navigation.navigate("PERSONALCHAT",
                      {
                        senderId,
                        recieverId:item.profile?.school?.matricNumber,
                        receivers:item
                      })}}>
                      <View style={styles.friendDetailView}>
                        <Text style={styles.friendName}>{item.profile?.name?.firstName}</Text>
                        <Text style={styles.friendMatricNumber}>{item.profile?.school?.matricNumber}</Text>
                      </View>
                    </Pressable>

                  </View>
                  <View style={styles.addRemoveBotton}>
                    <TouchableOpacity style={styles.addFriendBotton}><Text style={styles.addFriendBottonText}>Add Friend</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.removeFriendBotton}><Text style={styles.removeFriendBottonText}>Remove Friend</Text></TouchableOpacity>
                  </View>
                </View>
              )
            }}
            />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

    body:{
    backgroundColor:"white",
      marginHorizontal:2,
      flex:1,
    },
    searchView:{
      flexDirection:"row",
      margin:3
    },
    searrchBox:{
      width:"80%",
      backgroundColor:"#f0eeee",
      borderRadius:10,
      fontWeight:"bold",
      color:"blue",
      height:50,
      padding:5,
      marginRight:3
    },
    searchBotton:{
      backgroundColor:"blue",
      borderRadius:25,
      width:60,
      justifyContent:"center",
      alignItems:"center"
    },
    searchBottonText:{
      color:"white",
      fontSize:15
    },
    headerView:{
      flexDirection:"row",
      width:"50%",
      height:30,
      height:40,
      marginTop:3,
      alignItems:"center",
      marginBottom:5,
      justifyContent:"space-around"
    },
    allFriendView:{
      backgroundColor:"#f0eeee",
      width:40,
      height:30,
      padding:2,
      justifyContent:"center",
      alignItems:"center",
      borderRadius:11,
      borderColor:"blue",
      borderBottomWidth:2,
      borderColor:"blue"
    },
    allFriendBottonText:{
      color:"blue"
    },
    myFriendView:{
      backgroundColor:"#f0eeee",
      width:70,
      height:30,
      padding:2,
      justifyContent:"center",
      alignItems:"center",
      borderRadius:11,
      borderColor:"blue",
      borderBottomWidth:2,
      borderColor:"blue"
    },
    friendsBodyView:{
      backgroundColor:"#f0eeee",
      width:"98%",
      // borderWidth:2,
      margin:3,
      borderRadius:10
    },
    imageView:{
      borderWidth:2,
      width:74,
      height:74,
      margin:5,
      borderRadius:40,
      justifyContent:"center",
      alignItems:"center"
    },
    image:{
      width:70,
      height:70,
      borderRadius:40
    },
    imagestyle:{
      // borderColor:"red",
      // borderWidth:2,
      flexDirection:"row",
      height:85
    },
    friendDetailView:{
      // backgroundColor:"#f1eeeeec",
      flex:1,
      padding:5
    },
    friendName:{
      marginVertical:3,
      padding:3,
      fontSize:15,
      fontWeight:"bold"
    },
    friendMatricNumber:{
      marginVertical:3,
      padding:3,
      fontSize:15,
      fontWeight:"bold"
    },

    addRemoveBotton:{
      flexDirection:"row",
      padding:5,
      height:40
    },
    addFriendBotton:{
      backgroundColor:"blue",
      padding:3,
      marginRight:10,
      borderRadius:10
    },
    removeFriendBotton:{
      backgroundColor:"blue",
      padding:3,
      borderRadius:10
    },
    addFriendBottonText:{
      color:"white"
    },
    removeFriendBottonText:{
      color:"white"
    }
})