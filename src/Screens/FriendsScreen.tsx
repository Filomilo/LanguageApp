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
import YourFriendsScreen from './YourFriends';
import FindFriendsScreen from './FindFriends';

interface FriendsScreenProps{
  navigation: any;
}
const Tab = createMaterialTopTabNavigator();


const FriendsScreen= (props: FriendsScreenProps)=>{






  return (

/*
<View style={styles.container}>
  <Text>
    friends
  </Text>
</View>
*/
    
 <Tab.Navigator>
      <Tab.Screen name="Your Friends" component={YourFriendsScreen} />
      <Tab.Screen name="Find Friends" component={FindFriendsScreen} />
 </Tab.Navigator>

  );
};
export default FriendsScreen;

