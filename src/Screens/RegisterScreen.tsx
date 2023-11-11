import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, Touchable, View } from 'react-native';
import { darkModeMainTextColor, darkModePrimaryColor, height, styles, width } from '../Styles';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React, { useContext, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import BackGroundZigs from '../Components/BackgroundZigs';
import { FireBaseContext } from '../config/FireBaseContext';
interface RegisterScreenProps{
  navigation: any;
}

const RegisterScreen= (props: RegisterScreenProps)=>{

    const [email, setEmail]=React.useState('');
    const [nick, setNick]=useState('');
    const [password, setPassword]=useState('');
    const [repeatPassword, setRepeatPassword]=useState('');
    const [Error, setError]=useState('');


    const {register, validateNick} = useContext(FireBaseContext);



  const gotToLogin=() => {
    props.navigation.navigate('Login');
  }

  const Register= async () => {

   console.log('register')
   try{
    /*
    if(email.length===0 || 
      nick.length===0 ||
       password.length===0 || 
       repeatPassword.length===0){
    throw("Every field must be filled")}
    */
    if(!validateNick(nick))
    throw("nick alrady taken")

    if(password != repeatPassword)
    throw("Passwords do not match")

    if(password.length<8)
    throw("Password not long enough")


    await register(nick,email,password);



    setError("Registeed succsefly, you can now go to login page");

   }
   catch(error){
    console.log(error);
    setError(JSON.stringify(error));
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
      placeholder='Nick'
      onChangeText={setNick}
      />
             <TextInput
      style={styles.input}
      placeholder='Password'
      onChangeText={setPassword}
      secureTextEntry={true}
      />
            <TextInput
      style={styles.input}
      placeholder='repat password'
      onChangeText={setRepeatPassword}
      secureTextEntry={true}
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
          Alrady have an account?
        </Text>

        <TouchableOpacity
    onPress={gotToLogin}
    >
      <Text
      style={{
        fontSize: height*0.03,
        color: darkModePrimaryColor,
        marginVertical: height*0.02
      }}
      >
        login
      </Text>
      </TouchableOpacity>

<View>
<TouchableOpacity
      onPress={Register}
      style={styles.loginButton}
      
      >
      <View>
        <Text
        style={styles.loginButtonText}>
          Register
        </Text>
        </View>
      </TouchableOpacity>
      </View>

<Text
style={{color: 'red'}}
>
{Error}
</Text>



        </View>
        </View>
  );
};
export default RegisterScreen;

