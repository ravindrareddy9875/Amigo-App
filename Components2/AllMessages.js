import axios from "axios";
import React, { useState,useEffect,useRef } from "react";
import {View,Button,Text,StyleSheet,ScrollView,TextInput,TouchableOpacity,Image,ActivityIndicator} from 'react-native';
// import StartPage from "./StartPage";
// import Profile from "./Profile";


export default function AllMessages({navigation,route}){
     const username=route.params.username;

const [allow1,setallow1]=useState(false)
const [allow2,setallow2]=useState(true)
const [allow3,setallow3]=useState(false)

const [MsgData, setMsgData] = useState([])
const [GrpMsgData,setGrpMsgData]=useState([])

const [Dlist,setDlist]=useState([])
const [userData, setuserData] = useState([])
const [GroupData,setGroupData]= useState([])
const scrollViewRef=useRef();
let count=0

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
        res.data.slice(0).reverse().map((e,id8)=>{
            if(e.username===username && !Dlist.includes(e.frndname)){
                Dlist.push(e.frndname)
            }
           else if(e.frndname===username && !Dlist.includes(e.username)){
                Dlist.push(e.username)
            }
        })
        }

    })
    axios.get("http://192.168.0.114:3003/getGroupsMsgs").then((res) => {
        if(!unmounted){
        setGrpMsgData(res.data)
        }

    })
    axios.get("http://192.168.0.114:3003/getGroups").then((res) => {
        if(!unmounted){
      setGroupData(res.data)
        }
    })
    // axios.get("http://192.168.0.114:3003/getfriends").then((res) => {
    //     if(!unmounted){
    //     setDlist(res.data)
    //     }

    // })

    return ()=>{
        unmounted=true;
    }
 
},[MsgData])



    
////============= ================================ ================================== =================================== ========
   

    
    return(
        <>
      <View style={styles.header}>
      <Text style={styles.Heading2} onPress={() => navigation.navigate('StartPage', { username: username})}>← </Text>                   
      <Text style={styles.Heading1}>Messages</Text>
      </View>

            <View style={styles.header2}>
                <Text style={{
                    backgroundColor:allow1 ? 'white' : '#444444',
                    color:allow1 ? '#444444' : 'white',
                    width:'50%',
                    paddingLeft:75,
                    fontSize:20,

                    }} onPress={()=>{
                        if (allow1 === false) {
                            setallow1(true)
                        }
                        if (allow1 === true) {
                            setallow1(false)
                        }
                        setallow3(false)
                        setallow2(true)
                    }}>Chats</Text>
              
                <Text style={{
                    backgroundColor:allow1 ? '#444444' : 'white',
                    color:allow1 ? 'white' : '#444444',
                    width:'50%',
                    paddingLeft:75,
                    fontSize:20,
                    

                    }} onPress={()=>{
                        if (allow1 === false) {
                            setallow1(true)
                        }
                        if (allow1 === true) {
                            setallow1(false)
                        }
                      setallow2(false)
                      setallow3(true)
                    }}>Groups</Text>
            </View>

{/* ====================================================================================================================================== */}
{/* ====================================================================================================================================== */}

         <ScrollView style={styles.content1}>
           {
            allow2 ? <View>
           {
            Dlist.length===0 ? <View>
                <ActivityIndicator size="large" color='red'/>
                <Text style={{fontSize:15,marginLeft:25,backgroundColor:'#888888',
                color:'white',paddingLeft:10,width:'85%',
                borderWidth:1,borderColor:'#888888',padding:5,
                borderRadius:10,}}>Plz wait while we load Messages for you 😊</Text>
            </View> : null
           }
          { 
          Dlist.map((e,id)=>{
           
            // if(e.username===username){
                count=0
                return(
                <View key={id}>
                    {
                        userData.map((e1,id1) => {
                            if(e1.username===e){
                               return(
                                <View key={id1}>
                               
                        {
                                MsgData.slice(0).reverse().map((e2,id2) => {

                                    if (e2.username === username && e2.frndname === e) {
                                        if (count == 0) {
                                            count = count + 1
                                            return (<View key={id2} style={{ shadowOffset:{width:8,height:5},
                                                shadowColor:'green',
                                                shadowRadius:5,
                                                elevation:5,
                                                shadowOpacity:0.5,}}>
                                                 <View style={styles.content}>
                                                <Image source={{ uri: e1.userdp }} style={{ width: 60, height: 60, borderRadius: 100, alignSelf: 'center',marginLeft:5, }}></Image>
                                                <Text style={{fontSize:18,paddingLeft:20,fontWeight:'bold'}} onPress={() => navigation.navigate('Messages', { username: username, frndname: e })}>{e}</Text>
                                                </View>
                                                <Text style={{marginLeft:100,marginTop:-50,color:'#767676',marginBottom:10}}  onPress={() => navigation.navigate('Messages', { username: username, frndname: e.friendlist })}> {e2.message.slice(0,25)}...</Text>
                                                <Text style={{marginLeft:'85%',marginTop:-30,color:'#767676',marginBottom:10}}>{e2.time.slice(11,16)}</Text>
                                            </View>)

                                        }
                                    }
                                    if (e2.username === e && e2.frndname === username) {
                                        if (count == 0) {
                                            count = count + 1
                                            return (<View key={id2} style={{ shadowOffset:{width:-8,height:10},
                                                shadowColor:'green',
                                                elevation:5,
                                                shadowRadius:5,
                                                shadowOpacity:1,}}>
                                                 <View style={styles.content}>
                                                <Image source={{ uri: e1.userdp }} style={{ width: 60, height: 60, borderRadius: 100, alignSelf: 'center',marginLeft:5, }}></Image>
                                                <Text style={{fontSize:18,paddingLeft:20,fontWeight:'bold'}} onPress={() => navigation.navigate('Messages', { username: username, frndname: e })}>{e}</Text>
                                                </View>
                                                <Text style={{marginLeft:100,marginTop:-50,color:'#444444',marginBottom:10}}  onPress={() => navigation.navigate('Messages', { username: username, frndname: e.friendlist })}>{e2.message.slice(0,25)}...</Text>
                                                <Text style={{marginLeft:'85%',marginTop:-30,color:'#767676',marginBottom:10}}>{e2.time.slice(11,16)}</Text>
                                            </View>)

                                        }
                                    }



                                })
                            }
                                </View>

                                )
                               }
                            
                        })
                    }
                </View>
                )
            
{/* ====================================================================================================================================== */}
        
            // if(e.friendlist===username){
            //     count=0
            //     return(
            //         <View key={id}>
            //         {
            //             userData.map((e1,id1) => {
            //                 if(e1.username===e.username){
            //                    return(
            //                     <View key={id1}>
                               
            //             {
            //                     MsgData.slice(0).reverse().map((e2,id2) => {

            //                         if (e2.frndname === username && e2.username === e.username) {

            //                             if (count == 0) {
            //                                 count = count + 1
            //                                 return (<View key={id2}>
            //                                      <View style={styles.content}>
            //                                         <Image source={{ uri: e1.userdp }} style={{ width: 60, height: 60, borderRadius: 100, alignSelf: 'center',marginLeft:5, }}></Image>
            //                                         <Text style={{fontSize:18,paddingLeft:20,fontWeight:'bold'}} onPress={() => navigation.navigate('Messages', { username: username, frndname: e.username })}>{e.username}</Text>
            //                                         </View>
            //                                     <Text style={{marginLeft:100,marginTop:-50,color:'#767676',marginBottom:10}} onPress={() => navigation.navigate('Messages', { username: username, frndname: e.username })}> {e2.message.slice(0,25)}...</Text>
            //                                     <Text style={{marginLeft:'85%',marginTop:-30,color:'#767676',marginBottom:10}}>{e2.time.slice(11,16)}</Text>
            //                                 </View>)

            //                             }
            //                         }
            //                         if (e2.frndname === e.username && e2.username === username) {

            //                             if (count == 0) {
            //                                 count = count + 1
            //                                 return (<View key={id2}>
            //                                      <View style={styles.content}>
            //                                         <Image source={{ uri: e1.userdp }} style={{ width: 60, height: 60, borderRadius: 100, alignSelf: 'center',marginLeft:5, }}></Image>
            //                                         <Text style={{fontSize:18,paddingLeft:20,fontWeight:'bold'}} onPress={() => navigation.navigate('Messages', { username: username, frndname: e.username })}>{e.username}</Text>
            //                                     </View>
            //                                     <Text style={{marginLeft:100,marginTop:-50,color:'#444444',marginBottom:10}} onPress={() => navigation.navigate('Messages', { username: username, frndname: e.username })}>{e2.message.slice(0,25)}...</Text>
            //                                     <Text style={{marginLeft:'85%',marginTop:-30,color:'#767676',marginBottom:10}}>{e2.time.slice(11,16)}</Text>
            //                                 </View>)

            //                             }
            //                         }



            //                     })
            //                 }
            //                     </View>

            //                     )
            //                    }
                            
            //             })
            //         }
            //     </View>
            //     )
            // }
          

           })
           
           }
           </View> : null

           }

{/* ====================================================================================================================================== */}
{/* ====================================================================================================================================== */}
{
allow3 ? <View>
      {
            GroupData.length===0 ? <ActivityIndicator size="large" color='red' /> : null
    }
    {
        GroupData.map((e,id)=>{
            return(
            <View key={id}>
                {
                    e.Admin===username ? <View>
                        {/* {
                             count=0
                        } */}
                        <View style={styles.content2}>
                         <Image source={{uri: e.GroupIcon }} style={{ width: 60, height: 60, borderRadius: 100, alignSelf: 'center',marginLeft:5 }}></Image>
                        <Text style={{fontSize:18,paddingLeft:25,fontWeight:'bold'}} onPress={() => navigation.navigate('GroupMessages', { username: username, GroupName: e.GroupName })}>{e.GroupName}</Text>
                        </View>
                        {
                            GrpMsgData.slice(0).reverse().map((e2,id2)=>{
                                if(e2.GroupName===e.GroupName){
                                    if(count===0){
                                        count=count+1
                                        return(
                                            <View key={id2}>
                                            <Text style={{marginLeft:100,marginTop:-40,color:'#767676',marginBottom:10,}}>{e2.message.slice(0,25)}...</Text>
                                            <Text style={{marginLeft:'85%',marginTop:-30,color:'#767676',marginBottom:10,}}>{e2.postedTime.slice(11,16)}</Text>
                                        </View>
                                        )
                                    }
                                }
                            })
                        }

                    </View> : null
                }
                <View>
                
                {
                    e.Participants.map((e1,id1)=>{
                        if(e1===username){
                            count=0
                            return(<View key={id1}>
                                <View style={styles.content2}>
                         <Image source={{uri: e.GroupIcon }} style={{ width: 60, height: 60, borderRadius: 100, alignSelf: 'center',marginLeft:5 }}></Image>
                        <Text style={{fontSize:18,paddingLeft:25,fontWeight:'bold'}} onPress={() => navigation.navigate('GroupMessages', { username: username, GroupName: e.GroupName })}>{e.GroupName}</Text>
                        </View>
                        {
                            GrpMsgData.slice(0).reverse().map((e2,id2)=>{
                                if(e2.GroupName===e.GroupName){
                                    if(count===0){
                                        count=count+1
                                        return(
                                            <View key={id2}>
                                            <Text style={{marginLeft:100,marginTop:-40,color:'#767676',marginBottom:10,}}>{e2.message.slice(0,25)}...</Text>
                                            <Text style={{marginLeft:'85%',marginTop:-30,color:'#767676',marginBottom:10,}}>{e2.postedTime.slice(11,16)}</Text>
                                        </View>
                                        )
                                    }
                                }
                            })
                        }

                            </View>)
                        }
                    })
                }
                </View>
            </View>
            )
        })
    }
    
</View> : null
}




         </ScrollView>

         
{/* ====================================================================================================================================== */}

            
        </>
    )
}


{/* <ScrollView style={{marginTop:40}} ref={scrollViewRef} 
                           onContentSizeChange={()=>scrollViewRef.current.scrollToEnd({animated:true})}></ScrollView> */}
const styles=StyleSheet.create({
    loading:{
        fontSize:40,
        color:'red',

    },
    icon1:{
        fontSize:20,
        marginLeft:5,
        marginBottom:3,
        backgroundColor:'whitesmoke',
        color:'black',
        borderWidth:3,
        borderColor:'black',
        borderRadius:15,
        paddingLeft:15,
        width:'85%',
    },
    icon2:{
        fontSize:30,
        marginBottom:3,
    },
    content1:{
        flex:1,
        marginTop:55,
        backgroundColor:'#dddddd',
       
    },
    content:{
       
    flexDirection:'row',
    borderWidth:1,
    borderRadius:10,
    borderColor:'#cccccc',
    PaddingLeft:10,
    marginBottom:20,
    marginLeft:15,
    marginRight:15,
    backgroundColor:'white',
   


    },
    content2:{
       
    flexDirection:'row',
     borderWidth:1,
    borderRadius:10,
    borderColor:'#cccccc',
    PaddingLeft:10,
    marginBottom:10,
    marginLeft:15,
    marginRight:15,
    backgroundColor:'white',
    shadowOffset:{width:-8,height:10},
    shadowColor:'red',
    shadowRadius:5,
    shadowOpacity:1,


    },
    footer:
    {
        fontSize:70,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'whitesmoke',
        position:'relative',
        bottom:0,
       
        

    },
    header: {
        flexDirection: 'row',
        position: 'relative',
        backgroundColor: 'black',
        width: '100%',
        top: 50
    },
    header2: {
        flexDirection: 'row',
        width: '100%', 
        top: 50,
        
    },
    Heading1: {
        fontSize: 25,
        marginLeft: 5,
        color:"whitesmoke",
        fontWeight:"bold",
        marginBottom:10,
        marginTop:5,
    },
    Heading2: {
         fontSize: 35,
        marginLeft: 10,
        color:"whitesmoke",
         marginTop:-8,
         fontWeight:"bold",
    },
   
    
})


