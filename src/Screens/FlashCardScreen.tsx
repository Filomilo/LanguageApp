import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { styles, DarkModeColors, width, darkModeTextInputColor, darkModePrimaryColor, darkModeBackgroundColor, darkModeHeaderColor, height, darkModeMainTextColor } from '../Styles';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React from 'react';
import { Switch, TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';
import RecentDecksScreen from './RecentDecksScreen';
import FindDecksScreen from './FindDecksScreen';
import ArrowReturn  from '../../assets/arrow-u-left-bottom.svg'
import * as Progress from 'react-native-progress';
import CardsIcon from '../../assets/cards.svg'
import ArrowLeft from '../../assets/Expand_left.svg'
import ArrowRIght from '../../assets/Expand_right.svg'
interface FlashCardScreenProps{
  navigation: any;
}
const Tab = createMaterialTopTabNavigator();


const FlashCardScreen= (props: FlashCardScreenProps)=>{


const [flashCardText, setFlashCardText]= useState("example");
const [flashCardNum, setflashCardNum]= useState(10);

const [flashCardAmt, setflashCardAmt]= useState(20);
const [isReversed, setisReversed] = useState(false);

const shuffleButton=()=>{
  console.log("shuffle ")
}
const  returnButton=()=>{
  console.log("return ")
}

const  arrowLeftButton=()=>{
  console.log("arrowLeftButton ")
}

const  arrowRightButton=()=>{
  console.log("arrowRightButton ")
}
const  flashCardClickButton=()=>{
  console.log("flashCardClickButton ")
}
  return (
  
<View style={[styles.container, DarkModeColors.BackGroundColor,{flex: 1}]}>

<View
style={[{
  flex: 1,
  width: width
}]}
>
<Text
style={[
  DarkModeColors.primaryColorText,
  styles.langageText
]}
>
{flashCardNum}/{flashCardAmt}
</Text>
<Progress.Bar
 progress={flashCardNum/flashCardAmt} 
 width={width} 
 height={1}
 color={darkModePrimaryColor}
 unfilledColor={darkModeTextInputColor}
 borderWidth={0}
style={
  {
    marginVertical: height*0.02
  }
}
 />

</View>
<TouchableOpacity
onPress={()=>{flashCardClickButton()}}
>


<View
style={[{
  backgroundColor: darkModeTextInputColor,

  width: width*0.95,
  height: width*0.95,
  borderRadius: width*0.05,
  alignItems: 'center',
  justifyContent: 'center',
  alignContent: 'center'
}]}
>
  <Text
  style={[
    styles.deckViewTitleText,
    {
        textAlign: 'center'
        
    },
    DarkModeColors.primaryColorText
  ]
  }>
    {flashCardText}
  </Text>


</View>
</TouchableOpacity>
<View
style={[
  {
 // backgroundColor: 'orange',
  flex: 3,
  width: width
}

]}
>
<View
style={[{
  //backgroundColor: 'red',
  flex: 2,
  flexDirection: 'row',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'space-around',
  margin: width*0.05
}]}
>
  <View
  style={styles.iconWithTextContainer}
  >
<Switch 
value={isReversed}
onValueChange={setisReversed}
thumbColor={darkModeTextInputColor}
trackColor={{false: darkModeHeaderColor, true: darkModePrimaryColor}}
/>
<Text
style={[
  {
    color: darkModePrimaryColor
  }
]}
>
  reversed
</Text>
</View>
<View
style={styles.iconWithTextContainer}
>
<TouchableOpacity
onPress={shuffleButton}
>
<CardsIcon width={width/11} height={width/11} fill={darkModePrimaryColor} />
<Text
style={[
  {
    color: darkModePrimaryColor
  }]}
>
  shuffle
</Text>
</TouchableOpacity>
</View>



</View>
<View
style={[{
  flex: 1,
  alignItems: 'center',
  alignContent: 'stretch',
  justifyContent: 'space-around',
  width: width,
  flexWrap: 'wrap'
}]}
>
<TouchableOpacity
onPress={()=>{arrowLeftButton()}}
>
<ArrowLeft width={width/5} height={width/5} fill={darkModePrimaryColor} />
</TouchableOpacity>
<TouchableOpacity
onPress={()=>{arrowRightButton()}}
>
<ArrowRIght width={width/5} height={width/5} fill={darkModePrimaryColor} />

</TouchableOpacity>



</View>
<TouchableOpacity
onPress={returnButton}
>
<View
style={[
styles.BottomButtonsContainer
]}
>

    <View
    style={
      styles.BottomButton
    }
    >
<ArrowReturn width={width/11} height={width/11} fill={darkModePrimaryColor} />
    </View>


</View>
</TouchableOpacity>

</View>
</View>


  );
};
export default FlashCardScreen;

