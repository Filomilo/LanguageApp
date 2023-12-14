import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { styles, DarkModeColors, width, darkModeTextInputColor, darkModePrimaryColor, darkModeBackgroundColor, darkModeHeaderColor, height, darkModeMainTextColor } from '../Styles';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React, { useContext, useEffect } from 'react';
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
import { FireBaseContext } from '../config/FireBaseContext';
import { Accelerometer } from "expo-sensors";
import LoadingScreen from './LoadingScreen';
import { Mutex }  from 'async-mutex';
import { useFocusEffect } from '@react-navigation/native';
const Tab = createMaterialTopTabNavigator();


const FlashCardScreen= (props)=>{
const {scarambleArrat,getShouldShake} = useContext(FireBaseContext);

const [flashCardText, setFlashCardText]= useState("-");
const [flashCardNum, setflashCardNum]= useState(1);
const [flashCardData,setflashCardData] = useState(props.route.params.deck.deck);
const [flashCardAmt, setflashCardAmt]= useState(1);
const [isReversed, setisReversed] = useState(false);
const [isFlipeed, setisFlipeed] = useState(false);
const [isLoading, setIsLoading] = useState(true);

const goBack=()=>{
  //console.log("go")
  _unsubscribe();
  props.navigation.goBack();

}




useEffect(() => {
  setIsLoading(true);
  setflashCardAmt(1);
  const unsubscribe = props.navigation.addListener('focus', () => {
    //console.log('(*******************************************');
    const fetchData = async () => {
      await setflashCardData(props.route.params.deck.deck);
      await setflashCardNum(1);
      
      //console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEENNNNNNNNNNNNNNNNNNNNNNNNNN"+ "\n");
      //console.log(flashCardData);
      updateText();
    };
    fetchData();
    setIsLoading(false);
    
  });

  return ()=>{unsubscribe();};
}, [props.route]);


useEffect(()=>{
  setflashCardAmt(flashCardData.cards.length);

},[flashCardData])

useEffect(()=>{
  updateText();
},[isReversed])

const shuffleButton=()=>{
  
  let tmpFlashCarddata={...flashCardData};
  tmpFlashCarddata.cards=scarambleArrat(flashCardData.cards);
  //console.log(tmpFlashCarddata);
 // arr = arr.filter(function (element) {
  //  return element !== undefined && element !== null ;
  //});
  setflashCardData(tmpFlashCarddata);
  updateText();
}
const  returnButton=()=>{
  goBack();
  //console.log("return ")
}

const updateText=()=>
{
  let cards=flashCardData.cards.filter((element)=>{
    return element!==undefined
  })
  //console.log("__________________________________________")
  //console.log(JSON.stringify(flashCardData.cards));
    //console.log("__________________________________________")
  if(!isReversed)
  setFlashCardText(cards[flashCardNum-1].word_1);
else
{
  setFlashCardText(cards[flashCardNum-1].word_2);
}
}

const recerseswtich=(state)=>{
  setisReversed(state);
  updateText();
}



  //////////////////////////////////////////
  const [subscription, setSubscription] = useState(null);

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const [accc,setAccc]= useState(0);
  const sensibility = 1.5;

useEffect(()=>{
  //console.log("acc")
  if (accc >= sensibility) {
    onShake();

  }
},[accc])

  const onShake=async ()=>{
    //console.log("---------------------------------------shake----------------------------" + isFlipeed)
    await setisFlipeed(!isFlipeed)
    ////console.log("---------------------------------------shake===========================" + isFlipeed)

  }
  useEffect(() => {
    //console.log("---------------------------------------shake===========================" + isFlipeed);
  }, [isFlipeed]);
  const _subscribe = () => {
    
    if(!getShouldShake()){
      Accelerometer.setUpdateInterval(1000*60*60*24*366);
    }
    else
    Accelerometer.setUpdateInterval(700);
    setSubscription(Accelerometer.addListener((data)=>{
      const acceleration = Math.sqrt(data.x * data.x + data.y * data.y + data.z * data.z);
      //console.log(acceleration)
      setAccc(acceleration)


    }));
    
  };








  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      _subscribe();
 
      return () => {
     
        _unsubscribe()
      };
    }, [])
  );




  
  ////////////////////////////////









const  arrowLeftButton=()=>{
  if(flashCardNum>1){
    setisFlipeed(false);
    setflashCardNum(flashCardNum-1);
    updateText();
  }
}

const  arrowRightButton=()=>{
  setisFlipeed(false);
  //console.log("::::::::::::" + flashCardNum)
  if(flashCardNum<flashCardAmt){
  setflashCardNum(flashCardNum+1);
  updateText();
  //console.log("::::::::::::" + flashCardNum)
}
}
const   flashCardClickButton=async ()=>{
  await setisFlipeed(!isFlipeed)
}
/*
return(
  <SafeAreaView style={[styles.container,styles.mainContainer]}>
    <Text style={styles.textButton}>
      {JSON.stringify(props)}
    </Text>
  </SafeAreaView>
);
*/
if(isLoading)
return(
  <View>
   <LoadingScreen />
  </View>
)


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
    { flashCardData.cards[flashCardNum-1]!==null? (isFlipeed !== isReversed?flashCardData.cards[flashCardNum-1].word_1:flashCardData.cards[flashCardNum-1].word_2):''}
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
onValueChange={recerseswtich}
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

