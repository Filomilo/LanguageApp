

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from '../Styles';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React, { useContext } from 'react';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';
import RecentDecksScreen from './RecentDecksScreen';
import FindDecksScreen from './FindDecksScreen';
import DataBaseManager from '../config/DataBaseManager';
import FriendListElement from '../Components/FriendListElement';
import { FireBaseContext } from '../config/FireBaseContext';

interface YourFriendsScreenProps{
  navigation: any;
}
const Tab = createMaterialTopTabNavigator();



const YourFriendsScreen= (props: YourFriendsScreenProps)=>{

  const {getYourFriends} = useContext(FireBaseContext);

  const friendList=getYourFriends();


  const clickConatact=(id)=>{
    //console.log("clikced user : " + id)
    props.navigation.navigate('ContactInfo',{id: {id}});
  }



  return (
    
<View style={styles.mainContainer}>

<FlatList 
data={friendList} 
renderItem={(item)=>{return(
  <FriendListElement 
  name={item.item.nick}
  id={item.item.nick}
  isClickable={true}
  isAddable={false}
  imageUri={item.item.profilePic}
  clickFunction={()=>{clickConatact(item.item.nick)}}
  />
)}} />


</View>


  );
};
export default YourFriendsScreen;

