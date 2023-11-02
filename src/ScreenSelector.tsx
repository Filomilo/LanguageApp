import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { styles,darkModeHeaderColor, DarkModeColors, darkModePrimaryColor, darkModeMainTextColor, width } from './Styles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen from './Screens/HomeScreen';
import DeckViewScreen from './Screens/DeckViewScreen';
import Header from './Components/Header';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './Components/CustomDrawer'
import StatScreen from './Screens/StatScreen';
import FriendsScreen from './Screens/FriendsScreen';
import SettingsScreen from './Screens/SettingsScreen';
import NotificationScreen from './Screens/NotificationScreen';
import FlashCardScreen from './Screens/FlashCardScreen';
import ContactInfo from './Screens/ContactInfo';

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
// options={{ headerTitle: (props) => <LogoTitle {...props} /> }}


<Drawer.Navigator
   drawerContent={props=> <CustomDrawer {...props}
    
   
   screenOptions={
    {overlayColor: 'transparent',
        headerTitle: (props)=> <Header {...props}/>,
   
}
}
 
    
   />}>
<Drawer.Screen 
name="Decks" 
component={HomeScreen} 

options={
    {
        drawerLabelStyle:{
            color: darkModePrimaryColor,
            fontSize: width*0.05
        },
        drawerActiveTintColor: darkModePrimaryColor,
    headerTintColor: darkModePrimaryColor,
    headerPressColor: darkModePrimaryColor,
    headerTitle: (props)=> <Header {...props}  />,
    headerStyle: {
        backgroundColor: darkModeHeaderColor,
    }}
    
    }
 />
<Drawer.Screen name="Statistic" component={StatScreen} 
options={
    {
        drawerLabelStyle:{
            color: darkModePrimaryColor,
            fontSize: width*0.05
        },
        drawerActiveTintColor: darkModePrimaryColor,
    headerTintColor: darkModePrimaryColor,
    headerPressColor: darkModePrimaryColor,
    headerTitle: (props)=> <Header {...props}  />,
    headerStyle: {
        backgroundColor: darkModeHeaderColor
    }}
    }
/>
<Drawer.Screen name="Friends" component={FriendsScreen} 
options={
    {
        drawerLabelStyle:{
            color: darkModePrimaryColor,
            fontSize: width*0.05
        },
        drawerActiveTintColor: darkModePrimaryColor,
    headerTintColor: darkModePrimaryColor,
    headerPressColor: darkModePrimaryColor,
    headerTitle: (props)=> <Header {...props}  />,
    headerStyle: {
        backgroundColor: darkModeHeaderColor
    }}
    }
/>
<Drawer.Screen name="Options" component={SettingsScreen} 
options={
    {
        drawerLabelStyle:{
            color: darkModePrimaryColor,
            fontSize: width*0.05
        },
        drawerActiveTintColor: darkModePrimaryColor,
        headerTintColor: darkModePrimaryColor,
        headerPressColor: darkModePrimaryColor,
        headerTitle: (props)=> <Header {...props}/>,
    headerStyle: {
        backgroundColor: darkModeHeaderColor
    }}
    }
/>
<Drawer.Screen name="Notifications" component={NotificationScreen} 
options={
    {
        drawerLabelStyle:{
            color: darkModePrimaryColor,
            fontSize: width*0.05
        },
        drawerActiveTintColor: darkModePrimaryColor,
        drawerInactiveTintColor: darkModeMainTextColor,
    headerTintColor: darkModePrimaryColor,
    headerPressColor: darkModePrimaryColor,
    drawerItemStyle: {display: 'none'},
    headerTitle: (props)=> <Header {...props}  />,
    headerStyle: {
        backgroundColor: darkModeHeaderColor
    }}
    }
/>
<Drawer.Screen name="DeckView" component={DeckViewScreen} 
options={
    {
        headerTintColor: darkModePrimaryColor,
        headerPressColor: darkModePrimaryColor,
        headerTitle: (props)=> <Header {...props} />,
    drawerItemStyle: {display: 'none'},
    headerStyle: {
        backgroundColor: darkModeHeaderColor
    }
}

    
    }
/>

<Drawer.Screen name="FlashCards" component={FlashCardScreen} 
options={
    {
        headerTintColor: darkModePrimaryColor,
        headerPressColor: darkModePrimaryColor,
        headerTitle: (props)=> <Header {...props} />,
    drawerItemStyle: {display: 'none'},
    
    headerStyle: {
        backgroundColor: darkModeHeaderColor,
        
    }
}

    
    }
/>


<Drawer.Screen name="ContactInfo" component={ContactInfo} 
options={
    {
        headerTintColor: darkModePrimaryColor,
        headerPressColor: darkModePrimaryColor,
        headerTitle: (props)=> <Header {...props} />,
    drawerItemStyle: {display: 'none'},
    
    headerStyle: {
        backgroundColor: darkModeHeaderColor,
        
    }
}

    
    }
/>


</Drawer.Navigator>

);

}


export default ScreenSelector;