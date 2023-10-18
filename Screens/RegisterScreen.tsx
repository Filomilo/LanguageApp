import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, Touchable, View } from 'react-native';
import { styles } from '../Styles';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React from 'react';
import { TouchableOpacity } from 'react-native';


interface RegisterScreenProps{
  navigation: any;
}

const RegisterScreen= (props: RegisterScreenProps)=>{




  const gotToLogin=() => {
    props.navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
    <Text>
      Register screen
    </Text>
    <TouchableOpacity
    onPress={gotToLogin}
    >
      <Text>
        login
      </Text>
      </TouchableOpacity>

   </View>
  );
};
export default RegisterScreen;

