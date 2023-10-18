import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from './Styles';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import RegisterScreen from './Screens/RegisterScreen';
import LoginScreen from './Screens/LoginScreen';
const Stack= createStackNavigator();




export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='Login'
      
      >
      <Stack.Screen
       name="Login"
        component={LoginScreen}
        options={{ headerShown: false }} 
      />
       <Stack.Screen
       name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }} 
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

