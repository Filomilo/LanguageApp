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

const Tab = createMaterialTopTabNavigator();


interface RecentDecksScreenProps{
  navigation: any;
}

const RecentDecksScreen= (props: RecentDecksScreenProps)=>{






  return (

<View style={styles.container}>
  <Text>
    recent decks
  </Text>
</View>

  );
};
export default RecentDecksScreen;

