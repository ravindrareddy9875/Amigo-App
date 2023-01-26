import React, { useState,useEffect} from "react";
import { Text, StyleSheet, View, TextInput,TouchableOpacity,Button} from 'react-native';
import axios from 'axios';
import io from "socket.io-client";

const socket = io.connect("http://192.168.0.3:3001");

export default function Demo(){
   const [time,settime]=useState(null)
   const [allow1,setallow1]=useState("true")
   const [allow2,setallow2]=useState("false")

   const [room, setRoom] = useState("");
   const [message, setMessage] = useState("");
   const [messageReceived, setMessageReceived] = useState("");
   const [msg,setmsg]=useState("")

//    useEffect(() => {
//     socket.on("receive_message", (data) => {
//       setMessageReceived(data.message);
//     });
//   }, [socket]);

   const joinRoom = () => {
    console.log("ravii");

    socket.emit("sendmsg","hiii");
   
   
  };

  
 

  
   return(
    <View>



       <TextInput onChangeText={(e)=>{setmsg(e);}}></TextInput>
       <Button title="submit" onPress={joinRoom}/>
    </View>
   )
}



