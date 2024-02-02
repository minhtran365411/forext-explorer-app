import React, {useState, useEffect} from 'react'
import {View, Text, FlatList, Button, InputText, SafeAreaView} from 'react-native'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { TextInput } from 'react-native-paper';
require('firebase/firestore')

import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import { fetchUsersData } from '../../redux/actions';


function CommentScreen(props) {
    const [comments, setComments] = useState([]);
    const [postId, setPostId] = useState('');
    const [text, setText] = useState('');

    useEffect(() => {

        function matchUserToComment(comments) {
            for (let i = 0; i < comments.length; i ++) {

                if(comments[i].hasOwnProperty('user')) { //return true
                    continue; //dont bother this code
                }
                console.log('-------')
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
                //console.log('My comments')
                //console.log(...comments)
                
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
            })
}

  return (
    <SafeAreaView>
        <FlatList 
            numColumns={1}
            horizontal={false}
            data={comments}
            renderItem={({item}) => (
                <View>
                    {item.user !== undefined ? 
                    <Text>
                        {item.user.name}
                    </Text>
                : null}
                    <Text>{item.text}</Text>
                </View>
            )}
        />

        <View>
            <TextInput 
                placeholder='Write a comment...'
                onChangeText={(text) => setText(text)}
            />
            <Button 
                onPress={() => onCommentSend()}
                title='Send'
            />
        </View>
    </SafeAreaView>
  )
}

const mapStateToProps = (store) => ({
    users: store.usersState.users
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUsersData}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(CommentScreen)