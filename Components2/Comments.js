import axios from "axios";
import React, { useState,useEffect } from "react";
import {View,Button,Text,StyleSheet,ScrollView,TextInput,Image,ActivityIndicator,TouchableOpacity} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';


export default function Comments({navigation,route}){
    const postid=route.params.id
    const commentername=route.params.username
    const [commentlist, setcommentlist] = useState([])
    const [comment,setcomment]=useState("")
    const [userdp,setuserdp]=useState([])

    useEffect(()=>{
        let unmounted=false
        
        axios.get("http://192.168.0.114:3003/getcomments").then((res) => {
            if(!unmounted){
            setcommentlist(res.data)
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
        
    },[commentlist])
   
 function AddComment(){
     if(comment!==" ")
      axios.post("http://192.168.0.114:3003/addcomment",{params:{commentername:commentername,postid:postid,comment:comment}}).then((res)=>{setcomment("")})
 }

    

    return(
        <>

            <ScrollView >
            {
            commentlist.length===0 ? <ActivityIndicator size="large" color='red'/> : null
           }
              {
                commentlist.map((e,id)=>{
                    if(e.postid===postid){
                        return(<View style={styles.content1} key={id}>
                             {
                                        userdp.map((e1,id) => {
                                            if (e1.username === e.commentername) {
                                                return (
                                                    <Image source={{ uri: e1.userdp }} style={styles.imageStyle}  key={id}/>
                                                )
                                            }
                                        })
                                    }
                                <View style={styles.content}>
                                <Text style={styles.text}>{e.commentername}</Text>
                                <Text style={styles.text1}>{e.comment}</Text>
                                </View>
                             
                           
                            </View>)
                     }
                    
                })
              }
            </ScrollView>
        <View style={{marginLeft:20,marginBottom:10,}}>
            <View style={{flexDirection:'row'}}>
            <Text style={styles.cmnt} onPress={()=>{
                axios.post("http://192.168.0.114:3003/addcomment",{params:{commentername:commentername,postid:postid,comment:'🔥🔥🔥'}}).then((res)=>{setcomment("")})
            }}
            >🔥🔥🔥</Text>
            <Text style={styles.cmnt} onPress={()=>{
                axios.post("http://192.168.0.114:3003/addcomment",{params:{commentername:commentername,postid:postid,comment:'Looking Good 😁'}}).then((res)=>{setcomment("")})
            }}>Looking Good 😁</Text>
            </View>
            <View style={{flexDirection:'row'}}>
            <Text style={styles.cmnt} onPress={()=>{
                axios.post("http://192.168.0.114:3003/addcomment",{params:{commentername:commentername,postid:postid,comment:'❤️‍🔥❤️‍🔥❤️‍🔥'}}).then((res)=>{setcomment("")})
            }}>❤️‍🔥❤️‍🔥❤️‍🔥</Text>
            <Text style={styles.cmnt} onPress={()=>{
                axios.post("http://192.168.0.114:3003/addcomment",{params:{commentername:commentername,postid:postid,comment:'Nice Post 😉'}}).then((res)=>{setcomment("")})
            }}>Nice Post 😉</Text>
            </View>
           
        </View>
        <View style={styles.footer}>
        <TextInput placeholder="Add a Comment..." defaultValue={comment} onChangeText={(text) => setcomment(text)}  style={styles.comment} ></TextInput>  
        <TouchableOpacity onPress={AddComment}><Ionicons name="send"  style={{fontSize: 35,marginRight:10,marginTop:3}}/></TouchableOpacity>
        </View>
        </>
    )
}
const styles=StyleSheet.create({
   
    
   comment:{
    fontSize: 17,
    paddingLeft: 10,
    borderWidth: 1,
    marginBottom: 10,
    marginLeft:10,
    marginRight:5,
    width:'85%',
    borderRadius:15,
    borderColor:'#aaaaaa',
    paddingTop:5,
    paddingBottom:10,
   },
   text: {
    fontSize:13,
    paddingTop:5,
    paddingLeft:15,
     fontWeight:'bold',


},
text1: {
    fontSize: 17,
   
    paddingLeft:15,
    paddingBottom:10,
   


},
content:{
marginLeft:65,
marginTop:-60,
marginBottom:20,
borderWidth:1,
borderRadius:15,
marginRight:30,
borderColor:'#eeeeee',
backgroundColor:"#dddddd"

},
content1:{
    marginLeft:15,
    marginTop:15,
  
},
    

    footer:
    {
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'whitesmoke',
        position: 'relative',
        marginBottom: 0,
        width: '100%',

        

    },
    imageStyle:{
        width: 50,
        height: 50,
         borderRadius: 100, 
        //   alignSelf: 'center',
         borderWidth:3,
         marginBottom:10,
         marginLeft: 10,
    },
    cmnt:{
            fontSize:17,
           borderWidth:1,
           marginLeft:10,
          borderColor:'#eeeeee',
          backgroundColor:"#dddddd" ,
          padding:10,
          borderRadius:15,
          marginBottom:10,  
    },
    

    
    
})