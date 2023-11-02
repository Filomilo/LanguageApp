import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { darkModeHeaderColor, darkModePrimaryColor, darkModeTextInputColor, height, styles, width } from '../Styles';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React, { useState } from 'react';
import { ScrollView, Switch, TouchableOpacity } from 'react-native-gesture-handler';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';
import RecentDecksScreen from './RecentDecksScreen';
import FindDecksScreen from './FindDecksScreen';
import DataBaseManager from '../config/DataBaseManager'
import Camera from '../../assets/Camera.svg'
import Folder from '../../assets/Folder.svg'
interface SettingsScreenProps{
  navigation: any;
}
const Tab = createMaterialTopTabNavigator();


const SettingOptions=(props)=>
{
return(
  <View
  style={
    {
      margin: height*0.01
    }
  }
  >

    <View
    style={{
      flexDirection: 'row',
      alignContent: 'stretch',
      
    }}
    >
<Text
style={styles.SettingOptionText}
>
  {props.name}
</Text>
<View
style={{
  flexDirection: 'row',
  justifyContent: 'flex-end',
  flex: 1,
}}
>
<Switch 
value={props.value}
onValueChange={props.onChange}
thumbColor={darkModeTextInputColor}
trackColor={{false: darkModeHeaderColor, true: darkModePrimaryColor}}
style={{ transform: [{ scaleX: width*0.003 }, { scaleY: width*0.003 }] }}
/>
</View>
</View>
<View 
style={[styles.LineSeparator,{
  width: width*0.95
}]}
/>
</View>
);
}


const SettingsScreen= (props: SettingsScreenProps)=>{


const [isDarkMode,setIsDarkMode] = useState(true);
const [isSearchable,setIsSearchable] = useState(true);
const [isTurnFlashCardsByShaking,setITurnFlashCardsByShaking] = useState(true);


const ChoosePhotoButton=()=>{
  console.log("Choose phto button");
}

const TakePhotoButton=()=>{
  console.log("take phto button");
}

  return (
    
<View style={[styles.mainContainer]}>
    <ScrollView>


      <View
      style={{
        width: width,
        height: height*0.25,
        flexDirection: 'row'
      }}
      >
        <View
        style={{
          flex: 2,
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        >
         <Image 
       source={{uri: DataBaseManager.getProfilePic()}}
       style={styles.proflePic}
       />
        </View>
        <View
        style={{
          flex: 3,
        }}
        >
       
        <View
         style={{
          height: height*0.3,
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center'
         }}
         >
             <TouchableOpacity
          onPress={()=>{ChoosePhotoButton()}}
          style={{
            height: height*0.3,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center'
           }}
          >
            <Folder width={width/7} height={width/7} fill={darkModePrimaryColor} />

          <Text
          style={styles.optionActionText}
          >


            Choose Photo
          </Text>


                   </TouchableOpacity>
         </View>

         <View
         style={{
          height: height*0.3,
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center'
         }}
         >
           <TouchableOpacity
          onPress={()=>{TakePhotoButton()}}
          style={{
            height: height*0.3,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center'
           }}
          >
  <Camera width={width/7} height={width/7} fill={darkModePrimaryColor} />
  <Text
       style={styles.optionActionText}
       >
            Take Photo
          </Text>
          </TouchableOpacity>
         </View>
        </View>


      </View>

      <View
      style={{
        

      }}
      >

         <SettingOptions 
         name={"Dark Mode"}
         onChange={setIsDarkMode}
         value={isDarkMode}
         />
         <SettingOptions 
         name={"Searchable account"}
         onChange={setIsSearchable}
         value={isSearchable}
         />
         <SettingOptions 
         name={"Turn flash cards by shaking"}
         onChange={setITurnFlashCardsByShaking}
         value={isTurnFlashCardsByShaking}
         />
      </View>

    </ScrollView>
</View>


  );
};
export default SettingsScreen;

