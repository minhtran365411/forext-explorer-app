import React, { Component } from 'react'
import {View, TextInput, Text, TouchableOpacity, ImageBackground, SafeAreaView, Alert } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


//styling
import globalstyle from '../../assets/globalstyle';
import * as Font from 'expo-font';


export class RegisterScreen extends Component {

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
                email,
                reward: 0,
                dailyStreak: 0
            })
            console.log(result)
        }).catch((error) => {
            Alert.alert(
                'Please check again',
                'Name, email and password must be provided.',
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
            <Text style={[globalstyle.headerTitle, {fontFamily: 'Eglantine'}]}>Sign Up</Text>
        </View>

        <View style={globalstyle.formContainer}>
            <TextInput 
                style={globalstyle.inputBox}
                placeholder='Name'
                onChangeText={(name) => this.setState({ name })}
            />

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
            onPress={() => this.onSignUp()}
        >
            <Text style={{fontFamily: 'NunitoRegular', color: '#fff', fontSize: 20}}>JOIN THE FOREST</Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
        >
            <Text style={globalstyle.messageText}>Have an account? Log In!</Text>
        </TouchableOpacity>

        </View>


     </ImageBackground>


      </SafeAreaView>
    )
  }
}

export default RegisterScreen
 