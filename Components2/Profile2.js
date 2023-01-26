import axios from "axios";
import React, { useState,useEffect } from "react";
import {View,Button,Text,StyleSheet,ScrollView,Image,TouchableOpacity,ActivityIndicator} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
// import StartPage from "./StartPage";
// import FriendsList from "./FriendsList";
import * as ImagePicker from 'expo-image-picker';
//import DatePicker from 'react-native-datepicker';

export default function Profile2({navigation,route}){
  const username1=route.params.username1
  const username=route.params.username
   
    const [userdp,setuserdp]=useState([])
    const [FriendList, setFriendList] = useState([])
    const [Dlist,setDlist]=useState([])
  
    

    let result;

    useEffect(()=>{
          let unmounted=false
      FriendList.length=0
            axios.get("http://192.168.0.114:3003/getdp").then((res) => {
              if(!unmounted){
              setuserdp(res.data)
              }
          })
          axios.get("http://192.168.0.114:3003/getfriends").then((res) => {
            if(!unmounted){
            setDlist(res.data)
            }
            res.data.map((e,id5)=>{
              if(e.username===username1){
                if(!unmounted){
                setFriendList(FriendList=>[...FriendList,e.friendlist])
                }
              }
             else if(e.friendlist===username1){
              if(!unmounted){
              setFriendList(FriendList=>[...FriendList,e.username])
              }
              }
            })
        })
        return ()=>{
          unmounted=true;
      }
    },[])


    return(
        < >

        
            <View style={styles.content}>
            {
            userdp.length===0 ? <ActivityIndicator size="large" color='red'/> : null
           }
                
                {
                  userdp.map((e,id1)=>{
                   
                    if(e.username===username1){
                    
                        return(
                          <View key={id1}>
                            
                        <Image source={{ uri: e.userdp }} key={id1} style={styles.imageStyle } />
                       <Text style={{fontSize:20,alignSelf:'center',marginBottom:10,fontWeight:'bold',}}>{username1}</Text>

                     
                      </View>
                        )
                    }
                  })
                }
               
                <View  style={styles.Profile}>

                 <View style={styles.frnds1}>
                <Text style={styles.frnds2} onPress={() =>navigation.navigate('FriendsList1', { username1: username1,username: username })}>Friends</Text>
                {/* <Text style={styles.frnds3} onPress={() => navigation.navigate('FriendsList1', { username1: username1,username: username })}>{FriendList.length}</Text> */}
                </View>

               
                </View>
               
       
            </View>


           
          
        </>
    )
}
const styles=StyleSheet.create({
   
    icon:{
        fontSize:35,
        color:"black",
        marginLeft:10,
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
        marginTop:50, 
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
         alignSelf:"center"
          // borderColor:'white',
      },
      frnds1:{
      
        borderWidth:1,
        borderRadius:10,
        borderColor:'#cccccc',
        // marginLeft:20,
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
        borderWidth:3,
        borderRadius:10,
        borderColor:'lightgreen',
        backgroundColor:'lightgreen',
       marginRight:20,
      },
      settings1:{
        fontSize:40,
      },
      settings2:{
        fontSize:30,
        textAlign:'center',

      },
      Profile:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginBottom:20,
      }

    
    
})