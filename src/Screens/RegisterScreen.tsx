import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, Touchable, View } from 'react-native';
import { styles } from '../Styles';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React from 'react';
import { TouchableOpacity } from 'react-native';
import {auth} from '../config/firebase-config'
import { createUserWithEmailAndPassword } from 'firebase/auth';
interface RegisterScreenProps{
  navigation: any;
}

const RegisterScreen= (props: RegisterScreenProps)=>{




  const gotToLogin=() => {
    props.navigation.navigate('Login');
  }

  const Register= async () => {
   console.log('register')
   try{
    const response= await createUserWithEmailAndPassword(auth,'mail','pass');
   }
   catch(error){
    console.log(error);
   }
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

      <TouchableOpacity
      onPress={Register}
      >
      <View>
        <Text>
          Register
        </Text>
        </View>
      </TouchableOpacity>
   </View>
  );
};
export default RegisterScreen;

