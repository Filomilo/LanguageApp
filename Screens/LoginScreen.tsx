import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from '../Styles';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack'
import React from 'react';

export function LoginScreen() {
    return (
      <View style={styles.container}>
      <Text>
        Login screen
      </Text>
     </View>
    );
  }