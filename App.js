import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { Component, useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import AsyncStorage from '@react-native-async-storage/async-storage';

//get custom fonts
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//connect redux and access to it
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import Reducers from './redux/reducers/index'
import thunk from 'redux-thunk'



const store = createStore(Reducers, applyMiddleware(thunk))

//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 API

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
import CommentScreen from './components/main/Comment';
import ProfileScreen from './components/main/Profile'
import DetailGoal from './components/goals/DetailGoal';
import Paramodo from './components/extramenu/Paramodo';
import ProductivityTips from './components/extramenu/ProductivityTips';
import WildFireFacts from './components/extramenu/WildFireFacts';
import AboutUs from './components/extramenu/AboutUs';

const Stack = createNativeStackNavigator();

//check if user have seen onboarding screen or not
const Loading = () => {
  <View>
    <ActivityIndicator size={large} />
  </View>
}


export class App extends Component {

  //check to see whether user needs login or signup
  constructor (props) {
    super(props);

    this.state = {
      loaded: false,
      loading: true,
      viewedOnboarding: false
    }

  }



  //part of react life-cycle, called whenever component actually mount
  componentDidMount () {
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem('@viewOnboarding');
    
        if (value !== null) {

          this.setState({
            viewedOnboarding: true
          })

          AsyncStorage.setItem('@viewOnboarding', viewedOnboarding);
        }
    
      } catch (err) {
        console.log('Error @checkOnboarding' + err)
      } finally {
        this.setState({
          loading: false
        })
      }
    }
    //when user click on log out which called sign out it will trigger this
    //listen to auth changes 
    firebase.auth().onAuthStateChanged((user) => {
     // const uid = user.uid;
      if(!user) {

        this.setState({
          loggedIn: false, 
          loaded: true
        })
        //AsyncStorage.removeItem('token');

      } else {

        this.setState({
          loggedIn: true, 
          loaded: true
        })
        //AsyncStorage.setItem('token', uid);

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

            {this.loading ? <Loading />
            : this.viewedOnboarding? <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            : <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
            }

            {/* <Stack.Screen name="Landing" component={LandingScreen} 
            options={{ headerShown: false }} /> */}

  
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} navigation={this.props.navigation} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} navigation={this.props.navigation} />
          </Stack.Navigator>
      </NavigationContainer>
      )
    }

    return (
      //if user's logged in
      //provider is from redux
      <Provider store={store}> 
      <NavigationContainer>
         <Stack.Navigator initialRouteName="Main"
         screenOptions={{
          headerStyle: {
            backgroundColor: '#D47B2B',
          },
          headerMode: 'screen',
          headerTintColor: 'white',
         }}
         >
          <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} navigation={this.props.navigation} />
          <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation} />
          <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation}/>
          <Stack.Screen name="Comment" component={CommentScreen} navigation={this.props.navigation}/>
          <Stack.Screen name="Profile" component={ProfileScreen} navigation={this.props.navigation}/>
          <Stack.Screen name="Your Progress" component={DetailGoal} navigation={this.props.navigation}/>
          <Stack.Screen name="Paramodo" component={Paramodo} navigation={this.props.navigation} options={{ title: 'Set Paramodo Timer'}}/>
          <Stack.Screen name="ProductivityTips" component={ProductivityTips} navigation={this.props.navigation} options={{ title: 'Productivity Tips'}} />
          <Stack.Screen name="WildFireFacts" component={WildFireFacts} navigation={this.props.navigation} options={{ title: 'Wild Fire Facts'}}/>
          <Stack.Screen name="AboutUs" component={AboutUs} navigation={this.props.navigation} options={{ title: 'About A Foxes Tale'}}/>
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
