import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TextInput, Button, ScrollView, Image, FlatList,ActivityIndicator,Alert,TouchableOpacity } from 'react-native';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function GroupDetails({ navigation, route }) {
    const GroupName = route.params.GroupName;
    const username = route.params.username;
    const [userdp, setuserdp] = useState([])
    const [GroupData, setGroupData] = useState([])
    let Participants = []
 let id;
    useEffect(() => {

        let unmounted=false
     
        axios.get("http://192.168.0.114:3003/getdp").then((res) => {
            if(!unmounted){
            setuserdp(res.data)
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


    }, [GroupData])


   



    return (
        <>
            <ScrollView>

            {
            GroupData.length===0 ? <ActivityIndicator size="large" color='red'/> : null
           }

                {
                    GroupData.map((e1,id8) => {
                        if (e1.GroupName=== GroupName) {
                          
                           
                            return (<View key={id8}>
                              <Image source={{ uri: e1.GroupIcon }} style={styles.imageStyle1}/>

                                <Text style={{fontSize:20,alignSelf:'center',fontWeight:'bold',marginBottom:10}}>{e1.GroupName}</Text>
                                <Text style={{fontSize:18,alignSelf:'center',marginBottom:10,fontWeight:'bold',}}>Admin</Text>
                                
                                <View style={styles.content1}>
                                
                                  {
                                              userdp.map((e,id1) => {
                                                //marginBottom:10 color:'lightgreen',
                                            if (e.username === e1.Admin) {
                                                return (
                                                    <Image source={{ uri: e.userdp }} style={styles.imageStyle}  key={id1}/>
                                                )
                                            }
                                        })
                                    }
                                    <Text style={styles.text1}>{e1.Admin}</Text>
                                </View>
                                <Text style={{fontSize:20,alignSelf:'center',marginBottom:10,fontWeight:'bold',}}>Participants</Text>
                                <View>
                                  {  
                                   e1.Participants.map((e2,id9)=>{
                                    
                                    return(
                                        <View key={id9}>
                                        <View style={styles.content} >
                                             {
                                                
                                              userdp.map((e,id1) => {
                                            if (e.username === e2) {
                                                return (
                                                    <Image source={{ uri: e.userdp }} style={styles.imageStyle}  key={id1}/>
                                                )
                                            }
                                        })
                                    }
                                    <Text style={styles.text}  onPress={() => navigation.navigate('Profile2', { username1: e2,username:username })}>{e2}</Text>
                                    {
                                            e1.Admin===username && e1.Admin!==e2 ? <Text style={styles.text2} onPress={() => {
                                               
                                                Alert.alert(
                                                   "Remove",
                                                   "Are you sure to Remove this Participant?",
                                                   [
                                                     {
                                                       text: "Yes",
                                                       onPress: () => {
                                                        let id2=e1._id
                                                           console.log("id2 ",id2)
                                                           axios.put("http://192.168.0.114:3003/delParticipant",{params:{id:e1._id,Participant:e2}}).then((res)=>{
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
                                           }}>Remove</Text> : null
                                        }
                                        </View>
                                       
                                        </View>
                                        

                                    )
                                     
                                    })
                                    }
                                      
                                    
                                   
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
        // paddingLeft: 15,
        // marginBottom: 10,
        paddingTop: 10,
        marginLeft: 15,



    },
    text1: {
        fontSize: 18,
        // paddingLeft: 15,
        // marginBottom: 10,
        paddingTop: 10,
        marginLeft: 15,



    },
    text2: {
        fontSize: 17,
        // marginRight: -100,
        borderWidth: 3,
        borderColor: '#444444',
        padding: 5,
        paddingLeft:10,
        marginTop: 5,
        marginBottom: 15,
        backgroundColor: '#444444',
        borderRadius: 20,
        fontWeight: 'bold',
        color:'white',
        // marginTop:10,


    },
   
    content: {

        flexDirection: 'row',
        
        borderWidth: 1,
       marginLeft:15,
       marginRight:15,
       marginBottom:10,
       borderRadius:15,
       justifyContent:'space-around'

      

    },
    content1: {

        flexDirection: 'row',
        borderWidth: 1,
       marginLeft:15,
       marginRight:15,
       marginBottom:10,
       borderRadius:15,
    //    justifyContent:'space-around'

      

    },
  
  
    imageStyle:{
        width: 50,
        height: 50,
         borderRadius: 100, 
        //   alignSelf: 'center',
         borderWidth:3,
         marginBottom:10,
         marginLeft: 10,
         marginTop:5,
    },
    imageStyle1:{
        width: 80,
        height: 80,
         borderRadius: 100, 
          alignSelf: 'center',
         borderWidth:3,
         marginBottom:10,
        
         marginTop:5,
    },
    icon:{
        fontSize:35,
        color:'black',
        marginRight:10,
         },
   


})











