import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TextInput, Button, ScrollView, Image, TouchableOpacity,ActivityIndicator,Alert } from 'react-native';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function AddFriend({ navigation, route }) {
    const username = route.params.username;
    const [UserList, setUserList] = useState([])

    const [requestdata, setrequestdata] = useState([])
    const [RequestList, setRequestList] = useState([])

    const [FriendList, setFriendList] = useState([])
    const [Dlist,setDlist]=useState([])
    const [userdp,setuserdp]=useState([])
  const [FriendList1, setFriendList1] = useState([])
 let count=0

    useEffect(() => {
        let unmounted=false
       
        axios.get("http://192.168.0.114:3003/getUser").then((res) => {
           
            setUserList(res.data)
            

        })
        axios.get("http://192.168.0.114:3003/getdp").then((res) => {
         
              setuserdp(res.data)
            
          })

        axios.get("http://192.168.0.114:3003/getrequests").then((res) => {
           
            setrequestdata(res.data)
            
            res.data.map((e,id9)=>{
                if(e.Requestlist===username){
                   
                    setRequestList(RequestList=>[...RequestList,e.username])
                    
                }
              })
            
        })

        axios.get("http://192.168.0.114:3003/getfriends").then((res) => {
            if(!unmounted){
            setDlist(res.data)
            }
            res.data.map((e)=>{
              if(e.username===username){
                
                setFriendList(FriendList=>[...FriendList,e.friendlist])
                
              }
             else if(e.friendlist===username){
                
              setFriendList(FriendList=>[...FriendList,e.username])
                
              }
            })
        })
    
       
         

    },[requestdata])




    return (
        <>

        <ScrollView >
        {
            UserList.length===0 || FriendList.length===0 || requestdata.length===0? <ActivityIndicator size="large" color='red'/> : <View>
                
                {         
                    UserList.map((msg,id) => {
                     if(msg.username!==username && !FriendList.includes(msg.username) ){
                        FriendList1.length=0
                        count=0

                        Dlist.map((e,id4)=>{
                            if(e.username===msg.username){
                                if( FriendList.includes(e.friendlist)){
                                    count=count+1
                                }
                            }
                            else if(e.friendlist===msg.username){
                                if( FriendList.includes(e.username)){
                                    count=count+1
                                }
                               
                            }
                        })

                      

                        return (
                           <View key={id}>
                           <View style={styles.content}>
                            {
                                userdp.map((e,id1)=>{
                                    if(e.username===msg.username){
                                        return(
                                        <Image source={{ uri:e.userdp }} style={styles.imageStyle}   key={id1}/>
                                        )
                                    }
                                  })
                            }
                                <Text style={styles.text}  onPress={() => navigation.navigate('Profile2', { username1: msg.username,username:username })}>{msg.username}</Text>
                                {
                                    !RequestList.includes(msg.username) ?  <Ionicons name="person-add-sharp"  style={styles.text1} onPress={() =>  {
                                        axios.post("http://192.168.0.114:3003/updateFrnd1", { params:{rname:msg.username,Requestlist:username} }) .then((res) => {
                                           if (res.data.message === "Request addedd Successfully") {
                                               alert("Request added")
                                           }
                                       })
                                   }} /> : <View>
                                    <Text style={styles.request}>Requested</Text>
                                    <Text style={styles.request} onPress={() => {
                                      
                                         Alert.alert(
                                            "Cancel",
                                            "Are you sure to Cancel Request?",
                                            [
                                              {
                                                text: "Yes",
                                                onPress: () => {
                                                    requestdata.map((e2,id8)=>{
                                                        if(e2.Requestlist===username && e2.username===msg.username){
                                                            let id2=e2._id
                                                            axios.delete(`http://192.168.0.114:3003/delFrndRequest/${id2}`).then((res)=>{
                                                                alert(res.data.message)
                                                            })
                                                        }
                                                    })
                                                    // let id2=e1._id
                                                    // console.log("id2 ",id2)
                                                    // axios.delete(`http://192.168.0.114:3003/delFrndRequest/${id2}`).then((res)=>{
                                                    //     alert(res.data.message)
                                                    // })
                                                }
                                              },
                                              {
                                                text: "Cancel",
                                                onPress: () => console.log("Cancel Pressed"),
                                                style: "cancel"
                                              },
                                             
                                            ]
                                          );
                                     }}>cancell</Text>
                                   </View>
                                  
                                }
                               {/* {
                                console.log(RequestList)
                               }
                                */}
                           </View>
                           <Text style={{marginLeft:150,marginTop:-25,color:'#767676',marginBottom:10,}}> {count===1 ? "1 mutual friend" : `${count} mutual friends`}</Text>
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
        paddingTop:10,
         marginLeft:15,
   

    },
    text1: {
        fontSize: 25,
        marginRight:10,
        borderWidth:1,
        borderColor:'black',
        borderRadius:10,
        paddingLeft:15,
        paddingRight:15,
        paddingTop:8,
        marginTop:5,
        marginBottom:5,
      
        //   textShadowColor: 'rgba(0, 0, 0, 0.75)',
        //   textShadowOffset: { width: -1, height: 1 },
        //   textShadowRadius: 5,
        //  fontWeight:'bold'

    },
   
    icon: {
        fontSize: 35,
        color:'black',
        marginLeft:10,
    },
    content: {
       
        flexDirection: 'row',
        borderWidth: 2,
        borderTopColor: 'white',
        borderRightColor: 'white',
        borderLeftColor: 'white',
        borderBottomColor: '#cccccc',
        //   flex: 1,
        justifyContent:'space-between',
           top:0,
        //  backgroundColor: 'green',
    
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
    imageStyle:{
        width: 50,
        height: 50,
         borderRadius: 100, 
        //  alignSelf: 'center',
         borderWidth:3,
         marginBottom:10,
         marginLeft: 10,
    }, 
    header: {
        flexDirection: 'row',
        position: 'relative',
        marginTop:5,
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
        marginBottom:10,
       
    },
    Heading2: {
        fontSize: 20,
        marginLeft: 5,
        width:'83%',
        borderWidth:1,
        borderRadius:20,
        paddingLeft:10,

    },
    request:{
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
   

})










