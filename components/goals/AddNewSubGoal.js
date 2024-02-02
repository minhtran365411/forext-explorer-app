import { Text, StyleSheet, View, Pressable, TextInput, SafeAreaView } from 'react-native'
import React from 'react'
import { useState } from 'react';

//import firebase
//import firebase from 'firebase/compat'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/storage'; 

require('firebase/firestore')
require('firebase/storage')

function AddNewSubGoal (props) {

  //const [subGoals, setSubGoals] = useState([]);
  

  const [subGoal1, setSubGoal1] = useState();
  const [subGoal2, setSubGoal2] = useState();
  const [subGoal3, setSubGoal3] = useState();

  let filled = "Skip";

  if( subGoal1 || subGoal2 || subGoal3) {
    filled = 'Done';
  }

  function conbineSubGoals() {
    let tempoList = [];
    tempoList.push(subGoal1, subGoal2, subGoal3);

    console.log(tempoList);

  }

  function uploadNewGoal() {
    //conbineSubGoals();
    let tempoList = [];
    if(subGoal1) (
      tempoList.push({subGoal: subGoal1, done: false})
    ) 
    if(subGoal2) (
      tempoList.push({subGoal: subGoal2, done: false})
    )
    if(subGoal3) (
      tempoList.push({subGoal: subGoal3, done: false})
    )

    console.log(tempoList);

    firebase.firestore().collection('goals').doc(firebase.auth().currentUser.uid)
    .collection('userGoals')
    .add({
        goal: props.userNewGoal,
        subGoals: [...tempoList],
        done: false,
        reward: 0,
        creation: firebase.firestore.FieldValue.serverTimestamp()
    }).then((function() {
        setSubGoal1();
        setSubGoal2();
        setSubGoal3();
        props.clearInfo();
        props.goBack();
        //back to home page
        props.navigation.navigate('TodoHome')
    }))
  }


    return (
      <SafeAreaView style={styles.rootView}>
      
      <View style={styles.titleContainer}>
          <Text style={styles.bigTitle}>It’s easier to achieve your goal when you turn it into feasible quests.</Text>
          <Text style={styles.subTitle}>Your goal is: {props.userNewGoal}</Text>
      </View> 

      <View style={styles.inputContainer}>
          <TextInput 
              maxLength={100}
              style={styles.input}
              placeholder='Input sub-goal 1'
              value={subGoal1}
              onChangeText={(value) => setSubGoal1(value)}
          />

          <TextInput 
              maxLength={100}
              style={styles.input}
              placeholder='Input sub-goal 2'
              value={subGoal2}
              onChangeText={(value) => setSubGoal2(value)}
          />

          <TextInput 
              maxLength={100}
              style={styles.input}
              placeholder='Input sub-goal 3'
              value={subGoal3}
              onChangeText={(value) => setSubGoal3(value)}
          />
      </View>

      <View style={styles.buttonsContainer}>
      <View style={styles.buttonContainer}>
          <Pressable 
              style={({pressed}) => pressed ? [styles.pressed, styles.button] : styles.button}
              ndroid_ripple={{color: '#88245b'}}
              onPress={props.goBack}
          >
              <Text style={styles.buttonTitle}>Go Back</Text>
          </Pressable>
      </View>
      <View style={styles.buttonContainer}>
          <Pressable 
              style={({pressed}) => pressed ? [styles.pressed, styles.button] : styles.button}
              ndroid_ripple={{color: '#88245b'}}
              onPress={uploadNewGoal}
          >
              <Text style={styles.buttonTitle}>{filled}</Text>
          </Pressable>
        </View>
      </View>
        

      </SafeAreaView>
    )
}

export default AddNewSubGoal;

const styles = StyleSheet.create({
  rootView: {
    flex: 1
},
titleContainer: {
    margin: '10%',
},
bigTitle: {
    fontFamily: 'TomeOfTheUnknown',
    fontSize: 28,
    color: '#BA3D1F',
    textAlign: 'center'
},
subTitle: {
    fontFamily: 'TomeOfTheUnknown',
    fontSize: 20,
    color: '#823324',
    textAlign: 'center',
    marginTop: '4%'
},
inputContainer: {
    marginHorizontal: 27,
},
input: {
    backgroundColor: 'white',
    padding:20,
    borderRadius: 25,
    fontSize: 15,
    elevation: 2, //android only property
    shadowColor: 'white', //ios only
    shadowOffset: {width: 2 ,height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    marginBottom: '5%'
},
buttonsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '5%',
    justifyContent: 'space-between'
},
buttonContainer: {
  flex:1,
  marginHorizontal: '2%'
},
button: {
    backgroundColor: '#BA3D1F',
    height: 50,
    marginTop: '8%',
    //width: '60%',
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
}
})