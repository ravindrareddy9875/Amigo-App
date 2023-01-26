import axios from "axios";
import React, { useState,useEffect,useRef } from "react";
import {View,Button,Text,StyleSheet,ScrollView,TextInput,TouchableOpacity,Image,ActivityIndicator} from 'react-native';
// import StartPage from "./StartPage";
// import Profile from "./Profile";
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';


export default function GroupMessages({navigation,route}){
    const username=route.params.username;
    const GroupName=route.params.GroupName;
 const [image, setimage] = useState(null)
const [Msg,setMsg]=useState("")
const [MsgData, setMsgData] = useState([])
const [GroupData, setGroupData] = useState([])
const scrollViewRef=useRef();

let persons=[]

useEffect(()=>{

    // axios.get("http://192.168.0.114:3003/getGroups").then((res) => {
    //   setGroupData(res.data)
  

    // })

 let unmounted=false
    axios.get("http://192.168.0.114:3003/getGroupsMsgs").then((res) => {
        if(!unmounted){
        setMsgData(res.data)
        }
         

    })
    axios.get("http://192.168.0.114:3003/getGroups").then((res) => {
            if(!unmounted){
      setGroupData(res.data)
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
       axios.post("http://192.168.0.114:3003/GrpMsg",{GroupName:GroupName,username:username,message:data.secure_url})
     }).catch(err => console.log(err))
   }

 }
 //do3uo67h5
 //res.cloudinary.com
    

    function SendMsg(){
        axios.post("http://192.168.0.114:3003/GrpMsg",{GroupName:GroupName,username:username,message:Msg}).then((res)=>{
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
            GroupData.map((e1,id) => {
            if(e1.GroupName===GroupName){
                return(
                <Image source={{ uri: e1.GroupIcon }} style={{ width: 50, height: 50, borderRadius: 100,marginBottom:5,marginTop:5 }} key={id}></Image>
                
                )
                }
            
        })
    }

      <Text style={styles.Heading1} onPress={() => navigation.navigate('GroupDetails', { GroupName: GroupName})}>{GroupName}</Text>
      </View>


         <ScrollView style={styles.content1}  ref={scrollViewRef} 
                           onContentSizeChange={()=>scrollViewRef.current.scrollToEnd({animated:true})}>
            {
            MsgData.length===0 ? <ActivityIndicator size="large" color='red'/> : null
           }
            {   
                MsgData.map((e,id)=>{
                    persons=[]
                    if(e.GroupName===GroupName){
                        e.persons.map((e2,id)=>{
                            persons.push(e2)
                        })
                    return(
                        <View style={{
                            alignItems: e.username===username ? 'flex-end' : 'flex-start',
                            marginBottom:10,
   
                        }} key={id}>
                            {
                            e.message.includes("res.cloudinary.com") ? <View style={{
                                alignItems: e.username===username ? 'flex-end' : 'flex-start',
                                marginBottom:10,
                                backgroundColor: e.username===username ? 'white' : '#444444',
                                width: 210,
                                padding:4,
                                borderTopLeftRadius: e.username===username ? 20 : 0,
                                borderBottomLeftRadius:10,
                                borderBottomRightRadius:10,
                                borderTopRightRadius: e.username===username ? 0 : 20,
       
                            }}>
                                <Text style={{
                                fontSize:12,
                                fontWeight:"bold",
                                color:'rgb(250,100,100)',
                              
                                }}>{e.username}</Text> 
                                <Image source={{ uri: e.message }} style={{ width: 200, height: 200,borderRadius: 10, }} />
                                <Text style={{
                                    fontSize:12,
                                    fontWeight:"bold",
                                     color:'rgb(250,100,100)',
                                    borderTopLeftRadius:10,
                                    borderTopRightRadius:10,
                                    // paddingLeft:'90%',
                                    }}>{e.postedTime.slice(11,16)}</Text>

                            </View>
                            : <View style={{
                               
                                backgroundColor: e.username===username ? 'white' : '#444444',
                                borderWidth:3,
                                borderColor: e.username===username ? 'black' : 'whitesmoke',
                                padding:4,
                                    borderTopLeftRadius: e.username===username ? 20 : 0,
                                    borderBottomLeftRadius:10,
                                    borderBottomRightRadius:10,
                                    borderTopRightRadius: e.username===username ? 0 : 20,
                                }}>
                                 <Text style={{
                                fontSize:12,
                                fontWeight:"bold",
                                color:'rgb(250,100,100)',
                                }}>{e.username===username ? "You" : e.username}</Text>
                            {
                                !persons.includes(username) ?  <Text style={{
                                    fontSize:17, 
                                    padding:2,
                                    maxWidth:'80%',
                                    color: e.username===username ? 'black' : 'whitesmoke',

                                   
    
                                    }} onLongPress={()=>{
                                        
                                        persons.push(username)
                                        axios.put("http://192.168.0.114:3003/delmessage2",{params:{id:e._id,persons:persons}})
                                       
                                    }}>{e.message}</Text >  : <Text style={{
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

                                     
                                        }} onLongPress={()=>{
                                        axios.put("http://192.168.0.114:3003/undelmessage2",{params:{id:e._id,username:username}})
                                       
                                    }}>This message was deleted</Text>
                                    
                            }
                           <Text style={{
                                    fontSize:12,
                                    fontWeight:"bold",
                                    color:'rgb(250,100,100)',
                                    borderTopLeftRadius:10,
                                    borderTopRightRadius:10,
                                    // paddingLeft:'90%',
                                    }}>{e.postedTime.slice(11,16)}</Text>

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



const styles=StyleSheet.create({
    icon1:{
        fontSize:20,
        marginLeft:5,
        marginBottom:3,
        backgroundColor:'whitesmoke',
        color:'black',
        borderRadius:15,
       
        paddingLeft:15,
        paddingRight:10,
        width:'80%',
    },
    icon2:{
        fontSize:35,
        marginBottom:3,
    },
    content1:{
        flex:1,
        marginTop:45,
        marginLeft:10,
        marginRight:10,
        marginTop:60,
        
       
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
        // fontSize:70,
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
        marginLeft: 20,
        marginTop:15,
        color:"whitesmoke",
        fontWeight:"bold",
    },
    Heading2: {
        fontSize: 35,
        marginLeft: 10,
        color:"whitesmoke",
         marginTop:-5,
         fontWeight:"bold",
    },
   
    
})

  // if(MsgData.length!==0){
                
        //     MsgData.map((e)=>{
              
        // if((e.username===username && e.frndname===frndname) || (e.username===frndname && e.frndname===username)){
           
        // setid(e._id)
        // setmessagelist(e.messagelist)
        // settime(e.time)
        // setallow4("true")
        // }
        // })
        // if(allow4==="true" && Msg.length>0){
        // messagelist.push(Msg)
        // time.push((new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()).toString())
        // axios.put("http://192.168.0.114:3003/Msgfrnd2",{messagelist:messagelist,time:time,id:id})
        // .then((res)=>{
        
        // if(res.data.message==="updated"){
        // setMsg("")
        // }
        // })
        // }
        // }
        // if(MsgData.length===0){
        //   messagelist.push(Msg)
        //   time.push((new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()).toString())
        //   axios.post("http://192.168.0.114:3003/Msgfrnd1",{username,frndname,messagelist,time}).then((res)=>{
        //     if(res.data.message==="Message addedd Successfully"){
        //         setMsg("")
        //         }
       
        // })
        
        // }
       


