import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import { Alert } from "react-native";
import { storage, db } from '../SETTINGS/FirebaseSettings';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { AppContext, GlobalVariable } from '../COMPONENT/globalVariable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';

export default function useFetchProfileImage() {
  const [profileImage, setProfileImage] = useState(null);
  const {profile,setProfile} = useContext(AppContext)
  const pickProfileImage = async (userId) => {
    try {
      // Step 1: Request permission
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Permission Denied", "You need to allow access to the gallery.");
        return;
      }

      // Step 2: Open image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:"images",
        allowsEditing: true,
        quality: 1,
      });
      
      if (!result.canceled) {
        const profileImageUri = result.assets[0].uri;
        setProfileImage(profileImageUri)
        setProfile({...profile,profileImage:profileImageUri})
        await AsyncStorage.setItem("profileImage", profileImageUri);
        if (userId){
          const Users = doc(db,"Users",userId);
          await updateDoc(Users,{"profile.profileImage":profileImageUri})
        }
{/*
        // Step 3: Convert image to blob for upload
        const response = await fetch(profileImageUri);
        const blob = await response.blob();

        // Step 4: Upload to Firebase Storage
        const profileImageRef = ref(storage, `profileImages/${userId}.jpg`);
        await uploadBytes(profileImageRef, blob);

        // Step 5: Get public URL
        const downloadUri = await getDownloadURL(profileImageRef);

        // Step 6: Update Firestore
        const userRef = doc(db, "Users", userId);
        await updateDoc(userRef, {
          "profile.profileImage": downloadUri,
        });

        console.log("✅ Profile image uploaded:", downloadUri);
        */}
      };

    } catch (error) {
      Alert.alert("Error", "Something went wrong while uploading your image.");
    }
  };

const getProfileImage = async () =>{
  try {
     const profileImage = await AsyncStorage.getItem("profileImage",);
     if (profileImage){
       setProfileImage(profileImage)
       setProfile({...profile, profileImage:profileImage})
       
     }
  } catch (error) {
    console.log(error)
  }
 
};
const deleteProfileImage = async () =>{
  try {
        await AsyncStorage.removeItem("profileImage");
      Alert.alert("Profile", "Your profile was successfuly deleted");
      setProfileImage(null);
      setProfile({...profile,profileImage:null})
      console.clear()
  } catch (error) {
    console.log (error)
  }
}
  return { profileImage, pickProfileImage,getProfileImage,deleteProfileImage};
}
