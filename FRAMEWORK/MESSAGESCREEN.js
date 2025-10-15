import { FlatList, SafeAreaView,StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Pressable} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { collection, getDocs } from 'firebase/firestore'
import { db } from './SETTINGS/FirebaseSettings'
import { AppContext } from './COMPONENT/globalVariable'

export default function MESSAGESCREEN({navigation,route}) {
  const [placeHolder,setPlaceHolder] = useState("SEARCH FRIENDS")
  const [text, setText]=useState("");
  const [friends, setFriend] = useState([]);
  const {senderId} = route?.params
  const {setPreLoader} = useContext(AppContext)
  useEffect(()=>{
    const fetchUsers = async ()=>{
      try {
        setPreLoader(true)
        const snapshot = await getDocs(collection(db,"Users"));
        const mapUsers = snapshot.docs.map((doc)=>({
          id:doc.id,
          ...doc.data()
        }));
        const filteredUsers = mapUsers.filter(value=>{
          const matric = value.profile?.school?.matricNumber.trim();
          return matric && matric != senderId?.trim();
        });
        setPreLoader(false)
        setFriend(filteredUsers)
      } catch (error) {
        
      }
    };
    fetchUsers()
  },[senderId])
  return (
    <SafeAreaView style={styles.messageBody}>
      <View style={styles.messageHeader}>
        <View style={styles.searchView}>
        <TextInput value={text} onChangeText={(value)=>{setText(value)}} onFocus={()=>{setPlaceHolder("")}} onBlur={()=>{
          if(text===""){setPlaceHolder("SEARCH FRIENDS")}}} placeholder={placeHolder} placeholderTextColor={"blue"} style={[styles.search,] }/>
        <TouchableOpacity style={styles.searchButton}>
          <FontAwesomeIcon icon={faSearch} size={30} color='white'/>
          </TouchableOpacity>
        </View>
        <View style={styles.messageCategories}>
          <TouchableOpacity style={styles.categories}><Text style={styles.messageCategoryText}>ALL</Text></TouchableOpacity>
          <TouchableOpacity style={styles.categories}><Text style={styles.messageCategoryText}>Unread</Text></TouchableOpacity>
          <TouchableOpacity style={styles.categories}><Text style={styles.messageCategoryText}>group</Text></TouchableOpacity>
        </View>
      </View>
      <FlatList 
        style={{marginBottom:20}}
        showsVerticalScrollIndicator={false}
        data={friends}
        renderItem={({item})=>{
          return (
            <View style={styles.messageDisplay}>
              <Pressable style={styles.profileImageView} /*onPress={()=>{navigation.navigate("")}}*/ >
                  <Image source={require("../assets/myPicture.jpg")}  style={styles.profileImage}/>
              </Pressable>
              <TouchableOpacity 
                disabled={!senderId}
              style={[{width:"78%"},styles.messageDetail]} 
              onPress={()=>{navigation.navigate("PERSONALCHAT",
              {senderId,recieverId:item.profile?.school?.matricNumber,receiver:item})}}>
                <View style={[{width:"100%"},styles.messageDetail]}>
                  <View style={styles.messagerNameAndDateView}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.messagerName}>{`${item.profile?.name?.surName.trim()} ${item.profile?.name?.middleName.trim()} ${item.profile?.name?.firstName.trim()}`}</Text>
                    <View style={styles.level}>
                      <Text>level</Text>
                      <Text 
                        numberOfLines={1} 
                        ellipsizeMode='middle' 
                        style={styles.messageDate}
                      >
                        {item.profile?.school?.level}
                      </Text>
                    </View>
                  </View>
                  <Text numberOfLines={1} ellipsizeMode='tail' style={styles.message}>{item.profile?.school?.matricNumber}</Text>
                </View>
              </TouchableOpacity>
                  
            </View>
          )
        }} 
      />  
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    messageBody:{
        backgroundColor:"#e7e6e6",
        width:"98%",
        height:"100%",
        margin:5
    },
    messageHeader:{
      backgroundColor:"white"
    },
    searchView:{
      flexDirection:"row",
      justifyContent:"space-around",
      alignItems:"center",
      marginVertical:4
    },
    search:{
      backgroundColor:"white",
      borderRadius:10,
      width:"80%",
      borderWidth:2,
      borderColor:"blue",
      fontWeight:"bold"
    },
    messageCategories:{
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"center",
      justifyContent:"space-around",
      margin:7,
      height:50,
      borderRadius:10
    },
    searchButton:{
      backgroundColor:"blue",
      padding:7,
      borderRadius:10
    },
    categories:{
      backgroundColor:"blue",
      padding:5,
      height:30,
      borderRadius:10,
      justifyContent:"center",
      alignItems:"center"
    },
    messageCategoryText:{
      color:"white"
    },
    messageDisplay:{
      backgroundColor:"white",
      // borderWidth:2,
      margin:4,
      width:"99%",
      height:100,
      borderRadius:20,
      flexDirection:"row",
      alignItems:"center",
    },
    profileImageView:{
      height:70,
      width:"19%",
      borderRadius:40,
      margin:5
    },
    profileImage:{
      width:"100%",
      height:"100%",
      borderRadius:40
    },
    messageDetail:{
      // width:"78%",
      height:"90%",
      borderRadius:10,
      backgroundColor:"#f3f2f2",
      borderRadius:20
    },
    messagerNameAndDateView:{
      height:"50%",
      flexDirection:"row",
      justifyContent:"space-between",
      paddingHorizontal:3,
      marginHorizontal:4,
      // borderWidth:2
    },
    messagerName:{
      padding:4,
      width:"70%",
      height:"100%",
      textAlignVertical:"center",
      color:"blue",
      fontSize:20,
    },
    messageDate:{
      fontWeight:'bold',
      height:"50%", 
      fontSize:15,
    },
    level:{
      height:"100%",
    },
    message:{
      width:"100%",
      height:"50%",
      paddingHorizontal:3,
      textAlignVertical:"center",
      fontSize:18
    }
})