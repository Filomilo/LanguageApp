import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View,Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface DeckButtonProps{
    name: string;
  }

const  DeckButton=(props)=> {
    console.log(JSON.stringify(props))

    const name=props.item.name;
    const id=props.item.Id

    const buttonPress=()=>
    {
        console.log("Deck button prees" + id)
        props.buttonPress();
    }

    return (
        <TouchableOpacity
        onPress={buttonPress}
        >
      <View>
        <Text>
            {JSON.stringify(props)}
-----------------------------------------------------
        </Text>
      </View>
      </TouchableOpacity>
    );
  }

  export  default  DeckButton;