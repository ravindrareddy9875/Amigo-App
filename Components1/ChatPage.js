import React, { useState, useEffect } from "react";
import axios from "axios";
import Chat from './Chat';
import PvtChat from './PvtChat';
//import "./ChatPage.css";
import UserProfile from "./UserProfile";
import { Text, StyleSheet, View, TextInput, Button } from 'react-native'

export default function ChatPage({ username }) {
    let count = 0;

    const [messageList, setmessageList] = useState([])
    const [FriendList, setFriendList] = useState([])
    const [room, setroom] = useState("")
    const [FriendmsgName, setFriendmsgName] = useState("")
    const [visible, setvisible] = useState(false)
    const [roomlist, setroomlist] = useState([])
    const [selectedRoom, setselectedRoom] = useState("")
    const [FriendName, setFriendName] = useState("")
    const [UserList, setUserList] = useState([])
    const [permission, setpermission] = useState("false")
    const [allow, setallow] = useState("false")
    const [allow1, setallow1] = useState("false")
    const [permit1,setpermit1]=useState("false")
    const [permit2,setpermit2]=useState("false")
    const [permit3,setpermit3]=useState("false")
    const [Post,setPost] = useState("")
    const [Postdata,setPostdata]=useState([])
    const [PostFriend,setPostFriend]=useState([])




    {/* ======================================================================================================================== */ }
    {/* ======================================================================================================================== */ }


    function CreateRoom() {
        setvisible(true)
    }

    function SubmitRoom() {
        setvisible(false)
        axios.post("http://192.168.0.114:3003/addroom", { room }).then((res) => {
            console.log(res)
        }).catch((e) => {
            console.log(e)
        })
    }
    function GetRoom() {
        axios.get("http://192.168.0.114:3003/getroom").then((res) => {
            console.log(res)
            setroomlist(res.data)
        }).catch((err) => { console.log(err) })

    }
    function setchat() {

        roomlist.map((e) => {
            if (selectedRoom === e.room) {
                setallow("true")
                setallow1("false")
                //return(<Chat  username={username} room={setselectedRoom}/>)
            }
        })
    }


    function MyProfile() {
        setpermission("true")
    }



    {/* ======================================================================================================================== */ }
    {/* ======================================================================================================================== */ }

    function AddFriend() {

        UserList.map((e, id) => {
            //Add Friend
            return (<View key={id}>
                {
                    FriendName === e.Name ?
                        axios.post("http://192.168.0.114:3003/addfrnd", { username, FriendName }).then((res) => console.log(res))
                            .catch((err) => { console.log(err) })

                        : null
                }

            </View>)
        })

    }

    function getUser() {
        axios.get("http://192.168.0.114:3003/getUser").then((res) => {
            setUserList(res.data)

        }).catch((err) => { console.log(err) })
    }


    function getFriend() {
        axios.get("http://192.168.0.114:3003/getfrnd").then((res) => {
            setFriendList(res.data)

        }).catch((err) => console.log(err))
    }


     {/* ======================================================================================================================== */ }
    {/* ======================================================================================================================== */ }


    function AddPost(){
        axios.post("http://192.168.0.114:3003/addpost",{username,Post}).then((res)=>{
            console.log("post added successfully")
        })
    }


    {/* ======================================================================================================================== */ }
    {/* ======================================================================================================================== */ }


    useEffect(() => {
        axios.get("http://192.168.0.114:3003/getmsg").then((res) => {
            setmessageList(res.data)
        }).catch((err) => { console.log(err) })

        axios.get("http://192.168.0.114:3003/getfrnd").then((res) => {
            setFriendList(res.data)

        }).catch((err) => { console.log(err) })
        axios.get("http://192.168.0.114:3003/getpost").then((res) => {
            setPostdata(res.data)
        }).catch((err) => { console.log(err) })
        // console.log(Postdata)
        // console.log(FriendList)
        
    },[])

    if (permission === "true") {
       
        return (<UserProfile username={username} />)
    }

    function posting(){
        FriendList.map((e)=>{
            if(e.username === username){
                 //setPostFriend([...PostFriend,e.FriendName])
                PostFriend.push(e.FriendName)
            }
            if(e.FriendName === username){
                 //setPostFriend([...PostFriend,e.username])
                PostFriend.push(e.username)
            }
    })
    console.log(PostFriend)
    }

    {/* ======================================================================================================================== */ }
    {/* ======================================================================================================================== */ }


    return (<View style={{

    }}>
        <Text className="header" style={{

            marginBottom: 10,
            fontWeight: 'bold',
            fontSize: 30,
            paddingLeft: 20,
            paddingTop: 5,
            backgroundColor: 'red',

        }}>Messenger</Text>

        {/* <Button onPress={MyProfile} title="Profile"></Button> */}
        <View className="Originalclass">
            <View className="Mainclass">

                <View className="class1">
                    <View style={{
                        display:'flex',
                        flexDirection: 'row',  
                        marginBottom:40,
                      
                        
                    }}>
                        <Text style={{
                            // padding:15,
                             paddingLeft:"10%",
                             borderWidth:3,
                             textAlign:'center',
                           
                       
                        }} onPress={() => { setpermit1("true"),setpermit2("false"),setpermit3("false"),posting() }}>Chat</Text>
                        <Text style={{
                            
                             textAlign:'center',
                            paddingLeft:"25%",
                            borderWidth:3,
                        }} onPress={() => { setpermit1("false"),setpermit2("true"),setpermit3("false") }}>Groups</Text>
                        <Text 
                        style={{
                            paddingLeft:"25%",
                            borderWidth:3,
                       }} onPress={() => { setpermit1("false"),setpermit2("false"),setpermit3("true") }}>Friends</Text>
                    </View>
                    <View className="Insideclass1">
                        {/* <Text> {username}</Text> */}
                        {/* {
                          
                            messageList.map((msg, id) => {

                                if (msg.username === username) {
                                   

                                        return (<View key={id} >

                                            <Text><Button className="buttons" onPress={(e) => { { setselectedRoom(msg.room) } }}>{msg.room}</Button></Text>

                                        </View>)
                                    }
                                
                            })
                        } */}
                        {/* {

                        roomlist.map((e, id) => {
                            return (<View key={id}>
                                <Text><Button className="buttons" onPress={(e) =>{setselectedRoom(e.room)}}>{e.room}</Button></Text>
                            </View>)
                        })
                        } */}

                            {
                            permit1==="true"?
                            <View>
                            <Text>Post</Text><TextInput onChangeText={(e) => { { setPost(e) } }}></TextInput>
                            <Button onPress={AddPost} title="submit"></Button>
                            </View>
                            : null
                             
                            } 
                           
                            

                            {

                                permit1==="true" ?
                                 
                                Postdata.map((e,id)=>{
                                    if(PostFriend.includes(e.username)){
    
                                    return(<Text key={id}>{e.Post}</Text>)
                                    }
                                })
                                :null
                            
                            }
                           



                        {/* ======================================================================================================================== */}

                        {/* <Text>Rooms</Text> */}
                        {
                            permit2==="true" ?

                      ( <View>
                        <Button className="buttons" onPress={CreateRoom} title="Create a new Group"></Button>

                        {visible ?
                            (<View className="newgroup">
                                <Text>Enter a new Group name</Text>
                                <TextInput onChange={(e) => { setroom(e) }}></TextInput>
                                <Button onPress={SubmitRoom} title="Submit"></Button>

                            </View>)
                            :
                            null
                        }
                        <Button className="buttons" onPress={GetRoom} title="Get available Groups"></Button>

                        <View className="newgroup">
                            {

                                roomlist.map((e, id) => {
                                    return (<View key={id}>
                                        <Button className="buttons" onPress={() => { setselectedRoom(e.room) }} title={e.room}></Button>
                                    </View>)
                                })
                            }
                            <Text>Enter a Group Name</Text>
                            <TextInput onChangeText={(e) => { { setselectedRoom(e) } }}></TextInput>
                            <Button onPress={setchat} title="submit"></Button>
                        </View>
                    </View>
                      )
                      :null
                    }

                </View>
                </View>
                {/* ======================================================================================================================== */}
                {/* ======================================================================================================================== */}



                {/* ======================================================================================================================== */}
                {/* ======================================================================================================================== */}
                {
                    permit3==="true" ?

                (<View className="class3">
                    <Text className="Friends">Friends</Text>
                    <View className="Insideclass3">
                        {
                            FriendList.map((msg, id) => {
                                if (msg.username === username) {
                                    return (<View key={id}>
                                        {
                                            <Button className="buttons" onPress={() => { { setFriendmsgName(msg.FriendName) }; { setallow1("true") }; { setallow("false") } }} title={msg.FriendName}></Button>

                                        }

                                    </View>)
                                }
                                if (msg.FriendName === username) {
                                    return (<View key={id}>
                                        {
                                            <Button className="buttons" onPress={() => { { setFriendmsgName(msg.username) }; { setallow1("true") }; { setallow("false") } }} title={msg.username}></Button>

                                        }

                                    </View>)
                                }
                            })
                        }

                        {/* ======================================================================================================================== */}

                        {/* <Text>Friends List</Text> */}

                        <Button className="buttons" onPress={getUser} title="Show Users List"></Button>

                        {
                            UserList.map((e, id) => {
                                return (<View key={id}>
                                    {
                                        username !== e.Name ? <Text>{e.Name}</Text> : null
                                    }

                                </View>)
                            })
                        }
                        <TextInput className="username" placeholder="Enter an User name..." onChangeText={(e) => { setFriendName(e) }}></TextInput>
                        <Button className="buttons" onPress={AddFriend} title="Add Friend"></Button>
                        <Button className="buttons" onPress={getFriend} title="Show Friends List"></Button>

                        {

                            FriendList.map((e, id) => {

                                return (<View key={id}>
                                    {
                                        ((username === e.username) ? <Text>{e.FriendName}</Text>
                                            : (username === e.FriendName) ? <Text>{e.username}</Text>
                                                : null
                                        )
                                    }

                                </View>)
                            })
                        }
                    </View>

                </View>
                )
                :null
                }
                {/* ======================================================================================================================== */}
                {/* ======================================================================================================================== */}

            </View>
           { 
            permit1==="true"?
           <View className="class2">
                <View className="class21">
                    {
                        allow === "true" ? (<Chat username={username} room={selectedRoom} />) : null
                    }

                </View>
                <View className="class22">
                    {

                        allow1 === "true" ? <PvtChat username={username} FriendmsgName={FriendmsgName} /> : null

                    }
                </View>
            </View>
            :null
            }
        </View>

    </View>)
}
