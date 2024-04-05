import React, { Component, useState } from 'react'
import {ActivityIndicator, View, TextInput, Text, TouchableOpacity, ImageBackground, SafeAreaView, Alert, Pressable, StyleSheet } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//styling
import globalstyle from '../../assets/globalstyle';
import * as Font from 'expo-font';

export class LoginScreen extends Component {

    constructor(props) {
        super(props);
        //choose when to run this
        this.state = {
            email: '',
            password: '',
            fontsLoaded: false,
            notFilled: false
        }

        //for signUp function to read this vars
        this.onSignIn = this.onSignIn.bind(this)
    }

    //function when btn clicked
    onSignIn() {
        const {email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            console.log(result)
        }).catch((error) => {
            Alert.alert(
                'Please check again',
                'Error with email or password! '+ error,
                [{text: 'Got It', style: 'cancel'}]
            );
            console.log(error)
        })
    }

    async componentDidMount() {
        await Font.loadAsync({
            'TomeOfTheUnknown': require('../../assets/fonts/Tomeoftheunknown-3gL3.ttf'),
            'Eglantine': require('../../assets/fonts/Eglantine-Vy9x.ttf'),
            'NunitoRegular': require('../../assets/fonts/Nunito-Regular.ttf'),
        }).then(() => {
            this.setState({fontsLoaded: true})
        });

      }

  render() {
    const { navigation } = this.props;

    if (this.state.email.length == 0 || this.state.password.length == 0) {
        this.state.notFilled = true;
    } else {
        this.state.notFilled = false;
    }

    if (this.state.fontsLoaded === false) {
        return <ActivityIndicator size="large" color="#00ff00" />
    }

    return (

        <SafeAreaView style={{flex:1}} >

      <ImageBackground source={require('../../assets/boardingassets/signup_BG.png')} resizeMode="cover" style={{flex: 1}}>

        <View style={globalstyle.headerContainer}>
            <Text style={[globalstyle.brandTitle, {fontFamily: 'TomeOfTheUnknown'}]}>Forest Explorer</Text>
            <Text style={[globalstyle.headerTitle, {fontFamily: 'Eglantine'}]}>Log In</Text>
        </View>

        <View style={globalstyle.formContainer}>

        <TextInput 
            style={globalstyle.inputBox}
            placeholder='Email'
            onChangeText={(email) => this.setState({ email })}
        />

        <TextInput 
            style={globalstyle.inputBox}
            placeholder='Password'
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })}
        />

        <Pressable
            style={({pressed}) => pressed ? [globalstyle.signUpBtn, styles.pressed ] : globalstyle.signUpBtn}
            onPress={() => this.onSignIn()}
            disabled= {this.state.notFilled}
        >
            <Text style={{fontFamily: 'NunitoRegular', color: '#fff', fontSize: 20}}>LOG IN</Text>
        </Pressable>
            

        <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
        >
            <Text style={globalstyle.messageText}>Don’t have an account? Sign Up!</Text>
        </TouchableOpacity>


        </View>


     </ImageBackground>


      </SafeAreaView>

    )
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75
    }
})