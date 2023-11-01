import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View,Text,TouchableOpacity } from "react-native";

import { DarkModeColors, styles } from "../Styles";

interface DeckButtonProps{
    name: string;
  }

const  DeckButton=(props: { item: { name: any; Id: any; }; buttonPress: () => void; })=> {
    console.log(JSON.stringify(props))



    const buttonPress=()=>
    {
       // console.log("Deck button prees" + id)
        props.buttonPress();
    }

    return (
        <TouchableOpacity
        onPress={buttonPress}
        >
      <View
      style={styles.DeckButtonContainer}
      
      >
        <View style={{
          flex: 1,
          //backgroundColor: 'yellow'
        }}>
          <Text
          style={styles.DeckTitleStyle}
          >
            {props.deckTitle}
          </Text>

          <Text
          style={styles.DeckParamText}
          >
            Made by:  {props.author}
          </Text>
          <View
           style={{
            flex: 1,
            flexDirection: 'row',
            alignContent: 'flex-end',
            alignItems: 'flex-end'
          }}
          >

          {
            props.showLastUsed?(<> 
             <Text 
           style={styles.DeckParamText}
          >
            Last used: {props.lastUsed} days ago
          </Text>
            </>):(
              <>
              
              </>
            )
          }
         
          
          </View>
        </View>
        <View style={{
          flex: 1,
          alignContent: 'flex-end',
          alignItems: 'flex-end'
          //backgroundColor: 'orange'
        }}>
         <Text
         style={styles.DeckLangText}
         >
            {props.lang_1}       {props.lang_2}
          </Text>
          <View
          style={{
            flex: 1,
            alignContent:'flex-end',
            alignItems: 'flex-end',
            flexDirection: 'row'
          }}
          >
          <Text
          style={
            styles.DeckCardText
          }
          >
            {props.amtOfCards} cards
          </Text>
          </View>

        </View>

      </View>
      </TouchableOpacity>
    );
  }

  export  default  DeckButton;