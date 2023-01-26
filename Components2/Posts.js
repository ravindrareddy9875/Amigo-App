import React, { Component, useState,useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Button, ScrollView, FlatList,TextInput,Text,ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function Posts({navigation,route}) {
  const username=route.params.username;
  const [image, setimage] = useState(null)
 
  const [userPic,setuserPic]=useState("")
  const [userPost,setuserPost]=useState("")
  const [description,setdescription]=useState("")
 
  const [userData, setuserData] = useState([])



  let result;




  useEffect(()=>{
    let unmounted=false
    axios.get("http://192.168.0.114:3003/getdp").then((res) => {
      if(!unmounted){
            setuserData(res.data)
      }

        })

        return ()=>{
          unmounted=true;
      }
       
   
   
},[])




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
        setuserPost(data.secure_url)
        
        
      }).catch(err => console.log(err))
    }

  }
  
  const upload = () =>{

    userData.map((e) => {
    if(e.username===username){
       setuserPic(e.userdp)
       console.log(e.userdp)
       axios.post("http://192.168.0.114:3003/addpost", { username,userPic,userPost,description}).then((res) => { 
        if(res.data.message==="Post addedd Successfully"){
          navigation.navigate('StartPage', { username: username })
        }
        })

    }
  
   
})

   
  }


 
  return (
    <>
     
      <View style={styles.content}>
        <TouchableOpacity onPress={pickImage}>
      <Text style={{alignSelf: 'center',fontSize:20,marginTop:10,
      marginBottom:10,borderWidth:2,padding:5,borderRadius:10,
      backgroundColor:'black',color:'white',
      fontWeight:'bold',}} >Select Image</Text></TouchableOpacity>
        <View style={{ backgroundColor: 'transparent',alignSelf: 'center' }}>
          {image ?
             <Image source={{ uri: image }} style={{ width: 200, height: 200,borderRadius: 10, alignSelf: 'center' }} />
            :
            <View style={{ backgroundColor: 'grey', width: 200, height: 200, borderRadius: 10 }} />
          }
        </View>
       
              <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    marginTop:10,
                    marginBottom:10
                }}>Description</Text>

                <TextInput  placeholder="Description..." onChangeText={(text) => setdescription(text)}  style={{
                    fontSize: 20,
                    paddingLeft: 10,
                    borderWidth: 2,
                    marginBottom: 10,
                    width:'90%',
                    marginLeft:20,
                    borderRadius:10,
                    height: 45,
                }} ></TextInput>
                 <TouchableOpacity  onPress={upload}>
      <Text style={{alignSelf: 'center',fontSize:20,marginTop:10,
      marginBottom:10,borderWidth:2,padding:5,borderRadius:10,
      backgroundColor:'black',color:'white',
      fontWeight:'bold',}} >Upload Post</Text></TouchableOpacity>

      

      
      </View>


    
    </>

    
  );

}

const styles = StyleSheet.create({
 
  icon:{
    fontSize:35,
    marginLeft:10,
    color:'black',
},
content:{
  flex:1,
    marginBottom:100,
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
header:{
    flexDirection:'row',
    //justifyContent:'space-between',
    position:'relative',
    top:0,
    backgroundColor:'grey',
    width:'100%',
    borderBottomStartRadius:10,
    borderBottomEndRadius:10,
    
    
},
Heading1:{
    fontSize:40,
    marginLeft:30,
    fontStyle:'italic',
    fontWeight:'bold',
},
Heading2:{
    fontSize:40,
    marginLeft:10,
},
});
