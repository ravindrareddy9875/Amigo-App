import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TextInput, Button, ScrollView, Image,TouchableOpacity,ActivityIndicator,AccessibilityActionEvent,Alert } from 'react-native';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function FriendsList({ navigation, route }) {
       
        const username = route.params.username;

    const [Dlist, setDlist] = useState([])
    
    const [userdp, setuserdp] = useState([])
    
    useEffect(() => {
        let unmounted=false
        axios.get("http://192.168.0.114:3003/getfriends").then((res) => {
            if(!unmounted){
            setDlist(res.data)
            }

        })

        axios.get("http://192.168.0.114:3003/getdp").then((res) => {
            if(!unmounted){
            setuserdp(res.data)
            }
        })
       
        return ()=>{
            unmounted=true;
        }
         

    }, [Dlist])



    return (
        <>
            <ScrollView style={{ marginTop:10,}}>
            {
            Dlist.length===0 ? <ActivityIndicator size="large" color='red'/> : null
           }
                {

                    (Dlist).map((e, id5) => {
                        if (e.username === username) {
                            return (<View key={id5} style={{                 
                            borderWidth:1,
                            borderRadius:10,
                            borderColor:'#cccccc',
                            backgroundColor:"#dddddd",
                            marginBottom:5,
                            marginLeft:15,
                            marginRight:15,
                            }}>
                                <View style={styles.content}>
                                    {
                                        userdp.map((e1,id1) => {
                                            if (e1.username === e.friendlist) {
                                                return (
                                                    <Image source={{ uri: e1.userdp }} style={styles.imageStyle} key={id1}/>
                                                )
                                            }
                                        })
                                    }
                                    <Text style={styles.text} onPress={() => navigation.navigate('Profile2', { username1: e.friendlist,username:username })}>{e.friendlist}</Text>
                                    </View>
                                
                                    <View style={styles.text1}>
                                    <Text style={styles.button1} onPress={() =>  navigation.navigate('Messages', { username: username, frndname: e.friendlist })}>Message</Text>

                                            <Text  style={styles.button1} onPress={() => {
                                                 Alert.alert(
                                                    "UnFriend",
                                                    `Are you sure to unfriend ${e.friendlist}?`,
                                                    [
                                                      {
                                                        text: "Yes",
                                                        onPress: () => {
                                                            let id2=e._id
                                                            console.log("id2 ",id2)
                                                            axios.delete(`http://192.168.0.114:3003/delFrnd/${id2}`).then((res)=>{
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
                                            }}>UnFriend</Text>
                                    </View>
                                
                            </View>)
                        }

                        if (e.friendlist === username) {
                            return (<View key={id5} style={{                
                            borderWidth:1,
                            borderRadius:10,
                            borderColor:'#cccccc',
                            backgroundColor:"#dddddd",
                            marginBottom:5,
                            marginLeft:15,
                            marginRight:15,
                            }}>
                                <View style={styles.content}>
                                    {
                                        userdp.map((e1,id9) => {
                                            if (e1.username === e.username) {
                                                return (
                                                    <Image source={{ uri: e1.userdp }} style={styles.imageStyle}   key={id9} />
                                                )
                                            }
                                        })
                                    }
                                    <Text style={styles.text}  onPress={() => navigation.navigate('Profile2', { username1: e.username,username:username})}>{e.username}</Text>
                                    </View>
                                    <View style={styles.text1}>
                                    <Text style={styles.button1} onPress={() =>  navigation.navigate('Messages', { username: username, frndname: e.username })}>Message</Text>
                                     <Text  style={styles.button1} onPress={() => {
                                         Alert.alert(
                                            "UnFriend",
                                            `Are you sure to unfriend ${e.username}?`,
                                            [
                                              {
                                                text: "Yes",
                                                onPress: () => {
                                                    let id2=e._id
                                                    console.log("id2 ",id2)
                                                    axios.delete(`http://192.168.0.114:3003/delFrnd/${id2}`).then((res)=>{
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
                                     }}>UnFriend</Text>
                                      
                                    
                                </View>
                            </View>)
                        }
                    })

                }
              

            </ScrollView>



           
        </>
    )
}
const styles = StyleSheet.create({
    
    text: {
        fontSize: 20,  
        paddingTop: 5,
        marginLeft: 15,
        fontWeight:'bold',
        alignSelf: 'center',
    },
    text1: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    button1: {

        fontSize: 15,
        marginTop: 5,
        borderWidth: 3,
        borderRadius: 10,
        backgroundColor: '#1094c8',
        borderColor: '#1094c8',
        marginRight: 10,
       
        padding: 5,
        marginBottom: 10,
        marginTop:10,
        paddingLeft:10,
        color:'white',
        fontWeight:'bold',

    },
    button2: {

        fontSize: 20,
        marginTop: 5,
        borderWidth: 3,
        borderRadius: 10,
        backgroundColor: 'red',
        borderColor: 'red',
        marginRight: 5,
        padding: 5,
        marginBottom: 5,

    },
    icon: {
        fontSize: 35,
        color:'black',
        marginLeft:10,
        fontWeight:'bold',
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

       
       
        // justifyContent: 'space-around',
        // borderWidth: 2,
        // borderTopColor: 'white',
        // borderRightColor: 'white',
        // borderLeftColor: 'white',
        // borderBottomColor: '#cccccc',
        // borderWidth:1,
        // borderRadius:10,
        // borderColor:'#cccccc',
      
        // marginBottom:5,
       

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
    Heading3: {
        fontSize: 30,
        // marginTop:50,

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
    imageStyle: {
        width: 75,
        height: 75,
        borderRadius: 100,
          alignSelf: 'center',
        borderWidth: 3,
         marginBottom: 5,
         marginTop:5,
        marginLeft: 10,
    },




})










