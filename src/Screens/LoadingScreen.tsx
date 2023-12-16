import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { darkModeBackgroundColor, darkModeMainTextColor, darkModePlaceholderTextInputColor, darkModePrimaryColor, height, styles, width } from '../Styles';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';

import BackGroundZigs from '../Components/BackgroundZigs';
import { FireBaseContext } from '../config/FireBaseContext';

const LoadingScreen= ()=>{


  





  return (
    <View
    style={{
        backgroundColor: darkModeBackgroundColor,
        width: width,
        height: height,
        justifyContent: 'center',
        alignContent: 'center'
    }}
    >
       <ActivityIndicator />
  <Text
  style={{
    color: darkModeMainTextColor,
    textAlign: 'center'
  }}
  >
    Loading..
  </Text>
    </View>
  );
};
export default LoadingScreen;

