import { StatusBar } from 'expo-status-bar';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { DarkModeColors, darkModeBackgroundColor, darkModeMainTextColor, darkModePrimaryColor, darkModeTextInputColor, height, styles, width } from '../Styles';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React, { useContext, useEffect, useState } from 'react';
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
import { FireBaseContext } from '../config/FireBaseContext';


const testData = [
  { label: 'eng' },
  { label: 'pl' },
];


interface DeckViewScreenProps{ 
  navigation: any;
}







const DeckViewScreen= (props)=>{


  const {getDeckData,saveDeckData}=useContext(FireBaseContext)
const [deckData,setDeckData]= useState({name: ''})  

  const [modalVisible, setModalVisible] = useState(false);
  const [testVisible, setTestVisible] = useState(false);
  const [isEditing, setIsEdiing]= useState(false);

  useEffect(() => {
  
    const fetchData = async () => {
      
        const data =await getDeckData(props.route.params.deckId);
        setDeckData(data);
      
    }
    fetchData();

  

    },[]);
 


const setDeckName= async (name: string)=>{
  console.log(deckData.name);
  setDeckData({...deckData,"name": name});
}



  const closeTest=()=>{
    setTestVisible(false)
  }

  const editButton=()=>{
    console.log("edit button");
    if(isEditing)
    saveDeckData(props.route.params.deckId,deckData)
    setIsEdiing(!isEditing)
  }

const brainButton=()=>{
  console.log("brain button");
  setModalVisible(true);
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
 


   const removeItem=(index)=>{
    let arrayTmp: any[]=deckData.cards;
    arrayTmp.splice(index,1);
    setDeckData({...deckData, "cards": arrayTmp});

   }

  const onTextChane=(text: string, index: number, word: number)=>{
    console.log("txt: "+ text+ "  index: " + index+ " word: "+ word);
    let arrayTmp=deckData.cards;
    console.log(arrayTmp);
    if(word==0)
    arrayTmp[index].word_1=text;
  else
  arrayTmp[index].word_2=text;

  setDeckData({...deckData,cards: arrayTmp});
  console.log(deckData);
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
    const [focusText1,setFocusText1] = useState(props.item.word_1)
    const [focusText2,setFocusText2] = useState(props.item.word_2)
   return(
     <View>
       
     <View
     style={
       styles.horizontalContainer
     }
     >
   
       <TextInput
         key={`word1_${props.index}`}
         onEndEditing={()=>{onTextChane(focusText1, props.index, 0)}}
         value={focusText1}
         onChangeText={setFocusText1}
      // onFocus={()=>{onTextFocus(props.index,0)}}
      // onBlur={()=>{onBlur()}}
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
         key={`word2_${props.index}`}
         onEndEditing={()=>{onTextChane(focusText1, props.index, 1)}}
         value={focusText2}
         onChangeText={setFocusText2}
           style={
             [
               DarkModeColors.MainTextColor,
               styles.langWords,
               DarkModeColors.TextInputColorBackground
             ]
           }
       >
         
         
       </TextInput>
         <TouchableOpacity
         onPress={()=>{removeItem(props.index)}}
         >
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













  return (

<SafeAreaView style={[styles.mainContainer,DarkModeColors.BackGroundColor]}>



<Modal
visible={testVisible}
>

<View
style={[
  styles.mainContainer,
  {

  }
]}
>
<TestScreen close={closeTest} />
</View>

</Modal>

<Modal
visible={modalVisible}
transparent={true}
>

<View
style={[
  styles.mainContainer,
  {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }
]}
>
<View

style={
  {
  
    width: width*0.8,
    height: height*0.2
  }
}
>

<View
style={[styles.popPopButton,{
  borderBottomWidth: width*0.001,

}]}
>
<TouchableOpacity
onPress={()=>{openFlashCards()}}
>
    <Text
    style={
      [
        styles.langageText,
        DarkModeColors.primaryColorText
      
      ]
    }
    >
      Flash Cards
    </Text>
    </TouchableOpacity>

</View>


<View
style={[styles.popPopButton,{
  borderTopWidth: width*0.001,
  
}]}
>
<TouchableOpacity
onPress={()=>{openTest()}}
>
<Text
style={[
  styles.langageText,
  DarkModeColors.primaryColorText

]

}
>
      Test
    </Text>
</TouchableOpacity>

</View>



</View>
</View>
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
onChangeText={setDeckName}
cursorColor={darkModePrimaryColor}
style={[styles.deckViewTitleText,DarkModeColors.primaryColorText,DarkModeColors.TextInputColorBackground]}
value={deckData.name}
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

<View
style={
  {
    flex: 1
  }
}
>
{
(isEditing?(
<>
<FlatList 
  data={deckData.cards}
  renderItem={({ item,index }) => (
    <WordsEditing 
    item={item}
    index={index}
     isEditing={isEditing}
     />
  )}
    style={{
      
     
      
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
      flex: 2,
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
     <ArrowReturn width={width/11} height={width/11} fill={darkModePrimaryColor} />


  </View>
</TouchableOpacity>


<TouchableOpacity
onPress={()=>{brainButton()}}
>
  <View
  style={[
    DarkModeColors.primaryColor,
    styles.BottomButton,
  ]
  }
  >
      <Brain width={width/11} height={width/11} fill={darkModePrimaryColor} />


  </View>
</TouchableOpacity>

</View>

</SafeAreaView>

  );
};
export default DeckViewScreen;

