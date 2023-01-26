import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TextInput, Button, ScrollView, Image, TouchableOpacity,ActivityIndicator,Alert } from 'react-native';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
export default function Requests({ navigation, route }) {
    const username = route.params.username;

   
    const [id, setid] = useState("")
   
    const [Dlist, setDlist] = useState([])
    const [Dlist1, setDlist1] = useState([])
    const [FriendData, setFriendData] = useState([])
    const [allow,setallow]=useState(false)
    const [allow1,setallow1]=useState(false)
    const [friends, setfriends] = useState("")
    const [userdp, setuserdp] = useState([])


    useEffect(() => {
        let unmounted=false
        axios.get("http://192.168.0.114:3003/getfriends").then((res) => {
            if(!unmounted){
            setFriendData(res.data)
            }

        })
        axios.get("http://192.168.0.114:3003/getrequests").then((res) => {
            if(!unmounted){
            setDlist(res.data)
            }

        })

        axios.get("http://192.168.0.114:3003/getdp").then((res) => {
            if(!unmounted){
            setuserdp(res.data)
            }
        })

        axios.get("http://192.168.0.114:3003/getfriends").then((res) => {
            if(!unmounted){
            setDlist1(res.data)
            }
            res.data.map((e,id) => {
                if (e.username === username) {
                    if(!unmounted){
                    setfriends(FriendList => [...FriendList, e.friendlist])
                    }
                }
                else if (e.friendlist === username) {
                    if(!unmounted){
                    setfriends(FriendList => [...FriendList, e.username])
                    }
                }
            })
        })
        return ()=>{
            unmounted=true;
        }

    }, [FriendData])


   



    return (
        <>
            <ScrollView>

            {
            Dlist.length===0 || userdp.length===0 || friends.length===0? <ActivityIndicator size="large" color='orange'/> : <View>
                {
                    Dlist.map((e1,id) => {
                        if (e1.username === username) {
                            return (<View key={id}>
                                <View style={styles.content}>
                                    {
                                        userdp.map((e,id1) => {
                                            if (e.username === e1.Requestlist) {
                                                return (
                                                    <Image source={{ uri: e.userdp }} style={styles.imageStyle}  key={id1}/>
                                                )
                                            }
                                        })
                                    }
                                    <Text style={styles.text}  onPress={() => navigation.navigate('Profile2', { username1: e1.Requestlist,username:username })}>{e1.Requestlist}</Text>
                                   {
                                    !friends.includes(e1.Requestlist) ?  <View style={{flexDirection:'row'}}><Text style={styles.text1} onPress={() => {
                                        setid(e1._id)
                                        if(!friends.includes(e1.Requestlist)){
                                        axios.post("http://192.168.0.114:3003/updateFrnd3", { params: { username: username, friendlist: e1.Requestlist } }).then((res) => {

                                            if (res.data.message === "Request addedd Successfully") {
                                                alert("Friend Added")
                                            }
                                        })
                                    }
                                    }}>Accept</Text>
                                    <Text  style={{fontSize:20,marginTop:10,marginRight:10,}} onPress={() => {
                                         Alert.alert(
                                            "Alert Title",
                                            "Are you sure to delete Request?",
                                            [
                                              {
                                                text: "Yes",
                                                onPress: () => {
                                                    let id2=e1._id
                                                    console.log("id2 ",id2)
                                                    axios.delete(`http://192.168.0.114:3003/delFrndRequest/${id2}`).then((res)=>{
                                                        alert(res.data.message)
                                                    })
                                                }
                                              },
                                              {
                                                text: "Cancel",
                                                onPress: () => console.log("Cancel Pressed"),
                                                style: "cancel"
                                              },
                                             
                                            ]
                                          );
                                     }}>❌</Text>
                                    </View> : null
                                   }
                                    {
                                    friends.includes(e1.Requestlist) ?  <Text style={styles.text2} onPress={() => {
                                      alert("friend added already")
                                    }}>Accepted</Text> : null
                                   }
                                   
                                </View>
                            </View>)
                        }
                    })
                }
              
              </View>
           }

            </ScrollView>



           
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
        fontSize: 15,
        marginRight: 10,
        borderWidth: 3,
        borderColor: 'lightgreen',
        paddingTop: 10,
        paddingLeft:10,
        paddingRight:5,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: 'lightgreen',
        borderRadius: 10,
        fontWeight: 'bold'
    },
    text2: {
        fontSize: 15,
        marginRight: 10,
        borderWidth: 3,
         borderColor: '#888888',
        paddingTop: 10,
        paddingLeft:10,
        paddingRight:5,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#888888',
        color:'white',
        borderRadius: 10,
        fontWeight: 'bold'
    },
    button1: {

        fontSize: 25,
        marginTop: 5,
        borderWidth: 3,
        borderRadius: 10,
        backgroundColor: 'lightgreen',
        marginRight: 5,

    },
    button2: {

        fontSize: 25,
        marginTop: 5,
        borderWidth: 3,
        borderRadius: 10,
        backgroundColor: 'red',
    },
    icon: {
        fontSize: 35,
        color:'black',
        marginLeft:10,
    },
    content: {

        flexDirection: 'row',
        // flex:1,
        justifyContent: 'space-between',
        borderWidth: 2,
        borderTopColor: 'white',
        borderRightColor: 'white',
        borderLeftColor: 'white',
        borderBottomColor: '#cccccc',

    },
    footer:
    {
        fontSize: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'whitesmoke',
        position: 'relative',
        bottom: 0,
        width: '100%',


    },
    header: {
        flexDirection: 'row',
        //justifyContent:'space-between',
        position: 'relative',
        top: 0,
        backgroundColor: 'grey',
        width: '100%',
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,


    },
    Heading1: {
        fontSize: 40,
        marginLeft: 30,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    Heading2: {
        fontSize: 40,
        marginLeft: 10,
    },
    imageStyle:{
        width: 50,
        height: 50,
         borderRadius: 100, 
        //   alignSelf: 'center',
         borderWidth:3,
         marginBottom:10,
         marginLeft: 10,
    }
   


})











