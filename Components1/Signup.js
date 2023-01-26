import React,{useState} from 'react';
import axios from 'axios';
import { Text, StyleSheet, View, TextInput, Button } from 'react-native'

//import "./Signup.css";
import Emailsend from './Emailsend';

export default function Signup(){
//-------------------------------------------------------------------------------------------------------
const [Name,setName]=useState("")
const [Email,setEmail]=useState("")
const [Password,setPassword]=useState("")
const [ConfirmPassword,setConfirmPassword]=useState("")
const [signal,setsignal]=useState("")

const [user,setuser]=useState({
  Name:"",
  Email:"",
  Password:"",
  ConfirmPassword:""
})
;

// const handleChange=e=>{
//   const {name,defaultValue}=e.target;
//   setuser({...user,[name]:defaultValue})
// }
//=================================================================================================================
  

    const addUser=(e)=>{
      e.preventDefault();
        
         if(Name && Email && Password && ConfirmPassword){
           if(Email.includes("@gmail.com") || Email.includes("@gvpce.ac.in") ){
             if(Password.length>=8){
                 if(Password===ConfirmPassword){
                axios.post("http://192.168.0.114:3003/addUser",{Name,Email,Password,ConfirmPassword})
               .then(res =>{
                alert(res.data.message)
                if(res.data.message)
                setsignal(res.data.message)
               })
               .catch((err)=>{
                alert(err);
               });
              }
              else{
                alert("Password and confirm password didn't match")
              }
              }
              else{
                alert("Password is too weak please provide a strong password")
              }
          }
          else{
            alert("Please provide a valid Email")
          }
        }
          else{
            alert("Please fill all the fileds")
          }
        }

        if(signal==="proceed for otp"){
         
          return(
              <View>
          <Emailsend  username={Name} data1={Email} Password={Password} ConfirmPassword={ConfirmPassword}/>
              </View>

          )
      }
        
      
    
          
    return(
      
        <View className='sform' style={{
          margin:30,
          marginTop:150,
          borderWidth: 3,
          backgroundColor: 'greenyellow',
          padding: 10,
      }}>

          <Text  style={{
                        fontSize: 40,
                        color: 'red',
                        textAlign:'center',
                        marginBottom: 10,
                        fontWeight: 'bold',
                    }}>Sign Up</Text>
                  
           <Text  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                }}>Name</Text> 

           <TextInput  defaultValue={Name} onChangeText={(text)=>setName(text)} className='sName' style={{
                    fontSize: 20,
                    paddingLeft: 10,
                    borderWidth: 2,
                    marginBottom: 10,
                }} ></TextInput>

           <Text  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                }}>Email</Text> 

           <TextInput  defaultValue={Email} onChangeText={(text)=>setEmail(text)} className='sEmail' style={{
                    fontSize: 20,
                    paddingLeft: 10,
                    borderWidth: 2,
                    marginBottom: 10,
                }} ></TextInput>

           <Text  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                }}>Password</Text>

          <TextInput  defaultValue={Password} onChangeText={(text)=>setPassword(text)} className='spassword' style={{
                    fontSize: 20,
                    paddingLeft: 10,
                    borderWidth: 2,
                    marginBottom: 10,
                }} ></TextInput>

           <Text  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                }}>Confirm password</Text>

           <TextInput  defaultValue={ConfirmPassword} onChangeText={(text)=>setConfirmPassword(text)} className='scpassword' style={{
                    fontSize: 20,
                    paddingLeft: 10,
                    borderWidth: 2,
                    marginBottom: 10,
                }} ></TextInput>
                
           <View className="sbutton">
           <Button onPress={addUser} title="Sign Up"></Button>
           </View>
          
        </View>
    
        
    )
}
