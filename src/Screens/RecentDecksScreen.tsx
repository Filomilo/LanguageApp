import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { DarkModeColors, styles } from '../Styles';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';
import {db} from '../config/firebase-config'
import { initializeApp } from 'firebase/app';
import { DataSnapshot, getDatabase, onValue, ref } from 'firebase/database';
import {auth} from '../config/firebase-config'
import DeckButton from '../Components/DeckButton';
const Tab = createMaterialTopTabNavigator();



interface RecentDecksScreenProps{
  navigation: any;
}

const RecentDecksScreen= (props: RecentDecksScreenProps)=>{
  const [decks, setDecks] = useState({}); 
  const navigation=useNavigation();
useEffect (()=>{
 
  const decksRef=ref(db,'/decks');
 
  const unsubscribe=onValue(decksRef,(snapshot)=>{
    if(snapshot.exists()){
    const data=snapshot.val();
    const decksArray= data? Object.values(data):[];
    setDecks(decksArray);
  }
  else
  {
    console.error('deecks data does not exist');
    setDecks([]);
  }

  }
  )

  return ()=>{
    unsubscribe();
  };
    
},[db]);

const openDeck =(id)=>
{
  console.log('open deck: ' + id)
  props.navigation.navigate('DeckView',{
   deckData: decks.find((deck) => deck.Id === id)
  });
}




  return (

<View style={[styles.container,DarkModeColors.BackGroundColor]}>
  <Text>
    recent decks
  </Text>
  <TouchableOpacity
  onPress={openDeck}
  
  >
  <Text>
    Open decks
  </Text>

  <SafeAreaView>

  <FlatList 
  data={decks}
  renderItem={({ item }) => (
    <DeckButton 
    item={item}
     buttonPress={()=>{openDeck(item.Id)}
    } />
  )}
/>
    

  </SafeAreaView>

</TouchableOpacity>
</View>


  );
};
export default RecentDecksScreen;

