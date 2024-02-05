import {StyleSheet, ImageBackground, Text, Pressable, SafeAreaView, Image, View, FlatList } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import * as Progress from 'react-native-progress';


import GoalListComponent from '../goals/GoalListComponent';

//firesbase
import firebase from 'firebase/compat/app';
import 'firebase/storage';
require('firebase/firestore')
require('firebase/storage')


function TodoHome (props) {
  const [userName, setUserName] = useState(null)
  const [selectedButton, setSelectedButton] = useState('progress')
  const [goalsList, setGoalsList] = useState([]);
  const [reward, setReward] = useState();
  let today = new Date().setHours(0,0,0,0);
  const [userDailyStreak, setUserDailyStreak] = useState(0)

  // const [totalSubGoals, setTotalSubGoals] = useState()
  //let percentage = 0;

  
  //let renderList;

  useEffect(() => {

    var userRef = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid);

    userRef.get().then((doc) => {
        setReward(doc.data().reward)
        setUserDailyStreak(doc.data().dailyStreak)

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
//.orderBy('reward').endAt(0)
    userGoalsRef
    .get()
    .then((snapshot) => {
        //map seperated documents into little docs filter((doc) => doc.data().done == false)
        let posts = snapshot.docs.map(doc => {
            const data = doc.data();
            //console.log(data)

              if (data.lastStampDate == today) {
                  const id = doc.id;
                  return {id, ...data}
              } else {
                setGoalsList([])

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

                    //update in user dailystreak time stamp

                    firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid)
                    .update({
                      "dailyStreak": 0
                    }).then((function() {
                        console.log('Success reset streak')
                    }))
                    
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

                      props.navigation.navigate("TodoHome")

                }))

              //}
            
          } 
        //}    
        })

        setGoalsList([...posts]);


    })

  },[goalsList, reward, userName]);

  function progressBtnHandler() {
    setSelectedButton('progress')
  }

  // function calculatePercentageProgress() {
  //   percentage = userDailyStreak / totalSubGoals;
  // }

  function completedBtnHandler() {
    setSelectedButton('overview')

    // for (let i = 0; i < goalsList.length; i++) {
    //   let temNumber = 0;
    //   let temSubGoal = 0;
    //   if (totalSubGoals) {
    //     temSubGoal = totalSubGoals;
    //   }
    //   temNumber = goalsList[i].subGoals.length + 1 - 1;
    //   temSubGoal = temSubGoal + temNumber;
    //   setTotalSubGoals(temSubGoal)
    // }

    // console.log(totalSubGoals)

    // calculatePercentageProgress();

  }

  function returnStringForProgress(percentage) {
    let num = Math.round(percentage * 100)
    let string = num.toString();
    let returnString = string + '%'
    return returnString;
  }



  
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

              <View>
                {
                  reward ?
                  <Text style={styles.coins}>{reward}</Text>
                  : 
                  <Text style={styles.coins}>0</Text>
                }
                
              </View>

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
              <Pressable style={(selectedButton === 'overview') ? [styles.button, styles.selectedButton] : styles.button}
                onPress={completedBtnHandler}
              >
                <Text style={ (selectedButton === 'overview') ? [styles.buttonText, styles.selectedText] : styles.buttonText }>Overview</Text>
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
              <View style={styles.dailyStreakContainer}>
                <Text style={styles.emptyText}>Your daily streaks: {userDailyStreak} </Text>

                <Progress.Circle color='#4A8C72' thickness={5}
                progress={0.5} size={200} showsText={true} 
                formatText={() => {return '50%'}} />

              </View>
            
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
    },
    dailyStreakContainer: {
      alignItems :'center'
    }
    
})