import axios from "axios";
import React, { useState,useEffect } from "react";
import {View,Button,Text,TextInput,StyleSheet,ScrollView,Image} from 'react-native'
// import StartPage from "./StartPage";
import * as ImagePicker from 'expo-image-picker';
//import {RadioButton} from'react-native-paper';
//import DatePicker from 'react-native-datepicker';

export default function UserInfo({navigation,route}){
    const username=route.params.username
  
    const [PostList, setPostList] = useState([])
    const [image, setimage] = useState(null)
    const [userdp,setuserdp]=useState("")
    const [Gender,setGender]=useState("")
   
    const [day,setday]=useState(0)
    const [month,setmonth]=useState(0)
    const [year,setyear]=useState(0)
    
    const [signal,setsignal]=useState("")
    let result;

    useEffect(()=>{
        let unmounted=false
        axios.get("http://192.168.0.114:3003/getpost").then((res) => {
            if(!unmounted){
                setPostList(res.data)
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
           console.log(data.secure_url)
           setuserdp(data.secure_url)
           
           
         }).catch(err => console.log(err))
       }
   
     }
   
 function userData(){
   
    if((day>=1 && day<=31)){
        if((month>=1 && month<=12) ){
            if( (year>=1900 && year<=2020)) {
                
                if(Gender==="Male" || Gender==="male" || Gender==="MALE" || Gender==="Female" || Gender==="female" || Gender==="FEMALE" ){
                    axios.post("http://192.168.0.114:3003/addUserInfo",{params:{username:username,userdp:userdp,Gender:Gender,DOB:day+'-'+month+'-'+year}})
                    .then((res)=>{ 
                        console.log(res.data)
                        setsignal(res.data.message)
                        if(res.data.message==="User Info addedd Successfully"){
                            alert("Data added succesfully")
                            Proceed()
                         }
                         })
                    
                }
                else{
                    alert("Enter Gender Properly")
                }
            }
            else{
                alert("Enter Year Properly")
            }  
        }
        else{
            alert("Enter Month Properly")
        }

    }
    else{
        alert("Enter Day Properly")
    }
 }
 


function Proceed(){
    navigation.navigate('StartPage', { username: username })
}


    return(
        <View >

    <ScrollView style={styles.content}>
               
                <Button  onPress={pickImage} style={{ width: 200, alignSelf: 'center' }} title="Add Dp"></Button>
            
    <View style={{ backgroundColor: 'transparent',alignSelf: 'center' }}>
          {userdp ?
                <Image source={{ uri: userdp }} style={{ width: 200, height: 200, borderRadius: 100, alignSelf: 'center' }} />
                :
                <View style={{ backgroundColor: 'grey', width: 200, height: 200, borderRadius: 100 }} />
            }
    </View>
    <Text style={styles.content1}>Select Gender(Male/Female)</Text>
     <TextInput onChangeText={(text) => setGender(text)}  style={{
                    fontSize: 25,
                    paddingLeft: 10,
                    borderWidth: 3,
                    borderRadius:10,
                    
                }} ></TextInput> 
    
    <Text style={styles.content1}>Add DOB(dd-mm-yyyy)</Text>
    <View style={styles.date}>
    <TextInput onChangeText={(text) => setday(text)}  style={styles.Dob} ></TextInput> 
    <Text style={styles.content1}>-</Text>
    <TextInput onChangeText={(text) => setmonth(text)}  style={styles.Dob} ></TextInput> 
    <Text style={styles.content1}>-</Text>
    <TextInput onChangeText={(text) => setyear(text)}  style={{
         fontSize: 25,
         paddingLeft: 5,
         borderWidth: 3,
         borderRadius:7,
         width:'30%'
    }} ></TextInput> 
    </View>
    <Button onPress={userData} title="Submit"></Button>



   
       
    </ScrollView>



   

    
        </View>
    )
}
const styles=StyleSheet.create({
   
    icon:{
        fontSize:50,
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
    content:{
        marginTop:20, 
    },
    content1:{
        fontSize:20,
    },
    Dob:{
        fontSize: 25,
        paddingLeft: 5,
        borderWidth: 3,
        borderRadius:7,
        width:'15%'
    },
    date:{
        flexDirection:'row',
        marginLeft:50,
       
    }

    
    
})