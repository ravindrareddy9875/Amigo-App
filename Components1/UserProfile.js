import React,{useState,useEffect} from "react";
import axios from "axios";
import { Text, StyleSheet, View, TextInput, Button } from 'react-native'

export default function UserProfile({username}) {
    const [Email, setEmail] = useState("")
    const [UserList, setUserList] = useState([])

    useEffect(() => {
        axios.get("http://192.168.0.114:3003/getUser").then((res) => {
            setUserList(res.data)
        }).catch((err)=>{console.log(err)})
        UserList.map((e)=>{
            if(username===e.Name){
                setEmail(e.Email)
            }
            })
       
       
    },[])
   

    return (<View>
       
        <Text>Profile</Text>
      Name:<Text>{username}</Text>
      Email:<Text>{Email}</Text>
      
    </View>)
}
