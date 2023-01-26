import React, { useState, useEffect } from "react";
import axios from 'axios';

import { Text, StyleSheet, View, TextInput, Button, ScrollView, Image, TouchableOpacity, SafeAreaView,Pressable,ActivityIndicator,Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import HomePage from "./HomePage";


export default function StartPage({ navigation }) {
    //   const username=route.params.username
    const [username,setusername]=useState("")
    const [allow, setallow] = useState("false")
    const [allow1, setallow1] = useState(false)
    const [allow2, setallow2] = useState(false)
   const [allow3, setallow3] = useState(false)
    const [PostList, setPostList] = useState([])

    const [FriendList, setFriendList] = useState([])
    const [userData, setuserData] = useState([])

    const [id,setid]=useState("")
    const [commentlist, setcommentlist] = useState([])
   
    
    let count=0
    let count2=0
    let count3=0
    let likedlist=[]

    useEffect(() => {

        const getData=async()=>{
            var value= await AsyncStorage.getItem("username")
            setusername(JSON.parse(value))
          }
          getData()

        axios.get("http://192.168.0.114:3003/getpost").then((res) => {

            setPostList(res.data)
            

        })
        axios.get("http://192.168.0.114:3003/getcomments").then((res) => {
            setcommentlist(res.data)
            })
        
        axios.get("http://192.168.0.114:3003/getdp").then((res) => {
            setuserData(res.data)

        })
        
        axios.get("http://192.168.0.114:3003/getfriends").then((res) => {
            setFriendList(res.data)
            res.data.map((e,id20)=>{
              if(e.username===username){
                setFriendList(FriendList=>[...FriendList,e.friendlist])
                
              }
             else if(e.friendlist===username){
              setFriendList(FriendList=>[...FriendList,e.username])
          
              }
            })
        })
       

    },[PostList])

    function MenuBar() {
        if (allow === "false") {
            setallow("true")
        }
        if (allow === "true") {
            setallow("false")
        }
    }
   


//=============================================================================================================================================
//=============================================================================================================================================
    return (
        <>
     
            <View style={styles.header}>
              <Text style={{ fontSize: 40,
             marginLeft:10,
             color:allow==="true" ? 'black' : 'white' ,
             backgroundColor:allow==="true" ? 'white' : 'black' ,
             borderRadius:120,
            height:60,
             
        }} onPress={MenuBar}>≡</Text>
                <Text style={styles.Heading1} >Amigo</Text>
                <Ionicons name="log-out" size={35} color="white" style={{marginLeft:160,marginTop:10,}} onPress={()=>{
                setallow("false")
                 Alert.alert(
                    "Logout",
                    "Are you sure you want to Logout?",
                    [
                      {
                        text: "Yes",
                        onPress: () => {
                         AsyncStorage.setItem("isLoggedIn1",JSON.stringify(false))
                         AsyncStorage.setItem("username",JSON.stringify(""))
                         navigation.navigate("Login")
                        
                        }
                      },
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      },
                     
                    ]
                  );
                }} />
              

                {
                    allow === "true" ?
                        <View style={styles.menubar}>
                           
                           <Text style={styles.menuItems} onPress={() => navigation.navigate('FriendsList', { username: username })}>👨‍👦 Friends</Text>
                            <Text style={styles.menuItems} onPress={() => navigation.navigate('Posts', { username: username })}>📸 New Post</Text>
                            <Text style={styles.menuItems}  onPress={() => navigation.navigate('Groups', { username: username })}>👨‍👨‍👧‍👦 Groups</Text>
                            <Text style={styles.menuItems} onPress={() => navigation.navigate('AddFriend', { username: username })}>👧 Suggestions</Text>
                            <Text style={styles.menuItems} onPress={() => navigation.navigate('Requests', { username: username })}>👧 Requests </Text>
                            <Text style={styles.menuItems} onPress={() => navigation.navigate('GroupRequests', { username: username })}>➕Group Requests</Text>

                        </View>
                        : null
                }
            </View>


    <ScrollView style={styles.content}>
    {
    PostList.length===0 ? <ActivityIndicator size="large" color='red'/> : null
    }

        {
            PostList.slice(0).reverse().map((e,id1) => {
                //  if((FriendList.includes(e.username) || e.username===username)){
                    count2=0
                
                {
                    commentlist.map((e1,id4)=>{
                        if(e1.postid===e._id){
                            count2=count2+1
                        }
                    })
                }

                
                
                return (
                    <View key={id1}>
                        <View style={styles.user}>
                            {
                                    userData.map((e1,id5) => {
                                    if(e1.username===e.username){
                                        return(
                                  
                        <Image source={{ uri: e1.userdp }} style={{ width: 50, height: 50, borderRadius: 100, alignSelf: 'center' }} key={id5}></Image>

                                   
                                        
                                        )
                                        }
                                    
                                })
                            }
                        
                    <Text style={{fontSize:18,paddingLeft:15,marginTop:10, color:'whitesmoke',fontWeight:"bold"}} onPress={() => navigation.navigate('Profile2', { username1: e.username,username: username })}>{e.username}</Text>
                        
                        </View>
                    
                        <Image source={{ uri: e.userPost }} key={id1} style={
                            {
                                width: "100%",
                                height: 400,
                                marginBottom: 0,
                                alignSelf: 'center',
                                borderColor: 'gray',
                                borderWidth: 3,
                                

                            }
                        } />

                                    
                        
                        <View style={styles.likes}>
                            <Text style={{
                                    fontSize: 30,
                                    marginLeft:30 ,
                                    marginRight:20,
                                    color:'white',

                                
                            }} onPress={()=>{

                                if(e.likedPerson.includes(username)){
                                    axios.put("http://192.168.0.114:3003/updateLikes2",{params:{id:e._id,username:username}})
                                }
                                if(!e.likedPerson.includes(username)){
                                    axios.put("http://192.168.0.114:3003/updateLikes1",{params:{id:e._id,username:username}})
                                }


                            }} >{e.likedPerson.includes(username) ? "❤" : "♡"}</Text>
                            
                            <Text style={styles.text1}>{e.likedPerson.length}</Text>
                    <Text style={styles.text1} onPress={() => navigation.navigate('LikedPersons', { username: username,id:e._id })}>{e.likedPerson.length===1 ? "ʟɪᴋᴇ" : "ʟɪᴋᴇs"}</Text>
               


                            <Text style={styles.text3}>✍ {count2}</Text>
                            
                            <Text style={styles.text2} onPress={() => navigation.navigate('Comments', {username: username,id:e._id })}>{count2===1 ? "ᴄᴏᴍᴍᴇɴᴛ" : "ᴄᴏᴍᴍᴇɴᴛs"}</Text>
                            
                            
            
                        </View>
                        <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:15,paddingLeft:15,marginTop:-18, color:'whitesmoke',fontWeight:'bold'}} onPress={() => navigation.navigate('Profile2', { username1: e.username,username: username })}>{e.username}</Text>
                    <Text style={{paddingLeft:10,fontSize:12,marginTop:-15,
                    marginBottom:10,paddingBottom:10, color:'whitesmoke',}}>{e.description}</Text>
                    </View>
                    
                    <Text style={{paddingLeft:20,fontSize:12, borderBottomWidth:0.3,borderColor:'#999999',marginTop:-15,
                    marginBottom:10,paddingBottom:10, color:'whitesmoke',}}>{e.postedTime.slice(11,16)}</Text>
                    </View>
                )
                    //  }
            })
        }

    </ScrollView>



    <View style={styles.footer}>
        {/* <Text style={styles.icon} onPress={() => navigation.navigate('StartPage', { username: username })}>⌂</Text> */}
        <Ionicons name="home-outline" size={35} color="white" style={styles.icon} onPress={() => navigation.navigate('StartPage', { username: username })} />
       
<TouchableOpacity onPress={() => navigation.navigate('AllMessages', { username: username })}><Ionicons name="ios-chatbubbles-outline" size={35} color="white" style={styles.icon}  /></TouchableOpacity>
<TouchableOpacity>
<Ionicons name="search" size={35} color="white" style={styles.icon} onPress={() => navigation.navigate('Search', { username: username })} />

</TouchableOpacity>


        {/* <Text style={styles.icon} onPress={() => navigation.navigate('AllMessages', { username: username })}>Ⓜ</Text> */}
    {
        userData.map((e1,id50) => {
        if(e1.username===username){
            return(
            <TouchableOpacity onPress={() => navigation.navigate('Profile', { username: username })} key={id50}><Image source={{ uri: e1.userdp }} style={{ width: 40, height: 40, borderRadius: 100, alignSelf: 'center',marginRight:10, }}  ></Image></TouchableOpacity>
            )
            }
        
    })
    }
        
    </View>
    </>

    )
    }

const styles = StyleSheet.create({
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        width: 53,
        height: 53,
       
      },
      linearGradient1: {
        alignItems: 'center',
        justifyContent: 'center',
        // borderRadius: 100,
        width: '100%',
        height: 403,
       
      },
    text3:{
        fontSize: 20,
        marginLeft:50,
        fontWeight: 'bold',
        color:'white',
    },
   
    text2: {
        fontSize: 20,
        marginRight:20,
        fontWeight: 'bold',
        color:'whitesmoke',
    },
    text1: {
        fontSize: 20,
        marginLeft:-15,
        marginRight:20,
        marginTop:5,
        color:'whitesmoke',
          fontWeight: 'bold',
    },
    icon: {
        fontSize: 35,
        marginLeft:10,
        marginRight:10,
        color:'white',
    },
    content: {
        top: 50,
        marginBottom: 50,
        flex: 1,
        backgroundColor:'black',
        
        
       
    },
    footer:
    {
      
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'black',
        position: 'relative',
        bottom: 0,
        width: '100%',
      
        },
    header: {
        flexDirection: 'row',
        position: 'relative',
        backgroundColor: 'black',
        width: '100%',
        top: 50
    },
    Heading1: {
        fontSize: 40,
        marginLeft: 30,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color:"whitesmoke",
    },
    Heading2: {
        fontSize: 40,
        marginLeft: 10,
        color:"whitesmoke",
    },
    likes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: '#2e2e2e',
        width: '100%',
        marginBottom: 20,
        marginLeft:-10,
        
    
    },
    menubar: {
        marginTop: 60,
         left: '-75 %',
        width: '110%',
    },
    menuItems: {
        fontSize: 20,
        padding: 20,
        color:'whitesmoke',
        backgroundColor: 'black',
    },
    user: {
       
        flexDirection: 'row',
        // backgroundColor: '#2e2e2e',
        width: '100%',
        paddingLeft: 15,
       marginTop:5,
       shadowOffset: {width: -2, height: 4},  
        shadowColor: 'red',  
        shadowOpacity: 0.5,  
        shadowRadius: 3,  
        // borderRadius: 15,
    },

}) 


// proceed(e._id)
//     if(PostList2.length===0 || (!usernamelist.includes(username) && !likedlist.includes(username) ) || !postidlist.includes(e._id)){
   
//   axios.post("http://192.168.0.114:3003/updateLikes",{params:{username:e.username,postid:e._id,likedPerson:username,likedCount:count1}})

//     }
//     else{
//     PostList2.map((e1)=>{
   

//      if(e1.username===e.username && e1.postid===e._id && e1.likedPerson===username && e1.isliked===true){
//             axios.put("http://192.168.0.114:3003/updateLikes1",{params:{id:e1._id}})
//         }
//         else if(e1.username===e.username && e1.postid===e._id && e1.likedPerson===username && e1.isliked===false){
//             axios.put("http://192.168.0.114:3003/updateLikes2",{params:{id:e1._id}})
//         }

//     else  if(e1.username===username && e1.postid===e._id && e1.likedPerson===username && e1.isliked===true){
//         axios.put("http://192.168.0.114:3003/updateLikes1",{params:{id:e1._id}})
//     }

//     else if(e1.username===username && e1.postid===e._id && e1.likedPerson===username && e1.isliked===false){
//         axios.put("http://192.168.0.114:3003/updateLikes2",{params:{id:e1._id}})
//     }

//     })
// }

    {/* <LinearGradient
                                                colors={['lightblue', 'yellow', 'lightgreen' ]}
                                                style={styles.linearGradient1}
                                                // start={{ x: 0.7, y: 0 }}
                                            > */}

         {/*                                                                   
                            {
                            PostList2.map((e1,id3)=>{
                                if(e1.postid===e._id){
                                return(<Text style={{color:'white',marginTop:6,marginLeft:20, fontSize: 17,}}>🤝  {e1.__v}</Text>)
                            }
                            })
                        } */}


//==============================================================================================================
//==============================================================================================================

// likedlist=[]
// count=0
// count3=0
// count2=0
// {
//     PostList2.map((e1,id12)=>{
//         if(e1.postid===e._id ){
//             count=e1.likedCount
//         }
        
//     })
// }
// {
//     PostList2.map((e1,id13)=>{
//         if(e1.postid===e._id){
//         if(e1.likedPerson.includes(username)){
//             count3=1
//         }
//         else{
//             count3=0
//         }
//     }
//     })
// }






// onPress={()=>{
                                
//     if (allow2 === false) {
//         setallow2(true)
//     }
//     if (allow2 === true) {
//         setallow2(false)
//     }

//     {
//         PostList2.map((e1,id21)=>{
//             if(e1.postid===e._id){
//             if(e1.likedPerson.includes(username)){
//                 count3=0
//             }
//             // else{
//             //     count3=1
//             // }
//         }
//         })
//     }
    
    
// if (allow1 === false) {
//     setallow1(true)
// }
// else if (allow1 === true) {
//     setallow1(false)
// } 




// PostList2.map((e1,id22)=>{
//     if(e1.postid===e._id){
//         setid(e1.postid)
//         e1.likedPerson.map((e2,id19)=>{

//         likedlist.push(e2)
//     })
// }
// })




// if(PostList2.length===0 || !postidlist.includes(e._id)){
//     likedlist.push(username)
//     axios.post("http://192.168.0.114:3003/updateLikes",{params:{username:e.username,postid:e._id,likedlist:likedlist}})
//     }

//     if(postidlist.includes(e._id) && likedlist.includes(username)){
    
//     PostList2.map((e1,id23)=>{
//         if(e1.postid===e._id){
//             // setlikedlist(likedlist.filter(item=>item !==username))

//             axios.put("http://192.168.0.114:3003/updateLikes1",{params:{id:e1._id,username:username}})
//         }
//     })
    
// }
// else if(postidlist.includes(e._id) && !likedlist.includes(username)){
//     likedlist.push(username)
    
//     PostList2.map((e1,id25)=>{
//         if(e1.postid===e._id){
//             axios.put("http://192.168.0.114:3003/updateLikes2",{params:{id:e1._id,likedCount:e.likedCount+1,likedlist:likedlist}})
//         }
//     })
    
// }









// }}