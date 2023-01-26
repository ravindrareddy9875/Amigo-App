import axios from "axios";
import React, { useState,useEffect,useRef } from "react";
import {View,Button,Text,StyleSheet,ScrollView,TextInput,TouchableOpacity,Image,Pressable,Alert,ActivityIndicator} from 'react-native';
// import StartPage from "./StartPage";
// import Profile from "./Profile";
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';


export default function Messages({navigation,route}){
    const username=route.params.username;
    const frndname=route.params.frndname;
 const [image, setimage] = useState(null)
const [allow2,setallow2]=useState(false)
const [allow3,setallow3]=useState(false)
const [allow4,setallow4]=useState(false)
const [allow1,setallow1]=useState(false)
const [Msg,setMsg]=useState("")
const [MsgData, setMsgData] = useState([])
const [userData, setuserData] = useState([])
const scrollViewRef=useRef();

useEffect(()=>{
    let unmounted=false
  
    axios.get("http://192.168.0.114:3003/getdp").then((res) => {
        if(!unmounted){
            setuserData(res.data)
        }
       

    })

    axios.get("http://192.168.0.114:3003/getPvtMsgs").then((res) => {
        if(!unmounted){
        setMsgData(res.data)
        }
    })

return ()=>{
    unmounted=true;
}
 
},[MsgData])

const pickImage = async () => {
    result = await ImagePicker.launchImageLibraryAsync({
     allowsEditing: true,
     aspect: [4, 3],
     base64: true,
     
   });
   if (!result.cancelled) {
     setimage(result.uri)
     let base64Img = `data:image/jpg;base64,${result.base64}`
     let apiUrl = 'https://api.cloudinary.com/v1_1/do3uo67h5/image/upload';
     let data = {
       "file": base64Img,
       "upload_preset": "do3uo67h5",
      

     }

     fetch(apiUrl, {
       body: JSON.stringify(data),
       headers: {
         'content-type': 'application/json'
       },
       method: 'POST',
     }).then(async res => {
       let data = await res.json()
       console.log(data.secure_url)
    //    setuserPost(data.secure_url)
    axios.post("http://192.168.0.114:3003/PvtMsg",{username:username,frndname:frndname,message:data.secure_url})
       
     }).catch(err => console.log(err))
   }

 }


    

    function SendMsg(){

        axios.post("http://192.168.0.114:3003/PvtMsg",{username:username,frndname:frndname,message:Msg}).then((res)=>{
            if(res.data.message==="Message addedd Successfully"){
                setMsg("")
            }
        })
        
    }

    
    return(
        <>
      <View style={styles.header}>
      <Text style={styles.Heading2} onPress={() => navigation.goBack()}>← </Text>
     
      {
            userData.map((e1,id) => {
            if(e1.username===frndname){
                return(
                <Image source={{ uri: e1.userdp }} style={{ width: 50, height: 50, borderRadius: 100, alignSelf: 'center',marginBottom:5,marginTop:5 }} key={id}></Image>
                
                )
                }
            
        })
    }
                              
      <Text style={styles.Heading1} onPress={() => navigation.navigate('Profile2', { username1: frndname,username:username })}>{frndname}</Text>
      </View>


         <ScrollView style={styles.content1} ref={scrollViewRef} 
                           onContentSizeChange={()=>scrollViewRef.current.scrollToEnd({animated:true})}>
             {
            MsgData.length===0 ? <ActivityIndicator size="large" color='red'/> : null
    }
            {   
               MsgData.map((e,id)=>{
                if((e.username===username && e.frndname===frndname )){
                return(
                    <View style={{
                        
                        marginBottom:10,
                       

                    }} key={id}>

                           {
                            e.message.includes("res.cloudinary.com") ? <View style={{
                                alignItems: e.username===username ? 'flex-end' : 'flex-start',
                                marginBottom:10,
                               
                            }}>
                                
                        <Image source={{ uri: e.message }} style={{ width: 200, height: 200,borderRadius: 10, }} />
                        <Text style={{
                                    fontSize:12,
                                    fontWeight:"bold",
                                    color:'red',
                                    
                                    
                                    }}>{e.time.slice(11,16)}</Text>
                         </View>
                         :
                         <View>
                         
                           
                            {
                                e.user1  ?   <Pressable  onLongPress={()=>{
                                    
                                  if(e.username===username) {
                                    axios.put("http://192.168.0.114:3003/delmessage",{params:{id:e._id}})
                                }
                                if(e.frndname===username) {
                                    axios.put("http://192.168.0.114:3003/delmessage1",{params:{id:e._id}})
                                }
                                }} delayLongPress={500}><Text style={{
                                    fontSize:17, 
                                    backgroundColor: e.username===username ? 'lightblue' : 'lightgreen',
                                    alignSelf: e.username===username ? 'flex-end' : 'flex-start',
                                    borderWidth:3,
                                    borderColor: e.username===username ? 'lightblue' : 'lightgreen',
                                    padding:5,
                                    borderTopLeftRadius: e.username===username ? 20 : 0,
                                    borderBottomLeftRadius:10,
                                    borderBottomRightRadius:10,
                                    borderTopRightRadius: e.username===username ? 0 : 20,
                                    marginRight:10,
                                    paddingBottom:10,
                                    paddingRight:50,
                                    maxWidth:'80%',
                                    shadowColor:'red',
                                    shadowOffset:{width:113,height:15},
                                         elevation:10,
                                        shadowRadius:20,
                                        shadowOpacity:1,

        
                                    }} >{e.message}</Text></Pressable> : <Text onLongPress={()=>{
                                        if(e.username===username) {
                                            axios.put("http://192.168.0.114:3003/undelmessage",{params:{id:e._id}})
                                        }
                                        if(e.frndname===username) {
                                            axios.put("http://192.168.0.114:3003/undelmessage1",{params:{id:e._id}})
                                        }
                                    }} style={{
                                        fontSize:12,
                                        fontWeight:"bold",
                                        color:'white',
                                         backgroundColor: 'black',
                                        borderWidth:3,
                                       alignSelf: e.username===username ? 'flex-end' : 'flex-start',
                                        padding:4,
                                        borderTopLeftRadius:10,
                                        borderTopRightRadius:10,
                                        marginRight:10,
                                        paddingBottom:10,
                                        paddingRight:50,
                                        }}>This message was deleted</Text>
                            }
                            <Text style={{
                            fontSize:12,
                            fontWeight:"bold",
                            color:'red',
                            marginLeft:'85%',
                            padding:4,
                            borderTopLeftRadius:10,
                            borderTopRightRadius:10,
                            marginTop:-30,
                            }}>{e.time.slice(11,16)}</Text>
                       </View>
                        
                }
                    </View>
                 
                )
                        }
                        if((e.username===frndname && e.frndname===username)){
                            return(
                                <View style={{
                                    
                                    marginBottom:20,
            
                                }} key={id}>
                                     {
                            e.message.includes("res.cloudinary.com") ? <View style={{
                                alignItems: e.username===username ? 'flex-end' : 'flex-start',
                                marginBottom:10,
                               
                            }}>
                                 
                        <Image source={{ uri: e.message }} style={{ width: 200, height: 200,borderRadius: 10, }} />
                        <Text style={{
                                    fontSize:12,
                                    fontWeight:"bold",
                                    color:'red',
                                    
                                    }}>{e.time.slice(11,16)}</Text>
                         </View>
                         :
                         <View>


                                    
                                    
                                        {
                                            e.user2 ? <Pressable  onLongPress={()=>{
                                               
                                                if(e.username===username) {
                                                    axios.put("http://192.168.0.114:3003/delmessage",{params:{id:e._id}})
                                                }
                                                if(e.frndname===username) {
                                                    axios.put("http://192.168.0.114:3003/delmessage1",{params:{id:e._id}})
                                                }
                                             }} delayLongPress={500}><Text style={{
                                                fontSize:17, 
                                                backgroundColor: e.username===username ? 'lightblue' : 'lightgreen',
                                                alignSelf: e.username===username ? 'flex-end' : 'flex-start',
                                                borderWidth:3,
                                                borderColor: e.username===username ? 'lightblue' : 'lightgreen',
                                                padding:5,
                                                borderTopLeftRadius: e.username===username ? 20 : 0,
                                                borderBottomLeftRadius:10,
                                                borderBottomRightRadius:10,
                                                borderTopRightRadius: e.username===username ? 0 : 20,
                                                maxWidth:'80%',
                                                paddingBottom:15,
                                                shadowColor:'red',
                                                shadowOffset:{width:113,height:15},
                                                     elevation:10,
                                                    shadowRadius:20,
                                                    shadowOpacity:1,
                    
                                    
                                                }}>{e.message}</Text></Pressable> : <Text onLongPress={()=>{
                                                    if(e.username===username) {
                                                        axios.put("http://192.168.0.114:3003/undelmessage",{params:{id:e._id}})
                                                    }
                                                    if(e.frndname===username) {
                                                        axios.put("http://192.168.0.114:3003/undelmessage1",{params:{id:e._id}})
                                                    }
                                                }} style={{
                                                    fontSize:12,
                                                    fontWeight:"bold",
                                                    color:'white',
                                                    backgroundColor: 'black',
                                                    borderWidth:3,
                                                    alignSelf: e.username===username ? 'flex-end' : 'flex-start',
                                                    padding:4,
                                                    borderTopLeftRadius:10,
                                                    borderTopRightRadius:10,
                                                    paddingBottom:15,

                                                 
                                                    }}>This message was deleted</Text>

                                            
                                        }
                                         <Text style={{
                                         fontSize:12,
                                         fontWeight:"bold",
                                        color:'red',
                                         padding:4,
                                         borderTopLeftRadius:10,
                                         borderTopRightRadius:10,
                                          marginTop:-25,
                                        }}>{e.time.slice(11,16)}</Text>
                                        </View>
                        }
                                    
                                </View>
                             
                            )
                                    }
                           
               
            })
            }
         </ScrollView>
                   

            <View style={styles.footer}>
        <TextInput placeholder="Message..." defaultValue={Msg} style={styles.icon1} onChangeText={(e)=>setMsg(e)}></TextInput>
        <TouchableOpacity onPress={pickImage}><Ionicons name="camera"  style={styles.icon2}/></TouchableOpacity>
        <TouchableOpacity onPress={SendMsg}><Ionicons name="send"  style={styles.icon2}/></TouchableOpacity>

        </View>
        </>
    )
}


{/* <ScrollView style={{marginT0p:40}} ref={scrollViewRef} 
                           onContentSizeChange={()=>scrollViewRef.current.scrollToEnd({animated:true})}></ScrollView> */}
const styles=StyleSheet.create({
    icon1:{
        fontSize:20,
        marginLeft:5,
        marginBottom:3,
        backgroundColor:'whitesmoke',
        color:'black',
        borderRadius:15,
      paddingRight:10,
        paddingLeft:15,
        paddingRight:15,
        width:'80%',
    },
    icon2:{
        fontSize:35,
        marginBottom:3,
    },
    content1:{
        flex:1,
        marginTop:60,
        marginLeft:10,
        marginRight:10,
    },
    content:{
        top:60,
        flexDirection:'row',
       justifyContent:'space-between',
       borderWidth:2,
       borderTopColor:'white',
       borderRightColor:'white',
       borderLeftColor:'white',
       borderBottomColor:'black',

    },
    footer:
    {
        fontSize:70,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'whitesmoke',
        position:'relative',
        // bottom:0,
        borderWidth:2,
        borderColor:'black',
        borderRadius:15,
        marginBottom:10,
        marginLeft:10,
        marginRight:10,
       
        

    },
    header: {
        flexDirection: 'row',
        position: 'relative',
        backgroundColor: 'black',
        width: '100%',
        top: 50
    },
    Heading1: {
        fontSize: 20,
        marginLeft: 15,
        marginTop:15,
        color:"whitesmoke",
        fontWeight:"bold",
    },
    Heading2: {
        fontSize: 35,
        marginLeft: 10,
        color:"whitesmoke",
         marginTop:-5,
         fontWeight:'bold',
    },
   
    
})


