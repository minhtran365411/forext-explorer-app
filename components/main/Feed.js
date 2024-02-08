import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

//import components
import FriendsPost from '../smallComponents/FriendsPost';
import FriendDailyStreakComponent from '../smallComponents/FriendDailyStreakComponent';

//import firebase from "firebase/compat";
import firebase from 'firebase/compat/app';
import 'firebase/storage';
require('firebase/firestore')
require('firebase/storage')
import { collection, query, where } from "firebase/firestore";
import { connect } from 'react-redux'

function FeedScreen(props) {
  const [posts, setPosts] = useState([]); 
  const [friendDailyStreaks, setFriendDailyStreaks] = useState([]); 

  //see if it is the current user or not
  useEffect(()=>{
    // let posts = [];
    // console.log('loaded'+props.usersLoaded);
    // console.log(props.following);
    if (props.usersFollowingLoaded == props.following.length && props.following.length !== 0) {

      //console.log('props.following: '+props.following); this returns an array

      // for (let i = 0; i < props.following.length; i++) {
      //   const user = props.users.find(el => el.uid === props.following[i]);
      //   console.log('from feed page'+ props.users)
      //   if(user != undefined) {
      //     posts = [...posts, ...user.posts]
      //   }
      // }
     

      //order by time
      props.feed.sort(function(x,y) {
        return y.creation - x.creation;
      })

      setPosts(props.feed)
      //console.log('all posts')
      //console.log(...posts)

    } 

    //get following streaks

   

    for (let i = 0; i < props.following.length; i++) {

      firebase.firestore().collection("users")
      .doc(props.following[i])
      .get().then((doc) => {
          let temList = friendDailyStreaks;
          
          if (temList.length != props.following.length) {
            temList.push({name: doc.data().name, dailyStreak: doc.data().dailyStreak, email: doc.data().email, lastStampDate: doc.data().lastStampDate})
          } else {
              if (temList[i].email == doc.data().email) {
                temList[i].dailyStreak = doc.data().dailyStreak
              }
              
          }

          
          

          setFriendDailyStreaks(temList);

      }).catch((error) => {
          console.log("Error in setting friends's daily streaks:", error);
      });

    }

    //console.log(friendDailyStreaks)


  }, [props.usersFollowingLoaded, props.feed, friendDailyStreaks]) // this is called here because it is needed to be rerender



  return (
    <LinearGradient style={styles.rootView}
      colors={['#DFBC86', '#ffffff']}
    >
      <ImageBackground 
        source={require('../../assets/imgs/forest.png')} 
        resizeMode='cover'
        style={styles.rootView}
        imageStyle={{opacity: 0.2}}
      >

        
    <SafeAreaView style={styles.rootView}>

      <View style={styles.container}>

        {/* friend daily streaks */}

        <View style={styles.dailyStreaks}>

        <FlatList 
        horizontal
          data={friendDailyStreaks}
          renderItem={({item}) => <FriendDailyStreakComponent data={item} />}
          keyExtractor={item => item.id}
        />
          
        </View>

        {/* friend's posts */}

      <View style={styles.containerGallery}>
        <FlatList 
          numColumns={1}
          horizontal={false}
          data={posts}
          renderItem={({item}) => ( 
          <FriendsPost currentUser={props.currentUser.name} navigation={props.navigation} data={item} postUserName={item.user.name} postUserUid={item.user.uid} />
          )}
        />
      </View>

      </View>
        
      </SafeAreaView>
    </ImageBackground>
    </LinearGradient>
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
  rootView: {
    flex: 1,
  },
  container: {
    flex:1,
    //marginTop: 10,
    marginBottom: 80,
    marginHorizontal: '2%'
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
  },
  dailyStreaks: {
    borderBottomColor: '#4A8C72',
    borderBottomWidth: 1,
    margin: 15,
    paddingBottom: 10,
    justifyContent: 'center',

  },
  
})