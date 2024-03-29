import { StatusBar, setStatusBarHidden } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { DarkModeColors, darkModePrimaryColor, height, styles, width } from '../Styles';
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
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
import { CommonActions } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();



interface RecentDecksScreenProps{
  navigation: any;
}







const RecentDecksScreen= (props: RecentDecksScreenProps)=>{
  const {getYourRecentDecks,setIsLoading,createDeck} = useContext(FireBaseContext)


  const [decks, setDecks] = useState(getYourRecentDecks()); 
  const navigation=useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      let array=[...getYourRecentDecks()]
      setDecks(array);
      console.log("REEEEEEEELOOOOOADDADAD: "+JSON.stringify(array))

    });

    return unsubscribe;
  }, [navigation]);


const addDeckButton=async ()=>{
 
  //console.log("add button");
   id=await createDeck();
   let array=[...getYourRecentDecks()]
  await setDecks(array);
  openDeck(id)
}
const openDeck =(id)=>
{
 

  //console.log('open deck: open deck: open deck: open deck: open deck: open deck: open deck: open deck: open deck: open deck: ')
  //console.log('open deck: ' + JSON.stringify(id))
  
  //console.log('open deck: open deck: open deck: open deck: open deck: open deck: open deck: open deck: open deck: open deck: ')
  props.navigation.navigate('DeckView',{
  deckId: id
  });

}

useFocusEffect(
  React.useCallback(() => {
  
    console.log("reeload");
    let arr=[...getYourRecentDecks()]
    setDecks(arr);
    return () => {

    };
  }, [])
);



  return (
<View>
<View style={{
  width: width,
  height:  height,
  position: 'absolute'
}}>
<View style={[styles.container,DarkModeColors.BackGroundColor]}>
<SafeAreaView>


<View style={{marginTop: "15%"}}>
<FlatList 
data={decks}
renderItem={({ item }) => (
  <DeckButton 
  deckTitle={item.name}
  author={item.author}
  lastUsed={ Math.floor(item.last_used)}
  amtOfCards={item.amt_of_cards}
  lang_1={item.lang_1}
  lang_2={item.lang_2}
  showLastUsed={true}
   buttonPress={()=>{openDeck(item.id)}
  } />
)}
/>
</View>
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

