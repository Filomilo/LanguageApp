
import { StatusBar } from 'expo-status-bar';
import { FlatList, Modal, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { DarkModeColors, darkModeHeaderColor, darkModePrimaryColor, darkModeTextInputColor, height, styles, width } from '../Styles';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React, { useCallback, useContext, useEffect, useState } from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';
import DeckButton from '../Components/DeckButton';
import { onValue, ref } from 'firebase/database';
import { db } from '../config/firebase-config';
import { Dropdown } from 'react-native-element-dropdown';
import Sort  from '../../assets/Sort.svg'
import Filter from '../../assets/Fiilter.svg'
import {languages} from '../config/LangagesData'
import { FireBaseContext } from '../config/FireBaseContext';
const Tab = createMaterialTopTabNavigator();


interface FindDecksScreenProps{
  navigation: any;
}

const FindDecksScreen= (props: FindDecksScreenProps)=>{

const {getFindDeck} = useContext(FireBaseContext); 

  const [decks, setDecks] = useState(getFindDeck()); 
  const [isShowFilterModal, setIsShowFilterModal] = useState(false); 

  const navigation=useNavigation();

const openDeck =(id)=>
{

}

const testData = [
  { label: 'popularity' },
  { label: 'amount of cards' },
];

  const applyFilter=()=> {
    console.log("apply filter");
    setIsShowFilterModal(false);
  }


  const showFilter=()=> {
    console.log("show filter");
    setIsShowFilterModal(true);
  }
  return (




<View style={[styles.container,DarkModeColors.BackGroundColor]}>


<Modal
visible={isShowFilterModal}
transparent= {true}
style={[
  styles.mainContainer,
  {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
    alignItems: 'center',
  }
]}
>

<View
style={{
  justifyContent: 'space-around',

  width: width,
  height: height,
  alignSelf: 'center',
  alignContent: 'center',
  flex: 1,
  flexDirection: 'column'
}}
>


<View
style={{
  
  backgroundColor: darkModeHeaderColor,

  height: height*0.3,
  marginVertical: (width-width*0.9)/2,
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
}}
>

<Text

style={styles.statText}
>
  First language
</Text>
<Dropdown
   data={languages}
   labelField="label"
   valueField="label"
    onChange={()=>{console.log('needs implemation')}}
style={[
                    styles.langageText,
               
                    {
                      width: width*0.50,
                      
                    },
                   
                  ]
                  }   
                  selectedTextStyle={[styles.langageText,DarkModeColors.primaryColorText, {fontSize: height*0.025}]}
                  value=  {'pl'} 
itemContainerStyle={ [ DarkModeColors.BackGroundColor]}
itemTextStyle={[DarkModeColors.MainTextColor, {fontSize: height*0.025}]}
activeColor={darkModeTextInputColor}
/>

<Text

style={styles.statText}
>
  Second language
</Text>
<Dropdown
   data={languages}
   labelField="label"
   valueField="label"
    onChange={()=>{console.log('needs implemation')}}
style={[
                    styles.langageText,
               
                    {
                      width: width*0.50,
                      
                    },
                   
                  ]
                  }   
                  selectedTextStyle={[styles.langageText,DarkModeColors.primaryColorText, {fontSize: height*0.025}]}
                  value=  {'pl'} 
itemContainerStyle={ [ DarkModeColors.BackGroundColor]}
itemTextStyle={[DarkModeColors.MainTextColor, {fontSize: height*0.025}]}
activeColor={darkModeTextInputColor}
/>
<TouchableOpacity
onPress={()=>{
  console.log("aply filters");
  applyFilter();
}}
>
<View
style={
  styles.textButton
}
>
  
<Text
style={
  styles.onButtonText
}
>
  Apply
</Text>
</View>
</TouchableOpacity>
</View>

</View>
</Modal>


  <SafeAreaView>
<View
style={{
  flexDirection: 'row',
  flexWrap: 'wrap',

}}

>
  <Sort
   width={width/11} 
   height={width/11}
    fill={darkModePrimaryColor} />

  <Dropdown
   data={testData}
   labelField="label"
   valueField="label"
    onChange={()=>{console.log('needs implemation')}}
style={[
                    styles.langageText,
               
                    {
                      width: width*0.50,
                      
                    },
                   
                  ]
                  }   
                  selectedTextStyle={[styles.langageText,DarkModeColors.primaryColorText, {fontSize: height*0.025}]}
                  value=  {'popularity'} 
itemContainerStyle={ [ DarkModeColors.BackGroundColor]}
itemTextStyle={[DarkModeColors.MainTextColor, {fontSize: height*0.025}]}
activeColor={darkModeTextInputColor}
/>
<View
style={{
  flex: 1,
  flexDirection: 'row',
  alignItems: 'flex-end',
  alignContent: 'flex-end',
  justifyContent: 'flex-end',
  marginHorizontal: width*0.05,
}}
>
  <TouchableOpacity
  onPress={()=>{showFilter()}}>
<Filter
   width={width/11} 
   height={width/11}
    fill={darkModePrimaryColor} />
</TouchableOpacity>
</View>
</View>

  <FlatList 
  data={decks}
  renderItem={({ item }) => (
    <DeckButton 
    deckTitle={item.name}
    author={item.author}
    lastUsed={9}
    amtOfCards={item.amt_of_cards}
    lang_1={item.lang_1}
    lang_2={item.lang_2}
    showLastUsed={false}
     buttonPress={()=>{openDeck(item.Id)}
    } />
  )}
/>


  </SafeAreaView>
</View>


  );
};
export default FindDecksScreen;

