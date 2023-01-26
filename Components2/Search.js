import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TextInput, Button, ScrollView, Image, TouchableOpacity,ActivityIndicator} from 'react-native';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
export default function Search({navigation,route}) {
    const username = route.params.username;
    const [UserList, setUserList] = useState([])
   
    const [allow1, setallow1] = useState(false)
    
    
    const [requestdata, setrequestdata] = useState([])
    const [RequestList, setRequestList] = useState([])

   const [People,setPeople]=useState([])
    const [FriendList, setFriendList] = useState([])
    const [Dlist, setDlist] = useState([])
    const [userdp, setuserdp] = useState([])
     const [person, setperson] = useState("")
let count=0
let person1=""
    useEffect(() => {
        let unmounted=false
        axios.get("http://192.168.0.114:3003/getUser").then((res) => {
            if(!unmounted){
            setUserList(res.data)
            }
            res.data.map((e,id8)=>{
                if(!unmounted){
                setPeople(People=>[...People,e.username])
                }
            })

        })
        axios.get("http://192.168.0.114:3003/getdp").then((res) => {
            if(!unmounted){
            setuserdp(res.data)
            }
        })

        axios.get("http://192.168.0.114:3003/getrequests").then((res) => {
            if(!unmounted){
            setrequestdata(res.data)
            }
            res.data.map((e,id6) => {
                if (e.Requestlist === username) {
                    if(!unmounted){
                    setRequestList((RequestList,id12) => [...RequestList, e.username])
                    }
                }

            })
        })

        axios.get("http://192.168.0.114:3003/getfriends").then((res) => {
            if(!unmounted){
            setDlist(res.data)
            }
            res.data.map((e,id9) => {
                if (e.username === username) {
                    if(!unmounted){
                    setFriendList((FriendList) => [...FriendList, e.friendlist])
                    }
                }
                else if (e.friendlist === username) {
                    if(!unmounted){
                    setFriendList((FriendList) => [...FriendList, e.username])
                    }
                }
            })
        })
        return ()=>{
            unmounted=true;
        }

    }, [requestdata])




    return (
        <>

        {
            FriendList.length===0 ? <ActivityIndicator size="large" color='red'/> : null
           }

            <View style={{flexDirection:"row",
                    borderWidth:1,
                    marginLeft:20,
                    marginRight:20,
                    paddingLeft:10,
                    borderRadius:15,
                    marginBottom:20,
                    marginTop:10,
                    }}>
            <Ionicons name="search" size={30} color="white" style={styles.icon} />
   
            <TextInput placeholder='Search Amigo 🥰...' onChangeText={(e) => setperson(e)} style={styles.input1}></TextInput>
            </View>
              
         
                <View >


                    
                     <View style={styles.content}>
                            {
                                userdp.map((e,id4) => {
                                   
                                    if (e.username.includes(person) && person!=="" && e.username!==username) {
                                        return (
                                            <View key={id4} style={{flexDirection:'row',}}>
                                             <View style={styles.content1}>
                                            <Image source={{ uri: e.userdp }} style={styles.imageStyle}  key={e._id}/>
                                             <Text style={styles.text} onPress={() => navigation.navigate('Profile2', { username1: e.username,username:username })}>{e.username} </Text>
                                             {
                                            !FriendList.includes(e.username) ? <Text style={styles.text1}  onPress={() =>  {
                                                axios.post("http://192.168.0.114:3003/updateFrnd1", { params:{rname:e.username,Requestlist:username} }) .then((res) => {
                                                if (res.data.message === "Request addedd Successfully") {
                                                    alert("request added")
                                                }
                                            })
                                        }}>Add Friend</Text>
                                            :  
                                            <Text style={styles.text1} onPress={() =>  navigation.navigate('Messages', { username: username, frndname: e.username })} >Message</Text>
                                            
                                      }
                                             </View>
                                             </View>
                                        )
                                    }
                                })
                            }
                          
                        </View>
                          
                    

                </View>



 
        </>
    )
}
const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        // paddingLeft: 15,
        // marginBottom: 10,
        paddingTop: 10,
        marginLeft: 15,


    },
    text1: {
        fontSize: 18,
        marginRight:10,
        borderWidth:1,
        borderColor:'black',
        borderRadius:10,
        paddingLeft:10,
        paddingRight:10,
        paddingTop:5,
        marginTop:10,
        marginBottom:13,
        backgroundColor:'#444444',
        color:'white',

    },

    icon: {
        fontSize:30,
        color:'#444444',
        marginRight:5,
        padding:7,
    },
    icon1: {
        fontSize: 35,
        color:'black',
        // marginLeft:100,
        marginTop:10,
        marginRight:10,
        // marginRight:-200

    },
    content: {
marginLeft:15,
    },
    footer:
    {

        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'yellow',
        position: 'relative',
        bottom: 0,
        width: '100%',


    },
    imageStyle: {
        width: 50,
        height: 50,
        borderRadius: 100,
        //  alignSelf: 'center',
        borderWidth: 3,
        marginBottom: 5,
        marginLeft: 10,
        marginTop:5,
    },
    header: {
        flexDirection: 'row',
        position: 'relative',
        marginTop: 5,
        // backgroundColor: 'black',
        // width: '100%',

    },
    Heading1: {
        fontSize: 30,
        marginLeft: 10,

    },
    suggestions: {
        fontSize: 25,
        marginLeft: 10,
        marginBottom: 10,

    },
    Heading2: {
        fontSize: 20,
        marginLeft: 5,
        width: '83%',
        borderWidth: 1,
        borderRadius: 20,
        paddingLeft: 10,

    },
    content1:
    {
        flexDirection:'row',
        
        borderWidth:1,
        marginBottom:10,
        borderRadius:15,

    },


})










