import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//connect redux and access to it
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import Reducers from './redux/reducers/index'
import thunk from 'redux-thunk'


const store = createStore(Reducers, applyMiddleware(thunk))


//should be in environment for security purposes
const firebaseConfig = {
  apiKey: "AIzaSyC5lqeYnSev0KO1vZtMauQfwSTHy4k3FO0",
  authDomain: "instagram-clone-336a0.firebaseapp.com",
  projectId: "instagram-clone-336a0",
  storageBucket: "instagram-clone-336a0.appspot.com",
  messagingSenderId: "50092726229",
  appId: "1:50092726229:web:d8927d2a4c55143e7a8f5c"
};

App = firebase.initializeApp(firebaseConfig)

//importing screens
import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import MainScreen from './components/Main'
import AddScreen from './components/main/Add'
import SaveScreen from './components/main/Save'

const Stack = createNativeStackNavigator();



export class App extends Component {
  //check to see whether user needs login or signup
  constructor (props) {
    super(props);

    this.state = {
      loaded: false,
    }

  }

  //part of react life-cycle, called whenever component actually mount
  componentDidMount () {
    //listen to auth changes 
    firebase.auth().onAuthStateChanged((user) => {
      if(!user) {
        this.setState({
          loggedIn: false, 
          loaded: true
        })
      } else {
        this.setState({
          loggedIn: true, 
          loaded: true
        })
      }
    })
  }

  render() {
    const {loggedIn, loaded} = this.state;
    if(!loaded) {
       return (
        <View style={{flex:1, justifyContent: 'center'}}>
        <Text>Loading</Text>
       </View>
       )
    }

    if(!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} 
            options={{ headerShown: false }} />
  
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
      </NavigationContainer>
      )
    }

    return (
      //if user's logged in
      //provider is from redux
      <Provider store={store}> 
      <NavigationContainer>
         <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation}/>
          <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation}/>
          </Stack.Navigator>
      </NavigationContainer>
        
      </Provider>
      
      
    )
    
  }
}

export default App


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
