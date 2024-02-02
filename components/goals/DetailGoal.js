import React from "react";
import {Text, SafeAreaView, StyleSheet, View, TouchableOpacity, Image, FlatList} from 'react-native'
import { useState, useEffect } from "react";

//firesbase
import firebase from 'firebase/compat/app';
import 'firebase/storage';
require('firebase/firestore')
require('firebase/storage')

//components
import SubGoalList from "./SubGoalList";

function DetailGoal(props) {
    
    const [subGoalsList, setSubGoalsList] = useState([]);


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
                } else {
                    tempoList[i].done = false;
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


    return (
        <SafeAreaView style={styles.rootView}>
      
        <View style={styles.titleContainer}>
            <Text style={styles.bigTitle}>{props.route.params.goalData.goal}</Text>
            <View style={styles.subContainer}>
                <View>
                    <Image source={require('../../assets/imgs/flowersicon.png')} style={{height: 40, width: 40}} />
                </View>

                <View>
                     <Text style={styles.subTitle}>Total Sub Goals</Text>
                </View>
                
            </View>
            
        </View> 

        <View style={styles.buttonContainer}>

        </View>

        <View style={styles.list}>
            <FlatList 
                data={subGoalsList}
                renderItem={({item}) => <SubGoalList data={item} toggleDoneHandler={toggleDoneHandler} />}
                keyExtractor={item => item.id}
            />
        </View>

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
})