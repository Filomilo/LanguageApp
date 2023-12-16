import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { DarkModeColors, darkModeHeaderColor, darkModePrimaryColor, darkModeTextInputColor, height, styles, width } from '../Styles';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React, { useContext, useState } from 'react';
import { ScrollView, Switch, TouchableOpacity } from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';
import RecentDecksScreen from './RecentDecksScreen';
import FindDecksScreen from './FindDecksScreen';
import Camera from '../../assets/Camera.svg'
import Folder from '../../assets/Folder.svg'
import { FireBaseContext } from '../config/FireBaseContext';
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
      margin: height*0.01,
      marginLeft: "3%"
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
style={{marginRight: width*0.06 , transform: [{ scaleX: width*0.003 }, { scaleY: width*0.003 }] }}
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

  
const {logOut,
  getActiveProfilePic,
  setIsurnFlashCardsByShaking,
  setIsSearchable,
  setIsDarkMode,
  getIsDarkMode,
  getIsSearchable,
  getIsurnFlashCardsByShaking,
  activeUserData

}= useContext(FireBaseContext);








const logOutButton=()=>{

 logOut();
}





const ChoosePhotoButton=()=>{
  //console.log("Choose phto button");
  props.navigation.navigate('FilePicker');

  
}

const TakePhotoButton=()=>{
  //console.log("take phto button");
  props.navigation.navigate('Camera');
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
       source={{uri: getActiveProfilePic()}}
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
         name={"Searchable account"}
         onChange={setIsSearchable}
         value={getIsSearchable()}
         />
         <SettingOptions 
         name={"Turn flash cards by shaking"}
         onChange={setIsurnFlashCardsByShaking}
         value={activeUserData?activeUserData.isTurnFlashCardsByShaking:false}
         />
      </View>

    </ScrollView>

    <TouchableOpacity
onPress={logOutButton}
>
<View
style={[
styles.BottomButtonsContainer
]}
>

    <View
    style={
      styles.BottomButton
    }
    >
<Text
style={[
  styles.BottomButtonText,
  DarkModeColors.primaryColorText,{
    fontSize: width*0.05
  }
]
}
>
  Log out
</Text>
    </View>


</View>
</TouchableOpacity>
</View>


  );
};
export default SettingsScreen;

