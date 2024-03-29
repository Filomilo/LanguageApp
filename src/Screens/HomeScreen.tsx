import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { DarkModeColors, darkModeBackgroundColor, darkModePrimaryColor, darkModeTectInputColor, styles } from '../Styles';
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

interface HomeScreenProps{
  navigation: any;
}
const Tab = createMaterialTopTabNavigator();


const HomeScreen= (props: HomeScreenProps)=>{






  return (
    /*
<View>
  <Text>
    Text
  </Text>
</View>
*/
 <Tab.Navigator
 screenOptions ={
  {
    tabBarActiveTintColor: darkModePrimaryColor,
    tabBarInactiveTintColor: darkModeTectInputColor,
    tabBarIndicatorStyle: { backgroundColor: darkModePrimaryColor },
    tabBarStyle: { backgroundColor: darkModeBackgroundColor }
  }
 }
 >
      <Tab.Screen name="Recent decks" component={RecentDecksScreen} />
      <Tab.Screen name="Find decks" component={FindDecksScreen} />
 </Tab.Navigator>

  );
};
export default HomeScreen;

