import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { DarkModeColors, darkModePrimaryColor, darkModeTextInputColor, height, styles, width } from '../Styles';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';
import RecentDecksScreen from './RecentDecksScreen';
import FindDecksScreen from './FindDecksScreen';
import Arrow  from '../../assets/Arrow.svg'
import ArrowReturn  from '../../assets/arrow-u-left-bottom.svg'
import Checkmark  from '../../assets/checkmark-circle.svg'
import Save  from '../../assets/Save.svg'
import * as Progress from 'react-native-progress';

import ArrowLeft from '../../assets/Expand_left.svg'
import ArrowRIght from '../../assets/Expand_right.svg'
import ProgresDots from '../Components/ProgresDots';

interface TestScreenProps{
  navigation: any;
}
const Tab = createMaterialTopTabNavigator();


const TestScreen= ({close})=>{

  const [wordNum, setFwordNum]= useState(1);
  const [WordAmt, setWordAmt]= useState(10);



  const  arrowLeftButton=()=>{
    console.log("arrowLeftButton ")
  }
  
  const  arrowRightButton=()=>{
    console.log("arrowRightButton ")
  }




  return (
  
<View style={[styles.mainContainer,DarkModeColors.BackGroundColor]}>



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
{wordNum}/{WordAmt}
</Text>
<ProgresDots
 progressDots={10}
 progresMaxs={15}
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
<View

style={
  {
    flex: 1,
   alignContent: 'center',
   justifyContent: 'center'
  }
}
>

<Text
style={[
  DarkModeColors.MainTextColor,
  styles.langageText
]}
>
  Word
</Text>



  </View>
  
  <View
style={
  {
    flex: 5,
    backgroundColor: 'orange'
  }
}
>
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










  <View
style={[
  styles.BottomButtonsContainer,
  {
     
  }
]
}
>
<TouchableOpacity>
  <View
   style={[
    DarkModeColors.primaryColor,
    styles.BottomButton,
  ]
  }
  >
     <ArrowReturn width={width/11} height={width/11} fill={darkModePrimaryColor} />


  </View>
</TouchableOpacity>


<TouchableOpacity
onPress={()=>{}}
>
  <View
  style={[
    DarkModeColors.primaryColor,
    styles.BottomButton,
  ]
  }
  >
      <Checkmark width={width/11} height={width/11} fill={darkModePrimaryColor} />


  </View>
</TouchableOpacity>

</View>


</View>


  );
};
export default TestScreen;

