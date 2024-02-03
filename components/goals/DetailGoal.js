import React from "react";
import {Text, SafeAreaView, StyleSheet, View, Pressable, Image, FlatList, Alert} from 'react-native'
import { useState, useEffect } from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

//firesbase
import firebase from 'firebase/compat/app';
import 'firebase/storage';
require('firebase/firestore')
require('firebase/storage')

//components
import SubGoalList from "./SubGoalList";

function DetailGoal(props) {
    
    const [subGoalsList, setSubGoalsList] = useState([]);
    let duration = props.route.params.goalData.periodInDay;
    let daysLeft;
    let reward = 0;

    function finishGoal() {
        calculateRewards();

        firebase.firestore().collection('goals').doc(firebase.auth().currentUser.uid)
        .collection('userGoals').doc(props.route.params.goalData.id)
        .update({
            "done": true,
            "reward": reward
        }).then((function() {
            console.log('Success marking goal as completed')
            props.navigation.navigate("TodoHome");
        }))

        //will seperate the reward system into user collection once unity has the function
    }

    function deleteGoal() {
        Alert.alert(
            'Delete Confirmation',
            'Are you sure you want to delete this goal?',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel delete goal'), style: 'cancel'},
              {text: 'Delete Goal', onPress: () => {
                    console.log('Confirmed delete goal');
                    firebase.firestore().collection('goals').doc(firebase.auth().currentUser.uid)
                    .collection('userGoals').doc(props.route.params.goalData.id)
                    .delete().then(() => {
                        console.log("Document successfully deleted!");
                        props.navigation.navigate("TodoHome");
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    });

                }},
            ]
          );
    }

    function calculateDaysLeft() {
        var endDate = props.route.params.goalData.userEndDate;
        var lastStampDate = props.route.params.goalData.lastStampDate;
        let betweenDays = (endDate - lastStampDate) / 86400000;

        daysLeft = betweenDays;
    }

    calculateDaysLeft();

    useEffect(() => {
        setSubGoalsList(props.route.params.goalData.subGoals)
    }, [props.route.params.goalData.subGoals])

    function changeStatusHandler(subGoalName) {
        let tempoList = subGoalsList;

        for (let i = 0 ; i < tempoList.length; i++) {
            //console.log(subGoalName);
            let name = tempoList[i].subGoal;
            if (name === subGoalName) {
                if (tempoList[i].done == false) {
                    tempoList[i].done = true;
                    tempoList[i].streakCounter +=1 ;
                } else {
                    tempoList[i].done = false;
                    tempoList[i].streakCounter -=1 ;
                }
    
            }
        }


        setSubGoalsList(tempoList)

    }

    function toggleDoneHandler(subGoalName) {

        changeStatusHandler(subGoalName);

        firebase.firestore().collection('goals').doc(firebase.auth().currentUser.uid)
        .collection('userGoals').doc(props.route.params.goalData.id)
        .update({
            "subGoals": subGoalsList
        }).then((function() {
            console.log('Success overwriting')
        }))

    }

    function calculateRewards() {
        for ( let i = 0; i < subGoalsList.length; i++) {
            reward += subGoalsList[i].streakCounter
        }
        if (props.route.params.goalData.periodInDay >= 10) {
            reward += 5
        } else if (props.route.params.goalData.periodInDay >= 20) {
            reward += 10
        } else if (props.route.params.goalData.periodInDay >= 30) {
            reward +=15
        }
    }


    return (
        <SafeAreaView style={styles.rootView}>
      
        <View style={styles.titleContainer}>
            <Text style={styles.bigTitle}>{props.route.params.goalData.goal}</Text>
            <Text style={[styles.bigTitle, {fontSize: 20, marginTop: 10}]}>Duration: {duration} days. | Days Left: {daysLeft} days.</Text>
            <View style={styles.subContainer}>
                <View>
                    <Image source={require('../../assets/imgs/flowersicon.png')} style={{height: 40, width: 40}} />
                </View>

                <View>
                     <Text style={styles.subTitle}>Total Sub Goals</Text>
                </View>
                
            </View>

            <Pressable style={{marginBottom: 10}} onPress={deleteGoal}>
                <View style={styles.binContainer}>
                    <Text style={{fontWeight: 'bold', color: '#b60000'}}>Delete Goal</Text>
                    <MaterialCommunityIcons  name="trash-can-outline" color={'#b60000'} size={30} />
                </View>
                
            </Pressable>
            
        </View> 


        <View style={styles.list}>
            <FlatList 
                data={subGoalsList}
                renderItem={({item}) => <SubGoalList daysLeft={daysLeft} duration={duration} data={item} toggleDoneHandler={toggleDoneHandler} />}
                keyExtractor={item => item.id+item.subGoal}
            />
        </View>

        {
            (daysLeft === 0) ?
                <View style={styles.finishBtnContainer}>
                <Pressable 
                    style={({pressed}) => pressed ? [styles.pressed, styles.button] : styles.button}
                    ndroid_ripple={{color: '#88245b'}}
                    onPress={finishGoal}
                >
                    <Text style={styles.buttonTitle}>Finish Goal</Text>
                </Pressable>
                </View>
            :
            <View></View>
        }
       

        </SafeAreaView>
    )
}

export default DetailGoal;

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: '#fff9f0'
    },
    titleContainer: {
        margin: '5%',
    },
    bigTitle: {
        fontFamily: 'TomeOfTheUnknown',
        fontSize: 28,
        color: '#BA3D1F',
        textAlign: 'center'
    },
    subContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '5%'
    },
    subTitle: {
        fontSize: 20,
        color: '#823324',
        textAlign: 'center',
        marginTop: '4%',
        fontWeight: 'bold',
        marginLeft: 8
    },
    button: {
        backgroundColor: '#BA3D1F',
        height: 50,
        marginTop: 50,
        width: '60%',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2, //android only property
        shadowColor: '#3d0d0d', //ios only
        shadowOffset: {width: 2 ,height: 3},
        shadowOpacity: 0.5,
        shadowRadius: 5
    },
    buttonTitle: {
        fontFamily: 'Eglantine',
        fontSize: 30,
        color: 'white',
        textAlign: 'center'
    },
    pressed: {
        opacity: 0.75
    },
    finishBtnContainer: {
        alignItems: 'center',
    },
    binContainer: {
        flexDirection:'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
})