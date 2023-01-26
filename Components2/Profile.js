import axios from "axios";
import React, { useState,useEffect } from "react";
import {View,Button,Text,StyleSheet,ScrollView,Image,TouchableOpacity,ActivityIndicator} from 'react-native'
// import StartPage from "./StartPage";
// import FriendsList from "./FriendsList";
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
// import Settings from "./Settings";

//import DatePicker from 'react-native-datepicker';

export default function Profile({navigation,route}){
  const username=route.params.username
   
    const [image, setimage] = useState(null)
  //  const [allow,setalllow]=useState(false)
    // const [userPost,setuserPost]=useState("")
  const [userInfo,setuserInfo]=useState([])
    const [userdp,setuserdp]=useState([])
    // const [id,setid]=useState("")
    const [FriendList, setFriendList] = useState([])
    const [Dlist,setDlist]=useState([])
    const [Email,setEmail]=useState("")
   const [Gender,setGender]=useState("")
    const [DOB,setDOB]=useState("")
 const [allow,setallow]=useState(false)
    let result;
    let count1=0
   
    let userpic;
    useEffect(()=>{
      let unmounted=false
    
            axios.get("http://192.168.0.114:3003/getdp").then((res) => {
              if(!unmounted){
              setuserdp(res.data)
          
              }
          })
          axios.get("http://192.168.0.114:3003/getUser").then((res) => {
            if(!unmounted){
            setuserInfo(res.data)
            }

        })
        
  

             
          axios.get("http://192.168.0.114:3003/getfriends").then((res) => {
            if(!unmounted){
            setDlist(res.data)
            }
            res.data.map((e,id9)=>{
              if(e.username===username){
                if(!unmounted){
                setFriendList(FriendList=>[...FriendList,e.friendlist])
                count1=count1+1
                }
              }
             else if(e.friendlist===username){
              if(!unmounted){
              setFriendList(FriendList=>[...FriendList,e.username])
              count1=count1+1
              }
              }
            })
        })

        return ()=>{
          unmounted=true;
      }
       
             
    },[])

    const pickImage = async (id) => {
     
 
   }
   if(allow===true){
    return(<Settings username={username}/>)

   }

  

    return(
        < >
        
            <View style={styles.content}>
            {
            userdp.length===0 ? <ActivityIndicator size="large" color='red'/> : null
           }
               
                {
                  userdp.map((e,id1)=>{
                   
                    if(e.username===username){
                    
                        return(
                          <View key={id1}>
                            
                         <Image source={{ uri: e.userdp }} key={id1} style={styles.imageStyle } />
                       <Text style={{fontSize:20,alignSelf:'center',marginBottom:10,fontWeight:'bold',color:'lightblue',marginBottom:30,}}  onPress={async()=>{
                          result = await ImagePicker.launchImageLibraryAsync({
                            allowsEditing: true,
                            aspect: [4, 3],
                            base64: true
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
                              axios.put("http://192.168.0.114:3003/updatedp",{params:{id:e.id,userdp:data.secure_url}}).then((res)=>{
                                alert(res.data.message)
                              
                              })
                              console.log(data.secure_url)
                              // userpic=data.secure_url
                              // allow=true
                            
                              
                              
                            }).catch(err => console.log(err))
                          }
                          // console.log(allow)
                          // console.log(userpic)
                          // if(allow===true){
                          //   axios.put("http://192.168.0.114:3003/updatedp",{params:{id:e.id,userdp:userpic}}).then((res)=>{
                          //     alert(res.data.message)
                            
                          //   })
                          // }
                       }}>Change Profile Picture</Text>

                      <View style={{marginLeft:50,marginBottom:10,}}>
                      <Text style={styles.data}>username  :  {username}</Text>
                          {
                            userInfo.map((e1, id5) => {
                              if (username === e1.username) {
                                 return( <Text style={styles.data} key={id5}>Email     :  {e1.Email}</Text>)
                              }
                          })
                          }
                       
                        <Text style={styles.data}>DOB       :  {e.DOB}</Text>
                        <Text style={styles.data}>Gender  :  {e.Gender}</Text>
                      </View>
                      </View>
                        )
                    }
                  })
                }
               
                <View  style={styles.Profile}>

                <View style={styles.frnds1} onPress={() => navigation.navigate('FriendsList', { username: username })}>
                <Text style={styles.frnds2} onPress={() =>navigation.navigate('FriendsList', { username: username })}>Friends</Text>
                <Text style={styles.frnds3} onPress={() => navigation.navigate('FriendsList', { username: username })}>{FriendList.length}</Text>
                </View>

               

                <View style={styles.settings} >
                <Text style={styles.settings1} onPress={()=>{
                 navigation.navigate('Settings', { username: username })
                }}>Settings</Text>
                <Text style={styles.settings2} onPress={()=>{
                 navigation.navigate('Settings', { username: username })
                }}>⚙️</Text>
                </View>
                </View>


                {/* <Button  onPress={pickImage} style={{ width: 200, alignSelf: 'center' }} title="Change DP"></Button> */}
             
       
            </View>


           
            <View style={styles.footer}>
              <TouchableOpacity onPress={() => navigation.navigate('StartPage', { username: username })}><Ionicons name="home-outline" size={35} color="white" style={styles.icon}  /></TouchableOpacity>
               <TouchableOpacity onPress={() => navigation.navigate('AllMessages', { username: username })} ><Ionicons name="ios-chatbubbles-outline" size={35} color="white" style={styles.icon} /></TouchableOpacity>
            {
                userdp.map((e1,id5) => {
                if(e1.username===username){
                    return(
                    <TouchableOpacity onPress={() => navigation.navigate('Profile', { username: username })} key={id5}><Image source={{ uri: e1.userdp }} style={{ width: 40, height: 40, borderRadius: 100, alignSelf: 'center',marginRight:10, }}  ></Image></TouchableOpacity>
                    )
                    }
                
            })
        }
          </View>
        </>
    )
}
const styles=StyleSheet.create({
   
    icon:{
        fontSize:35,
        color:'black',
        marginLeft:10
    },

    data:{
      fontSize:15,
      marginBottom:10,
      borderWidth:1,
      borderRadius:10,
      borderColor:'#cccccc',
      width:'85%',
      padding:10,
    },
   
    footer:
    {
        fontSize:70,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'whitesmoke',
        position:'relative',
        bottom:0,
        width:'100%',
        

    },
   
    
    content:{
        marginTop:10,
        flex:1,
    },
    content1:{
        fontSize:30,
        textAlign:'center',
        fontWeight:'bold',
    },
   
      imageStyle:{
        width: 120,
         height: 120,
          borderRadius: 100, 
          borderWidth:3,
          marginBottom:10,
          alignSelf:'center'
          // borderColor:'white',
      },
      linearGradient1: {
        alignSelf: 'center',
         borderRadius: 100,
        width: 123,
        height: 123,
       
      },
      frnds1:{
      
        borderWidth:1,
        borderRadius:10,
        borderColor:'#cccccc',
        
        marginLeft:20,
        padding:10,
      },
      frnds2:{
        fontSize:20,
      },
      frnds3:{
        fontSize:20,
        textAlign:'center',
      },
      settings:{
        borderWidth:1,
        borderRadius:10,
        borderColor:'#cccccc',
        
       marginRight:20,
       padding:10,
      },
      settings1:{
        fontSize:20,
      },
      settings2:{
        fontSize:20,
        textAlign:'center',

      },
      Profile:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginBottom:20,
      }

    
    
})