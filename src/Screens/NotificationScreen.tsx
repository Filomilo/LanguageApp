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
import RecentDecksScreen from './RecentDecksScreen';
import FindDecksScreen from './FindDecksScreen';
import YourFriendsScreen from './YourFriends';
import FindFriendsScreen from './FindFriends';

interface NotificationScreenProps{
  navigation: any;
}


const NotificationScreen= (props: NotificationScreenProps)=>{






  return (


<View style={[styles.container,DarkModeColors.BackGroundColor]}>
  <Text style={DarkModeColors.MainTextColor}>
    Notifcations
  </Text>
</View>

  );
};
export default NotificationScreen;

