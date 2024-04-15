import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
//import firebase from "firebase/compat";
import firebase from 'firebase/compat/app';
import 'firebase/storage';
require('firebase/firestore')
require('firebase/storage')
import { collection, query, where } from "firebase/firestore";
import { connect  } from 'react-redux'
import {clearData} from '../../redux/actions/index'

import ImageModal from '../smallComponents/ImageModel';


function ProfileScreen(props) {
  const [userPost, setUserPosts] = useState([])
  const [user, setUser] = useState(null)

  //following (add friend) system
  const [following, setFollowing] = useState(false)

  //see if it is the current user or not
  useEffect(()=>{
    const {currentUser, posts} = props;
    //console.log({currentUser, posts})


    if(props.route.params.uid === firebase.auth().currentUser.uid) {
      setUser(currentUser);
      setUserPosts(posts)
    } else {

      //if visiting other's profile
      firebase.firestore().collection("users")
        .doc(props.route.params.uid)
        .get()
        .then((snapshot) => {
          //console.log(snapshot)
            if(snapshot.exists) {
                setUser(snapshot.data())
            } else {
                //if there is no data returned
                console.log('does not exist')
            }
        })

        firebase.firestore().collection("posts")
        .doc(props.route.params.uid)
        .collection('userPosts')
        .orderBy('creation', 'desc')
        .get()
        .then((snapshot) => {
            //map seperated documents into little docs
            let posts = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return {id, ...data}
            })
            setUserPosts(posts)
        })


    }
    

    for(let counter = 0; counter < props.following.length; counter++) {
      
      if (props.following[counter] === props.route.params.uid) {
        //console.log('work!')
        setFollowing(true);
        break;
      }
      setFollowing(false);
    }
  
    

  }, [props.route.params.uid, props.following, props.posts]) // this is called here because it is needed to be rerender

  //follow & unfollow

  const onFollow = () => {
    firebase.firestore()
    .collection('following')
    .doc(firebase.auth().currentUser.uid)
    .collection('userFollowing')
    .doc(props.route.params.uid)
    .set({})
  }

  const onUnfollow = () => {
    firebase.firestore()
    .collection('following')
    .doc(firebase.auth().currentUser.uid)
    .collection('userFollowing')
    .doc(props.route.params.uid)
    .delete({})
  }

  const onLogout = () => {
    //sign out
    firebase.auth().signOut().then(() => {
      props.signOutRedux();

    }).catch((err) => {
      console.log(err)
    });
  }

  const deletePost = (postID) => {
    firebase.firestore().collection('posts').doc(props.route.params.uid)
      .collection('userPosts').doc(postID)
      .delete().then(() => {
          console.log("Post is deleted!");
          props.navigation.navigate("TodoHome");
      }).catch((error) => {
          console.error("Error removing document: ", error);
      });
  }

  //prevent error
  if(user === null) {
    return <View></View>
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>

        {/* render follow button only if viewing other user's profile */}
        {props.route.params.uid !== firebase.auth().currentUser.uid ? (
          <View>
            {/* check if already following */}
            {following ? (
              <TouchableOpacity 
              onPress={() => onUnfollow()} 
              style={styles.btnUnfollow} title="Following">
                  <Text style={styles.followText}>Following</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                onPress={() => onFollow()} 
                style={styles.btnFollow}
                title="Follow" >
                  <Text style={styles.followText}>Follow</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : <TouchableOpacity 
              onPress={() => onLogout()} 
              style={styles.btnFollow}
              title="Log Out" >
                <Text style={styles.followText}>Log Out</Text>
            </TouchableOpacity> 
            }

      </View>

      <View style={styles.containerGallery}>
        <FlatList 
          numColumns={3}
          //horizontal={false}//
          data={userPost}
          renderItem={({item}) => <ImageModal data={item} deletePost={deletePost} routeParams={props.route.params.uid} />}
        />
      </View>
        
    </View>
  )
}

const mapDispatchToProps = dispatch => ({
  signOutRedux: () => dispatch(clearData()),
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
  following: store.userState.following
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff9f0'
  },
  containerInfo: {
    marginHorizontal: 20,
    marginTop: 30
  },
  name: {
    fontSize: 25,
    color: '#823324',
    textAlign: 'left',
    fontFamily: 'TomeOfTheUnknown',
  },
  containerGallery: {
    flex: 1,
  },
  btnFollow: {
    alignItems: 'center',
    backgroundColor: '#D47B2B',
    padding: 10,
    marginTop:20,
    marginBottom: 40,
    borderRadius: 25,
    elevation: 2, //android only property
    shadowColor: '#3d0d0d', //ios only
    shadowOffset: {width: 2 ,height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 2
  },
  btnUnfollow: {
    alignItems: 'center',
    backgroundColor: '#823324',
    padding: 10,
    marginTop:20,
    marginBottom: 40,
    borderRadius: 25,
    elevation: 2, //android only property
    shadowColor: '#6d2b1e', //ios only
    shadowOffset: {width: 2 ,height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 2
  },
  followText: {
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 700,
    letterSpacing: 3
  }
})