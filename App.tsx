import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from './Styles';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React from 'react';
import {LoginScreen} from './Screens/LoginScreen'

const Stack= createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
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

