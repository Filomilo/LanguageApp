import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
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

const CameraScreen = (props) => {
  
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
  
    if (!permission) {
      // Camera permissions are still loading
      return <View />;
    }
  
    if (!permission.granted) {
      // Camera permissions are not granted yet
      return (
        <View style={styles.container}>
          <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      );
    }
  
    function toggleCameraType() {
      setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }
  
    return (
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} type={type}>
    
        </Camera>
      </View>
    );
};
export default CameraScreen;
