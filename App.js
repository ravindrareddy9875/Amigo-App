import React, { useState, useEffect } from "react";
import { View, Text } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";

import Posts from "./Components2/Posts";
import Signup from "./Components2/Signup";
import Login from "./Components2/Login";
import Emailsend from "./Components2/Emailsend";
import Emailsend1 from "./Components2/Emailsend1";
import UserInfo from "./Components2/UserInfo";
import HomePage from "./Components2/HomePage";
import StartPage from "./Components2/StartPage";
import Messages from "./Components2/Messages";
import Profile from "./Components2/Profile";
import Profile2 from "./Components2/Profile2";
import FriendsList from "./Components2/FriendsList";
import AddFriend from "./Components2/AddFriend";
import Requests from "./Components2/Requests";
import Settings from "./Components2/Settings";
import LikedPersons from "./Components2/LikedPersons";
import Comments from "./Components2/Comments";
import Search from "./Components2/Search";
import Groups from "./Components2/Groups";
import GroupMessages from "./Components2/GroupMessages";
import AllMessages from "./Components2/AllMessages";
import FriendsList1 from "./Components2/FriendList1";
import GroupRequests from "./Components2/GroupRequests";
import GroupDetails from "./Components2/GroupDetails";
import Demo from "./Components2/Demo";
import Design from "./Components2/Design"
// import Footer from "./Components2/Footer"

// import io from 'socket.io-client';
// import IsloggedIn from "./Components2/IsloggedIn";
// import Isloggedout from "./Components2/IsloggedOut";
// const socket=io.connect("http://192.168.0.114:3001")

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function app() {
  const Stack = createNativeStackNavigator();
  
  const [LoggedIn,setLoggedIn]=useState()
 useEffect(()=>{
  const getData=async()=>{
    var value= await AsyncStorage.getItem("isLoggedIn1")
    setLoggedIn(JSON.parse(value))
  }
  getData()
 },[])
  return (
    <NavigationContainer>
        
          <Stack.Navigator >
           
             {
              !LoggedIn ? <Stack.Screen name="HomePage" component={HomePage}></Stack.Screen>
              : null
         
            }
           <Stack.Screen name="StartPage" options={{headerShown:false}} component={StartPage}></Stack.Screen>
           {/* <Stack.Screen name="HomePage" component={HomePage}></Stack.Screen> */}
          <Stack.Screen name="Signup" options={{headerShown:false}} component={Signup}></Stack.Screen>
          <Stack.Screen name="Emailsend" component={Emailsend}></Stack.Screen>
          <Stack.Screen name="Emailsend1" component={Emailsend1}></Stack.Screen>
          <Stack.Screen name="UserInfo" component={UserInfo}></Stack.Screen>
          <Stack.Screen name="Login" options={{headerShown:false}} component={Login}></Stack.Screen>
          <Stack.Screen name="FriendsList" options={{title:'Friends'}} component={ FriendsList}></Stack.Screen>
          <Stack.Screen name="FriendsList1" options={{title:'Friends'}} component={ FriendsList1}></Stack.Screen>
          <Stack.Screen name="Posts" component={ Posts}></Stack.Screen>
          <Stack.Screen name="LikedPersons" options={{title:'Liked People'}} component={ LikedPersons}></Stack.Screen>
          <Stack.Screen name="Comments" component={ Comments}></Stack.Screen>
          <Stack.Screen name="AddFriend" options={{title:'Add Friends'}} component={ AddFriend}></Stack.Screen>
          <Stack.Screen name="Requests" options={{title:'Friend Requests'}} component={Requests}></Stack.Screen>
          <Stack.Screen name="GroupRequests" options={{title:'Group Requests'}} component={GroupRequests}></Stack.Screen>
          <Stack.Screen name="GroupDetails" options={{title:'Group Details'}} component={GroupDetails}></Stack.Screen>
          <Stack.Screen name="Messages" options={{headerShown:false}} component={ Messages}></Stack.Screen>
          <Stack.Screen name="Profile" component={ Profile}></Stack.Screen>
          <Stack.Screen name="Profile2" options={{title:'User Info'}} component={ Profile2}></Stack.Screen>
          <Stack.Screen name="Settings" component={Settings}></Stack.Screen>
          <Stack.Screen name="Search" component={Search}></Stack.Screen>
          <Stack.Screen name="Groups" component={ Groups}></Stack.Screen>
          <Stack.Screen name="GroupMessages" options={{headerShown:false}} component={ GroupMessages}></Stack.Screen>
          <Stack.Screen name="AllMessages" options={{headerShown:false}}  component={ AllMessages}></Stack.Screen>
          {/* <Stack.Screen name="Footer" options={{headerShown:false}}  component={Footer}></Stack.Screen> */}
           
        
        </Stack.Navigator>
        
        
      </NavigationContainer>
    

  )
}

 // options={{title:'Welcome'}}