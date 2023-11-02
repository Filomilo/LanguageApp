import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { darkModePrimaryColor, height, styles, width } from '../Styles';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { signInWithEmailAndPassword  } from 'firebase/auth';
import {auth} from '../config/firebase-config'
import BackgroundZig from '../../assets/backGroundZig.svg'



const BackGroundZigs=()=>{

  let offset=140;
  let posX=0;
  let posY=-450;

  return(
    <View>
    <BackgroundZig 
width={width*2.1} 
height={width*2.1} 
fill={darkModePrimaryColor}
style={{
  position: 'absolute',
  transform: [{translateX: posX-=offset},{translateY: posY+=offset}]
}}
/>
<BackgroundZig 
width={width*2.1} 
height={width*2.1} 
fill={darkModePrimaryColor}
style={{
  position: 'absolute',
  transform: [{translateX: posX-=offset},{translateY: posY+=offset}]
}}
/>
<BackgroundZig 
width={width*2.1} 
height={width*2.1} 
fill={darkModePrimaryColor}
style={{
  position: 'absolute',
  transform: [{translateX: posX-=offset},{translateY: posY+=offset}]
}}
/>
<BackgroundZig 
width={width*2.1} 
height={width*2.1} 
fill={darkModePrimaryColor}
style={{
  position: 'absolute',
  transform: [{translateX: posX-=offset},{translateY: posY+=offset}]
}}
/>
<BackgroundZig 
width={width*2.1} 
height={width*2.1} 
fill={darkModePrimaryColor}
style={{
  position: 'absolute',
  transform: [{translateX: posX-=offset},{translateY: posY+=offset}]
}}
/>

</View>

  )
}
export  default  BackGroundZigs;
