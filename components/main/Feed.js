import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
//import firebase from "firebase/compat";
import firebase from 'firebase/compat/app';
import 'firebase/storage';
require('firebase/firestore')
require('firebase/storage')
import { collection, query, where } from "firebase/firestore";
import { connect } from 'react-redux'
import { Button } from 'react-native-paper';

function FeedScreen(props) {
  const [posts, setPosts] = useState([]); 
  

  //see if it is the current user or not
  useEffect(()=>{
    // let posts = [];
    // console.log('loaded'+props.usersLoaded);
    // console.log(props.following);
    if (props.usersFollowingLoaded == props.following.length && props.following.length !== 0) {

      // for (let i = 0; i < props.following.length; i++) {
      //   const user = props.users.find(el => el.uid === props.following[i]);
      //   console.log('from feed page'+ props.users)
      //   if(user != undefined) {
      //     posts = [...posts, ...user.posts]
      //   }
      // }
     

      //order by time
      props.feed.sort(function(x,y) {
        return x.creation - y.creation;
      })

      setPosts(props.feed)
      //console.log('all posts')
      //console.log(...posts)

    } 


  }, [props.usersFollowingLoaded, props.feed]) // this is called here because it is needed to be rerender

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
        .delete() //so there will be an id
}


  return (
    <View style={styles.container}>

      <View style={styles.containerGallery}>
        <FlatList 
          numColumns={1}
          horizontal={false}
          data={posts}
          renderItem={({item}) => (
            <View style={styles.containerImage}>
              <Text style={{flex:1}}>{item.user.name}</Text>
            <Image 
              source={{uri: item.downloadURL}}
              style={styles.image}
            />
            {item.currentUserLike ?
            (
              <TouchableOpacity  
              style={styles.dislikeBtn}
              onPress={() => onDislikePress(item.user.uid, item.id)}>
                <Text>Dislike</Text>
              </TouchableOpacity>
            )  :
            (
            <TouchableOpacity  
              style={styles.likeBtn}
              onPress={() => onLikePress(item.user.uid, item.id)} >
                <Text>Like</Text>
              </TouchableOpacity>
            )
            }
            <Text
              onPress={() => props.navigation.navigate('Comment',
              {postId: item.id, uid: item.user.uid}
              )}
            >View Comments...</Text>
            </View>
          )}
        />
      </View>
        
    </View>
  )
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  following: store.userState.following,
  feed: store.usersState.feed,
  usersFollowingLoaded: store.usersState.usersFollowingLoaded
});

export default connect(mapStateToProps, null)(FeedScreen);

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop: 40
  },
  containerInfo: {
    margin: 10,
    
  },
  containerGallery: {
    flex: 1,
  },
  image: {
    flex: 1,
    aspectRatio: 1/1
  },
  containerImage: {
    flex: 1/3
  },
  likeBtn: {
    alignItems: 'center',
    backgroundColor: '#BA3D20',
    padding: 10,
    marginTop:20,
    marginBottom: 20
  },
  dislikeBtn: {
    alignItems: 'center',
    backgroundColor: '#823324',
    padding: 10,
    marginTop:20,
    marginBottom: 20
  },
  followText: {
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 700,
    letterSpacing: 3
  }
})