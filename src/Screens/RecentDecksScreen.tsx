import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { DarkModeColors, darkModePrimaryColor, height, styles, width } from '../Styles';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React, { useContext, useEffect, useState } from 'react';
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
import AddButton from '../../assets/Add_button.svg';
import { FireBaseContext } from '../config/FireBaseContext';
const Tab = createMaterialTopTabNavigator();



interface RecentDecksScreenProps{
  navigation: any;
}

const RecentDecksScreen= (props: RecentDecksScreenProps)=>{
  const {getYourRecentDecks} = useContext(FireBaseContext)

  const [decks, setDecks] = useState(getYourRecentDecks()); 
  const navigation=useNavigation();




const addDeckButton=()=>{
  console.log("add button");
}
const openDeck =(id)=>
{
  console.log('open deck: ' + id)
  props.navigation.navigate('DeckView',{
   deckData: decks.find((deck) => deck.Id === id)
  });
}




  return (
<View>
<View style={{
  width: width,
  height:  height,
  position: 'absolute'
}}>
<View style={[styles.container,DarkModeColors.BackGroundColor]}>
<SafeAreaView>



<FlatList 
data={decks}
renderItem={({ item }) => (
  <DeckButton 
  deckTitle={item.name}
  author={item.author}
  lastUsed={item.last_used.toLocaleDateString("en-US")}
  amtOfCards={item.amt_of_cards}
  lang_1={item.lang_1}
  lang_2={item.lang_2}
  showLastUsed={true}
   buttonPress={()=>{openDeck(item.Id)}
  } />
)}
/>
  
<TouchableOpacity
  style={styles.floatingButton}
  onPress={()=>{addDeckButton()}}
  >
    
    <AddButton width={width/6} height={width/6} fill={darkModePrimaryColor} />

  </TouchableOpacity>

</SafeAreaView>


</View>
</View>


<View
style={
  {
    width: width*0.2,
    height: width*0.2,
    transform: [{translateX: width*0.75},{translateY:height*0.72}],
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
}
>
<TouchableOpacity
    style={styles.floatingButton}
    onPress={()=>{addDeckButton()}}
    >
      
      <AddButton width={width/5} height={width/5} fill={darkModePrimaryColor} />

    </TouchableOpacity>
</View>

</View>

  );
};
export default RecentDecksScreen;

