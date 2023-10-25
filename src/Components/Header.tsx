import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { darkModePrimaryColor, styles, width } from '../Styles';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NotificationIcon  from '../../assets/notifications-sharp.svg'

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


            <View
            style={styles.headerButton}>
            <TouchableOpacity
            onPress={OpenNotification}
            >
            <NotificationIcon width={width/11} height={width/11} fill={darkModePrimaryColor} />
            </TouchableOpacity>
            </View>
    )
};

export default Header;