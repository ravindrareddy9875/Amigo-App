import React,{useState} from "react";
import Signup from "./Signup";
import Login from "./Login";
import { Text, StyleSheet, View, TextInput, Button } from 'react-native'
export default function Homepage(){

{/* <BrowserRouter>
<Routes>
  <Route path='/' element={<Homepage/>}/>
  <Route path='/Signup' element={<Signup/>}/>
  <Route path='/Login' element={<Login/>}/>
</Routes>
</BrowserRouter>  */}

const [type,settype]=useState(" ")

  if(type=="Signup"){
    return(<Signup/>)
  }
  if(type=="Login"){
    return(<Login/>)
  }

 


  return(<View>

<Text>Wlecome to home Page</Text>

<Button onPress={()=>{settype("Login")}} title=" Login "></Button>
<Button onPress={()=>{settype("Signup")}}title="Signup"></Button>




    </View>)
}