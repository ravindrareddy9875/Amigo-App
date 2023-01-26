import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TextInput, Button, ScrollView, Image, TouchableOpacity,ActivityIndicator,Alert } from 'react-native';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import e from "cors";

export default function GroupRequests({ navigation, route }) {
    const username = route.params.username;
    const [Dlist, setDlist] = useState([])
    const [allow,setallow]=useState(false)
    const [allow1,setallow1]=useState(false)
    const [userdp, setuserdp] = useState([])
    const [GroupData, setGroupData] = useState([])
    let Participants = []
 let id;
    useEffect(() => {

        let unmounted=false
        axios.get("http://192.168.0.114:3003/getgrpRequests1").then((res) => {
            if(!unmounted){
            setDlist(res.data)
            }

        })
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
            Dlist.length===0 ? <ActivityIndicator size="large" color='red'/> : null
           }


                {
                    Dlist.map((e1,id8) => {
                        if (e1.Admin === username) {
                            Participants = []
                            {
                                GroupData.map((e,id8) => {
                                    
                                if (e.GroupName === e1.GroupName) {
                                    id=e._id
                                    e.Participants.map((e2,id9) => {
                                    Participants.push(e2)
                                    
                                    })
                                }
                                })
                            }
                            
                            return (<View key={id8}>
                                <Text style={{fontSize:18,marginLeft:15,marginBottom:10,}}>{e1.GroupName}</Text>
                                <View style={styles.content1}>
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
                                    </View>
                                    <View style={{flexDirection:'row',marginLeft:100,marginTop:-45,}}>
                                        <Text style={styles.text1} onPress={() => {
                                            if(!Participants.includes(e1.Requestlist)){
                                            Participants.push(e1.Requestlist)
                                        
                                            axios.put("http://192.168.0.114:3003/addParticipants", { params: { id: id, Participants: Participants } }).then((res)=>{
                                                      if(res.data.message==="updated"){
                                                        alert("Joined Successfully")
                                                       setallow(true)
                                                       
                                                      }
                                                    })
                                                }
                                                else{
                                                    alert("Request Accepted 😉")
                                                }
                                                  
                                        }}>{Participants.includes(e1.Requestlist) ? "Accepted" :"Accept"}</Text> 
                                    
                                    <Text style={styles.text1} onPress={() => {
                                         Alert.alert(
                                            "Alert Title",
                                            "Are you sure to delete Request?",
                                            [
                                              {
                                                text: "Yes",
                                                onPress: () => {
                                                    let id2=e1._id
                                                    console.log("id2 ",id2)
                                                    axios.delete(`http://192.168.0.114:3003/delgrpRequest/${id2}`).then((res)=>{
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
                                     }}>Remove</Text>
                                     </View>
                                   
                                </View>
                            </View>)
                        //}
                        }
                    })
                }

            </ScrollView>



            
       
        </>
    )
}
const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        paddingTop: 10,
        marginLeft: 15,
        fontWeight: 'bold'


    },
    text1: {
        fontSize: 17,
        marginRight: 10,
        borderWidth: 3,
        borderColor: '#444444',
        padding: 5,
        paddingLeft:10,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#444444',
        borderRadius: 20,
        fontWeight: 'bold',
        color:'white',

    },
  
   
   
    icon: {
        fontSize: 35,
        marginLeft:30,
        color:'black',
    },
    content: {

        flexDirection: 'row',
        
    },
    content1: {

        // flexDirection: 'row',
        borderWidth: 1,
        marginLeft:20,
        marginRight:15,
        borderRadius:15,
        borderColor:"#777777",
        marginBottom:10,

        
    },

    imageStyle:{
        width: 70,
        height: 70,
         borderRadius: 100, 
       
         borderWidth:3,
         marginBottom:10,
         marginLeft: 10,
         marginTop:10,
    }
   


})











