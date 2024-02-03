import {StyleSheet, ImageBackground, Text, Pressable, SafeAreaView, Image, View, FlatList } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import App from '../../App';

import GoalListComponent from '../goals/GoalListComponent';
import CompletedGoal from '../goals/CompletedGoal';


//firesbase
import firebase from 'firebase/compat/app';
import 'firebase/storage';
require('firebase/firestore')
require('firebase/storage')


function TodoHome (props) {
  const [userName, setUserName] = useState(null)
  const [selectedButton, setSelectedButton] = useState('progress')
  const [goalsList, setGoalsList] = useState([]);
  const [completedGoalsList, setCompletedGoalsList] = useState([]);
  let reward;
  let today = new Date().setHours(0,0,0,0);
  
  
  //let renderList;

  useEffect(() => {
    var userRef = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid);

    userRef.get().then((doc) => {
        if (doc.data().name != '') {
          setUserName(doc.data().name)
        } else {
            // doc.data() will be undefined in this case
            setUserName(doc.data().email)
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

    var userGoalsRef = firebase.firestore().collection('goals').doc(firebase.auth().currentUser.uid).collection('userGoals');

    userGoalsRef.orderBy('creation', 'desc')
    .get()
    .then((snapshot) => {
        //map seperated documents into little docs
        let posts = snapshot.docs.map(doc => {
            const data = doc.data();
            
            //read inprogress goals
            if (data.done == false) {

              if (data.lastStampDate == today) {
                const id = doc.id;
                return {id, ...data}
              } else {
                const id = doc.id;
                let tempoList = data.subGoals;

                for (i = 0; i < tempoList.length; i ++) {
                  tempoList[i].done = false;
                }

                firebase.firestore().collection('goals').doc(firebase.auth().currentUser.uid)
                .collection('userGoals').doc(id)
                .update({
                    "subGoals": tempoList,
                    "lastStampDate": new Date().setHours(0,0,0,0),
                }).then((function() {
                    console.log('Success updating new timstamp')
                    
                    //get new data again
                    
                    userGoalsRef.orderBy('creation', 'desc')
                    .get()
                    .then((snapshot) => {
                        //map seperated documents into little docs
                        let posts = snapshot.docs.map(doc => {
                            const data = doc.data();
                            //console.log(data)
                            const id = doc.id;
                            return {id, ...data}
                        })
                        setGoalsList([...posts]); 
                      })

                }))

              //}
            
          } 
        }    
        })

        let completedPosts = snapshot.docs.filter((doc) => doc.data().done == true).map(doc => {
          const data = doc.data();
          // if (data.done == true) {
            const id = doc.id;
            return {id, ...data}
          //} 
        })

        for (let i = 0; i < completedPosts.length; i ++) {
          reward += completedPosts[i].reward
        }

        //have another read for completed post

        setGoalsList([...posts]);
        if (completedPosts.length >= 1) {
          setCompletedGoalsList([...completedPosts])
        }
        
        //console.log('My goal list'+completedPosts)
    })


  },[goalsList, reward, completedGoalsList, userName]);

  function progressBtnHandler() {
    setSelectedButton('progress')
  }

  function completedBtnHandler() {
    setSelectedButton('completed')
  }

  //sorted  the list

  
    return (
      <LinearGradient style={styles.rootView}
      colors={['#DFBC86', '#ffffff']}
    >
      <ImageBackground 
        source={require('../../assets/imgs/forest.png')} 
        resizeMode='cover'
        style={styles.rootView}
        imageStyle={{opacity: 0.2}}
      >

        <SafeAreaView>

          <View style={styles.header}>

            <View style={styles.reward}>

              <View style={styles.coinContainer}>
                <Image source={require('../../assets/imgs/coins.png')} style={{height: 30, width: 30}}
                resizeMode='cover'
                />
              </View>

              <Text style={styles.coins}>
                {
                  reward ?
                  {reward}
                  : 
                  0
                }
                
              </Text>

            </View>

            <View>

               <Pressable style={styles.avatarContainer} onPress={() => props.navigation.navigate("Profile", {uid: firebase.auth().currentUser.uid})}>
                <Image source={require('../../assets/imgs/fox.png')} style={{height: 50, width: 50, borderRadius: 25}}
                resizeMode='cover'
                />
              </Pressable>
              
            </View>
          </View>

          <View style={styles.nameContainer}>
            <Text style={styles.title}>Hello,</Text>
            <Text style={styles.title}>{userName} 🍂</Text>
          </View>

          <View style={styles.buttonsContainer}>

            <View style={styles.buttonContainer}>
              <Pressable style={(selectedButton === 'progress') ? [styles.button, styles.selectedButton] : styles.button}
                onPress={progressBtnHandler}
              >
                <Text style={ (selectedButton === 'progress') ? [styles.buttonText, styles.selectedText] : styles.buttonText }>Progress</Text>
              </Pressable>
            </View>

            <View style={styles.buttonContainer}>
              <Pressable style={(selectedButton === 'completed') ? [styles.button, styles.selectedButton] : styles.button}
                onPress={completedBtnHandler}
              >
                <Text style={ (selectedButton === 'completed') ? [styles.buttonText, styles.selectedText] : styles.buttonText }>Completed</Text>
              </Pressable>
            </View>

          </View>

          <View style={styles.list}>
            
            {(selectedButton === 'progress') ? 
            (
              (goalsList.length >= 1) ?
                <FlatList 
                data={goalsList}
                renderItem={({item}) => <GoalListComponent navigation={props.navigation} data={item} />}
                keyExtractor={item => item.id}
              />
              :
              <Text style={styles.emptyText}>You have not log in any goals yet</Text>
            )
            :
            (
              (completedGoalsList.length >= 1) ?
                <FlatList 
                data={completedGoalsList}
                renderItem={({item}) => <CompletedGoal creation={item.creation} goal={item.goal} subGoals={item.subGoals} id={item.id} />}
                keyExtractor={item => item.id}
                />
              :
              <Text style={styles.emptyText}>No completed goals right now.</Text>
            )
            
            }


          </View>

        </SafeAreaView>

      </ImageBackground>
      </LinearGradient>
    )
}

export default TodoHome;

const styles = StyleSheet.create({
    rootView: {
      flex:1
    },
    header: {
      marginTop: '5%',
      marginHorizontal: '5%',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row'
    },
    reward: {
      padding: 5,
      borderRadius: 25,
      backgroundColor: 'white',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingLeft: 10,
      alignItems: 'center',
      width: '30%',
      height: 40,
      elevation: 2, //android only property
        shadowColor: 'white', //ios only
        shadowOffset: {width: 2 ,height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 5
    },
    coinContainer: {
      width: 30,
      height: 30,
      borderRadius: 25,
      marginRight: '5%'
    },
    coins: {
      fontSize: 20,
      color:'#823324',
      fontWeight: 'bold',
      textAlign: 'left'
    },
    avatarContainer: {
      borderRadius: 25,
      backgroundColor: 'white',
      elevation: 2, //android only property
        shadowColor: 'white', //ios only
        shadowOffset: {width: 2 ,height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 5
    },
    nameContainer: {
      marginHorizontal: '10%',
      marginVertical: '7%'
    },
    title: {
      fontFamily: 'TomeOfTheUnknown',
      fontSize: 50,
      color: '#BA3D1F'
    },
    buttonsContainer:{
      flexDirection: 'row',
      marginHorizontal: '5%'
    },
    buttonContainer: {
      marginHorizontal: 5
    },
    button: {
      backgroundColor: 'white',
      borderRadius: 25,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderColor:'#D47B2B',
      borderWidth: 2
    },
    buttonText: {
      fontSize: 16,
      color: '#D47B2B',
      fontWeight: 'bold'
    },
    selectedButton: {
      backgroundColor: '#D47B2B'
    },
    selectedText: {
      color: 'white'
    },
    list: {
      marginTop: '5%',
      height: 260,
    },
    emptyText: {
      marginVertical: '5%',
      marginHorizontal: '6%',
      fontSize: 18,
      fontWeight: 'bold'
    }
    
})