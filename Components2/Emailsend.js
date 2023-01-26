import React, { useState, useEffect } from "react";
import axios from 'axios'
//import ChatPage from "./ChatPage";

//import "./Emailsend.css";

import { Text, StyleSheet, View, TextInput, Button } from 'react-native'


const Emailsend = ({navigation,route}) => {
  const username=route.params.username
  const data1=route.params.data1
  const Password=route.params.Password
  const ConfirmPassword=route.params.ConfirmPassword
 

  const [otp, setotp] = useState("")
  const [verifyotp, setverifyotp] = useState("")
  const [response,setresponse]=useState("")

  const [user1, setUser1] = useState({
    to: data1,
    subject: "Email Verification",
    description: Math.floor((Math.random()) * 1000000).toString(),
  });

  const ReSendOtp = async (e) => {
    e.preventDefault();
    await axios.post("http://192.168.0.114:3003/users", user1).catch((err)=>{console.log(err)})

  };

  useEffect(() => {
    axios.post("http://192.168.0.114:3003/users", user1).catch((err)=>{console.log(err)})
  }, [])

  function Verify(){
    if (otp === user1.description) {
      axios.post("http://192.168.0.114:3003/addUser1",{username,data1,Password,ConfirmPassword}).then((res)=>{
        console.log(res.data)
        setresponse(res.data.message)
      })
    }
    else{
      alert("Entered otp is incorrect")
    }
   
  }

  if (response==="Registration Successful") {
    AsyncStorage.setItem("isLoggedIn1",JSON.stringify(true))
    Proceed()
   
  }
  function Proceed(){
    navigation.navigate('UserInfo',{username:username})
  }

  return (
    <View className="content" style={{
      margin:20,
    }}>
      <Text className="verification" style={{
                    fontSize: 40,
                    textAlign:'center',
                    marginTop:100,
                    marginBottom:30,
                    fontWeight:'bold',
                }} >Verification</Text>

      <Text className="otpsent" style={{
                    fontSize: 15,
                    marginBottom:20,
                    fontWeight:'500'
                  
                }}>Otp sent to your registered Email Address</Text>
      <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginBottom:10,
                }}>Enter OTP</Text>

      <TextInput  placeholder="OTP..." className="Einput" onChangeText={(text) => { setotp(text) }} style={{
                    fontSize: 20,
                    borderWidth:2,
                    marginBottom:10,
                    
                  
                }}/>
      <View className="Ebuttons">
      <Button onPress={Verify} className="Ebutton" title="Verify OTP"></Button>
      <Button onPress={ReSendOtp} className="Ebutton" title="ReSend Otp"></Button>
      </View>
    </View>

  );
};

export default Emailsend;