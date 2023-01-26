import React, { useState } from "react";
import {View,Button,Text} from 'react-native'






export default function HomePage({navigation}){
   
   
    return(
        <View >


            
             <Text style={{fontSize:50,margin:30}} onPress={()=>navigation.navigate('Login')}>Login</Text> 
             <Text style={{fontSize:50,margin:30,}} onPress={()=>navigation.navigate('Signup')}>Sign Up</Text>  

        </View>
    )
}