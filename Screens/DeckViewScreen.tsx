import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from '../Styles';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';


interface DeckViewScreenProps{
  navigation: any;
}

const DeckViewScreen= (props: DeckViewScreenProps)=>{



  const learnDeck=()=>{
    props.navigation.navigate("DeckView");
  }

  const editDeck=()=>{
    props.navigation.navigate("DeckView");
  }


  return (

<View style={styles.container}>
  <Text>
  DeckView
  </Text>
  <TouchableOpacity
  onPress={learnDeck}
  >
  <Text>
    learn Deck
  </Text>
</TouchableOpacity>
<TouchableOpacity
  onPress={editDeck}
  >
  <Text>
    edit Deck
  </Text>
</TouchableOpacity>
</View>


  );
};
export default DeckViewScreen;

