import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, StyleSheet, View, TextInput, Button,TouchableOpacity } from 'react-native'
//import StartPage from './StartPage';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Login({navigation}) {
    
   

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
  
    const [UserList, setUserList] = useState([])
    const [username, setusername] = useState("")
 

    

    useEffect(() => {
        let unmounted=false
        axios.get("http://192.168.0.114:3003/getUser").then((res) => {
            if(!unmounted){
            setUserList(res.data)
            }

        })
        UserList.map((e, id) => {

            if (Email === e.Email) {
                if(!unmounted){
                setusername(e.username)
                }
            }
        })
        return ()=>{
            unmounted=true;
        }

    })

   
    const Loggin = () => {
        axios.post("http://192.168.0.114:3003/Login", { Email, Password })
            .then(res => {
                // alert(res.data)
               if(res.data.message==="Login Successful"){
                 AsyncStorage.setItem("isLoggedIn1",JSON.stringify(true))
                 AsyncStorage.setItem("username",JSON.stringify(username))
                Proceed()
               }
              
            })
            .catch((err) => { console.log(err) })
    }
    
  

    //<Startpage username:u/>
    function Proceed(){
        navigation.navigate('StartPage')
    }
   

    return (
        <View style={{
            margin:30,
            marginTop:150,
            
        }}>

            <View>

                <Text
                    style={{
                        fontSize: 35,
                        color: 'black',
                        textAlign:'center',
                        marginBottom: 20,
                        fontWeight: 'bold',
                    }}>Login</Text>


               
    <View style={styles.both}>

    <Ionicons name="mail-outline"  style={styles.icon} />
    <TextInput defaultValue={Email} placeholder="Email" onChangeText={(text) => setEmail(text)}  style={styles.input}></TextInput>

    </View>

    <View style={styles.both}>

    <Ionicons name="lock-closed-outline"  style={styles.icon} />
    <TextInput defaultValue={Password} secureTextEntry={true} placeholder="Password" onChangeText={(text) => setPassword(text)}  style={styles.input}></TextInput>

    </View>

            </View>
            <View  style={{
            }}>
              
                  <Text onPress={Loggin} style={styles.login}>Login</Text>
                  <Text onPress={() =>navigation.navigate('Emailsend',{data1:Email,UserList:UserList})} style={styles.Password}>Forgot Password ?</Text>

                  <View style={{flexDirection:"row",marginTop:10,marginLeft:30,}}>
                  <Text style={styles.account}>Don't have an Account ?</Text>
                  <Text onPress={() => navigation.navigate('Signup')} style={styles.register}>Register</Text>
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
    marginTop:3,
},
Password:{
    marginLeft:30,
    color:'rgb(50,100,255)'
},
register:{
    fontSize: 17,
    color:'rgb(50,100,255)',

  
},


})