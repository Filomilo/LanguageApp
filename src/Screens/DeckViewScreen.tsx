import { StatusBar } from 'expo-status-bar';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { DarkModeColors, darkModeMainTextColor, darkModePrimaryColor, height, styles, width } from '../Styles';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react';
import {  TouchableOpacity } from 'react-native';
import EditButton  from '../../assets/Edit_fill.svg'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';
import { DrawerLayout, FlatList } from 'react-native-gesture-handler';
import TestScreen from './TestScreen';
import StatScreen from './StatScreen';
import { db } from '../config/firebase-config';
import { onValue, ref } from 'firebase/database';
import Arrow  from '../../assets/Arrow.svg'


interface DeckViewScreenProps{
  navigation: any;
}



const wordsPreview= (props)=>
{
return(
  <View>
  <View
  style={
    styles.horizontalContainer
  }
  >
    <Text
    style={
      [
        DarkModeColors.MainTextColor,
        styles.langWords
      ]
    }
    >
    {props.item.word_1}
    </Text>
    <Arrow width={width/6} height={height*0.045} fill={darkModeMainTextColor} />
    <Text
        style={
          [
            DarkModeColors.MainTextColor,
            styles.langWords,
          ]
        }
    >
          {props.item.word_2}
      
    </Text>
 


  </View>
       <View 
       style=
       {
         [
           styles.LineSeparator,
           DarkModeColors.primaryColor,
           {width: width*0.9,
            marginHorizontal: width*0.1/2,
            height: height*0.001
          }
          
         ]
       }
       />
       </View>
)
}


const DeckViewScreen= (props: DeckViewScreenProps)=>{
  const [modalVisible, setModalVisible] = useState(false);
  const [testVisible, setTestVisible] = useState(false);

  const deckData=props.route.params.deckData;

  const learnDeck=()=>{
    setModalVisible(true)
  }

  const editDeck=()=>{
   console.log('edit deck')
  }

  const closeTest=()=>{
    setTestVisible(false)
  }

  const editButton=()=>{
    console.log("edit button");
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

<SafeAreaView style={[styles.mainContainer,DarkModeColors.BackGroundColor]}>
<Modal
visible={testVisible}
>
<TestScreen close={closeTest} />
</Modal>


<Modal
visible={modalVisible}
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
</Modal>


<TouchableOpacity
onPress={editButton}
>
  <View
style={styles.rightUpperDeckButton}
>
<EditButton width={width/9} height={width/9}  fill={darkModePrimaryColor} />
</View>
</TouchableOpacity>
<View
style={styles.verticalContainer}
>


<View
style={styles.deckViewTitleContainer}
>
<Text
style={[styles.deckViewTitleText,DarkModeColors.primaryColorText]}
>
  {deckData.name}
  
</Text>
<View style={[styles.LineSeparator,DarkModeColors.primaryColor]} />



<View 
style={[styles.horizontalContainer,{
}]}
>
  <Text
  style={[styles.langageText,DarkModeColors.MainTextColor]}>
    {deckData.lang_1}
  </Text>
  <Text
  style={[styles.langageText,DarkModeColors.MainTextColor]}>
    {deckData.lang_2}
    </Text>
</View>



</View>




<FlatList 
  data={deckData.cards}
   renderItem={wordsPreview}  
    style={{
      flex: 1,
      height: height,
      width: width,
      flexWrap: 'wrap',
      
    }}
  />

</View>
</SafeAreaView>

  );
};
export default DeckViewScreen;

