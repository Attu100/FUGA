import { Dimensions, Image, KeyboardAvoidingView, Modal, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { AppContext} from './COMPONENT/globalVariable';
import { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { faBell, faComment, faHome } from '@fortawesome/free-regular-svg-icons';
import { faBell, faComment, faHome,faCog, faUserFriends, faEllipsisV, faEllipsisH, faPlane, faThumbsUp, faLocationArrow, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faFonticonsFi } from '@fortawesome/free-brands-svg-icons/faFonticonsFi';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './SETTINGS/FirebaseSettings';
import { number } from 'yup';
import useFetchProfileImage from './FUNCTIONS/useFetchProfileImage';


export function HOMESCREEN({navigation}) {
    const width = Dimensions.get("window").width
    const [placeHolder,setPlaceHolder] = useState("what's on your mind");
    const {profile} = useContext(AppContext);
    const [senderId, setSenderId] = useState(null);
    const [like, setLike] = useState(0);
    const [comment, setComment] = useState(0)
    const [text,setText] = useState("")
    const {profileImage,getProfileImage} = useFetchProfileImage()
    const [modalVisible,setModalVisible] = useState(false)


    const notificationModal = ()=>{
        return (
            <Modal 
            visible={modalVisible}
            animationType='none'
            >
                <View  style={{backgroundColor:"white",height:"100%"}}>
                    <View style={{backgroundColor:"green",height:30,alignItems:"center",padding:5,flexDirection:"row",position:"relative"}}>
                       <TouchableOpacity onPress={()=>{setModalVisible(false)}} >
                            <FontAwesomeIcon icon={faArrowLeft} color='white' size={20}/>
                       </TouchableOpacity>
                        <Text style={{position:"absolute",right:"30%",fontSize:20,color:"white"}}>NOTIFICATION</Text>
                    </View>
                </View>
            </Modal>
    )}
    


    useEffect(()=>{
        getProfileImage()
        const loadCurrentUser = async ()=>{
            const currentUser = await AsyncStorage.getItem("currentUser");
            if ( currentUser){
                setSenderId(currentUser)
            }
        }
        loadCurrentUser()
    },[]);


    const IncreaseComment = ()=>{
        setComment(comment+1)
    };
    const IncreaseLike = ()=>{
       setLike(like+1)
    }
  return (
    <SafeAreaView style={styles.background}>
        <KeyboardAvoidingView
            style={{flex:1}}
            behavior={Platform.OS == "ios"? "padding" : "height"}
        >
        <View style={styles.HeaderView}>
            <View style={styles.logo}>
                <View style={styles.logoImageView}>
                    <Image source={{uri:profileImage}} style={styles.logoImage}/>
                </View>
                <View style={styles.post}>
                     <TextInput value={text} onChangeText={(value)=>setText(value)} onFocus={()=>setPlaceHolder("")} onBlur={()=>setPlaceHolder("what's on your mind")} placeholder={placeHolder} placeholderTextColor={"blue"} style={{fontWeight:"bold",backgroundColor:"white",height:"100%",width:"70%",borderRadius:10}}/>
                     <TouchableOpacity onPress={()=>{setText("")}} style={{backgroundColor:"blue",width:50,borderRadius:10, justifyContent:"center", alignItems:"center"}}><Text style={{color:"white"}}>post</Text></TouchableOpacity>
                </View>
            </View>
            <View style={styles.menus}>
                <View style={styles.homeButton}>
                    <TouchableOpacity onPress={()=>{
                        if (navigation.isFocused()){

                        }else{
                            navigation.navigate("HOMESCREEN")
                        }
                        }}>
                        <FontAwesomeIcon icon={faHome} color='blue' size={30}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.chart}>
                    <TouchableOpacity 
                    disabled={!senderId}
                    onPress={()=>{navigation.navigate("MESSAGESCREEN", {senderId})}}>
                    <FontAwesomeIcon icon={faComment} color='blue' size={30}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.friends}>
                    <TouchableOpacity 
                    onPress={()=>{navigation.navigate("FRIENDS", {senderId})}}>
                        <FontAwesomeIcon icon={faUserFriends} color='blue' size={30}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.notification}>
                    <TouchableOpacity onPress={()=>{setModalVisible(true)}}>
                    <FontAwesomeIcon icon={faBell} color='blue' size={30}/>
                    <Text numberOfLines={1} style={{position:"absolute",textAlign:"center", backgroundColor:"red",width:20,height:20,borderRadius:20,top:-5,right:-2}}>{like}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.setting}>
                    <TouchableOpacity>
                    <FontAwesomeIcon icon={faCog} color='blue' size={30}/>
                    </TouchableOpacity>
                        
                </View>


            </View>
        </View>
        <View style={styles.bodyView}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{marginBottom:3,padding:2,borderBottomWidth:2,borderBottomColor:"green",}}>
                    <View style={{flexDirection:"row",alignItems:"center",position:"relative"}}>
                        <View style={{width:40,height:40,margin:4,borderRadius:25}}>
                            <Image source={{uri:profileImage}} style={{width:35,height:35,borderRadius:25}}/>
                        </View>

                        <View style={{ padding:2,width:"60%"}}>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={{width:"100%",paddingLeft:2,height:30,marginVertical:2}}>Attu Raphael</Text>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={{width:"100%", paddingLeft:2,height:25,textAlign:"justify"}}>1m</Text>
                        </View>

                        <View style={{width:100,height:30,alignItems:"center",flexDirection:"row",justifyContent:"space-around", position:"absolute",right:0,top:0}}>
                            <FontAwesomeIcon icon={faEllipsisH} style={{}}/>
                            <TouchableOpacity style={{backgroundColor:"#e0e0e0",width:30,height:"90%",justifyContent:"center",alignItems:"center",borderRadius:30}}><Text style={{fontSize:20,fontWeight:"bold"}}>X</Text></TouchableOpacity>
                        </View>


                    </View>
                    <Text numberOfLines={3} ellipsizeMode='tail'>{text}</Text>
                    <View style={{width:width-15,height:width,alignSelf:"center",margin:4}}>
                        <Image source={require("../assets/myPicture.jpg")} style={{width:"100%",height:"100%"}}/>
                    </View>

                    <View style={{backgroundColor:"white", borderRadius:10}}>
                        <View style={{backgroundColor:"#e7e3e3",borderRadius:10,height:40,margin:2,flexDirection:"row",alignItems:"center",justifyContent:"center",justifyContent:"space-around"}}>
                            <View style={{flexDirection:"row",height:"90%",width:"30%",alignItems:"center",justifyContent:"space-evenly",backgroundColor:"white",borderRadius:10}}>
                               <TouchableOpacity onPress={()=>{IncreaseLike()}}>
                                    <FontAwesomeIcon icon={faThumbsUp} color='blue' size={20}/>
                               </TouchableOpacity>
                                <Text>{like}</Text>
                            </View>
                            <View style={{flexDirection:"row",height:"90%",width:"30%",alignItems:"center",justifyContent:"space-evenly",backgroundColor:"white",borderRadius:10}}>
                                <Text>{comment}</Text>
                                <TouchableOpacity onPress={()=>{IncreaseComment()}}>
                                    <FontAwesomeIcon icon={faComment} color='blue' size={20}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{backgroundColor:"#e7e3e3",borderRadius:10,margin:2, flexDirection:"row",padding:5,alignItems:"center",justifyContent:"center"}}>
                            <TextInput placeholder='comment' placeholderTextColor={"blue"} style={{backgroundColor:"white",width:"50%", borderRadius:20,marginRight:20,padding:3}}/>
                            <TouchableOpacity style={{backgroundColor:"white",alignItems:"center",justifyContent:"center",borderRadius:"100%",width:40,height:40}}>
                                <FontAwesomeIcon icon={faLocationArrow} color='blue' size={35} style={{transform:[{rotate:"45deg"}]}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{marginBottom:3,padding:2,borderBottomWidth:2,borderBottomColor:"green",}}>
                    <View style={{flexDirection:"row",alignItems:"center",position:"relative"}}>
                        <View style={{width:40,height:40,margin:4,borderRadius:25}}>
                            <Image source={require("../assets/myPicture.jpg")} style={{width:35,height:35,borderRadius:25}}/>
                        </View>

                        <View style={{ padding:2,width:"60%"}}>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={{width:"100%",paddingLeft:2,height:30,marginVertical:2}}>Attu Raphael</Text>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={{width:"100%", paddingLeft:2,height:25,textAlign:"justify"}}>1m</Text>
                        </View>

                        <View style={{width:100,height:30,alignItems:"center",flexDirection:"row",justifyContent:"space-around", position:"absolute",right:0,top:0}}>
                            <FontAwesomeIcon icon={faEllipsisH} style={{}}/>
                            <TouchableOpacity style={{backgroundColor:"#e0e0e0",width:30,height:"90%",justifyContent:"center",alignItems:"center",borderRadius:30}}><Text style={{fontSize:20,fontWeight:"bold"}}>X</Text></TouchableOpacity>
                        </View>


                    </View>
                    <Text numberOfLines={3} ellipsizeMode='tail'>{text}</Text>
                    <View style={{width:width-15,height:width,alignSelf:"center",margin:4}}>
                        <Image source={{uri:profileImage}} style={{width:"100%",height:"100%"}}/>
                    </View>

                    <View style={{backgroundColor:"white", borderRadius:10}}>
                        <View style={{backgroundColor:"#e7e3e3",borderRadius:10,height:40,margin:2,flexDirection:"row",alignItems:"center",justifyContent:"center",justifyContent:"space-around"}}>
                            <View style={{flexDirection:"row",height:"90%",width:"30%",alignItems:"center",justifyContent:"space-evenly",backgroundColor:"white",borderRadius:10}}>
                                <TouchableOpacity onPress={()=>{IncreaseLike()}}>
                                    <FontAwesomeIcon icon={faThumbsUp} color='blue' size={20}/>
                                </TouchableOpacity>
                                <Text>{like}</Text>
                            </View>
                            <View style={{flexDirection:"row",height:"90%",width:"30%",alignItems:"center",justifyContent:"space-evenly",backgroundColor:"white",borderRadius:10}}>
                                <Text>{comment}</Text>
                                <TouchableOpacity onPress={()=>{IncreaseComment()}}>
                                <FontAwesomeIcon icon={faComment} color='blue' size={20}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{backgroundColor:"#e7e3e3",borderRadius:10,margin:2, flexDirection:"row",padding:5,alignItems:"center",justifyContent:"center"}}>
                            <TextInput placeholder='comment' placeholderTextColor={"blue"} style={{padding:3,backgroundColor:"white",width:"50%", borderRadius:20,marginRight:20}}/>
                            <TouchableOpacity style={{backgroundColor:"white",alignItems:"center",justifyContent:"center",borderRadius:"100%",width:40,height:40}}>
                                <FontAwesomeIcon icon={faLocationArrow} color='blue' size={35} style={{transform:[{rotate:"45deg"}]}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
        {notificationModal()}
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    background:{
        marginTop:StatusBar.currentHeight,
        marginBottom:5,
        marginHorizontal:5,
        width:"99%",
        borderRadius:10, 
        backgroundColor:"white",
        position:"relative",
        flex:1
    },
    HeaderView:{
        position:"static",
        top:0,
        backgroundColor:"white",
        width:"100%",
        height:"20%",
        
    },
    bodyView:{
        height:"80%",
        backgroundColor:"#f3f2f2ce",
        marginBottom:0,
        marginTop:5,borderRadius:10,
        marginHorizontal:2
    },
    logo:{
        backgroundColor:"#f5f1f1",
        height:"48%",
        margin:1,
        borderRadius:10,
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center"
    },
    post:{
        width:"70%",
        height:"70%",
        flexDirection:"row",
        alignSelf:"center",
        justifyContent:"space-around"
    },
    menus:{
        backgroundColor:"#f5f1f1",
        height:"48%",
        margin:1,
        borderRadius:10,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    logoImageView:{
        height:55,
        width:55,
        borderWidth:2,
        borderRadius:50,
        borderColor:"green",
        position:"static"
    },
    logoImage:{
        borderRadius:50,
        width:50,
        height:50
    },
    homeButton:{
        width:"15%",
        height:40,
        backgroundColor:"white",
        margin:2,
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center",
        color:"blue"
    },
    chart:{
       backgroundColor:"white",
        width:"15%",
        height:40,
        margin:2,
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center",

    },
    notification:{
        width:"15%",
        height:40,
        backgroundColor:"white",
        margin:2,
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center",
    },
    setting:{
        backgroundColor:"white",
         width:"15%",
         height:40,
        margin:2,
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center",
    },
    friends:{
        width:"15%",
        height:40,
        backgroundColor:"white",
        margin:2,
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center",
    }

})