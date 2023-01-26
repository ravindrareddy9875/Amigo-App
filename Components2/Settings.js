import React, { useState, useEffect } from "react";
import { View, Button, Text, TextInput,StyleSheet,ScrollView } from 'react-native';
import axios from "axios";


export default function Settings({navigation,route}) {
    const username=route.params.username
    const [allow1, setallow1] = useState("false")
    const [allow2, setallow2] = useState("false")
    const [allow3, setallow3] = useState(false)
    const [allow4, setallow4] = useState(false)
    const [allow5, setallow5] = useState(false)
    const [allow6, setallow6] = useState(false)

    const [allow11, setallow11] = useState(false)
    const [allow12, setallow12] = useState(false)
    const [allow13, setallow13] = useState(false)
    const [allow21, setallow21] = useState(false)
    const [allow22, setallow22] = useState(false)
    const [allow23, setallow23] = useState(false)

    const [Dp,setDp]=useState("")
    const [Info,setInfo]=useState("")


    const [id,setid]=useState("")
     const[IdData,setIdData]=useState([])
     const [id1,setid1]=useState("")
    const [otp, setotp] = useState("")
    const [email,setemail]=useState("")
    const [Newusername,setNewusername]= useState("")
    const [Email,setEmail]=useState("")
    const [NewPassword,setNewPassword]=useState("")
    const [NewConfirmPassword,setNewConfirmPassword]=useState("")
    const [SettingsData,setSettingsData]=useState([])
 
    const [user1, setUser1] = useState({
        to: Email,
        subject: "Email Verification",
        description: Math.floor((Math.random()) * 1000000).toString(),
      });
    

    useEffect(() => {
      let unmounted=false
        axios.get("http://192.168.0.114:3003/getUser").then((res) => {
           res.data.map((e,id8)=>{
            if(e.username===username){
              if(!unmounted){
                setid(e._id)
                setemail(e.Email)
              }
            }
           })
        })
        axios.get("http://192.168.0.114:3003/getsettings").then((res) => {
          if(!unmounted){
          setSettingsData(res.data)
          }
          res.data.map((e,id9)=>{
            if(!unmounted){
            setIdData(IdData=>[...IdData,e._id])
            }
            if(e.username===username){
              if(!unmounted){
              setid1(e._id)
              }
            }
          })
       })
       return ()=>{
        unmounted=true;
    }
    },[SettingsData])

    function UpdatePass(){


        if(NewPassword.length>=8){
          if(NewPassword===NewConfirmPassword){
            axios.put("http://192.168.0.114:3003/update",{NewPassword:NewPassword,NewConfirmPassword:NewConfirmPassword,id:id})
            .then((res)=>{
                console.log("response is",res)
                if(res.data.message==="updated"){
                  alert("Password updated successfully")
    
                }
            })
           
  
          }
          else{
            alert("Password and confirm password didn't match")
          }
        }
        else{
          alert("Password is too weak please provide a strong password")
        }
      }

      function UpdateEmail(){
     
        axios.post("http://192.168.0.114:3003/addUser", { username, Email }) .then(res => {
          alert(res.data.message)
            if(res.data.message==="proceed for otp"){
              setallow3(true)
            }
           else if(res.data.message==="Email already exists"){
             alert("Email already exists")
            }
            
        })

      }

      function Verify(){
        if (otp === user1.description) {
          axios.put("http://192.168.0.114:3003/updateEmail",{id:id,Email:Email}).then((res)=>{
            console.log(res.data)
            setresponse(res.data.message)
          })
        }
        else{
          alert("Entered otp is incorrect")
        }
       
      }


    return (
        <ScrollView >
     
            <Text onPress={() => {
                if(allow1=="false"){
                    setallow1("true")
                }
                if(allow1=="true"){
                    setallow1("false")
                }

            }} style={styles.heading}>Change Email</Text>
            {
                allow1 === "true" ?  <View>
                <TextInput placeholder="New Email..."  onChangeText={(e)=>setEmail(e)} style={styles.input1}></TextInput>
                <Text style={styles.Button2} onPress={UpdateEmail}>Submit</Text>
                {
                  allow3 ? <View>
                    <TextInput  placeholder="OTP..."  onChangeText={(text) => { setotp(text) }} style={{
                    fontSize: 20,
                    borderWidth:2,
                    marginBottom:10,
                }}/>
                 <Button onPress={Verify} title="Verify OTP"></Button>
                  </View> :null
                }
                </View>
                 : null
            }

            <Text onPress={() => {
                 if(allow2=="false"){
                    setallow2("true")
                }
                if(allow2=="true"){ 
                    setallow2("false")
                }
            }} style={styles.heading}>Change Password</Text>
            {
                allow2 === "true" ? 
                <View>
                <TextInput placeholder="New password..."  onChangeText={(e)=>setNewPassword(e)} style={styles.input1}></TextInput>
                <TextInput placeholder="Confirm password..."  onChangeText={(e)=>setNewConfirmPassword(e)} style={styles.input1}></TextInput>
                <Text style={styles.Button2} onPress={UpdatePass}>Submit</Text>

               </View>
                 : null
            }
              <Text onPress={() => {
                if(allow4==false){
                    setallow4(true)
                }
                if(allow4==true){
                    setallow4(false)
                }

            }} style={styles.heading}>Set who can see your Info</Text>

            {
              allow4 ? <View>
                <View style={styles.options}>
                  <Text style={{fontSize:20}}>All</Text>
                  <Text style={{fontSize:25}} onPress={()=>{
                   if(allow11===true){
                    setallow11(false)
                    setallow12(false)
                    setallow13(false)
                    setInfo("")
                   }
                   else if(allow11===false){
                    setallow11(true)
                    setallow12(false)
                    setallow13(false)
                    setInfo("All")
                   }
                  }}>{allow11 ? '⚫' : '〇' }</Text>
                </View>
                <View style={styles.options}>
                  <Text style={{fontSize:20}}>Friends</Text>
                  <Text style={{fontSize:25}} onPress={()=>{
                    if(allow12===true){
                      setallow11(false)
                      setallow12(false)
                      setallow13(false)
                      setInfo("")
                     }
                     else if(allow12===false){
                      setallow11(false)
                    setallow12(true)
                    setallow13(false)
                    setInfo("Friends")
                     }
                  }}>{allow12 ? '⚫' : '〇' }</Text>
                </View>
                <View style={styles.options}>
                  <Text style={{fontSize:20}}>No one</Text>
                  <Text style={{fontSize:25}} onPress={()=>{
                    if(allow13===true){
                      setallow11(false)
                      setallow12(false)
                      setallow13(false)
                      setInfo("")
                     }
                     else if(allow13===false){
                      setallow11(false)
                      setallow12(false)
                      setallow13(true)
                      setInfo("No One")
                     }
                  }}>{allow13 ? '⚫' : '〇' }</Text>
                </View>
                <Text style={styles.Button2} onPress={()=>{

                  if(SettingsData.length===0 || !IdData.includes(id1)){
                    axios.post("http://192.168.0.114:3003/settings1",{params:{username:username,Info:Info}}).then((res)=>{
                      alert(res.data.message)
                    })
                    }
               
                   if(IdData.includes(id1)){
                    
                        axios.put("http://192.168.0.114:3003/settings2",{params:{id:id1,Info:Info}}).then((res)=>{
                          alert(res.data.message)
                        })

                }
                }}>Update</Text>




              </View> : null
            }

              <Text onPress={() => {
                if(allow6==false){
                    setallow6(true)
                }
                if(allow6==true){
                    setallow6(false)
                }

            }} style={styles.heading}>Set who can see your DP</Text>

        {
              allow6 ? <View>
                <View style={styles.options}>
                <Text style={{fontSize:20}}>All</Text>
                  <Text style={{fontSize:25}} onPress={()=>{
                   if(allow21===true){
                    setallow21(false)
                    setallow22(false)
                    setallow23(false)
                    setDp("")
                   }
                   else if(allow21===false){
                    setallow21(true)
                    setallow22(false)
                    setallow23(false)
                    setDp("All")
                   }
                  }}>{allow21 ? '⚫' : '〇' }</Text>
                </View>
                <View style={styles.options}>
                  <Text style={{fontSize:20}}>Friends</Text>
                  <Text style={{fontSize:25}} onPress={()=>{
                    if(allow22===true){
                      setallow21(false)
                      setallow22(false)
                      setallow23(false)
                      setDp("")
                     }
                     else if(allow22===false){
                      setallow21(false)
                    setallow22(true)
                    setallow23(false)
                    setDp("Friends")
                     }
                  }}>{allow22 ? '⚫' : '〇' }</Text>
                </View>
                <View style={styles.options}>
                  <Text style={{fontSize:20}}>No one</Text>
                  <Text style={{fontSize:25}} onPress={()=>{
                    if(allow23===true){
                      setallow21(false)
                      setallow22(false)
                      setallow23(false)
                      setDp("")
                     }
                     else if(allow23===false){
                      setallow21(false)
                      setallow22(false)
                      setallow23(true)
                      setDp("No One")
                     }
                  }}>{allow23 ? '⚫' : '〇' }</Text>
                </View>
                <Text style={styles.Button2} onPress={()=>{

                      if(SettingsData.length===0 || !IdData.includes(id1)){
                        axios.post("http://192.168.0.114:3003/settings3",{params:{username:username,Dp:Dp}}).then((res)=>{
                          alert(res.data.message)
                        })
                        }

                      if(IdData.includes(id1)){
                        
                            axios.put("http://192.168.0.114:3003/settings4",{params:{id:id1,Dp:Dp}}).then((res)=>{
                              alert(res.data.message)
                            })

                      }
                      }}>Update</Text>


              </View> : null
            }
        </ScrollView>
    )
}


const styles=StyleSheet.create({
   
  
    input1:{
      borderWidth:2,
      marginLeft:20,
      marginRight:10,
      paddingLeft:10,
      borderRadius:10,
      fontSize: 20,
      marginBottom: 10,
    
      },
    heading:{
      marginTop:10,
      fontSize: 20,
      marginLeft:10,
      marginBottom:10,
      color:"white",
      backgroundColor:'#555555',
       fontWeight:'bold',
     width:'85%',
     padding:10,
     borderWidth:1,
     borderRadius:10,
      //  textShadowColor: 'rgba(255, 255, 255, 1)',
      //   textShadowOffset: { width: 1, height: 1 },
      //   textShadowRadius: 10,

    },
    Button2:{
      marginTop:10,
      fontSize:20,
     alignSelf:'center',
     borderColor:'green',
      backgroundColor:'lightgreen',
      borderRadius:15,
      padding:10,
      fontWeight:'bold',
  
    },
     options:{
      marginLeft:30,
     flexDirection:'row',
     justifyContent:'space-between',
     marginRight:30,
     marginBottom:10,
     },
     
 })