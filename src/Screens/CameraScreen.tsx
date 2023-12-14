import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import {
  DarkModeColors,
  darkModePrimaryColor,
  darkModeTextInputColor,
  height,
  styles,
  width,
} from '../Styles';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import {
  SafeAreaFrameContext,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { db } from '../config/firebase-config';
import { initializeApp } from 'firebase/app';
import { DataSnapshot, getDatabase, onValue, ref } from 'firebase/database';
import { auth } from '../config/firebase-config';
import DeckButton from '../Components/DeckButton';
import AddButton from '../../assets/Add_button.svg';
import DataBaseManager from '../config/DataBaseManager';
import { Camera, CameraType } from 'expo-camera';
import { Button} from 'react-native';
import CameraButton from '../../assets/Camera.svg'
import CameraReverse from '../../assets/camera-flip-outline.svg'
import {  darkModeHeaderColor } from '../Styles';
import LoadingScreen from './LoadingScreen';

const CameraScreen = (props) => {
  
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [cameraRef, setCameraRef] = useState(null);
    if (!permission) {
      return (<View style={styles.mainContainer} > 
        <LoadingScreen />
        </View>
        );
    }
  
    if (!permission.granted) {
  
      return (
        <View style={[styles.container,styles.mainContainer]}>
          <Text style={[DarkModeColors.MainTextColor,{ textAlign: 'center' }]}>We need your permission to show the camera</Text>
          <View style={{}}>
            <Pressable onPress={()=>{requestPermission()}}>
          <View style={styles.loginButton}>
            <Text style={styles.loginButtonText}>
            grant permission
            </Text>
          </View>
          </Pressable>
          </View>
        </View>
      );
    }
  
    function toggleCameraType() {
      //console.log("camera toggle")
      setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }
  
    const takePhoto=async ()=>{
      //console.log("take photo");
      if (cameraRef) {
        let photo = await cameraRef.takePictureAsync();
        if (photo) {
          //console.log(JSON.stringify(photo))
          props.navigation.navigate('FilePicker',{uri: photo.uri});

        }
      }
    }


    return (
      <View style={[styles.cameraContainer]}>
        <Camera style={styles.camera} type={type} ratio="16:9"  ref={(ref) => setCameraRef(ref)}>
         <View style={{flex: 1}}>
          <View style={{flex: 1, alignContent: 'flex-end', justifyContent: 'flex-end', margin: width*0.1}}>
<View style={{flexDirection: 'row'}}>
  <Pressable onPress={()=>{takePhoto()}}>
<CameraButton width={width/5} height={width/5} fill={darkModePrimaryColor}  style={{marginHorizontal: width*0.1}}/>
</Pressable>
<Pressable onPress={()=>{toggleCameraType()}} >
<CameraReverse width={width/5} height={width/5} fill={darkModePrimaryColor} style={{marginHorizontal: width*0.1}}/>
</Pressable>
</View>
</View>
         </View>
        </Camera>
      </View>
    );
};
export default CameraScreen;
