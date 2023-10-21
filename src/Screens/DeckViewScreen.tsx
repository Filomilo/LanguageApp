import { StatusBar } from 'expo-status-bar';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { styles } from '../Styles';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React, { useState } from 'react';
import {  TouchableOpacity } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';
import { DrawerLayout } from 'react-native-gesture-handler';
import TestScreen from './TestScreen';
import StatScreen from './StatScreen';


interface DeckViewScreenProps{
  navigation: any;
}

const DeckViewScreen= (props: DeckViewScreenProps)=>{
  const [modalVisible, setModalVisible] = useState(false);
  const [testVisible, setTestVisible] = useState(false);


  const learnDeck=()=>{
    setModalVisible(true)
  }

  const editDeck=()=>{
   console.log('edit deck')
  }

  const closeTest=()=>{
    setTestVisible(false)
  }

  const openFlashCards=()=>{
    console.log('openFlashCards')
    setModalVisible(false);
    props.navigation.navigate('FlashCards')
   }
   const openTest=()=>{
    console.log('open Test')
    setModalVisible(false)
    setTestVisible(true);
   }
 
  return (

<View style={styles.container}>
<Modal
visible={testVisible}
>
<TestScreen close={closeTest} />
</Modal>


<Modal
visible={modalVisible}
>
<View 
style={styles.container}
>
<TouchableOpacity
onPress={openFlashCards}
>
<Text>
  flashCards2a
</Text>
</TouchableOpacity>

<TouchableOpacity
onPress={openTest}
>
<Text>
  testa
</Text>
</TouchableOpacity>



</View>
</Modal>
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

