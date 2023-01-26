import React, { useState } from "react";
import axios from "axios";
import { Text, StyleSheet, View, TextInput, Button } from 'react-native'

import PvtChat from "./PvtChat";

export default function Friends({ username }) {
    const [FriendName, setFriendName] = useState("")
    const [FriendmsgName, setFriendmsgName] = useState("")
    const [FriendList, setFriendList] = useState([])
    const [UserList, setUserList] = useState([])
    const [searchuser, setsearchuser] = useState("")
    const [permission, setpermission] = useState("false")

    function AddFriend() {

        UserList.map((e, id) => {
            //Add Friend
            return (<View key={id}>
                {
                    FriendName === e.Name ?
                        axios.post("http://192.168.0.114:3001/addfrnd", { username, FriendName }).then((res) => console.log(res))
                            .catch((err) => { console.log(err) })

                        : null
                }

            </View>)
        })

    }

    function getUser() {
        axios.get("http://192.168.0.114:3001/getUser").then((res) => {
            setUserList(res.data)

        }).catch((err)=>{console.log(err)})
    }


    function getFriend() {
        axios.get("http://192.168.0.114:3001/getfrnd").then((res) => {
            setFriendList(res.data)

        }).catch((err) => console.log(err))
    }

    function Search() {

        UserList.map((e, id) => {
            return (<View key={id}>
                {
                    searchuser === e.Name ? <Text>{e.Name}</Text> : null
                }

            </View>)
        })

    }

    function SendMessage() {

        FriendList.map((e, id) => {

            return (<View key={id}>
                {
                    FriendmsgName === e.FriendName ? setpermission("true")
                        : null
                }

            </View>)
        })


    }
    if (permission === "true") {
        return (<PvtChat username={username} FriendmsgName={FriendmsgName} />)

    }





    return (<View>

        <Text>Friends List</Text>

        <Button onPress={getUser} title="Show Users List"></Button>

        {
            UserList.map((e, id) => {
                return (<View key={id}>
                    {
                        username !== e.Name ? <Text>{e.Name}</Text> : null
                    }

                </View>)
            })
        }
        <TextInput  placeholder="Enter a Friend..." onChangeText={(e) => { setFriendName(e) }}></TextInput>
        <Button onPress={AddFriend} title="Add Friend"></Button>
        <Button onPress={getFriend} title="Show Friends List"></Button>

        {

            FriendList.map((e, id) => {

                return (<View key={id}>
                    {
                        username === e.username ? <View><Text>{e.FriendName}</Text></View>
                            : null
                    }

                </View>)
            })
        }

        <TextInput  placeholder="Enter a Name..." onChangeText={(e) => { setFriendmsgName(e) }}></TextInput>
        <Button onPress={SendMessage} title="Send Message"></Button>
    </View>)
}