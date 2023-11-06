import firebase from "firebase/compat";
import 'firebase/storage';
require('firebase/firestore')
require('firebase/storage')

import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE, USER_FOLLOWING_STATE_CHANGE, USERS_DATA_STATE_CHANGE, USERS_POSTS_STATE_CHANGE } from "../constants/index";
import { onSnapshot } from "firebase/firestore";

export function fetchUser() {
    //frontend calls to trigger callback database data
    return((dispatch) => {
        firebase.firestore().collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
            if(snapshot.exists) {
                console.log('from fetch user--------------'+snapshot.data())
                //send to reducer a call = dispatch
                //console.log(snapshot.data)
                dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data() })
            } else {
                //if there is no data returned
                console.log('does not exist')
            }
        })
    })
}

export function fetchUserPosts() {
    //frontend calls to trigger callback database data
    return((dispatch) => {
        firebase.firestore().collection("posts")
        .doc(firebase.auth().currentUser.uid)
        .collection('userPosts')
        .orderBy('creation', 'asc')
        .get()
        .then((snapshot) => {
            //map seperated documents into little docs
            let posts = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                
                return {id, ...data}
                
            })
            console.log(posts)
            dispatch({type: USER_POSTS_STATE_CHANGE, posts})
        })
    })
}

export function fetchUserFollowing() {
    //frontend calls to trigger callback database data
    return((dispatch) => {
        firebase.firestore().collection("following")
        .doc(firebase.auth().currentUser.uid)
        .collection('userFollowing')
        // onSnapshot allow rerendering everytime there is a change in databse
        .onSnapshot((snapshot) => {
            //map seperated documents into little docs
            let following = snapshot.docs.map(doc => {
                const id = doc.id;
                return id
            })
            console.log('following'+following.length)
            dispatch({type: USER_FOLLOWING_STATE_CHANGE, following});
            for (let i = 0; i < following.length; i++) {
                let testUid = '2jpQA1jgGZfMMq6XWliM59UwNS53';
                console.log('-----'+fetchUsersData(following[i]));
                dispatch(fetchUsersData(following[i]));
            }
        })
    })
}

//feed update

export function fetchUsersData(uid) { 
    //this is to update post
    return((dispatch, getState) => {
        //some returns true false
        let found;
        if( getState().usersState && getState().usersState.users )  // Access it when it is available
        {
        found = getState().usersState.users.some(el => el.uid === uid);
        }
        if(!found) {
            firebase.firestore().collection("users")
            .doc(uid)
            .get()
            .then((snapshot) => {
                console.log(snapshot.data())
                if(snapshot.exists) {
                    let user = snapshot.data();
                    user.uid = snapshot.id;
                    console.log('user uid: '+ user.uid)

                    dispatch({type: USERS_DATA_STATE_CHANGE, user: user});
                    dispatch(fetchUsersFollowingPosts(user.uid))
                    
                } else {
                    //if there is no data returned
                    console.log('does not exist')
                }
            })
        }
    })
}

export function fetchUsersFollowingPosts(uid) {
    //frontend calls to trigger callback database data
    return((dispatch, getState) => {
        console.log('from fetchUsersFollowingPosts: '+ uid)
        firebase.firestore().collection("posts")
        .doc(uid)
        .collection('userPosts')
        .orderBy('creation', 'asc')
        .get()
        .then((snapshot) => {
            console.log('new-----');
            const uid = snapshot.query._delegate._query.path.segments[1];
            const user = getState().usersState.users.find(el => el.uid === uid);
            
            //map seperated documents into little docs
            let posts = snapshot.docs.map(doc => {
                //console.log(doc._delegate.key.path.segments[6])
                const data = doc.data();
                const id = doc.id;
                return {id, ...data, user}
            })
            console.log('My posts-----'+posts)
            dispatch({type: USERS_POSTS_STATE_CHANGE, posts, uid})
            //console.log(getState())
        })
    })
}
