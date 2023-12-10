import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image } from 'react-native'
import {
  DarkModeColors,
  darkModePrimaryColor,
  darkModeTextInputColor,
  height,
  styles,
  width,
} from '../Styles'
import {
  NavigationContainer,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useContext, useEffect, useState } from 'react'
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'
import {
  SafeAreaFrameContext,
  SafeAreaView,
} from 'react-native-safe-area-context'
import { db } from '../config/firebase-config'
import { initializeApp } from 'firebase/app'
import { DataSnapshot, getDatabase, onValue, ref } from 'firebase/database'
import { auth } from '../config/firebase-config'
import DeckButton from '../Components/DeckButton'
import AddButton from '../../assets/Add_button.svg'
import DataBaseManager from '../config/DataBaseManager'
import { FireBaseContext } from '../config/FireBaseContext'

const ContactInfo = (props) => {
  const id = props.id

  const [contactData, setContactData] = useState({ decks: [] })
  const { getContactInfo } = useContext(FireBaseContext)

  const fetchData = async () => {
    let data = await getContactInfo(props.id)
    console.log(
      '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^' +
        JSON.stringify(data) +
        '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',
    )
    setContactData(data)
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchData()
      return () => {
        setContactData({})
      }
    }, []),
  )
  const openDeck = (id) => {
    console.log(
      'open deck: open deck: open deck: open deck: open deck: open deck: open deck: open deck: open deck: open deck: ',
    )
    console.log('open deck: ' + JSON.stringify(id))

    console.log(
      'open deck: open deck: open deck: open deck: open deck: open deck: open deck: open deck: open deck: open deck: ',
    )
    props.navigation.navigate('DeckView', {
      deckId: id,
    })
  }

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
              source={{ uri: contactData.profilePic }}
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
                amtOfCards={item.amt_of_cards}
                lang_1={item.lang_1}
                lang_2={item.lang_2}
                showLastUsed={true}
                buttonPress={() => {
                  openDeck(item.id)
                }}
              />
            )}
          />
        </>
      )}
    </View>
  )
}
export default ContactInfo
