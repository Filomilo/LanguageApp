import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import {
  DarkModeColors,
  darkModePrimaryColor,
  darkModeTextInputColor,
  height,
  styles,
  width,
} from '../Styles';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import {
  SafeAreaFrameContext,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { db } from '../config/firebase-config';
import { initializeApp } from 'firebase/app';
import { DataSnapshot, getDatabase, onValue, ref } from 'firebase/database';
import { auth } from '../config/firebase-config';
import DeckButton from '../Components/DeckButton';
import AddButton from '../../assets/Add_button.svg';
import DataBaseManager from '../config/DataBaseManager';

const ContactInfo = (props) => {
  const id = props.id;

  const contactData = DataBaseManager.getContactInfo(id);

  return (
    <View style={styles.mainContainer}>
      {id === null ? (
        <>
          <Text>ERROR</Text>
        </>
      ) : (
        <>
          <View
            style={{
              height: height * 0.2,
              backgroundColor: darkModeTextInputColor,
              alignContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Image
              source={{ uri: contactData.photoUri }}
              style={[
                styles.proflePic,
                {
                  width: width * 0.32,
                  height: width * 0.32,
                  marginHorizontal: width * 0.03,
                },
              ]}
            />

            <Text
              style={[styles.DeckLangText, DarkModeColors.primaryColorText]}
            >
              {contactData.nick}
            </Text>
          </View>

          <FlatList
            data={contactData.decks}
            renderItem={({ item }) => (
              <DeckButton
                deckTitle={item.name}
                author={item.creator}
                lastUsed={9}
                amtOfCards={item.cards.length}
                lang_1={item.lang_1}
                lang_2={item.lang_2}
                showLastUsed={true}
                buttonPress={() => {
                  openDeck(item.Id);
                }}
              />
            )}
          />
        </>
      )}
    </View>
  );
};
export default ContactInfo;
