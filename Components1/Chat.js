import React, { useState,useEffect} from "react";
import axios from 'axios';
 //import "./Chat.css";
import { Text, StyleSheet,ScrollView,StatusBar, View, TextInput, Button } from 'react-native'


export default function Chat({username,room}){
    const [currentMessage,setcurrentMessage]=useState("")
    const [messageList,setmessageList]=useState([])


    const sendMessage= async ()=>{
       // e.prevantDefault();
        console.log("username in chat is ",username)
        console.log("room in chat is ",room)
        if(currentMessage!==""){
              const  messageData={
                username:username,
                room:room,
                message:currentMessage,
                time:(new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()).toString(),
            };
            
          
            await axios.post("http://192.168.0.114:3003/addmsg",messageData).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)})
            axios.get("http://192.168.0.114:3003/getmsg").then((res)=>{
            setmessageList(res.data)
            setcurrentMessage("")
                //(list)=>[...list,res.data]  
                
             
         }).catch((err)=>{console.log(err)})
            
        }
    }
    useEffect(()=>{
        axios.get("http://192.168.0.114:3003/getmsg").then((res)=>{
            setmessageList(res.data)
         }).catch((err)=>{console.log(err)})
    },[])
    

    return(<View style={{
        paddingTop:StatusBar.currentHeight,
    }}> 
    <ScrollView style={{
        marginHorizontal:20,
        backgroundColor:"pink",
        height:"80%",
    }}>
     <View >
       
         <Text style={{
            fontSize:25,
            marginleft:50,
            backgroundColor:"greenyellow"
         }}>Group Chat</Text>
     </View>
    
     <View className="chat_body">
         
         {
             messageList.map((msg,id1)=>{
                 if(room===msg.room){
                 return(<View key={id1} id={msg.username===username ? "you" : "other"}>
                        <Text style={{
                            padding:10,
                            marginLeft:10,
                            fontSize:15,
                        }}>{msg.message}</Text>
                        <Text  style={{
                            padding:10,
                            marginLeft:10,
                            fontSize:10,
                        }}>{msg.username===username ? "You" : msg.username}</Text>
                        <Text  style={{
                            padding:10,
                            marginLeft:10,
                            fontSize:10,
                        }}>{msg.time}</Text>
                 </View>)
                 }
             })
         }
         
     </View>
    
     <View className="chat_footer">
         <TextInput  placeholder="Message..."  onChangeText={(text)=>{
            setcurrentMessage(text)
    }} defaultValue={currentMessage} onKeyPress={(e)=>{e.key==="Enter" && sendMessage()}}  style={{
        padding:10,
        fontSize:20,
        borderWidth:3,
        borderRadius:5,
    }}></TextInput>
         <Button onPress={sendMessage} title="Send" style={{
            padding:5,
         }}></Button>
          
     </View>
     </ScrollView>

    </View>)
}

