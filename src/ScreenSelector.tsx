import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from './Styles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen from './Screens/HomeScreen';
import DeckViewScreen from './Screens/DeckViewScreen';
import Header from './Components/Header';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

const ScreenSelector=()=>{
 /*
return (
    <View>
        <Text>
            sreen selctor
        </Text>
    </View>
)

*/

return(


   
<Drawer.Navigator>
<Drawer.Screen name="Decks" component={HomeScreen} />


</Drawer.Navigator>

);

}


export default ScreenSelector;