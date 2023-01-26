import React, { useState,useEffect,useRef} from "react";
import { Text, StyleSheet, View, TextInput,TouchableOpacity,Button,Image} from 'react-native';
import axios from 'axios';


export default function Design(){
   
   const [allow1,setallow1]=useState(false)
   const [allow2,setallow2]=useState(false)

  
   


   return(
    <View>
        <View >
        <Image source={require('../assets/ss4.png')} style={styles.image3} ></Image>
        <Image source={require('../assets/ss2.png')} style={styles.image2} ></Image>
        <Image source={require('../assets/ss1.png')} style={styles.image1} ></Image>
       
        </View>


          <Text style={styles.text1} >Verification code</Text>
        <Text style={styles.text2} >We have sent the verification code to</Text>
        <Text style={styles.text2} >your mobile number</Text>

        <View style={styles.phonePen}>
        <Text style={styles.phone} >+91 55464564</Text>
        <Image source={require('../assets/ss3.png')} style={styles.pen} ></Image>
        </View>

        <View style={styles.inputsList}>
        <TextInput style={styles.input} maxLength={1}></TextInput>
        <TextInput style={styles.input} maxLength={1}></TextInput>
        <TextInput style={styles.input} maxLength={1}></TextInput>
        <TextInput style={styles.input} maxLength={1}></TextInput>
        </View>
        <View style={styles.buttonView}>
        <Text style={styles.button}>Done</Text>
        </View>
        
    </View>
   )
}

const styles=StyleSheet.create({
   
   image1:{
    width: 150, 
    height: 150,
     borderRadius: 10,  
     alignSelf: 'center',
     marginTop:-150,
    
   },
   image2:{
    width: 150, 
    height: 230,
     borderRadius: 10,  
     marginLeft:250,
     marginTop:-50,
    
   },
   image3:{
    width: 100, 
    height: 150,
     borderRadius: 10,  
    
    
    
   },
   pen:{
    width: 20, 
    height: 20,
    borderRadius: 10,  
     marginTop:35,
     marginLeft:15,
   },
   phonePen:{
    flexDirection:'row',
    justifyContent:'center',
   },
   text1:{
    alignSelf: 'center',
    marginTop:40,
    marginBottom:20,
    fontSize:30,
    fontWeight:"bold",
   },
   text2:{
    alignSelf: 'center',
    fontSize:15,
    fontWeight:"600",
    color:"#666666",
   },
   phone:{
    alignSelf: 'center',
    fontSize:18,
    marginTop:30,
    fontWeight:"650",
    color:"rgba(166,186,188,255)",
   },
   input:{
    backgroundColor:"rgba(236,241,240,255)",
    borderRadius:100,
    width:50,
    height:50,
    fontSize:20,
    margin:10,
    fontWeight:"bold",
    paddingLeft:20,
    paddingTop:1.7,
    marginTop:30,

   },
   inputsList:{
    flexDirection:'row',
   justifyContent:'center',
   },
    button:{
        
        alignSelf: 'center',
        fontSize:15,
        fontWeight:"600", 
        paddingTop:15,
        paddingBottom:15,
        color:'white'


    },
    buttonView:{
        backgroundColor:"rgba(138,165,167,255)",
        borderRadius:30,
        marginLeft:20,
        marginTop:30,
        marginRight:20, 

    },
   
     
 })



