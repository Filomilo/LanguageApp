
import { StyleSheet, Text, View,StatusBar } from 'react-native';
import { styles } from './Styles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen from './Screens/HomeScreen';
import DeckViewScreen from './Screens/DeckViewScreen';
import Header from './Components/Header';
import ScreenSelector from './ScreenSelector';
import { auth } from './config/firebase-config'
import { onAuthStateChanged } from 'firebase/auth';
import { FireBaseContext,FireBaseProvider } from './config/FireBaseContext';


const Stack = createStackNavigator();


const MainScreen=()=>{


   const {isLogged} = useContext(FireBaseContext);

/*
   function changeOnAuth(NewUser){
      setUser(user)
   }

   useEffect(() => {
       console.log("Mounted"); 
       StatusBar.setTranslucent(true)
       StatusBar.setBarStyle('light-content');
      
      },[]);


*/

return(

<NavigationContainer>
<Stack.Navigator>
{
(isLogged ?(
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

function componentDidMount() {
   throw new Error('Function not implemented.');
}
