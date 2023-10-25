
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { DarkModeColors, styles } from '../Styles';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();


interface FindDecksScreenProps{
  navigation: any;
}

const FindDecksScreen= (props: FindDecksScreenProps)=>{






  return (

<View style={[styles.container,DarkModeColors.BackGroundColor]}>
  <Text>
    find decks screen
  </Text>
</View>

  );
};
export default FindDecksScreen;

