import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { darkModeMainTextColor, darkModePlaceholderTextInputColor, darkModePrimaryColor, height, styles, width } from '../Styles';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { signInWithEmailAndPassword  } from 'firebase/auth';
import {auth} from '../config/firebase-config'
import BackGroundZigs from '../Components/BackgroundZigs';
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

    <View style={styles.mainContainer}>
      <BackGroundZigs />
      <View
      style={{
        position: 'absolute',
        width: width,
        height: height,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
      }}
      >
        


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
      placeholderTextColor={darkModePlaceholderTextInputColor}
      
      />


        <Text
        style={
          [
            {
              fontSize: height*0.02,
              color: darkModeMainTextColor
            }
          ]
        }
        >
          Do not have account?
        </Text>

        <TouchableOpacity
    onPress={goToRegister}
    >
      <Text
      style={{
        fontSize: height*0.03,
        color: darkModePrimaryColor,
        marginVertical: height*0.02
      }}
      >
        register
      </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
      onPress={Login}
      style={styles.loginButton}
      
      >
      <View>
        <Text
        style={styles.loginButtonText}>
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
    </View>
  );
};
export default LoginScreen;

