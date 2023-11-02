

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from '../Styles';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';
import RecentDecksScreen from './RecentDecksScreen';
import FindDecksScreen from './FindDecksScreen';
import DataBaseManager from '../config/DataBaseManager';
import FriendListElement from '../Components/FriendListElement';

interface YourFriendsScreenProps{
  navigation: any;
}
const Tab = createMaterialTopTabNavigator();



const YourFriendsScreen= (props: YourFriendsScreenProps)=>{

  const friendList=DataBaseManager.getYourFriends();

  const clickConatact=(id)=>{
    console.log("clikced user : " + id)
  }



  return (
    
<View style={styles.mainContainer}>

<FlatList 
data={friendList.list} 
renderItem={(item)=>{return(
  <FriendListElement 
  name={item.item.name}
  id={item.item.id}
  isClickable={true}
  isAddable={false}
  imageUri={item.item.photoURi}
  clickFunction={()=>{clickConatact(item.item.id)}}
  />
)}} />


</View>


  );
};
export default YourFriendsScreen;

