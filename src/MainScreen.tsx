import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from './Styles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen from './Screens/HomeScreen';
import DeckViewScreen from './Screens/DeckViewScreen';
import Header from './Components/Header';
import ScreenSelector from './ScreenSelector';

const Stack = createStackNavigator();


const MainScreen=()=>{

   const [isSignedIn, setIsSignIn]= useState(true);

return(
<NavigationContainer>
<Stack.Navigator>
{
(isSignedIn ?(
   <>
   <Stack.Screen
       name="ScreenSelector"
        component={ScreenSelector}
        options={{
           headerShown: false, 
           animationEnabled: false
        }} 
      />
   </>
):
<>
<Stack.Screen
       name="Login"
        component={LoginScreen}
        options={{
           headerShown: false, 
           animationEnabled: false
        }} 
      />
       <Stack.Screen
       name="Register"
        component={RegisterScreen}
        options={{
           headerShown: false, 
           animationEnabled: false
        }} 
      />
</>
)
}
</Stack.Navigator>
</NavigationContainer>
);
}


export default MainScreen;