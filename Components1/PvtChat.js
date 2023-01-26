import React, { useState, useEffect } from "react";
import axios from 'axios';
//import "./Chat.css";
import { Text, StyleSheet, View, TextInput, Button } from 'react-native'


export default function PvtChat({ username, FriendmsgName }) {
    const [currentMessage, setcurrentMessage] = useState("")
    const [messageList, setmessageList] = useState([])
    const [FriendList, setFriendList] = useState([])

    const sendMessage = async () => {
        // e.prevantDefault();
        console.log("username in pvtchat is ", username)
        console.log("FriendmsgName in pvtchat is ", FriendmsgName)
        if (currentMessage !== "") {
            const messageData = {
                username: username,
                FriendmsgName: FriendmsgName,
                message: currentMessage,
                time: (new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()).toString(),
            };


            await axios.post("http://192.168.0.114:3003/addpvtmsg", messageData).then((res) => { console.log(res) })
            axios.get("http://192.168.0.114:3003/getpvtmsg").then((res) => {
                setmessageList(res.data)
                setcurrentMessage("")
                //(list)=>[...list,res.data]  

            }).catch((err)=>{console.log(err)})

        }
    }
    useEffect(() => {
        axios.get("http://192.168.0.114:3003/getpvtmsg").then((res) => {
            setmessageList(res.data)


        }).catch((err)=>{console.log(err)})
    },[])


   



    return (<View>

        <View className="chat_header">
        <Text className="Chat">Chat</Text>
        </View>
       
            <View className="chat_body">

                {
                  
                            messageList.map((msg, id) => {
                                
                                if ((FriendmsgName === msg.FriendmsgName && username === msg.username) || (FriendmsgName === msg.username && username === msg.FriendmsgName)){
                                return (<View key={id} className="msgcontent" id={msg.username === username ? "you" : "other"}>
                                    <Text className="message">{msg.message}</Text>
                                    <Text className="username">{msg.username}</Text>
                                    <Text className="time">{msg.time}</Text>
                                </View>)

                                }
                            })
                }

            </View>
        
        <View className="chat_footer">
            <TextInput   placeholder="Message..." onChangeText={(e) => {
                setcurrentMessage(e)
            }} defaultValue={currentMessage} ></TextInput>
            <Button onPress={sendMessage} title="Send"></Button>
        </View>

    </View>)
}