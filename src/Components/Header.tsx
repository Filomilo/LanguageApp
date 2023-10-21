import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from '../Styles';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Header=(props)=>{
    const navigation = useNavigation();

    const showDrawer=()=>{
        console.log("show drawe22r");
        console.log(JSON.stringify(navigation))
      
    }


    const OpenNotification=()=>{
        console.log("show Norificaiotn");
        console.log(JSON.stringify(navigation))
        navigation.navigate('Notifications');
        //props.navigation.navigate('Notifications')
       
    }

    return(

        <View >
   
            <TouchableOpacity
            onPress={OpenNotification}
            >
            <Text style={{fontSize: 20}}>
                show Notifcaiton
            </Text>
            </TouchableOpacity>
            </View>
    )
};

export default Header;