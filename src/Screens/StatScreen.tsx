import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { DarkModeColors, darkModeBackgroundColor, darkModePrimaryColor, styles, width } from '../Styles';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React, { useContext, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';
import RecentDecksScreen from './RecentDecksScreen';
import FindDecksScreen from './FindDecksScreen';
import {BarChart} from "react-native-chart-kit";
import { FireBaseContext } from '../config/FireBaseContext';
import LoadingScreen from './LoadingScreen';

interface StatScreenProps{
  navigation: any;
}
const Tab = createMaterialTopTabNavigator();


const StatScreen= (props: StatScreenProps)=>{

const {getAmtOfDecks,getAvgFlashCards, getStatData}= useContext(FireBaseContext);

const[statData,setStatData]= useState(undefined);
const [isLoading,setIsLoading] = useState(false);
  const avgFlashCard=getAvgFlashCards();
  const amtOfDecks=getAmtOfDecks();


  const updateData=async ()=>{
    //await setIsLoading(true);
    setStatData(await getStatData());
   // await setIsLoading(false);
  }

  useFocusEffect(
    React.useCallback(() => {
    
      //console.log("reeload");
      
      updateData();
      return () => {
  
      };
    }, [])
  );



  return (
  
<View style={[
  styles.mainContainer,
  DarkModeColors.BackGroundColor

  ]}>
<View
style={styles.verticalContainer}
>


  <View
  style={{alignContent: 'center',marginTop: "3%", width: width, justifyContent: 'center', alignItems: 'center'}}>
  
  {statData!==undefined ? (
   <BarChart
   data={statData}
   width={width * 0.9}
   height={200}
   yAxisLabel=""
   yAxisSuffix=" cards"
   xAxisLabel=""
   xLabelsOffset={2}
   chartConfig={{
     backgroundGradientFrom: darkModeBackgroundColor,
     backgroundGradientTo: darkModeBackgroundColor,
     color: (opacity = 1) => `${darkModePrimaryColor}`,
     decimalPlaces: 0,
   }}
 />
  
) : (
  <Text style={DarkModeColors.MainTextColor}>No weekly data available</Text>
)}


  
      </View>

        <Text
        style={styles.statText}
        >
          avarage flash cards a day: {Math.round(avgFlashCard*100)/100}
        </Text>
        <View 
        style={[
          styles.LineSeparator
        ]
        }
        />

<Text
        style={styles.statText}
        >
          Amount of decks: {amtOfDecks}
        </Text>
        <View 
        style={[
          styles.LineSeparator
        ]
        }
        />
</View>
</View>


  );
};
export default StatScreen;

