import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from '../Styles';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';
import RecentDecksScreen from './RecentDecksScreen';
import FindDecksScreen from './FindDecksScreen';

interface FlashCardScreenProps{
  navigation: any;
}
const Tab = createMaterialTopTabNavigator();


const FlashCardScreen= (props: FlashCardScreenProps)=>{







  return (
  
<View style={styles.container}>

  <Text>
  FlashCardScreen
  </Text>


</View>


  );
};
export default FlashCardScreen;

