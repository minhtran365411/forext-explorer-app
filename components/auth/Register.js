import React, { Component } from 'react'
import {ActivityIndicator, View, TextInput, Text, TouchableOpacity, ImageBackground, SafeAreaView, Alert, Pressable, StyleSheet } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


//styling
import globalstyle from '../../assets/globalstyle';
import * as Font from 'expo-font';


export class RegisterScreen extends Component {

    
    constructor(props) {
        super(props);
        //choose when to run this
        this.state = {
            email: '',
            password: '',
            name: '',
            fontsLoaded: false,
            notFilled: false
        }

        //for signUp function to read this vars
        this.onSignUp = this.onSignUp.bind(this)
        
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
                dailyStreak: 0,
                lastStampDate: new Date().setHours(0,0,0,0),
            })
            console.log(result)
        }).catch((error) => {
            Alert.alert(
                'Please check again',
                'Name, email and password must be provided. '+ error,
                [{text: 'Got It', style: 'cancel'}]
            );
            console.log(error)
        })
    }

  render() {

    const { navigation } = this.props;

    if (this.state.email.length == 0 || this.state.password.length == 0 || this.state.name.length == 0) {
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
            <Text style={[globalstyle.headerTitle, {fontFamily: 'Eglantine'}]}>Sign Up</Text>
        </View> 

        <View style={globalstyle.formContainer}>
        
            <Text style={globalstyle.errorMsg}>Email must have '@' & password must have at least 6 characters.</Text>
        
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

        <Pressable
             style={({pressed}) => pressed ? [globalstyle.signUpBtn, styles.pressed ] : globalstyle.signUpBtn}
            onPress={() => this.onSignUp()}
            disabled= {this.state.notFilled}
        >
            <Text style={{fontFamily: 'NunitoRegular', color: '#fff', fontSize: 20}}>JOIN THE FOREST</Text>
        </Pressable>

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

export default RegisterScreen;
 

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75
    },

})