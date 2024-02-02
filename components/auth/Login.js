import React, { Component } from 'react'
import {View, TextInput, Text, TouchableOpacity, ImageBackground, SafeAreaView, Alert } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//styling
import globalstyle from '../../assets/globalstyle';
import * as Font from 'expo-font';

export class LoginScreen extends Component {

    componentDidMount() {
        Font.loadAsync({
            'TomeOfTheUnknown': require('../../assets/fonts/Tomeoftheunknown-3gL3.ttf'),
            'Eglantine': require('../../assets/fonts/Eglantine-Vy9x.ttf'),
            'NunitoRegular': require('../../assets/fonts/Nunito-Regular.ttf'),
        });
      }

    constructor(props) {
        super(props);
        //choose when to run this
        this.state = {
            email: '',
            password: ''
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
                'Error with wmail or password!',
                [{text: 'Got It', style: 'cancel'}]
            );
            console.log(error)
        })
    }

  render() {
    const { navigation } = this.props;

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

        <TouchableOpacity
            style={globalstyle.signUpBtn}
            onPress={() => this.onSignIn()}
        >
            <Text style={{fontFamily: 'NunitoRegular', color: '#fff', fontSize: 20}}>LOG IN</Text>
        </TouchableOpacity>
            
        
        {/* <Button 
            title='Don’t have an account? Sign Up!'
            style={globalstyle.messageText}
            onPress={() => navigation.navigate('Register')}
        /> */}

        <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
        >
            <Text style={globalstyle.messageText}>Don’t have an account? Sign Up!</Text>
        </TouchableOpacity>


        </View>


     </ImageBackground>


      </SafeAreaView>

    //   <View>

    //     <TextInput 
    //         placeholder='Email'
    //         onChangeText={(email) => this.setState({ email })}
    //     />

    //     <TextInput 
    //         placeholder='Password'
    //         secureTextEntry={true}
    //         onChangeText={(password) => this.setState({ password })}
    //     />

    //     <Button 
    //         onPress={() => this.onSignIn()}
    //         title='Sign In'
    //     />

    //   </View>
    )
  }
}

export default LoginScreen