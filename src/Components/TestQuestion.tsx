

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { darkModePrimaryColor, height, styles, width } from '../Styles';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import RadioOFF  from '../../assets/radiobox-blank.svg'
import RadioON  from '../../assets/radiobox-marked.svg'


const TestQuestion=(props)=>{


    const [inputFiled,setInputField]= useState(props.data[props.index].filled);
    const [selectedID,setselectedID]= useState(props.data[props.index].selected);
    
    useEffect(()=>{
        console.log('chanage: s' + props.index)
        setselectedID(props.data[props.index].selected)
        setInputField( props.data[props.index].filled)
    },props.index)
    
    const setText=(txt)=>{
        setInputField(txt)
        console.log(txt)
        props.data[props.index].filled=txt;
        props.setData(props.data);
    }


    const selectItem=(id)=>{
        console.log(id)
        setselectedID(id)
        props.data[props.index].selected=id;
        props.setData(props.data);
    }


    if(props.data[props.index].type==="closed")
    return(

        <View>
            <Text>
               
                <FlatList
                 data={props.data[props.index].anwsers}
                 renderItem={(item)=>{
                        return(
                            <TouchableOpacity
                            onPress={()=>{
                                selectItem(item.item.id)}}
                            >
                            <View
                            style={
                                {
                                    width: width,
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    flexWrap: 'wrap',
                                    marginVertical: height*0.02,
                        
                                    height: height*0.05,
                                    
                                }
                            }
                            
                            >
                               {
  item.item.id ===selectedID ? (
    <RadioON width={width / 11} height={width / 11} fill={darkModePrimaryColor} />
  ) : (
    <RadioOFF width={width / 11} height={width / 11} fill={darkModePrimaryColor} />
  )
}
                            <Text
                            style={
                                styles.radioButtonText
                            }
                            >
                                {item.item.value}
                                </Text>
                                </View>
                                </TouchableOpacity>
                        )
                 }}
                 
                 />
            </Text>
        </View>
    )
    else
    {
        return(
            <View>
                <View
                style={
                    {
                        alignContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }
                }
                >
                    <TextInput
                    style={[
                        styles.textInput
                    ]}
                    onChangeText={setText}
                    value={inputFiled}
                    >

                    </TextInput>
                </View>
            </View>
        )
    }
};

export default TestQuestion;