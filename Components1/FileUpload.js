import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Button, ScrollView, FlatList } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

//import ReactDOM from "react-dom";

//import "./styles.css";

export default function FileUpload() {
  processFile = async (e) => {
    var file = e.target.files[0];
    var formdata = new FormData();

    formdata.append("file", file);
    formdata.append("cloud_name", "do3uo67h5");
    formdata.append("upload_preset", "do3uo67h5");

    let res = await fetch(
      "https://api.cloudinary.com/v1_1/cloud_name/do3uo67h5/upload",
      {
        method: "post",
        mode: "cors",
        body: formdata
      }
    );

    let json = await res.json();
    console.log(JSON.stringify(json.secure_url));
  };

    return (
      <div>
        <h3>Upload</h3>
        <input type="file" onChange={this.processFile} />
      </div>
    );
  
}
//ReactDOM.render(<Upload />, document.getElementById("container"));
