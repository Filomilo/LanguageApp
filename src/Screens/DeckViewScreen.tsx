import { StatusBar } from 'expo-status-bar';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  DarkModeColors,
  darkModeBackgroundColor,
  darkModeHeaderColor,
  darkModeMainTextColor,
  darkModePrimaryColor,
  darkModeTextInputColor,
  height,
  styles,
  width,
} from '../Styles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import EditButton from '../../assets/Edit_fill.svg';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import {
  SafeAreaFrameContext,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { DrawerLayout, FlatList, Switch } from 'react-native-gesture-handler';
import TestScreen from './TestScreen';
import StatScreen from './StatScreen';
import { db } from '../config/firebase-config';
import { onValue, ref } from 'firebase/database';
import Arrow from '../../assets/Arrow.svg';
import ArrowReturn from '../../assets/arrow-u-left-bottom.svg';
import Brain from '../../assets/bx-brain.svg';
import Save from '../../assets/Save.svg';
import { TextInput } from 'react-native-gesture-handler';
import DeckButton from '../Components/DeckButton';
import Trash from '../../assets/Trash.svg';
import { Dropdown } from 'react-native-element-dropdown';
import { FireBaseContext } from '../config/FireBaseContext';
import AddButton from '../../assets/Add_button.svg';
import { serializer } from '../../metro.config';
import LoadingScreen from './LoadingScreen';

const testData = [{ label: 'eng' }, { label: 'pl' }];

interface DeckViewScreenProps {
  navigation: any;
}

const DeckViewScreen = (props) => {
  const { getDeckData, saveDeckData, getIsCapableOfEdit } =
    useContext(FireBaseContext);
  const [deckData, setDeckData] = useState({ name: '' });

  const [modalVisible, setModalVisible] = useState(false);
  const [testVisible, setTestVisible] = useState(false);
  const [isEditing, setIsEdiing] = useState(false);
  const [isCapaableOfEdit, setIsCapaableOfEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  const switchIsSearchable=(state: boolean)=>
  {
    //console.log("Switch: "+ state);
    //console.log(JSON.stringify(deckData));
    tmpDeckData={...deckData};
    tmpDeckData.visibilty=!deckData.visibilty;
    setDeckData(tmpDeckData);
  }


  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = props.navigation.addListener('focus', () => {
      setDeckData({ name: '' });
      //console.log('(*******************************************');
      const fetchData = async () => {
        setIsEdiing(false);
        const data = await getDeckData(props.route.params.deckId);
        setDeckData(data);
        setIsCapaableOfEdit(getIsCapableOfEdit(data.index));
      };
      fetchData();
      setIsLoading(false);
    });

    return unsubscribe;
  }, [props.route]);

const goBack=()=>{
  //console.log("go")
  props.navigation.goBack();
}


  const setDeckName = async (name: string) => {
    //console.log(deckData.name);
    setDeckData({ ...deckData, name: name });
  };

  const closeTest = () => {
    setTestVisible(false);
  };

  const onAddButton = () => {
    //console.log('aaaaaaaaaa');
    const newCards = [...deckData.cards, { word_1: '', word_2: '' }];

    const updatedDeckData = { ...deckData, cards: newCards };

    setDeckData(updatedDeckData);
  };


  const langChnage=async (langNum: number,item :any)=>
  {

   if(langNum==1)
   {
    //console.log("lang1");
    await setDeckData({ ...deckData, lang_1: item.label });
   }
   else
   {
    //console.log("lang2");
    await setDeckData({ ...deckData, lang_2: item.label });
   }

   //console.log(JSON.stringify(deckData));
   
  }


  const editButton = () => {
    //console.log('edit button');
    if (isEditing) saveDeckData(props.route.params.deckId, deckData);
    setIsEdiing(!isEditing);
  };

  const brainButton = () => {
    //console.log('brain button');
    setModalVisible(true);
  };

  const openFlashCards = () => {
    //console.log('openFlashCards');
    setModalVisible(false);
    let deck={...deckData};
    //console.log("new dekc opne flashcarada          new dekc opne flashcarada     new dekc opne flashcarada     new dekc opne flashcarada     new dekc opne flashcarada ")
    //console.log(deck)
    //console.log("new dekc opne flashcarada          new dekc opne flashcarada     new dekc opne flashcarada     new dekc opne flashcarada     new dekc opne flashcarada ")
    props.navigation.navigate('FlashCards',{"deck": {deck}});
  };
  const openTest = () => {
    //console.log('open Test');
    setModalVisible(false);
    setTestVisible(true);
  };

  const removeItem = (index) => {
    if (deckData.cards.length > 1) {
      let arrayTmp: any[] = deckData.cards;
      arrayTmp.splice(index, 1);
      setDeckData({ ...deckData, cards: arrayTmp });
    }
  };

  const onTextChane = (text: string, index: number, word: number) => {
    // //console.log("txt: "+ text+ "  index: " + index+ " word: "+ word);
    let arrayTmp = deckData.cards;
    ////console.log(arrayTmp);
    if (word == 0) arrayTmp[index].word_1 = text;
    else arrayTmp[index].word_2 = text;

    setDeckData({ ...deckData, cards: arrayTmp });

    ////console.log(deckData);
  };

  const WordsPreview = (props) => {
    return (
      <View>
        <View style={styles.horizontalContainer}>
          <Text style={[DarkModeColors.MainTextColor, styles.langWords]}>
            {props.item.word_1}
          </Text>

          <Arrow
            width={width / 6}
            height={height * 0.045}
            fill={darkModeMainTextColor}
          />

          <Text style={[DarkModeColors.MainTextColor, styles.langWords]}>
            {props.item.word_2}
          </Text>
        </View>
        <View
          style={[
            styles.LineSeparator,
            DarkModeColors.primaryColor,
            {
              width: width * 0.9,
              marginHorizontal: (width * 0.1) / 2,
              height: height * 0.001,
            },
          ]}
        />
      </View>
    );
  };

  const onOutisedeModal = () => {
    setModalVisible(false);
  };

  const WordsEditing = (props) => {
    const [focusText1, setFocusText1] = useState(props.item.word_1);
    const [focusText2, setFocusText2] = useState(props.item.word_2);
    return (
      <View>
        <View style={styles.horizontalContainer}>
          <TextInput
            key={`word1_${props.index}`}
            onEndEditing={() => {
              onTextChane(focusText1, props.index, 0);
            }}
            value={focusText1}
            onChangeText={setFocusText1}
            // onFocus={()=>{onTextFocus(props.index,0)}}
            // onBlur={()=>{onBlur()}}
            style={[
              DarkModeColors.MainTextColor,
              styles.langWords,
              DarkModeColors.TextInputColorBackground,
            ]}
          ></TextInput>

          <Arrow
            width={width / 6}
            height={height * 0.045}
            fill={darkModeMainTextColor}
          />

          <TextInput
            key={`word2_${props.index}`}
            onEndEditing={() => {
              onTextChane(focusText2, props.index, 1);
            }}
            value={focusText2}
            onChangeText={setFocusText2}
            style={[
              DarkModeColors.MainTextColor,
              styles.langWords,
              DarkModeColors.TextInputColorBackground,
            ]}
          ></TextInput>
          <TouchableOpacity
            onPress={() => {
              removeItem(props.index);
            }}
          >
            <Trash
              width={width / 15}
              height={width / 9}
              fill={darkModePrimaryColor}
            />
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.LineSeparator,
            DarkModeColors.primaryColor,
            {
              width: width * 0.9,
              marginHorizontal: (width * 0.1) / 2,
              height: height * 0.001,
            },
          ]}
        />
      </View>
    );
  };

  const ModalWindow = () => {
    return (
      <Modal visible={modalVisible} transparent={true}>
        <Pressable
          onPress={() => {
            onOutisedeModal();
          }}
        >
          <View style={{ width: width, height: height }}>
            <View
              style={[
                styles.mainContainer,
                {
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.0)',
                },
              ]}
            >
              <View
                style={{
                  width: width * 0.8,
                  height: height * 0.2,
                }}
              >
                <View
                  style={[
                    styles.popPopButton,
                    {
                      borderBottomWidth: width * 0.001,
                    },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => {
                      openFlashCards();
                    }}
                  >
                    <Text
                      style={[
                        styles.langageText,
                        DarkModeColors.primaryColorText,
                      ]}
                    >
                      Flash Cards
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={[
                    styles.popPopButton,
                    {
                      borderTopWidth: width * 0.001,
                    },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => {
                      openTest();
                    }}
                  >
                    <Text
                      style={[
                        styles.langageText,
                        DarkModeColors.primaryColorText,
                      ]}
                    >
                      Test
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
    );
  };

  if (!isLoading)
    return (

      <View style={[styles.mainContainer, DarkModeColors.BackGroundColor]}>
        <ModalWindow />

        <Modal visible={testVisible}>
          <View style={[styles.mainContainer, {}]}>
            <TestScreen close={closeTest} cards={deckData.cards} />
          </View>
        </Modal>
      <View
      style={{
        position: 'absolute',
        width: width,
        height: height,
        flex: 1,
        
      }}
      >
        <TouchableOpacity onPress={editButton}>
          <View style={styles.rightUpperDeckButton}>
            {isCapaableOfEdit ? (
              isEditing ? (
                <>
                  <Save
                    width={width / 9}
                    height={width / 9}
                    fill={darkModePrimaryColor}
                  />
                </>
              ) : (
                <>
                  <EditButton
                    width={width / 9}
                    height={width / 9}
                    fill={darkModePrimaryColor}
                  />
                </>
              )
            ) : (
              <></>
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.verticalContainer}>
          <View style={styles.deckViewTitleContainer}>
            {isEditing ? (
              <>
                <TextInput
                  onChangeText={setDeckName}
                  cursorColor={darkModePrimaryColor}
                  style={[
                    styles.deckViewTitleText,
                    DarkModeColors.primaryColorText,
                    DarkModeColors.TextInputColorBackground,
                  ]}
                  value={deckData.name}
                />
              </>
            ) : (
              <>
                <Text
                  style={[
                    styles.deckViewTitleText,
                    DarkModeColors.primaryColorText,
                  ]}
                >
                  {deckData.name}
                </Text>
              </>
            )}

            <View style={[styles.LineSeparator, DarkModeColors.primaryColor]} />
            {isEditing ? (
              <>
              <View style={{flexWrap: 'wrap', width: width, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[styles.optionActionText]}>
                  is visible: 
                </Text>
               <Switch
               style={{}}
        trackColor={{false: darkModeHeaderColor, true: darkModePrimaryColor}}
        thumbColor={darkModeTextInputColor}
        ios_backgroundColor="#3e3e3e"
        onValueChange={switchIsSearchable}
        value={deckData.visibilty}
      />
      </View>
                <View style={[styles.horizontalContainer, {height: '5%'}]}>
                  <Dropdown
                    data={testData}
                    labelField="label"
                    valueField="label"
                    onChange={(item) => {
                      langChnage(1,item);
                    }}
                    style={[
                      styles.langageText,
                      {
                        width: width * 0.4,
                      },
                    ]}
                    selectedTextStyle={[
                      styles.langageText,
                      DarkModeColors.MainTextColor,
                    ]}
                    value={deckData.lang_1}
                    itemContainerStyle={[DarkModeColors.BackGroundColor]}
                    itemTextStyle={DarkModeColors.MainTextColor}
                    activeColor={darkModeTextInputColor}
                  />
                  <Dropdown
                    data={testData}
                    labelField="label"
                    valueField="label"
                    onChange={(item) => {
                      langChnage(2,item);
                    }}
                    style={[
                      styles.langageText,
                      {
                        width: width * 0.4,
                      },
                    ]}
                    selectedTextStyle={[
                      styles.langageText,
                      DarkModeColors.MainTextColor,
                    ]}
                    value={deckData.lang_2}
                    itemContainerStyle={[DarkModeColors.BackGroundColor]}
                    itemTextStyle={DarkModeColors.MainTextColor}
                    activeColor={darkModeTextInputColor}
                  />
                </View>
              </>
            ) : (
              <>
                <View style={[styles.horizontalContainer, {}]}>
                  <Text
                    style={[styles.langageText, DarkModeColors.MainTextColor]}
                  >
                    {deckData.lang_1}
                  </Text>
                  <Text
                    style={[styles.langageText, DarkModeColors.MainTextColor]}
                  >
                    {deckData.lang_2}
                  </Text>
                </View>
              </>
            )}
          </View>

          <View
            style={{
              flex: 1,
            }}
          >
            {isEditing ? (
              <>
                <FlatList
                  data={deckData.cards}
                  renderItem={({ item, index }) => (
                    <WordsEditing
                      item={item}
                      index={index}
                      isEditing={isEditing}
                    />
                  )}
                  style={{}}
                />
                <Pressable
                  onPress={() => {
                    onAddButton();
                  }}
                >
                  <View
                    style={{
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      marginBottom: width / 20,
                      marginTop: width / 30,
                    }}
                  >
                    <AddButton
                      width={width / 7}
                      height={width / 7}
                      fill={darkModePrimaryColor}
                    />
                  </View>
                </Pressable>
              </>
            ) : (
              <>
                <FlatList
                  data={deckData.cards}
                  renderItem={({ item }) => (
                    <WordsPreview item={item} isEditing={isEditing} />
                  )}
                  style={{
                    flex: 2,
                    height: height * 0.9,
                    width: width,
                    flexWrap: 'wrap',
                  }}
                />
              </>
            )}
          </View>
        </View>

        <View style={[styles.BottomButtonsContainer, {}]}>
          <TouchableOpacity onPress={()=>{goBack()}}>
            <View style={[DarkModeColors.primaryColor, styles.BottomButton]}>
              <ArrowReturn
                width={width / 11}
                height={width / 11}
                fill={darkModePrimaryColor}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              brainButton();
            }}
          >
            <View style={[DarkModeColors.primaryColor, styles.BottomButton]}>
              <Brain
                width={width / 11}
                height={width / 11}
                fill={darkModePrimaryColor}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      </View>
 
    );
  else {
    return <LoadingScreen />;
  }
};
export default DeckViewScreen;
