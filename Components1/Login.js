import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, StyleSheet, View, TextInput, Button } from 'react-native'
//import "./Login.css"
import ChatPage from "./ChatPage";
import Emailsend1 from './Emailsend1';


export default function Login() {
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [signal, setsignal] = useState("")
    const [UserList, setUserList] = useState([])
    const [username, setusername] = useState("")
    const [allow, setallow] = useState("")
    const [user, setuser] = useState({

        Email: "",
        Password: "",

    })

    useEffect(() => {
        axios.get("http://192.168.0.114:3003/getUser").then((res) => {
            setUserList(res.data)

        }).catch((err) => { console.log(err) })
        UserList.map((e, id) => {

            if (Email === e.Email) {
                setusername(e.Name)
            }
        })
  

    })

    // const handleChange = e => {
    //     const { name, defaultValue } = e.target;
    //     setuser({ ...user, [name]: defaultValue })
    // }
    const Loggin = () => {
        axios.post("http://192.168.0.114:3003/Login", { Email, Password })
            .then(res => {
                alert(res.data.message)
                // console.log(res)
                setsignal(res.data.message)
            })
            .catch((err) => { console.log(err) })
    }
    
    if (signal === "Login Successful") {
        return (
            <>
                <ChatPage username={username} />
            </>
        )
    }


    if (allow === "true") {
        return (<Emailsend1 data1={Email} UserList={UserList} />)
    }

    return (
        <View style={{
            margin:30,
            marginTop:150,
            borderWidth: 3,
            backgroundColor: 'greenyellow',
            padding: 10,
        }}>

            <View>

                <Text
                    style={{
                        fontSize: 40,
                        color: 'red',
                    textAlign:'center',
                        marginBottom: 10,
                        fontWeight: 'bold',
                    }}>Login</Text>


                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                }}>Email</Text>


                <TextInput defaultValue={Email} placeholder="Email" onChangeText={(text) => setEmail(text)} className='lEmail' style={{
                    fontSize: 20,
                    paddingLeft: 10,
                    borderWidth: 2,
                    marginBottom: 10,
                }} ></TextInput>


                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                }}>Password</Text>


                <TextInput defaultValue={Password} placeholder="password" onChangeText={(text) => setPassword(text)} className='lpassword' style={{
                    fontSize: 20,
                    paddingLeft: 10,
                    borderWidth: 2,
                    marginBottom: 10,
                }}></TextInput>


            </View>
            <View className="lbutton" style={{
            }}>
                <Button onPress={Loggin} title="Login" style={{
                }}></Button>

                <Button onPress={() => { setallow("true") }} title="Forgot Password" style={{
                }}></Button>

            </View>
        </View>

    )

}