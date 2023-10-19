import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from '../Styles';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';
import {db} from '../components/firebase-config'
import { initializeApp } from 'firebase/app';
import { DataSnapshot, getDatabase, onValue, ref } from 'firebase/database';

const Tab = createMaterialTopTabNavigator();



interface RecentDecksScreenProps{
  navigation: any;
}

const RecentDecksScreen= (props: RecentDecksScreenProps)=>{
  const [decks, setDecks] = useState({}); 

useEffect (()=>{
 
  const decksRef=ref(db,'users');
 
  const unsubscribe=onValue(decksRef,(snapshot)=>{
    if(snapshot.exists()){
    const data=snapshot.val();
    const decksArray= data? Object.values(data):[];
    setDecks(decksArray);
  }
  else
  {
    console.error('deecks adata does not exist');
    setDecks([]);
  }

  }
  )

  return ()=>{
    unsubscribe();
  };
    
},[db]);

const openDeck =()=>
[

]

  return (

<View style={styles.container}>
  <Text>
    recent decks
  </Text>
  <TouchableOpacity
  onPress={openDeck}
  >
  <Text>
    Open decks
  </Text>

  <ScrollView>
  <Text>
    {JSON.stringify(decks)}
  </Text>
  </ScrollView>

</TouchableOpacity>
</View>


  );
};
export default RecentDecksScreen;

