import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from '../Styles';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface LoginScreenProps{
  navigation: any;
}

const LoginScreen= (props: LoginScreenProps)=>{




  const goToRegister=() => {
    props.navigation.navigate('Register');
  }

  return (
    <View style={styles.container}>
    <Text>
      Login screen
    </Text>
    <TouchableOpacity
    onPress={goToRegister}
    >
      <Text>
        register
      </Text>
      </TouchableOpacity>

   </View>
  );
};
export default LoginScreen;

