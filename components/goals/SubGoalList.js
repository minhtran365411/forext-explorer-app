import { Text, StyleSheet, View, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useState } from 'react'
import * as Progress from 'react-native-progress';

//firesbase
import firebase from 'firebase/compat/app';
import 'firebase/storage';
require('firebase/firestore')
require('firebase/storage')


function SubGoalList (props) {

  const [done, setDone]  = useState(props.data.done);
  let currentPercentage = props.data.streakCounter / props.duration;

    function changeStatusHandler() {

        if (props.data.done == false) {
            setDone(true)
        } else {
            setDone(false)
        }

        props.toggleDoneHandler(props.data.subGoal)


        //add daily streaks

        var userRef = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid);

        userRef.get().then((doc) => {
            let temDailyStreak = doc.data().dailyStreak;
            if (done == false) {
              temDailyStreak++;
            } else {
              temDailyStreak--;
            }

            //update daily streak
            
            userRef.update({
                "dailyStreak": temDailyStreak
            }).then((function() {
                console.log('Success updatedaily streak')
            }))


        }).catch((error) => {
            console.log("Error getting document:", error);
        });


    }

    
    

    //console.log(props.data)
    return (
        <SafeAreaView style={styles.taskTab}>

        <View style={styles.taskBtn}>
              <View>

                <View style={styles.textBox}>
                  <View>
                    <Text style={done == true ? [styles.text, styles.crossedText] : styles.text}>
                    {/* //get subGoals */}
                        {props.data.subGoal} 
                    </Text>
                  </View>

                  <View>
                    <Text style={styles.statusText}>{props.data.streakCounter}/{props.duration}</Text>
                  </View>

                </View>

                <Progress.Bar progress={currentPercentage} width={250} color={'#D47B2B'}
                animated={true}
                style={styles.progressBar} 
                />

              </View>

              {
                (props.daysLeft == 0) ?
                <View></View>
                :
                (
                  (done ==  false) ?
                  <View>
                  <TouchableOpacity onPress={changeStatusHandler} >
                    <MaterialCommunityIcons  name="checkbox-blank-circle-outline" color={'#4A8C72'} size={30} />
                  </TouchableOpacity>
                  </View>
                    :
                    <View>
                    <TouchableOpacity onPress={changeStatusHandler} >
                        <MaterialCommunityIcons  name="checkbox-marked-circle-outline" color={'#4A8C72'} size={30} />
                    </TouchableOpacity>
                    </View>
                )
              }
              

          </View>
          
      </SafeAreaView>
    )
  
}

export default SubGoalList;

const styles = StyleSheet.create({
    taskTab:{
        marginHorizontal: '5%',
        marginVertical: 6,
      },
      taskBtn:{
        flex: 1,
        // flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal:20,
        borderRadius: 15,
        elevation: 1, //android only property
          shadowColor: '#D47B2B', //ios only
          shadowOffset: {width: 1 ,height: 1},
          shadowOpacity: 0.2,
          shadowRadius: 2
      },
      pressed: {
        opacity: 0.75
      },
      text: {
        fontWeight: 'bold', 
        fontSize: 17, 
        color: '#4A8C72',
        width: 240
      },
      crossedText: {
        textDecorationLine: 'line-through',
        color: '#546b62' 
      },
      progressBar: {
        marginVertical: 10,
      },
      textBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        
      },
      statusText: {
        fontWeight: 'bold', 
        fontSize: 14, 
        color: '#D47B2B' 
      }
})