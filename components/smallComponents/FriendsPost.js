import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import firebase from 'firebase/compat/app';
import 'firebase/storage';
require('firebase/firestore')
require('firebase/storage')

function FriendsPost(props) {

    const [currentUserLike, setCurrentUserLike] = useState(false)

    useEffect(() => {
        firebase.firestore().collection("posts")
        .doc(props.postUserUid)
        .collection('userPosts')
        .doc(props.data.id)
        .collection('likes')
        .doc(firebase.auth().currentUser.uid)
        .onSnapshot((snapshot) => {

            let currentUserLike = false;
            if(snapshot.exists) {
                currentUserLike = true;
            }

            setCurrentUserLike(currentUserLike)
            
        })
    },[currentUserLike])

    const onLikePress = (userId, postId) => {
        firebase.firestore().collection("posts")
              .doc(userId)
              .collection('userPosts')
              .doc(postId)
              .collection('likes')
              .doc(firebase.auth().currentUser.uid)
              .set({}) //so there will be an id
      }
      
      const onDislikePress = (userId, postId) => {
        firebase.firestore().collection("posts")
              .doc(userId)
              .collection('userPosts')
              .doc(postId)
              .collection('likes')
              .doc(firebase.auth().currentUser.uid)
              .delete() //so there wont be an id
      }

    return (
        <View style={styles.containerImage}>
            <Image 
              source={{uri: props.data.downloadURL}}
              style={styles.image}
            />

            <View style={styles.postContents}>
              
              <View>
                <Text style={styles.postUserName}>{props.postUserName}</Text>
                <Text style={styles.postcaption}>{props.data.caption}</Text>
              </View>

              <View>
                {(currentUserLike == true ) ?
                (
                  <TouchableOpacity  
                  onPress={() => onDislikePress(props.postUserUid, props.data.id)}>
                    <MaterialCommunityIcons  name="cards-heart" color={'#fc391f'} size={30} />
                  </TouchableOpacity>
                )  :
                (
                <TouchableOpacity  
                  onPress={() => onLikePress(props.postUserUid, props.data.id)} >
                    <MaterialCommunityIcons  name="cards-heart-outline" color={'#fc391f'} size={30} />
                  </TouchableOpacity>
                )
                }
              </View>

            </View>

            <View>
            <Text
              style={{color: 'grey'}}
              onPress={() => props.navigation.navigate('Comment',
              {postId: props.data.id, uid: props.postUserUid, currentUserName: props.currentUser}
              )}
            >View Comments...</Text>
            </View>
             
        </View>
    )
}

export default FriendsPost;

const styles = StyleSheet.create({
    image: {
        flex: 1,
        aspectRatio: 1/1
      },
      postUserName: {
        //marginTop: 15,
        fontWeight: 'bold'
      },
      postcaption: {
        marginTop: 2
      },
      postContents: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 10
      },
      containerImage: {
        //flex: 1/3,
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 10
      },
})