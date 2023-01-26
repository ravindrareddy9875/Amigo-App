import React, { useState,useEffect } from "react";
import {View,Button,Text,StyleSheet,ScrollView,Image,FlatList,ActivityIndicator} from 'react-native'
import axios from 'axios';


export default function LikedPersons({navigation,route}){
    const username=route.params.username
    const id=route.params.id
    const [userdp,setuserdp]=useState([])
    const [PostList, setPostList] = useState([])

   useEffect(()=>{
    let unmounted=false
    axios.get("http://192.168.0.114:3003/getpost").then((res) => {
        if(!unmounted){
            setPostList(res.data)
        }
          
        })
        axios.get("http://192.168.0.114:3003/getdp").then((res) => {
            if(!unmounted){
            setuserdp(res.data)
            }
        })

        return ()=>{
            unmounted=true;
        }
   },[])
   
    return(
        <>
        <ScrollView >
        {
            PostList.length===0 ? <ActivityIndicator size="large" color='red'/> : null
           }

                       {
                            PostList.map((e1,id3)=>{
                                if(e1._id===id){
                                   return(<View key={id3}>
                                    <View >
                        
                                    {
                                        e1.likedPerson.map((e2,id4)=>{
                                            return(<View style={styles.content} key={id4}>
                                                {
                                                     userdp.map((e,id1)=>{
                                                        if(e.username===e2){
                                                            return(
                                                            <Image source={{ uri:e.userdp }} style={styles.imageStyle}  key={id1}/>
                                                            )
                                                        }
                                                      })
                                                }
                                                
                                                <Text style={styles.text}  onPress={() => navigation.navigate('Profile2', { username1: e2,username:username })}>{e2}</Text>
                                                </View>
                                            )
                                        })
                                    }
                                    
                                    </View>
                                    </View>
                                   )
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
        paddingTop:10,
         marginLeft:15,
   

    },
   
   
    content: {
       
        flexDirection: 'row',
        borderWidth: 2,
        borderTopColor: 'white',
        borderRightColor: 'white',
        borderLeftColor: 'white',
        borderBottomColor: '#cccccc',
        //  flex: 1,
        //   justifyContent:'space-between'
         
    
    },
   
    imageStyle:{
        width: 50,
        height: 50,
         borderRadius: 100, 
        //  alignSelf: 'center',
         borderWidth:3,
         marginBottom:10,
         marginLeft: 10,
    }
   


})
