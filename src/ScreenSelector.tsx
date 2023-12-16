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
import CameraScreen from './Screens/CameraScreen';
import FilePickerScren from './Screens/FilePickerScren';

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
    initialRouteName="Statistic"
   
   screenOptions={
    {overlayColor: 'transparent',
        headerTitle: (props)=> <Header {...props}/>,
        drawerType: 'slide',
        swipeEnabled: false
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
        //headerTitle: (props)=> <Header {...props} />,
    drawerItemStyle: {display: 'none'},
   // headerTitle: () => <WorkHeader navigation={navigation} />,
    headerLeft: null,
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


<Drawer.Screen name="Camera" component={CameraScreen} 
options={
    {
        headerShown: false,
    drawerItemStyle: {display: 'none'},
    

}


    }
/>

<Drawer.Screen name="FilePicker" component={FilePickerScren} 
options={
    {
        headerShown: false,
    drawerItemStyle: {display: 'none'},
}
    }
/>

</Drawer.Navigator>

);

}


export default ScreenSelector;