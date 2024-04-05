import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import Colors from '../assets/Colors.js'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchUser, fetchUserPosts, fetchUserFollowing, fetchUsersData, fetchUsersFollowingPosts, clearData, fetchUsersFollowingLikes } from '../redux/actions/index'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from 'firebase/compat/app';
//tab nav
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();


const EmptyScreen = () => {
    return(null)
}

//import screens
import FeedScreen from './main/Feed'
import TodoHome from './main/TodoHome.js'
import ProfileScreen from './main/Profile'
import SearchScreen from './main/Search'
import NewGoal from './main/NewGoal.js'

export class MainScreen extends Component {
    
    componentDidMount() {
        this.props.clearData();
        this.props.fetchUser();
        this.props.fetchUserPosts();
        this.props.fetchUserFollowing();
        
    }

    
  render() {

    
    return (    
    
        <Tab.Navigator initialRouteName='TodoHome' 
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#BA3D1F',
                tabBarInactiveTintColor: '#fff9f0',
                //tabBarInactiveBackgroundColor:'#DFBC86',
                tabBarStyle: {
                    elevation: 0.2,
                    shadowColor: '#311802', //ios only
                    shadowOffset: {width: 2 ,height: 3},
                    shadowOpacity: 0.3,
                    shadowRadius: 10,
                    backgroundColor: '#DFBC86',
                    borderRadius:15,
                    height:60,
                    //make nav bar float
                    position: 'absolute',
                    bottom: 20,
                    left: 10,
                    right: 10
                }
            }}
        >

        <Tab.Screen name="TodoHome" component={TodoHome}  navigation={this.props.navigation}
        listeners={({navigation}) => ({
            tabPress: event => {
                event.preventDefault();
                navigation.navigate("TodoHome", {uid: firebase.auth().currentUser.uid})
            }
        })}
        options={{
            tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons  name="home" color={color} size={30} />
            ),
        }}/>

        <Tab.Screen name="Feed" component={FeedScreen} navigation={this.props.navigation}
        options={{
            tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons  name="account-group" color={color} size={30} />
            ),
        }}/>


        <Tab.Screen name="NewGoal" component={NewGoal} navigation={this.props.navigation}
        options={{
            tabBarIcon: ({tintColor}) => (
                <View style={styles.specialBtn}>
                        <MaterialCommunityIcons  name="plus-thick" color={'#BA3D1F'} size={30} />
                </View>
              ),
        }}/>

        <Tab.Screen name="AddContainer" component={EmptyScreen} 
        listeners={({navigation}) => ({
            tabPress: event => {
                event.preventDefault();
                navigation.navigate("Add")
            }
        })}
        options={{
            tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons  name="camera" color={color} size={30} /> 
            ),
        }}/>

        {/* <Tab.Screen name="Profile" component={ProfileScreen} 
        listeners={({navigation}) => ({
            tabPress: event => {
                event.preventDefault();
                navigation.navigate("Profile", {uid: firebase.auth().currentUser.uid})
            }
        })}
        options={{
            tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons  name="account-circle" color={color} size={30} />
            ),
        }}/> */}

        <Tab.Screen name="Search" component={SearchScreen} navigation={this.props.navigation}
        options={{
            tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons  name="magnify" color={color} size={30} />
            ),
        }}/>
        
        </Tab.Navigator>
    )
  }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser, fetchUserPosts, fetchUserFollowing, fetchUsersData, fetchUsersFollowingPosts, clearData, fetchUsersFollowingLikes}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(MainScreen)

const styles = StyleSheet.create({
    specialBtn: {
        position: 'absolute',
        bottom: 25, // space from bottombar
        height: 65,
        width: 65,
        borderRadius: 58,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 0.2,
        shadowColor: '#fff', //ios only
        shadowOffset: {width: 0 ,height: 2},
        shadowOpacity: 1,
        shadowRadius: 10,        
    },
    pressed: {
        backgroundColor: '#fca089'
    }
})