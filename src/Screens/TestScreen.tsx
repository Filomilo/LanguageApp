import { StatusBar } from 'expo-status-bar';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { DarkModeColors, darkModePrimaryColor, darkModeTextInputColor, height, styles, width } from '../Styles';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React, { useContext, useState } from 'react';
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
import TestQuestion from '../Components/TestQuestion';
import { FireBaseContext } from '../config/FireBaseContext';

interface TestScreenProps{
  navigation: any;
}
const Tab = createMaterialTopTabNavigator();


const TestScreen= ({close,cards})=>{

  const {getTestData}= useContext(FireBaseContext)

  const [testData, settestData]= useState(getTestData(cards));
  const [showResult, setshowResult]= useState(false);
  const [Result, setsResult]= useState(0);
  const [wordNum, setFwordNum]= useState(1);
  const [WordAmt, setWordAmt]= useState(testData.length);
  
  const calcResult=()=>{
    let correct=0;

    for(let i=0;i<testData.length;i++)
     {
      if(testData[i].type==="closed")
      {
        if(testData[i].corrected===testData[i].selected)
        correct++;
      }
      else{
        if(testData[i].correct===testData[i].filled)
        correct++;
      }
    }
    //console.log("_______________________________________________________________")
    //console.log(JSON.stringify(testData))
    //console.log("_______________________________________________________________")

    setsResult(correct)
    setshowResult(true)
  }




  const  arrowLeftButton=()=>{
    //console.log("arrowLeftButton ")
    setFwordNum(wordNum-1<1?1:wordNum-1)
  }
  
  const  arrowRightButton=()=>{
    //console.log("arrowRightButton ")
    setFwordNum(wordNum+1>testData.length?testData.length:wordNum+1)
  }

  const checkMarkButton=()=>{
    //console.log("check mark")
    calcResult();
  }

  const finishButton=()=>{
    //console.log("finsh")
    setshowResult(false);
    close()
  }




  return (
  

  
<View style={[styles.mainContainer,DarkModeColors.BackGroundColor]}>
<Modal
visible={showResult}
>
<View style={[styles.mainContainer,DarkModeColors.BackGroundColor]}>
  <View
  style={
    {
      width: width,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  }
  >
  <Text
  style={
    styles.resultText
  }
  >
    {Result}/{WordAmt}
  </Text>
  </View>
  <View
style={[
styles.BottomButtonsContainer,{
  flexDirection: 'column'
}
]}
>
<TouchableOpacity
onPress={()=>{finishButton()}}
>
    <View
    style={[
      styles.BottomButton,
      {
        width: width
      }
    ]
    }
    >
<Checkmark width={width/11} height={width/11} fill={darkModePrimaryColor} />
    </View>

    </TouchableOpacity>
</View>

  
  </View>
  
</Modal>


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
 progressDots={wordNum}
 progresMaxs={testData.length}
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
{testData[wordNum - 1].word}
</Text>



  </View>

  <View
style={
  {
    flex: 5,
  
  }
}
>


{testData === undefined ? (
  <></>
) : (
  <TestQuestion
    data={testData}
    index={[wordNum - 1]}
    setData={(arg) => {
      settestData(arg);
      //console.log("test");
      //console.log(JSON.stringify(arg));
    }}
  />
)}
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
onPress={()=>{checkMarkButton()}}
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

