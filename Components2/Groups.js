import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Button, ScrollView, FlatList, TextInput, Text,ActivityIndicator,Alert } from 'react-native';

import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

export default function Groups({ navigation, route }) {
   const username = route.params.username;

  const [allow, setallow] = useState(false)
  const [allow1, setallow1] = useState(false)
 const [allow3, setallow3] = useState("Join")
  
  const [GroupName, setGroupName] = useState("")
 const [GroupName1,setGroupName1]= useState("")
  const [GroupsList, setGroupsList] = useState([])
 
  const [allow2, setallow2] = useState(false)

  const [GroupData, setGroupData] = useState([])
  const [userdp, setuserdp] = useState([])
const [GroupIcon,setGroupIcon]=useState("")
const [Description,setDescription]=useState("")
const [image,setimage]=useState("")
  

  let Participants = []
  let result;



  useEffect(() => {
    let unmounted=false
    // if(!unmounted){
    axios.get("http://192.168.0.114:3003/getGroups").then((res) => {
      if(!unmounted){
      setGroupData(res.data)
      }
      res.data.map((e,id1)=>{
        if(!unmounted){
        setGroupsList((GroupsList)=>[...GroupsList,e.GroupName])
        }
      })
   


    })
    return ()=>{
      unmounted=true;
  }

  }, [GroupData])


  function addGroup() {
    if(GroupName!==""){
      if(!GroupsList.includes(GroupName)){
    axios.post("http://192.168.0.114:3003/addGroup", { Admin: username, GroupName: GroupName,GroupIcon:GroupIcon,Description:Description }).then((res)=>{
      alert(res.data.message)
    })
  }
  else{
    alert("GroupName already Exist")
  }
}
else{
  alert("GroupName should not be empty")
}
  }

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
       setGroupIcon(data.secure_url)
       
       
     }).catch(err => console.log(err))
   }

 }
 



  return (
    <>

      <ScrollView style={styles.content}>
        <View style={{flexDirection:"row",
                    borderWidth:1,
                    marginLeft:20,
                    marginRight:20,
                    paddingLeft:10,
                    borderRadius:15,
                    marginBottom:20,
                    }}>
      <Ionicons name="search" size={30} color="white" style={styles.icon} />
   
      <TextInput placeholder='Search Group...' onChangeText={(e) => setGroupName1(e)} style={styles.input1}></TextInput>
      </View>
              {
                GroupData.map((e,id) => {
                  if (GroupName1!=="" && e.GroupName.includes(GroupName1)) {
                    e.Participants.map((e1) => {
                      Participants.push(e1)
                    })
                    return(<View  key={id} style={{
                    marginLeft:30,
                    borderWidth:1,
                    borderRadius:15,
                    marginRight:20,
                    marginBottom:20,

                    }}>
                      <View style={{flexDirection:'row',marginBottom:10,}}>
                      {/* <View style={{width:70,height:70,backgroundColor:'grey',borderWidth:1,borderRadius:100,borderColor:'grey',marginTop:5, marginLeft:5}}></View> */}
                 <Image source={{ uri: e.GroupIcon }} style={{ width: 70, height: 70,borderRadius: 100, marginTop:5, marginLeft:5 }} />

                    <Text style={styles.searchgrp} onPress={() => navigation.navigate('GroupDetails', {GroupName:e.GroupName,username: username })}>{e.GroupName}</Text>
                    </View>
                    {
                      Participants.includes(username) ? <View style={{flexDirection:'row'}}>
                        <Text style={styles.btn1}>Message</Text>
                        <Text style={styles.btn3}>Leave</Text>
                      </View>
                       :
                        <Text style={{fontSize:15,
                          borderWidth:2,
                          paddingTop:5,
                          paddingBottom:5,
                          paddingLeft:13,
                          paddingRight:10,
                          borderRadius:10,
                          color:'white',
                          backgroundColor:'#444444',
                          marginLeft:90,
                          // width:"15%",
                          marginTop:-40,
                           marginBottom:5,
                           marginRight:allow3==="Join" ? 220 : 170, 
                          }} onPress={()=>{
                          axios.post("http://192.168.0.114:3003/grpRequest1", { params: { Admin: e.Admin, GroupName: e.GroupName,Requestlist:username } }).then((res)=>{
                      if(res.data.message==="Request addedd Successfully"){
                        setallow3("Requested")
                      }
                    })
                        }}>{allow3}</Text>
                    }
                    </View>)
                  }
                 
                })
              }
        
      <Text style={styles.mygrp}>My Groups</Text>
      {
            GroupData.length===0 ? <ActivityIndicator size="large" color='red'/> : null
           }

    {
          GroupData.map((e,id)=>{
            return(<View key={id}>
              {
                e.Admin===username ? <View style={styles.mygrp1} key={id}>
                <View style={{flexDirection:'row',marginBottom:10,}}>
                {/* <View style={{width:70,height:70,backgroundColor:'grey',borderWidth:1,borderRadius:100,borderColor:'grey',marginTop:5, marginLeft:5}}></View> */}
       <Image source={{ uri: e.GroupIcon }} style={{ width: 70, height: 70,borderRadius: 100, marginTop:5, marginLeft:5 }} />

              <Text style={styles.searchgrp} onPress={() => navigation.navigate('GroupDetails', {GroupName:e.GroupName,username: username })}>{e.GroupName}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
              <Text style={styles.message}  onPress={() => navigation.navigate('GroupMessages', { username: username,GroupName:e.GroupName })}>Message</Text>
                  <Text style={styles.leave} onPress={() => {
                                           Alert.alert(
                                              "Leave Group",
                                              "Are you sure to Leave the Group?",
                                              [
                                                {
                                                  text: "Yes",
                                                  onPress: () => {
                                                      
                                                      let id2=e._id
                                                      console.log("id2 ",id2)
                                                      axios.put("http://192.168.0.114:3003/delParticipant",{params:{id:e._id,Participant:username}}).then((res)=>{
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
                                      }}>Leave</Text>
                                      
                              </View>
                          
            </View> : null
              }
              {
                
                e.Participants.map((e1,id9)=>{
                  // 
                  if(e1===username  ){
                  return(<View style={styles.mygrp1} key={id}>
                      <View style={{flexDirection:'row',marginBottom:10,}}>
                      {/* <View style={{width:70,height:70,backgroundColor:'grey',borderWidth:1,borderRadius:100,borderColor:'grey',marginTop:5, marginLeft:5}}></View> */}
             <Image source={{ uri: e.GroupIcon }} style={{ width: 70, height: 70,borderRadius: 100, marginTop:5, marginLeft:5 }} />

                    <Text style={styles.searchgrp} onPress={() => navigation.navigate('GroupDetails', {GroupName:e.GroupName,username: username })}>{e.GroupName}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                    <Text style={styles.message}  onPress={() => navigation.navigate('GroupMessages', { username: username,GroupName:e.GroupName })}>Message</Text>
                        <Text style={styles.leave} onPress={() => {
                                                 Alert.alert(
                                                    "Leave Group",
                                                    "Are you sure to Leave the Group?",
                                                    [
                                                      {
                                                        text: "Yes",
                                                        onPress: () => {
                                                            
                                                            let id2=e._id
                                                            console.log("id2 ",id2)
                                                            axios.put("http://192.168.0.114:3003/delParticipant",{params:{id:e._id,Participant:username}}).then((res)=>{
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
                                            }}>Leave</Text>
                                            
                                    </View>
                                
                  </View>) 
                   
                  }
                })
              
              }
           
            </View>)
            
          })
        }


       
     
      <TouchableOpacity onPress={()=>{
          if(allow===false){
            setallow(true)
          }
          if(allow===true){
            setallow(false)
          }
        }}>
        <Text style={styles.createGrp1} >Create a Group</Text></TouchableOpacity>
        {
          allow ?  <View>
            <Text style={styles.entergrp}>Enter Group Name</Text>
            <TextInput placeholder='Group...' onChangeText={(e) => setGroupName(e)} style={styles.input2}></TextInput> 
            <Text style={styles.entergrp}>Description</Text>

                <TextInput  placeholder="Description..." onChangeText={(text) => setDescription(text)} style={styles.input2} ></TextInput>
                <TouchableOpacity onPress={pickImage}>

      <Text style={{alignSelf: 'center',fontSize:17,marginTop:10,
      marginBottom:10,borderWidth:2,padding:5,borderRadius:10,
      backgroundColor:'#555555',color:'white',
      fontWeight:'bold',}} >Select Image</Text>
      
      </TouchableOpacity>
        <View style={{ backgroundColor: 'transparent',alignSelf: 'center' }}>
          {image ?
             <Image source={{ uri: image }} style={{ width: 200, height: 200,borderRadius: 10, alignSelf: 'center' }} />
            :
            <View style={{ backgroundColor: 'grey', width: 200, height: 200, borderRadius: 10 }} />
          }
        </View>
        <TouchableOpacity onPress={addGroup}>
        <Text  style={styles.Button2}>Create Group</Text></TouchableOpacity>
          </View>: null
        }
       
       
      </ScrollView>





    </>


  );

}

const styles = StyleSheet.create({

  searchgrp:{
  fontSize:18,
  marginLeft:15,
  // marginTop:10,

  },

  mygrp: {
    fontSize: 20,
    marginLeft:20,
    marginBottom:10,
    color:"red",
    fontWeight:'bold',


  },
  text1: {
    flexDirection: 'row',
    marginRight:15,
},
btn1:{
  
  fontSize:15,
  borderWidth:2,
  paddingTop:5,
   paddingBottom:5,
  paddingLeft:12,
  paddingRight:10,
  borderRadius:10,
  color:'white',
  backgroundColor:'#444444',
  marginLeft:90,
  // width:"25%",
  marginTop:-40,
  marginBottom:10,
  // marginRight:220,
},
btn3:{
  
  fontSize:15,
  borderWidth:2,
  paddingTop:5,
   paddingBottom:5,
  paddingLeft:14,
  paddingRight:10,
  borderRadius:10,
  color:'white',
  backgroundColor:'#444444',
  marginLeft:20,
  // width:"20%",
  marginTop:-40,
  marginBottom:10,
},
btn2:{
  
  fontSize:15,
  borderWidth:2,
  paddingTop:5,
  paddingBottom:5,
  paddingLeft:13,
  paddingRight:10,
  borderRadius:10,
  color:'white',
  backgroundColor:'#444444',
  marginLeft:90,
  // width:"15%",
  marginTop:-40,
   marginBottom:5,
   marginRight:220,
},
message:{
  
  fontSize:15,
  borderWidth:2,
  paddingTop:10,
  paddingBottom:5,
  paddingLeft:13,
  paddingRight:10,
  borderRadius:10,
  color:'white',
  backgroundColor:'#444444',
  //  marginLeft:-90,
  marginTop:40,
  marginBottom:10,
  // marginRight:20,
   
},

leave:{
  
  fontSize:15,
  borderWidth:2,
  paddingTop:10,
   paddingBottom:5,
  paddingLeft:14,
  paddingRight:10,
  borderRadius:10,
  color:'white',
  backgroundColor:'#444444',
  marginLeft:15,
  marginTop:40,
  marginBottom:10,
  marginRight:20,
},

  mygrp1: {
    fontSize: 20,
    flexDirection:"row",
    justifyContent:'space-between',
    borderWidth:1,
    borderRadius:15,
    marginLeft:15,
    marginRight:15,



  },
  grp:{
    fontSize: 22,
    paddingLeft:20,
    marginTop:5,
    marginBottom:5,
  },
  Button1:{
    fontSize: 18,
    fontWeight:'bold',
    backgroundColor:'lightgreen',
    borderRadius:15,
    padding:5,
   marginRight:10,
  },
  createGrp1:{
    marginTop:20,
    fontSize: 20,
    marginLeft:20,
    marginBottom:10,
    color:"red",
    fontWeight:'bold',
  },
  input1:{
  
  fontSize: 18,
  
  },
  input2:{
  
    fontSize: 18,
    borderWidth:1,
    borderRadius:10,
    marginLeft:20,
    marginRight:15,
    paddingLeft:10,
    paddingTop:5,
    paddingBottom:5,


    
    },
  
  entergrp:{
    marginLeft:20,
    fontSize:18,
    marginBottom:10,
    fontWeight:'bold',
    marginTop:10,
  },
  Button2:{
    marginTop:10,
    fontSize:20,
   alignSelf:'center',
   borderColor:'#444444',
    backgroundColor:'#444444',
    borderRadius:15,
    padding:10,
    fontWeight:'bold',
    color:'white',

  },
  text2:{
   
    fontSize: 20,
    marginTop: 5,
    borderWidth: 3,
    borderRadius: 10,
    backgroundColor: 'lightgreen',
    borderColor: 'lightgreen',
    marginLeft: 10,
    padding: 5,
    marginBottom: 5,
   
  },
  content: {
    flex: 1,
    marginBottom: 30,
    marginTop:15,
  },
  icon:{
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
    marginRight:20,
    // marginRight:-200

},
  footer:
  {
   
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'whitesmoke',
    position: 'relative',
    bottom: 0,
    width: '100%',
    marginLeft:10,
   


  },

  

});
