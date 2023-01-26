import React, { useState, useEffect } from "react";
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomePage from "./HomePage";
// import HomePage from "./HomePage";

export default function Isloggedout() {
  
    const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
        
    <Stack.Navigator >
    <Stack.Screen name="HomePage" component={HomePage}></Stack.Screen>
    </Stack.Navigator>
        
        
      </NavigationContainer>
      
  )
}
