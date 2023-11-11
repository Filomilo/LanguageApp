import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from './src/Styles';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import RegisterScreen from './src/Screens/RegisterScreen';
import LoginScreen from './src/Screens/LoginScreen';
import HomeScreen from './src/Screens/HomeScreen';
import DeckViewScreen from './src/Screens/DeckViewScreen';
import MainScreen from './src/MainScreen';
import { FireBaseProvider } from './src/config/FireBaseContext';


const App=()=>{


return(
  <FireBaseProvider>
  <MainScreen/>
  </FireBaseProvider>
)
}

export default App;

/*
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='Home'
      
      >
      <Stack.Screen
       name="Login"
        component={LoginScreen}
        options={{
           headerShown: false, 
           animationEnabled: false
        }} 
      />
       <Stack.Screen
       name="Register"
        component={RegisterScreen}
        options={{
           headerShown: false, 
           animationEnabled: false
        }} 
      />
       <Stack.Screen
       name="Home"
        component={HomeScreen}
        options={{
           headerShown: false, 
           animationEnabled: false
        }} 
      />
             <Stack.Screen
       name="DeckView"
        component={DeckViewScreen}
        options={{
           headerShown: false, 
           animationEnabled: false
        }} 
      />
      </Stack.Navigator>
    </NavigationContainer>
 
  );
}


function test() {
  return (
    <View style={styles.container}>
    <Text>
      test
    </Text>
   </View>
  );
}
*/
