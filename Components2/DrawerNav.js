import React, { useState, useEffect } from "react";
import { View, Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

// import Posts from "./Components2/Posts";
// import Signup from "./Components2/Signup";
// import Login from "./Components2/Login";
// import Emailsend from "./Components2/Emailsend";
// import Emailsend1 from "./Components2/Emailsend1";
// import UserInfo from "./Components2/UserInfo";
 import Homepage from "./HomePage";
// import StartPage from "./Components2/StartPage";
// import Demo from "./Components2/Demo";
// import Messages from "./Components2/Messages";
// import Profile from "./Components2/Profile";
// import Profile2 from "./Components2/Profile2";
import FriendsList from "./FriendsList";
// import AddFriend from "./Components2/AddFriend";
// import Requests from "./Components2/Requests";
// import Settings from "./Components2/Settings";
// import LikedPersons from "./Components2/LikedPersons";
// import Comments from "./Components2/Comments";
// import Search from "./Components2/Search";
// import Groups from "./Components2/Groups";
// import GroupMessages from "./Components2/GroupMessages";
// import AllMessages from "./Components2/AllMessages";




export default function DrawerNav() {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
    <Drawer.Navigator initialRouteName="Homepage">
       <Drawer.Screen name="Homepage" component={Homepage} />
      <Drawer.Screen name="FriendsList" component={FriendsList} />
      {/* <Drawer.Screen name="Article" component={Article} /> */}
    </Drawer.Navigator>
    </NavigationContainer>
  );
}