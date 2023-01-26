import React, { useState, useEffect } from "react";
import { View, Text,StyleSheet } from 'react-native'


export default function Footer({navigation}) {

  return (
    <View style={styles.footer}>
    <Text style={styles.icon} onPress={() => navigation.navigate('StartPage', { username: username })}>🏠</Text>
    <Text style={styles.icon} onPress={() => navigation.navigate('AllMessages', { username: username })}>Ⓜ️</Text>
    <Text style={styles.icon} onPress={() => navigation.navigate('Profile', { username: username })}>🧑‍🏫</Text>

   
   
</View>
  )
}

 // options={{title:'Welcome'}}
 const styles = StyleSheet.create({
    text3:{
        fontSize: 20,
        marginLeft:50,
        // marginRight:10,
        color:'white',
    },
   
    text2: {
        fontSize: 20,
        marginRight:20,
        // paddingRight:50,
        // marginTop:3,
        color:'whitesmoke',
    },
    text1: {
        fontSize: 20,
        marginLeft:-15,
        marginRight:20,
        marginTop:5,
        color:'whitesmoke',
    },
    icon: {
        fontSize: 30,
        marginLeft:10,
        marginRight:10,
    },
    content: {
        top: 50,
        marginBottom: 50,
        flex: 1,
        backgroundColor:'black',
        
        
       
    },
    footer:
    {
      
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'black',
        position: 'relative',
        bottom: 0,
        width: '100%',
       
        },
    header: {
        flexDirection: 'row',
        position: 'relative',
        backgroundColor: 'black',
        width: '100%',
        top: 50
    },
    Heading1: {
        fontSize: 40,
        marginLeft: 30,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color:"whitesmoke",
    },
    Heading2: {
        fontSize: 40,
        marginLeft: 10,
        color:"whitesmoke",
    },
    likes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: '#2e2e2e',
        width: '100%',
        marginBottom: 20,
        marginLeft:-10,
        
    
    },
    menubar: {
        marginTop: 60,
         left: '-40%',
        width: '110%',
    },
    menuItems: {
        fontSize: 20,
        padding: 20,
        color:'whitesmoke',
        backgroundColor: 'black',
    },
    user: {
       
        flexDirection: 'row',
        // backgroundColor: '#2e2e2e',
        width: '100%',
        paddingLeft: 15,
       marginTop:5,
       shadowOffset: {width: -2, height: 4},  
        shadowColor: 'red',  
        shadowOpacity: 0.5,  
        shadowRadius: 3,  
        // borderRadius: 15,
    },

})