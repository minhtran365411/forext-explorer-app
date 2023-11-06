import React, { Component } from 'react'
import {View, Button, TextInput } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        //choose when to run this
        this.state = {
            email: '',
            password: '',
            name: ''
        }

        //for signUp function to read this vars
        this.onSignUp = this.onSignUp.bind(this)
    }

    //function when btn clicked
    onSignUp() {
        const {email, password, name} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({
                name,
                email
            })
            console.log(result)
        }).catch((error) => {
            console.log(error)
        })
    }

  render() {
    return (
      <View>
        <TextInput 
            placeholder='Name'
            onChangeText={(name) => this.setState({ name })}
        />

        <TextInput 
            placeholder='Email'
            onChangeText={(email) => this.setState({ email })}
        />

        <TextInput 
            placeholder='Password'
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })}
        />

        <Button 
            onPress={() => this.onSignUp()}
            title='Sign Up'
        />

      </View>
    )
  }
}

export default RegisterScreen