import { 
    Dimensions,
    Image,
    SafeAreaView, 
    ScrollView, 
    StatusBar, 
    StyleSheet, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    View ,
} from 'react-native'
import { useContext, useRef } from 'react';
import { AppContext } from './COMPONENT/globalVariable';
import React from 'react'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from './SETTINGS/FirebaseSettings';
import { Formik } from 'formik';
import * as Yup from 'yup'
import FetchProfileImage from './FUNCTIONS/useFetchProfileImage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export function SIGNUP({navigation}) {

    const {profileImage,pickProfileImage,getProfileImage,}= FetchProfileImage()
    const ScreenSize = Dimensions.get("window").height 
    const {profile,setProfile} = useContext(AppContext);
    const formikRef = useRef(null)

    const handleSubmitData = async(values, {resetForm})=>{
        try {
            console.log("sbmited", values)
            setProfile(values.profile);
            await setDoc(doc(db, "Users", values.profile.school.matricNumber.trim().replaceAll("/","_")), {
 profile:values.profile,
});

            alert("registration was successful");
            resetForm();
            console.log("submited")
            navigation.navigate("LOGINSCREEN")
        } catch (error) {
            alert(error)
        }
    }



  return (
    <SafeAreaView style={styles.SignUpBackground}>
        <View style={{height:ScreenSize * 0.25,}}>

            <StatusBar barStyle={'light-content'} backgroundColor={"blue"}/>
            <View style={styles.fuga}>
                <Text style={styles.fugaText}>SIGN UP HERE</Text>
            </View>
            <View style={styles.imageView}>
                <Image source={ 
                    profileImage ?
                    {uri:profileImage }
                    :
                    require("../assets/UserIcon.jpg")
                    }
                     style={styles.image}/>
                <TouchableOpacity onPress={()=>{ 
                    pickProfileImage()
                }} style={{
                    width:20,
                    height:20,
                    alignItems:"center",
                    justifyContent:"center",
                    borderRadius:10,
                    position:"absolute",
                    bottom:-10,
                    right:-3,
                    backgroundColor:"blue"
                    }}>
                        <Text style={{fontSize:15, fontWeight:'200',textAlign:"center", color:"white"}}>+</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.inputView}>
             <Text style={{alignSelf:"center",color:"blue", marginVertical:5}}>please input your details</Text>
                <Formik 
                    innerRef={formikRef}
                    initialValues={{profile:{
                        name:{
                            surName:"",
                            middleName:"",
                            firstName:""
                        },
                        school:{
                            faculty:"",
                            depertment:"",
                            level:"",
                            matricNumber:"",
                            courseOfStudy:""
                        },
                        contact:{
                            email:"",
                            homeAddress:"",
                            phoneNumber:""
                        },
                        authentication:{
                            password:""
                        },
                        profileImage
                    }}}
                    validationSchema={Yup.object({
                        profile:Yup.object({
                            name:Yup.object({
                                surName:Yup.string().required("please enter your sur name"),
                                firstName:Yup.string().required("please enter your first name")
                            }),
                            school:Yup.object({
                                faculty:Yup.string().required("please enter your faculty"),
                                depertment:Yup.string().required("please enter your department"),
                                matricNumber:Yup.string().required("Please enter your matric number"),
                                courseOfStudy:Yup.string().required("Please enter your course of study"),
                                level:Yup.string().required("Please enter your level")
                            }),
                            authentication:Yup.object({
                                password:Yup.string()
                                .required("please enter your password ")
                                .min(4,"minimum of 4 letters")
                                .matches(/[A-Z]/, "your password must at least one upper case")
                                .matches(/[a-z]/, "your password must at least one lower case")
                                .matches(/[@$!%*?#&]/, "your password must at least one special character")
                                .max(10,"maximum of 10 letters")
                            }),
                            contact:Yup.object({
                                email:Yup.string().required("please provide your email").email("Enter a valid email"),
                                phoneNumber:Yup.string().required("please enter your phone number").length(11, "")                       })
                        })
                    })}
                    onSubmit={handleSubmitData}
                >
                    {({handleChange,handleBlur,handleSubmit,touched,errors,values})=>{
                        return(
            <ScrollView style={{width:"100%",}} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                    <View style={{alignItems:"center", justifyContent:"center",marginBottom:"15%",}}>
                        <TextInput placeholder='surname:' placeholderTextColor ={errors.profile?.name?.surName && touched.profile?.name?.surName? "red" :"blue"} style={styles.inputValue}
                            onChangeText={handleChange("profile.name.surName")}
                            onBlur={handleBlur("profile.name.surName")}
                            value={values.profile.name.surName}
                        />
                        {
                            touched.profile?.name?.surName && errors.profile?.name?.surName  && (
                                <Text style={styles.errorTextColor}>
                                {errors.profile.name.surName}
                                </Text> 
                        )}
                        <TextInput placeholder='middle name (Optional)' placeholderTextColor ="blue" style={styles.inputValue}
                            onChangeText={handleChange("profile.name.middleName")}
                            onBlur={handleBlur("profile.name.middleName")}
                            value={values.profile.name.middleName}
                        />
                        <TextInput placeholder={'first name:'} placeholderTextColor ={"blue"} style={styles.inputValue}
                           onChangeText={handleChange("profile.name.firstName")}
                           onBlur={handleBlur("profile.name.firstName")}
                           value={values.profile.name.firstName}
                        />
                        {
                        errors.profile?.name?.firstName && touched.profile?.name?.firstName && (
                            <Text style={styles.errorTextColor}>{errors.profile.name.firstName}
                            </Text>
                        )}
                        <TextInput placeholder={'Matric number:'} placeholderTextColor ={"blue"} style={styles.inputValue}
                            onChangeText={handleChange("profile.school.matricNumber")}
                            onBlur={handleBlur("profile.school.matricNumber")}
                            value={values.profile.school.matricNumber}
                        />
                        {
                            errors.profile?.school?.matricNumber && touched.profile?.school?.matricNumber && (
                            <Text style={styles.errorTextColor}>{errors.profile.school.matricNumber }</Text>
                            )
                        }
                        <TextInput placeholder={'faculty:'} placeholderTextColor ={"blue"} style={styles.inputValue}
                            onChangeText={handleChange("profile.school.faculty")}
                            onBlur={handleBlur("profile.school.faculty")}
                            value={values.profile.school.faculty}
                        />
                        {
                            errors.profile?.school?.faculty && touched.profile?.school?.faculty && (
                                <Text style={styles.errorTextColor}>{errors.profile.school.faculty}</Text>
                            )
                        }
                        <TextInput placeholder={'department:'} placeholderTextColor ={"blue"} style={styles.inputValue}
                            onChangeText={handleChange("profile.school.depertment")}
                            onBlur={handleBlur("profile.school.depertment")}
                            value={values.profile.school.depertment}
                        />
                        {
                            errors.profile?.school?.depertment && touched.profile?.school?.depertment && (
                                <Text style={styles.errorTextColor}>{errors.profile.school.depertment}</Text>
                            ) 
                        }
                        <TextInput placeholder={'Course of study:'} placeholderTextColor ={"blue"}
                         style={styles.inputValue}
                            onChangeText={handleChange("profile.school.courseOfStudy")}
                            onBlur={handleBlur("profile.school.courseOfStudy")}
                            value={values.profile.school.courseOfStudy}
                        />
                        {
                            errors.profile?.school?.courseOfStudy && touched.profile?.school?.courseOfStudy && (
                                <Text style={styles.errorTextColor}>{errors.profile.school.courseOfStudy}</Text>
                            )
                        }
                        <TextInput placeholder={'level:'} placeholderTextColor ={"blue"} style={styles.inputValue}
                           onChangeText={handleChange("profile.school.level")}
                            onBlur={handleBlur("profile.school.level")}
                            value={values.profile.school.level}
                        />
                        {
                            errors.profile?.school?.level && touched.profile?.school?.level && (
                                <Text style={styles.errorTextColor}>{errors.profile.school.level}</Text>
                            )
                        }
                        <TextInput placeholder={'phone number:'} 
                            placeholderTextColor ={"blue"} style={styles.inputValue}
                            onChangeText = {handleChange("profile.contact.phoneNumber")}
                            onBlur={handleBlur("profile.contact.phoneNumber")}
                            value={values.profile.contact.phoneNumber}
                        />
                        {
                            errors.profile?.contact?.phoneNumber && touched.profile?.contact?.phoneNumber && (
                                <Text style={styles.errorTextColor}>{errors.profile.contact.phoneNumber}</Text>
                            )
                        }
                        <TextInput placeholder={'email:'} placeholderTextColor ={"blue"}  style={styles.inputValue}
                            onChangeText={handleChange("profile.contact.email")}
                            onBlur={handleBlur("profile.contact.email")}
                            value={values.profile.contact.email}
                        />
                        {
                            errors.profile?.contact?.email && touched.profile?.contact?.email && (
                                <Text style={styles.errorTextColor}>{errors.profile.contact.email}</Text>
                            )
                        }
                        <TextInput placeholder={'home address (Optional)'} placeholderTextColor ={"blue"} style={styles.inputValue}
                            onChangeText={handleChange("profile.contact.homeAddress")}
                            onBlur={handleBlur("profile.contact.homeAddress")}
                            value={values.profile.contact.homeAddress}
                        />
                        {
                            errors.profile?.contact?.homeAddress && touched.profile?.contact?.homeAddress && (
                                <Text style={styles.errorTextColor}>{errors.profile.contact.homeAddress}</Text>
                            )
                        }
                        <TextInput placeholder={'Password:'} 
                            placeholderTextColor ={"blue" }
                            secureTextEntry={true} 
                            style={styles.inputValue}
                            onChangeText={handleChange("profile.authentication.password")}
                            onBlur={handleBlur("profile.authentication.password")}
                            value={values.profile.authentication.password}
                        />
                       {
                            errors.profile?.authentication?.password && touched.profile?.authentication?.password && (
                                <Text style={styles.errorTextColor}>{errors.profile.authentication.password}</Text>
                            )
                       }
                         <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}><Text style={styles.submitText}>Submit</Text></TouchableOpacity>
                    </View>
            </ScrollView>
                    )}}
                </Formik>
            <View style={{padding:5, alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
                <Text style={{ fontSize:17,height:30, padding:5,marginBottom:5}}> Already have an account</Text>
                    <TouchableOpacity onPress={()=>{navigation.navigate("LOGINSCREEN")}} style={{backgroundColor:"blue",borderRadius:10,padding:5,alignItems:"center",justifyContent:"center"}}>
                        <Text style={{color:"white", fontSize:15}}> SignIn</Text>
                    </TouchableOpacity>
            </View>
            </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    SignUpBackground:{
        backgroundColor:"white",
        borderRadius:10,
        marginHorizontal:5,
        width:"98%",
    },
    fuga:{
        width:"50%",
        height:100,
        alignSelf:"center",
        justifyContent:"center"
    },
    fugaText:{
        fontSize:30,
        alignSelf:"center",
        color:"green",
        // flex:1,
        height:50,
        width:300,
        marginTop:5,
        textAlign:"center",
        justifyContent:"center"
    },
    signUpText:{
        fontSize:20,
        margin:2,
        padding:4,
        alignSelf:"center",
        color:"green",
        flex:1
    },
    imageView:{
        width:"20%",
        height:"39%",
        borderWidth:2,
        borderRadius:40,
        borderColor:"green",
        alignSelf:"center",
        marginTop:1,
        position:"relative"
    },
    image:{
        borderRadius:50,
        width:"100%",
        height:"100%"

    },
    inputView:{
        borderRadius:10,
        backgroundColor:"#f5f1f1",
        height:"73%",
        

    },
    placeHolder:{
        color:"blue",
        fontSize:15,
    },
    inputValue:{
        width:"80%",
        backgroundColor:"white",
        marginTop:15,
        margin:5,
        marginBottom:0,
        padding:5,
        borderRadius:10,
        height:40,
    },
    submitText:{
        color:"white",
        fontSize:20
    },
    submitButton:{
    backgroundColor:"blue",
    padding:10,
    marginTop:10,
    borderRadius:10
    },
    signIn:{
        color:"blue",
        fontsize:15
    },
    errorTextColor :{
    color:"red"
    }
})