import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { DarkModeColors, darkModeBackgroundColor, darkModePrimaryColor, styles, width } from '../Styles';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';
import RecentDecksScreen from './RecentDecksScreen';
import FindDecksScreen from './FindDecksScreen';
import {BarChart} from "react-native-chart-kit";
import { FireBaseContext } from '../config/FireBaseContext';

interface StatScreenProps{
  navigation: any;
}
const Tab = createMaterialTopTabNavigator();


const StatScreen= (props: StatScreenProps)=>{

const {getAmtOfDecks,getAvgFlashCards, getStatData}= useContext(FireBaseContext);

const statData=getStatData();

  const avgFlashCard=getAvgFlashCards();
  const amtOfDecks=getAmtOfDecks();






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
  <BarChart
        data={statData}
        width={width*0.9}
        height={200}
        yAxisLabel=""
        yAxisSuffix=' cards'
        xAxisLabel=''
        xLabelsOffset={2}
        chartConfig={{
          backgroundGradientFrom: darkModeBackgroundColor,
          backgroundGradientTo: darkModeBackgroundColor,
          color: (opacity = 1) => `${darkModePrimaryColor}`,
          decimalPlaces: 0,
          
        }}
      />
      </View>

        <Text
        style={styles.statText}
        >
          avrage flash cards a day: {avgFlashCard}
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

