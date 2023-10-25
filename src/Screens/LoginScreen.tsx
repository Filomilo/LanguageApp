import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from '../Styles';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { signInWithEmailAndPassword  } from 'firebase/auth';
import {auth} from '../config/firebase-config'

interface LoginScreenProps{
  navigation: any;
}

const LoginScreen= (props: LoginScreenProps)=>{

  const [email, setEmail]=React.useState('');
  const [password, setPassword]=useState('');
  const [Error, setError]=useState('');


  const goToRegister=() => {
    props.navigation.navigate('Register');
  }

  const Login=async () => {
    //todo login
    try{
    const response= await signInWithEmailAndPassword(auth,email,password);
    }
    catch(err)
    {
      setError(JSON.stringify(err))
    }
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

      <TextInput
      style={styles.input}
      placeholder='email'
      onChangeText={setEmail}
      />
                   <TextInput
      style={styles.input}
      placeholder='Password'
      onChangeText={setPassword}
      secureTextEntry={true}
      />


      <TouchableOpacity
      onPress={Login}
      >
      <View>
        <Text>
          Login
        </Text>
        </View>
      </TouchableOpacity>
      <Text
style={{color: 'red'}}
>
{Error}
</Text>
   </View>
  );
};
export default LoginScreen;

