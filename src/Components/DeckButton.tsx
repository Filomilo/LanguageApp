import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View,Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DarkModeColors } from "../Styles";

interface DeckButtonProps{
    name: string;
  }

const  DeckButton=(props: { item: { name: any; Id: any; }; buttonPress: () => void; })=> {
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
        <Text
        style={DarkModeColors.MainTextColor}
        >
            {JSON.stringify(props)}
-----------------------------------------------------
        </Text>
      </View>
      </TouchableOpacity>
    );
  }

  export  default  DeckButton;