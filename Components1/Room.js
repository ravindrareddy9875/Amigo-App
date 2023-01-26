import React,{useState} from "react";
import axios from "axios";

import Chat from "./Chat";
import { Text, StyleSheet, View, TextInput, Button } from 'react-native'


export default function Room({username}){
    const [room,setroom]=useState("")
    const [visible,setvisible]=useState(false)
    const [roomlist,setroomlist]=useState([])
    const [selectedRoom,setselectedRoom]=useState("")
     
    function CreateRoom(){
        setvisible(true)
   }

    function SubmitRoom(){
        setvisible(false)
        axios.post("http://192.168.0.114:3003/addroom",{room}).then((res)=>{
            console.log(res)
        }).catch((e)=>{
            console.log(e)
        })
    }
    function GetRoom(){
        axios.get("http://192.168.0.114:3003/getroom").then((res)=>{
            console.log(res)
            setroomlist(res.data)
        }).catch((err)=>{console.log(err)})
      
    }
 
   
    

    return(<View>
        <Text>Rooms</Text>

        <Button onPress={CreateRoom} title="Create A new Room"></Button>
        <Button onPress={GetRoom} title="Get available Rooms"></Button>
        {visible ?
          (   <View>
            <Text>Enter the new Room name</Text>
            <TextInput  onChangeText={(e)=>{setroom(e)}}></TextInput>
            <Button onPress={SubmitRoom} title="Submit"></Button>
           
        </View>)
        :
        null
        }
        
        {
            
            roomlist.map((e,id)=>{
                return(<View key={id}>
                  <Text>{e.room}</Text>
                </View>)
            })
        }
        <Text>Enter a Room Name</Text>
        <TextInput  onChangeText={(e)=>{setselectedRoom(e)}}></TextInput>

        {
              roomlist.map((e)=>{
                if(selectedRoom===e.room){
                    return(<View>
                        <Chat  username={username} room={e.room}/>
                        </View>)
                
                }
            })
        }



    </View>)
}