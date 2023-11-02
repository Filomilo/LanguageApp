

import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { darkModePrimaryColor, height, styles, width } from '../Styles';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React, { useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';
import RecentDecksScreen from './RecentDecksScreen';
import FindDecksScreen from './FindDecksScreen';
import DataBaseManager from '../config/DataBaseManager';
import FriendListElement from '../Components/FriendListElement';
import SearchIcon from '../../assets/search.svg'
interface FindFriendsScreenProps{
  navigation: any;
}
const Tab = createMaterialTopTabNavigator();


const FindFriendsScreen= (props: FindFriendsScreenProps)=>{

  const foundFriendList=DataBaseManager.getSearchedFriends();

  const [searchTerm, setSearchTerm] = useState("");

  const addConatct=(id)=>{
    console.log("adding contact : " + id)
  }



  return (
    
<View style={styles.mainContainer}>
<View
style={{
  flexDirection: 'row',
  alignContent: 'space-between',
  alignItems: 'stretch',
  justifyContent: 'space-evenly',
  marginVertical: height*0.02
}}
>

<SearchIcon width={width/11} height={width/11} fill={darkModePrimaryColor} />
<TextInput 
style={[
  styles.textInput,
    {
      width: width*0.8
    }
  ]
}

onChangeText={setSearchTerm}
value={searchTerm}
/>

</View>
<FlatList 
data={foundFriendList.list} 
renderItem={(item)=>{return(
  <FriendListElement 
  name={item.item.name}
  id={item.item.id}
  isClickable={false}
  isAddable={true}
  imageUri={item.item.photoURi}
  addFunction={()=>{addConatct(item.item.id)}}
  />
)}} />


</View>


  );
};
export default FindFriendsScreen;

