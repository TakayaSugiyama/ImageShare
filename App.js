import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Picker } from 'react-native';
import logo from "./assets/logo.png"
import * as ImagePicker from "expo-image-picker"
import * as Sharing from "expo-sharing"

export default function App() {
  let [selectedImage, setSelectedImage] = React.useState(null)

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if(pickerResult.cancelled === true){
      return;
    }

    setSelectedImage( { localUri: pickerResult.uri } )
  }

  let openShareDialogAsync = async () => {
    if(!(await Sharing.isAvailableAsync())){
      alert("Uh oh, sharing isn't available on your platform");
      return
    }

    Sharing.shareAsync(selectedImage.localUri);
  }

  if(selectedImage !== null){
    return(
      <View style={styles.container}>
        <Image source={ {uri: selectedImage.localUri} } style={styles.thumbnail}/>
        <TouchableOpacity style={styles.buttonStyle} onPress={openShareDialogAsync}>
          <Text style={styles.buttonText}>Share Image</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.imageStyle}/>
      <Text style={styles.textStyle}>To Share a photo from your phone with a friend. just press the button blow!</Text>

      <TouchableOpacity onPress={openImagePickerAsync} style={styles.buttonStyle}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: "#888",
    fontSize: 18,
  },
  imageStyle: {
    width: 305,
    height: 159,
  },
  buttonStyle: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize:20,
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  }
});
