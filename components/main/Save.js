import React, { useState } from 'react'
import {View, TextInput, Image, Button} from 'react-native'

//import firebase from 'firebase/compat'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/storage';
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL  } from "firebase/storage";

require('firebase/firestore')
require('firebase/storage')



export default function SaveScreen(props) {
    //console.log(props.route.params.image)
    //hook
    const [caption, setCaption] = useState('')


    const uploadImage = async () => {
        const uri = props.route.params.image;

        const response = await fetch(uri);
        const blob = await response.blob();

        const storage = getStorage();
        const storageRef = ref(storage, `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`);

        // const task = firebase.storage().ref()
        //             .child(`post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`)
        //             .put(blob);
        const task = uploadBytesResumable(storageRef, blob);

        const taskProgress = (snapshot) => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }
        const taskCompleted = () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(task.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                savePostData(downloadURL)
            });
            // task.ref.getDownloadURL().then((snapshot) => {
            //     savePostData(snapshot)
            //     console.log(snapshot)
            // })
        }
        const taskError = (snapshot) => {
            console.log(snapshot)
        }

        task.on('state_changed', taskProgress, taskError, taskCompleted);

    }

    const savePostData = (downloadURL) => {
        firebase.firestore().collection('posts').doc(firebase.auth().currentUser.uid)
        .collection('userPosts')
        .add({
            downloadURL,
            caption,
            creation: firebase.firestore.FieldValue.serverTimestamp()
        }).then((function() {
            //back to home page
            props.navigation.popToTop()
        }))
    }

  return (
    <View style={{flex:1}}>
        <Image source={{uri: props.route.params.image}}/>
        <TextInput 
            placeholder='Insert caption'
            onChangeText={(caption) => setCaption(caption)}
        />
        <Button title='Save' onPress={() => uploadImage()}/>
    </View>
  )
}
