import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';
import { DarkModeColors, darkModePrimaryColor, styles, width } from '../Styles';
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
import YourFriendsScreen from './YourFriends';
import FindFriendsScreen from './FindFriends';

import DeclineButton from '../../assets/x.svg'
import AcceptButton from '../../assets/check.svg'
import DataBaseManager from '../config/DataBaseManager';
import { FireBaseContext } from '../config/FireBaseContext';

interface NotificationScreenProps{
  navigation: any;
}


const NotificationScreen= (props: NotificationScreenProps)=>{

const {getFriendsRequests,acceptFriendsRequest, declineFriendsRequest} = useContext(FireBaseContext);


  const FriendsRequests=getFriendsRequests();

const acceptRequest=(id)=>{
  acceptFriendsRequest(id);
}
const declineRequest=(id)=>{
  declineFriendsRequest(id);
}


  const FriendRequest=(props)=>{


    return(
      <View
      style={{
        margin: width*0.01
      }}
      >
        <View
        style={
          {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignContent: 'center',
            alignItems: 'center',
            
          }
        }
        >
        <Image 
       source={{uri: props.photoUri}}
       style={styles.proflePic}
       />
       <View
       style={{
        flex: 1,

       }}
       >
        <Text
        style={
          styles.statText
        }
        >
          {props.name} invites you to be friend
    
        </Text>
        </View>
        </View>


        <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly'
        }}
        >
          <TouchableOpacity
          onPress={()=>{props.accept()}}
          >
        <AcceptButton width={width/5} height={width/5} fill={darkModePrimaryColor} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>{props.decline()}}
        >
        <DeclineButton width={width/4} height={width/4} fill={darkModePrimaryColor} />
        </TouchableOpacity>
        </View>

        <View 
        style={[styles.LineSeparator,{
          width: width*0.95
        }]}
        />

      </View>
    )
  }





  return (


<View style={[styles.mainContainer,DarkModeColors.TextInputColor]}>


    <FlatList data={FriendsRequests} 
    renderItem={(item)=>{return(
        <FriendRequest
        name={item.item.from}
        photoUri={item.item.profilePic}
        decline={()=>{declineRequest(item.item.from)}}
        accept={()=>{acceptRequest(item.item.from)}}
        />
    )
    }} />



</View>

  );
};
export default NotificationScreen;

