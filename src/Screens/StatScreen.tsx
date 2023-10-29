import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { DarkModeColors, darkModeBackgroundColor, darkModePrimaryColor, styles, width } from '../Styles';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';
import RecentDecksScreen from './RecentDecksScreen';
import FindDecksScreen from './FindDecksScreen';
import {BarChart} from "react-native-chart-kit";

interface StatScreenProps{
  navigation: any;
}
const Tab = createMaterialTopTabNavigator();


const StatScreen= (props: StatScreenProps)=>{

  const data = {
    labels: ["01.8.10", "02.10", "03.10", "04.10", "05.10", "06.10", "07.10"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43,2]
      }
    ]
  };

  const avgFlashCard=34.3;
  const amtOfDecks=33;






  return (
  
<View style={[
  styles.mainContainer,
  DarkModeColors.BackGroundColor

  ]}>
<View
style={styles.verticalContainer}
>


  
  <BarChart
        data={data}
        width={width}
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

