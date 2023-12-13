

import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { darkModePrimaryColor, height, styles, width } from '../Styles';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React, { useContext, useEffect, useState } from 'react';
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
import { FireBaseContext } from '../config/FireBaseContext';
interface FindFriendsScreenProps{
  navigation: any;
}
const Tab = createMaterialTopTabNavigator();


const FindFriendsScreen= (props: FindFriendsScreenProps)=>{


const {getSearchFriends,sendFriendRequest} = useContext(FireBaseContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [friendList,setFriendsLIst]= useState([]);
  

  useEffect(()=>{
    updateFriendList();
  },[searchTerm])

  const addConatct=async (id)=>{

    await sendFriendRequest(id);

  }

  

  const updateFriendList=async ()=>{
    await setFriendsLIst(getSearchFriends(searchTerm));
  }
  
  useFocusEffect(
    React.useCallback(() => {
      updateFriendList();
 
      return () => {

      };
    }, [])
  );


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

onChangeText={(text)=>{setSearchTerm(text);updateFriendList() }}
value={searchTerm}
/>

</View>

<FlatList 
data={friendList} 
renderItem={(item)=>{return(
  <FriendListElement 
  name={item.item.nick}
  id={item.item.nick}
  isClickable={false}
  isAddable={true}
  isAlreadySendRequset={item.item.alreadySendRequest}
  imageUri={item.item.profilePic}
  addFunction={()=>{addConatct(item.item.nick)}}
  />
)}} />


</View>


  );
};
export default FindFriendsScreen;

