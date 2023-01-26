import React,{useState,useEffect} from "react";
import axios from "axios";
import Login from "./Login";
 
import { Text, StyleSheet, View, TextInput, Button } from 'react-native'
import ChatPage from "./ChatPage";

export default function Emailsend1({navigation,route}){
  const data1=route.params.data1;
  const UserList=route.params.UserList
  
    const [otp, setotp] = useState("")
    const [verifyotp, setverifyotp] = useState("")
    const [NewPassword,setNewPassword]=useState("")
    const [NewConfirmPassword,setNewConfirmPassword]=useState("")
    const [id,setid]=useState("")
    const [allow,setallow]=useState("")
    const [allow1,setallow1]=useState("")
    
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
      let unmounted=false
      axios.post("http://192.168.0.114:3003/users", user1).catch((err)=>{console.log(err)})
      
      UserList.map((e)=>{
        if(e.Email===data1){
          if(!unmounted){
            setid(e._id)
          }
        }
    })
    return ()=>{
      unmounted=true;
  }
   
    }, [])
  
    function Verify() {
     setverifyotp(otp)
     if(otp===user1.description){
         setallow("true")
     }
    }
  
  
    function UpdatePass(){
      if(NewPassword.length>=8){
        if(NewPassword===NewConfirmPassword){

          axios.put("http://192.168.0.114:3003/update",{NewPassword:NewPassword,NewConfirmPassword:NewConfirmPassword,id:id})
          .then((res)=>{
              console.log("response is",res)
              if(res.data.message==="updated"){
                setallow1("true")
                Proceed()
                alert("Password updated successfully")
  
              }
          })
         

        }
        else{
          alert("Password and confirm password didn't match")
        }
      }
      else{
        alert("Password is too weak please provide a strong password")
      }
    }
   
  function Proceed()
    {
      navigation.navigate('Login')
    }
  
    return (
      <View className="content">
        <Text className="verification">Verification</Text>
        <Text className="otpsent">Otp sent to your registered Email Address</Text>
        <TextInput  placeholder="OTP..." className="Einput" onChangeText={(e) => { setotp(e) }} />
        <View className="Ebuttons">
        <Button  onPress={Verify}className="Ebutton" title="Verify OTP"></Button>
        <Button onPress={ReSendOtp} className="Ebutton" title="ReSend Otp"></Button>
        </View>

        {
            allow==="true" ?
            <View>
        <TextInput  placeholder="Password..." className="Einput" onChangeText={(e) => { setNewPassword(e) }} />
        <TextInput  placeholder="Confirm Password..." className="Einput" onChangeText={(e) => { setNewConfirmPassword(e) }} />
        <Button onPress={UpdatePass} title="submit"></Button>       
        </View>
        :null

        
        }
       
      </View>
  
    );
  


}