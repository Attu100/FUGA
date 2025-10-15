import React, { useContext } from "react";
import { View, ActivityIndicator, StyleSheet, Image, Dimensions, Modal } from "react-native";
import { AppContext } from "./globalVariable";

const { width, height } = Dimensions.get("window");

export default function PreLoader() {
  const { preLoader } = useContext(AppContext);

  return(
  
    preLoader?
    (
    <Modal visible={preLoader} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.loaderBox}>
          {/* ✅ Your Logo */}
          <Image 
            source={require("../../assets/fugaLogo.jpg")}  // change to your actual logo path
            style={styles.logo}
            resizeMode="contain"
          />

          {/* ✅ Activity Indicator */}
          
        </View>
      </View>
    </Modal>
  ): null
    )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  loaderBox: {
    width: width * 0.2,
    height: height * 0.15,
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    // shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius:30
  },
});
