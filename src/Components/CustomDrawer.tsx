import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import React from "react";
import { View,Text,Image } from "react-native";
import { darkModeBackgroundColor, darkModeHeaderColor, darkModePrimaryColor, height, styles, width } from "../Styles";
import DataBaseManager from "../config/DataBaseManager";



const  CustomDrawer=(props)=> {
    return (
      <DrawerContentScrollView {...props}
      style={
        {
          backgroundColor: darkModeHeaderColor
        }
      }
      >
        <View
        style={
          {
            height: height*0.2,
            backgroundColor: darkModeBackgroundColor,
            flexDirection: 'row'
          }
        }
        >
<Image 
       source={{uri: DataBaseManager.getProfilePic()}}
       style={[styles.proflePic,{
        width: width*0.32,
        height: width*0.32,
        alignSelf: 'flex-end'
       }]}
       />

        <Text
        style={[styles.SettingOptionText,
        {
          fontSize: height*0.03,
          alignSelf: 'flex-end'
        }
        ]}
        >
          {DataBaseManager.getUserName()}
          </Text> 
        </View>
        <DrawerItemList {...props}
  activeTintColor={darkModePrimaryColor}
  inactiveTintColor={darkModePrimaryColor}
        />
      </DrawerContentScrollView>
    );
  }

  export  default  CustomDrawer;