import React, {useState, useEffect} from 'react'
import {View, Text, FlatList, Pressable, TextInput, SafeAreaView, StyleSheet, KeyboardAvoidingView, } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
require('firebase/firestore')

import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import { fetchUsersData } from '../../redux/actions';


function CommentScreen(props) {
    const [comments, setComments] = useState([]);
    const [postId, setPostId] = useState('');
    const [text, setText] = useState('');
    const [newComment, setNewComment] = useState('');
    const [hasSentComment, setHasSentComment] = useState(false)

    useEffect(() => {

        function matchUserToComment(comments) {
            for (let i = 0; i < comments.length; i ++) {

                if(comments[i].hasOwnProperty('user')) { //return true
                    continue; //dont bother this code
                }
                //console.log(props.users)
                const user = props.users.find(x=> x.uid === comments[i].creator);
                if(user == undefined) {
                    //console.log('undefine user')
                    props.fetchUsersData(comments[i].creator, false) 
                } else {
                    comments[i].user = user
                    //console.log(user)
                }
            }
            setComments(comments)
        }

        if(props.route.params.postId !== postId) {
            firebase.firestore()
            .collection('posts')
            .doc(props.route.params.uid)
            .collection('userPosts')
            .doc(props.route.params.postId)
            .collection('comments')
            .get()
            .then((snapshot) => {
                let comments = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id; //id of this comment
                    return {id, ...data}
                })
                matchUserToComment(comments);
            })
            setPostId(props.route.params.postId)
        } else {
            matchUserToComment(comments);
        }

    }, [props.route.params.postId, props.users]) //everthing that goes into the brackects get rerender everytime it is changed


const onCommentSend = () => {
    firebase.firestore()
            .collection('posts')
            .doc(props.route.params.uid)
            .collection('userPosts')
            .doc(props.route.params.postId)
            .collection('comments')
            .add({
                creator: firebase.auth().currentUser.uid,
                text
            }).then(() => {
                //console.log("Successfully commented");
                setNewComment(text);
                setText('')
                setHasSentComment(true);

            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
}
  return (
    <SafeAreaView style={styles.rootView}>
        <View style={styles.commentsList}>

            {hasSentComment == true ? 
            <View style={styles.eachCommentBox}>
                <Text style={styles.commenterName}>{props.route.params.currentUserName}</Text>
                <Text>{newComment}</Text>
            </View>
            : null}

        <FlatList 
            showsHorizontalScrollIndicator={true}
            numColumns={1}
            horizontal={false}
            data={comments}
            renderItem={({item}) => (
                <View style={styles.eachCommentBox}>
                    {item.user !== undefined ? 
                    <Text style={styles.commenterName}>
                        {item.user.name}
                    </Text>
                : null}
                    <Text>{item.text}</Text>
                </View>
            )}
        />

        </View>

        <KeyboardAvoidingView behavior={'padding'}>
        <View style={styles.commentBox}>
            <TextInput 
                multiline
                numberOfLines={3}
                style={styles.commentInput}
                placeholder='Write a comment...'
                value={text}
                onChangeText={(text) => setText(text)}
            />
            <Pressable onPress={() => onCommentSend()}>
            <MaterialCommunityIcons  name="send" color={'#4A8C72'} size={30} />
            </Pressable>
            
        </View>

        </KeyboardAvoidingView>


    </SafeAreaView>
  )
}

const mapStateToProps = (store) => ({
    users: store.usersState.users
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUsersData}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(CommentScreen)

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        justifyContent: 'space-between',
        margin: 10,
        marginBottom: 20
    },
    commentsList: {
        // borderWidth: 2,
        // borderColor: 'black',
        height: 250
    },
    eachCommentBox: {
        marginVertical: 5
    },
    commenterName: {
        fontWeight: 'bold'
    },
    commentBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor : 'white',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 15,
    elevation: 2, //android only property
    shadowColor: '#000', //ios only
    shadowOffset: {width: 2 ,height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 80
    },

    commentInput: {
        height: 100,
        width: '90%',
        padding: 10
    }
})