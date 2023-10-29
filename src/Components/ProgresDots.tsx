import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { darkModeBackgroundColor, darkModePrimaryColor, darkModeTextInputColor, styles, width } from '../Styles';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import NotificationIcon  from '../../assets/notifications-sharp.svg'

const ProgresDots=(props)=>{

    let dotMap=[];

    for(let i=0; i< props.progresMaxs;i++)
    {
    dotMap.push({val: i<props.progressDots})
    }

const dotWidth=width/props.progresMaxs>width*0.2?20:width/props.progresMaxs;

    return(

<View>

        <View
        style={
            [
                {
                    width: width,
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    

                }
            ]
        }
        >

<FlatList 
data={dotMap} 
horizontal= {true}
contentContainerStyle={{
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    width: width

}}
renderItem={(item)=>{
    return(
   <View
   style={[
    styles.dotStyle,
    {
        
        alignSelf: 'center',
        width: dotWidth,
        height: dotWidth,

        backgroundColor: item.item.val===true? darkModePrimaryColor:darkModeTextInputColor

    }
]}
   >
    </View>
    )
}}/>
        </View>


            </View>
    )
};

export default ProgresDots;