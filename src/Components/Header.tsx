import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from '../Styles';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';



const Header=(props)=>{

    const showDrawer=()=>{
        console.log("show drawe22r");
        console.log(JSON.stringify(props))
        props.navigation.navigate("Login");
    }

    return(

        <View >
            <TouchableOpacity
            onPress={showDrawer}
            >
            <Text style={{fontSize: 20}}>
                show drawer
            </Text>
            </TouchableOpacity>
            </View>
    )
};

export default Header;