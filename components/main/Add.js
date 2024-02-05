import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

export default function App({navigation}) {
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null)
  const [image, setImage] = useState(null)
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  


  // useEffect(() =>{
  //   (async () => {
  //     const {cameraStatus} = await Camera.requestCameraPermissionsAsync();
  //     setHasCameraPermission(cameraStatus === 'granted');

  //     const galleryStatus = await ImagePicker.requestCameraPermissionsAsync();
  //     setHasGalleryPermission(galleryStatus === 'granted');
  //   })();
  // }, []);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  // if (hasCameraPermission === null || hasGalleryPermission === null) {
  //   return <View />;
  // }
  // if (hasGalleryPermission === false || hasCameraPermission === false) {
  //   return <Text>No access to camera or photos</Text>;
  // }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const takePicture = async () => {
    if(camera) {
      const data = await camera.takePictureAsync(null)
      //console.log(data.uri)
      setImage(data.uri)
    }
  }

  //pick image function
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [1,1]
    });

    if (!result.canceled) {
      console.log(result);
      setImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <View style={{flex:1}}>
      <View style={styles.container}>
        <Camera style={styles.camera} type={type} ratio={'1:1'}
          ref={ref => setCamera(ref)}
        />  
      </View>
      
          <Button style={styles.button} onPress={toggleCameraType} title='Flip Camera'
          >
            {/* <Text style={styles.text}>Flip Camera</Text> */}
          </Button>

          <Button title='Take Picture' onPress={() => takePicture()}/>
          <Button title='Pick Image from Gallery' onPress={() => pickImageAsync()}/>
          {image? 
          <TouchableOpacity style={styles.saveBtn}  onPress={() => navigation.navigate('Save', {image})}>
            <Text style={styles.saveText}>SAVE</Text>
          </TouchableOpacity>
          : null}

            {image && <Image source={{uri: image}} style={{flex:1}}/>}
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  camera: {
    flex: 1,
    aspectRatio: 1
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  saveBtn: {
    backgroundColor: '#D47B2B',
    padding: 10
  },
  saveText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  }
  
});