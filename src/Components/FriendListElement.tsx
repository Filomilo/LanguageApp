import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native';
import { DarkModeColors, darkModePrimaryColor, styles, width } from '../Styles';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AddContactIcon from '../../assets/addContact.svg'


const FriendListElement=(props)=>{
    const navigation = useNavigation();

    const addContact=()=>{
        console.log("add conatct")
        props.addFunction();
    }

    const clickContact=()=>{
        props.clickFunction();
    }


    const WholeElement=()=>{
        return(
            <View
            style={
             {
                 flexDirection: 'row',
                 alignContent: 'center',
                 alignItems: 'center'
             }
            }
            >
            <Image 
        source={{uri: props.imageUri}}
        style={[styles.proflePicList]}
        />
             <Text
             style={[styles.langWords, DarkModeColors.MainTextColor]}
             >
                 {props.name}
             </Text>
 
             {props.isAddable?(<> 
            
            <View
             style={{
                 flex: 1,
                 alignContent: 'flex-end',
                 justifyContent: 'flex-end',
                 alignItems: 'flex-end',
                 marginHorizontal: width*0.1
             }}
             >
                 <TouchableOpacity
                 onPress={()=>{addContact()}}
                 >
             <AddContactIcon width={width/9} height={width/9} fill={darkModePrimaryColor} />
             </TouchableOpacity>
            
            </View>
            
            </>):(<> 
            <View>
 
            </View>
            </>)}
 
             
 
            </View>
        )
    }


    return(
        <View>
         
         {props.isClickable ? (
  <TouchableOpacity
  onPress={()=>{clickContact()}}
  >
  <WholeElement />
  </TouchableOpacity>
) : (
<WholeElement />
)}
           

            <View 
            style={[
                styles.LineSeparator,
                {
                    width: width*0.9
                }
            ]}
            />
        </View>
    )
};

export default FriendListElement;