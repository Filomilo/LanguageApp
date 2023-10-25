import { StatusBar } from 'expo-status-bar';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { DarkModeColors, darkModeBackgroundColor, darkModeMainTextColor, darkModePrimaryColor, darkModeTextInputColor, height, styles, width } from '../Styles';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react';
import {  TouchableOpacity } from 'react-native';
import EditButton  from '../../assets/Edit_fill.svg'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';
import { DrawerLayout, FlatList } from 'react-native-gesture-handler';
import TestScreen from './TestScreen';
import StatScreen from './StatScreen';
import { db } from '../config/firebase-config';
import { onValue, ref } from 'firebase/database';
import Arrow  from '../../assets/Arrow.svg'
import ArrowReturn  from '../../assets/arrow-u-left-bottom.svg'
import Brain  from '../../assets/bx-brain.svg'
import Save  from '../../assets/Save.svg'
import { TextInput } from 'react-native-gesture-handler';
import DeckButton from '../Components/DeckButton';
import Trash from '../../assets/Trash.svg'
import { Dropdown } from 'react-native-element-dropdown';


const testData = [
  { label: 'eng' },
  { label: 'pl' },
  { label: 'Item 3' },
  { label: 'Item 4'},
  { label: 'Item 5'},
  { label: 'Item 6'},
  { label: 'Item 7'},
  { label: 'Item 8'},
];


interface DeckViewScreenProps{ 
  navigation: any;
}


const WordsPreview= (props)=>
{

return(
  <View>
    
  <View
  style={
    styles.horizontalContainer
  }
  >



    

    <Text
    style={
      [
        DarkModeColors.MainTextColor,
        styles.langWords
      ]
    }
    >
    {props.item.word_1}
    </Text>
    










    <Arrow width={width/6} height={height*0.045} fill={darkModeMainTextColor} />
 




      <Text
        style={
          [
            DarkModeColors.MainTextColor,
            styles.langWords,
          ]
        }
    >
          {props.item.word_2}
      
    </Text>
 





  </View>
       <View 
       style=
       {
         [
           styles.LineSeparator,
           DarkModeColors.primaryColor,
           {width: width*0.9,
            marginHorizontal: width*0.1/2,
            height: height*0.001
          }
          
         ]
       }
       />
       </View>
)
}


const WordsEditing= (props)=>
{

return(
  <View>
    
  <View
  style={
    styles.horizontalContainer
  }
  >

    <TextInput
    style={
      [
        DarkModeColors.MainTextColor,
        styles.langWords,
        DarkModeColors.TextInputColorBackground
      ]
    }
    >
    </TextInput>
    


    <Arrow width={width/6} height={height*0.045} fill={darkModeMainTextColor} />
 
      <TextInput
        style={
          [
            DarkModeColors.MainTextColor,
            styles.langWords,
            DarkModeColors.TextInputColorBackground
          ]
        }
    >
      
      
    </TextInput>
      <TouchableOpacity>
    <Trash width={width/15} height={width/9}  fill={darkModePrimaryColor} />

    </TouchableOpacity>



  </View>
       <View 
       style=
       {
         [
           styles.LineSeparator,
           DarkModeColors.primaryColor,
           {width: width*0.9,
            marginHorizontal: width*0.1/2,
            height: height*0.001
          }
          
         ]
       }
       />
       </View>
)
}





const DeckViewScreen= (props: DeckViewScreenProps)=>{
  const [modalVisible, setModalVisible] = useState(false);
  const [testVisible, setTestVisible] = useState(false);



  const deckData=props.route.params.deckData;
  const [deckName, setDecName]= useState(deckData.name);
  const [isEditing, setIsEdiing]= useState(false);



  const learnDeck=()=>{
    setModalVisible(true)
  }

  const editDeck=()=>{
   console.log('edit deck')

  }

  const closeTest=()=>{
    setTestVisible(false)
  }

  const editButton=()=>{
    console.log("edit button");
    setIsEdiing(!isEditing)
  }

  const openFlashCards=()=>{
    console.log('openFlashCards')
    setModalVisible(false);
    props.navigation.navigate('FlashCards')
   }
   const openTest=()=>{
    console.log('open Test')
    setModalVisible(false)
    setTestVisible(true);
   }
 
  return (

<SafeAreaView style={[styles.mainContainer,DarkModeColors.BackGroundColor]}>
<Modal
visible={testVisible}
>
<TestScreen close={closeTest} />
</Modal>


<Modal
visible={modalVisible}
>


<TouchableOpacity
onPress={openFlashCards}
>
<Text>
  flashCards2a
</Text>
</TouchableOpacity>

<TouchableOpacity
onPress={openTest}
>
<Text>
  testa
</Text>
</TouchableOpacity>
</Modal>


<TouchableOpacity
onPress={editButton}
>
  <View
style={styles.rightUpperDeckButton}
>
  {
(isEditing?(
<>
<Save width={width/9} height={width/9}  fill={darkModePrimaryColor} />
</>
):
(
  <>
<EditButton width={width/9} height={width/9}  fill={darkModePrimaryColor} />
</>
)
)
}

</View>
</TouchableOpacity>
<View
style={styles.verticalContainer}
>


<View
style={styles.deckViewTitleContainer}
>

{
(isEditing?(
<>
<TextInput 
onChangeText={setDecName}
cursorColor={darkModePrimaryColor}
style={[styles.deckViewTitleText,DarkModeColors.primaryColorText,DarkModeColors.TextInputColorBackground]}
value={deckName}
/>

</>
):
(
  <>

<Text
style={[styles.deckViewTitleText,DarkModeColors.primaryColorText]}
>
  {deckData.name}
  
</Text>
</>
)
)
}

<View style={[styles.LineSeparator,DarkModeColors.primaryColor]} />
{
(isEditing?(
<>

<View 
style={[styles.horizontalContainer,{
}]}
>

<Dropdown
   data={testData}
   labelField="label"
   valueField="label"
    onChange={()=>{console.log('needs implemation')}}
style={[
                    styles.langageText,
                    {
                      width: width*0.40
                    },
                   
                  ]
                  }   
                  selectedTextStyle={[styles.langageText,DarkModeColors.MainTextColor]}
                  value=  {deckData.lang_1} 
itemContainerStyle={ [ DarkModeColors.BackGroundColor]}
itemTextStyle={DarkModeColors.MainTextColor}
activeColor={darkModeTextInputColor}
/>
<Dropdown
   data={testData}
   labelField="label"
   valueField="label"
    onChange={()=>{console.log('needs implemation')}}
style={[
                    styles.langageText,
                    {
                      width: width*0.40
                    },
                   
                  ]
                  }   
                  selectedTextStyle={[styles.langageText,DarkModeColors.MainTextColor]}
                  value=  {deckData.lang_2} 
itemContainerStyle={ [ DarkModeColors.BackGroundColor]}
itemTextStyle={DarkModeColors.MainTextColor}
activeColor={darkModeTextInputColor}
/>

</View>
</>
):
(
  <>
  

  <View 
style={[styles.horizontalContainer,{
}]}
>
  <Text
  style={[styles.langageText,DarkModeColors.MainTextColor]}>
    {deckData.lang_1}
  </Text>
  <Text
  style={[styles.langageText,DarkModeColors.MainTextColor]}>
    {deckData.lang_2}
    </Text>
</View>
</>
)
)
}




</View>



{
(isEditing?(
<>
<FlatList 
  data={deckData.cards}
  renderItem={({ item }) => (
    <WordsEditing 
    item={item}
     isEditing={isEditing}
     />
  )}
    style={{
      flex: 1,
      height: height*0.9,
      width: width,
      flexWrap: 'wrap',
      
    }}
  />
  



</>
):
(
  <>

<FlatList 
  data={deckData.cards}
  renderItem={({ item }) => (
    <WordsPreview 
    item={item}
     isEditing={isEditing}
     />
  )}
    style={{
      flex: 1,
      height: height*0.9,
      width: width,
      flexWrap: 'wrap',
      
    }}
  />
  
</>
)
)
}




</View>

<View
style={[
  styles.BottomButtonsContainer,
  {
     
  }
]
}
>
<TouchableOpacity>
  <View
   style={[
    DarkModeColors.primaryColor,
    styles.BottomButton,
  ]
  }
  >
     <ArrowReturn width={width/11} height={width/11} fill={darkModeBackgroundColor} />


  </View>
</TouchableOpacity>


<TouchableOpacity>
  <View
  style={[
    DarkModeColors.primaryColor,
    styles.BottomButton,
  ]
  }
  >
      <Brain width={width/11} height={width/11} fill={darkModeBackgroundColor} />


  </View>
</TouchableOpacity>

</View>
</SafeAreaView>

  );
};
export default DeckViewScreen;

