import React, { useState } from 'react';
import axios from 'axios';
import { Text, StyleSheet, View, TextInput, Button,TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';

//import Homepage from './HomePage';

export default function Signup({navigation}) {
  //-------------------------------------------------------------------------------------------------------
  const [username, setusername] = useState("")
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")



  const addUser = (e) => {
    e.preventDefault();

    if (username && Email && Password && ConfirmPassword) {
      if (Email.includes("@gmail.com") || Email.includes("@gvpce.ac.in")) {
        if (Password.length >= 8) {
          if (Password === ConfirmPassword) {
            axios.post("http://192.168.0.114:3003/addUser", { username, Email })
              .then(res => {
                alert(res.data.message)
                  // setsignal(res.data.message)
                  if(res.data.message==="proceed for otp"){
                    proceed()
                  }
                  
              })
              .catch((err) => {
                alert(err);
              });
          }
          else {
            alert("Password and confirm password didn't match")
          }
        }
        else {
          alert("Password is too weak please provide a strong password")
        }
      }
      else {
        alert("Please provide a valid Email")
      }
    }
    else {
      alert("Please fill all the fileds")
    }
  }

  
 function proceed(){
  navigation.navigate('Emailsend',{username:username,data1:Email,Password:Password,ConfirmPassword:ConfirmPassword})
 }
  

  return (

    <View  style={{
      margin:30,
      marginTop:100,
      
    }}>


<View>

<Text
    style={{
        fontSize: 35,
        color: 'black',
        textAlign:'center',
        marginBottom: 20,
        fontWeight: 'bold',
    }}>Signup</Text>

<View style={styles.both}>

<Ionicons name="person-outline"  style={styles.icon} />
<TextInput  placeholder="Username" onChangeText={(text) => setusername(text)}  style={styles.input}></TextInput>

</View>

<View style={styles.both}>

<Ionicons name="mail-outline"  style={styles.icon} />
<TextInput defaultValue={Email} placeholder="Email" onChangeText={(text) => setEmail(text)}  style={styles.input}></TextInput>

</View>

<View style={styles.both}>

<Ionicons name="lock-closed-outline"  style={styles.icon} />
<TextInput defaultValue={Password} secureTextEntry={true} placeholder="Password" onChangeText={(text) => setPassword(text)}  style={styles.input}></TextInput>

</View>

<View style={styles.both}>

<Ionicons name="lock-closed-outline"  style={styles.icon} />
<TextInput defaultValue={Password} secureTextEntry={true} placeholder="Confirm Password" onChangeText={(text) => setConfirmPassword(text)}  style={styles.input}></TextInput>

</View>

</View>
<View  style={{
}}>

  <Text onPress={addUser} style={styles.login}>Signup</Text>
 
  <View style={{flexDirection:"row",marginTop:10,marginLeft:30,}}>
  <Text style={styles.account}>Already have an Account ?</Text>
  <Text onPress={() => navigation.navigate('Login')} style={styles.Login}>Login</Text>
  </View>

</View>

      

    </View>


  )
}

const styles = StyleSheet.create({
  both:{
      flexDirection:'row', 
      marginBottom: 20, 
      marginLeft:20,
      borderWidth:1,
      borderColor:'#eeeeee',
      borderBottomColor:'#bbbbbb',
      paddingBottom:10,
  },
  icon:{
      marginTop:10,
      fontSize:25,
      color:'black'
  },
  input:{
      fontSize: 17,
      padding: 10,
      paddingLeft:15,
      color:'#666666',
  },
  login:{
      alignSelf:'center',
      marginTop:10,
      marginBottom:30,
      fontSize:20,
      borderWidth:2,
      padding:5,
      paddingLeft:10,
      paddingRight:10,
      borderRadius:10,
      color:'white',
      backgroundColor:'#444444',
  
  
  
  },
  account:{
      marginRight:10,
      marginTop:5,
  },
  Password:{
      marginLeft:30,
      color:'rgb(50,100,255)'
  },
  Login:{
      fontSize: 20,
      color:'rgb(50,100,255)',
  
    
  },
  
  
  })
