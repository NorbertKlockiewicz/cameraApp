import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './components/Main'
import Gallery from './components/Gallery'
import Header from './components/Header'
import CameraScreen from './components/CameraScreen'
import BigPhoto from './components/BigPhoto';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="main"
          component={Main}
          options={{
            title: <Header />,
            headerStyle: {
              backgroundColor: 'rgb(255,45,85)',
              height: 500
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              alignSelf: "center",
              fontSize: 30,
              backgroundColor: 'rgb(255,45,85)',
            },
          }} />
        <Stack.Screen
          name="gallery"
          component={Gallery}
          options={{
            title: 'Zdjęcia zapisane w telefonie',
            headerStyle: {
              backgroundColor: 'rgb(255,45,85)',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
          }} />
        <Stack.Screen
          name="camera"
          component={CameraScreen}
          options={{
            title: 'Kamera',
            headerStyle: {
              backgroundColor: 'rgb(255,45,85)',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
          }} />
        <Stack.Screen
          name="bigPhoto"
          component={BigPhoto}
          options={{
            title: 'Wybrane zdjęcie',
            headerStyle: {
              backgroundColor: 'rgb(255,45,85)',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,
  },
});
