import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View,TouchableOpacity, TextInput,} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faComment, faHome,faCog, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import React from 'react'

export function CHARTSCREEN () {
    const array =[{name:"Attu",age:"20", level:"400"}] 
  return (
    <SafeAreaView style={styles.background}>
        <StatusBar backgroundColor={"blue"}/>
        <View style={styles.headerView}>
           <View style={styles.menus}>
        
                      <View style={styles.homeButton}>
                          <TouchableOpacity>
                              <FontAwesomeIcon icon={faHome} color='blue' size={30}/>
                          </TouchableOpacity>
                      </View>
      
                      <View style={styles.chart}>
                          <TouchableOpacity>
                          <FontAwesomeIcon icon={faComment} color='blue' size={30}/>
                          </TouchableOpacity>
                      </View>
                      <View style={styles.friends}>
                          <TouchableOpacity>
                              <FontAwesomeIcon icon={faUserFriends} color='blue' size={30}/>
                          </TouchableOpacity>
                      </View>
                      <View style={styles.notification}>
                          <TouchableOpacity>
                          <FontAwesomeIcon icon={faBell} color='blue' size={30}/>
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
        </View>

        <View style={styles.chartBus}>
            <TextInput style={styles.chartInput}></TextInput>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    background:{
        backgroundColor:"red",
        marginTop: StatusBar.currentHeight,
        height:"100%", 
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        position:"relative",
        flexDirection:"column"
    },
    menus:{
        backgroundColor:"white",
        height:"100%",
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
    },
    headerView:{
        height:"10%",
        width:"100%",
        // position:"absolute",
        top:0,
        borderBottomColor:"green",
        borderBottomWidth:3,
    },
    bodyView:{
        backgroundColor:"white",
        width:"100%",
        height:"70%",
        margin:5,
        marginTop:0,
    
    },
    chartBus:{
        backgroundColor:"#e6e3e3",
        width:"100%",
        height:"20%",
        alignItems:"center",
        justifyContent:"center"
    },
    chartInput:{
        backgroundColor:"white",
        width:"70%",
        height:"40%",
        borderRadius:20
    }
})