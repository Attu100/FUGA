// import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { STACKNAVIGATION } from './FRAMEWORK/NAVIGATION/STACKNAVIGATION';
import { NavigationContainer } from '@react-navigation/native';
import { GlobalVariable } from './FRAMEWORK/COMPONENT/globalVariable';
import PreLoader from './FRAMEWORK/COMPONENT/PreLoader';
export default function App() {
  return (
    
    <GlobalVariable>
      <NavigationContainer style={styles.container}>
        <STACKNAVIGATION/>
        <StatusBar style="auto" />
        <PreLoader/>
      </NavigationContainer>
    </GlobalVariable>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:StatusBar.currentHeight
  },

});
