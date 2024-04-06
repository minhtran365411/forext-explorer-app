import { Text, StyleSheet, View, Pressable, TextInput, SafeAreaView } from 'react-native'
import React from 'react'
import { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

//called axios to implement AI
import axios from 'axios';

//import firebase
//import firebase from 'firebase/compat'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/storage'; 

require('firebase/firestore')
require('firebase/storage')

function AddNewSubGoal (props) {

  const [aiPressed, setAiPressed] = useState(false);

    //AI
    const [response, setResponse] = useState('')
    const fetchAIResponse = async () => {
      const apiKey = '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'
      const prompt = `Give me 3 specific sub-goal suggestions for my big goal ${props.userNewGoal} within ${daysInBetween} days in 3 bullet points, each bullet point have a maximum of 10 words`
      
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: 'You are a helpful assistant.' },
              { role: 'user', content: prompt },
            ],
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`,
            },
          }
        );
    
        // Handle the response here
        console.log(response.data.choices[0].message.content);
        //setResponse(response.data.choices[0].message.content);
        let splitResponse = response.data.choices[0].message.content.split("\n");
        for (let i =0; i < splitResponse.length; i++) {
            setSubGoal1(splitResponse[0]);
            setSubGoal2(splitResponse[1]);
            setSubGoal3(splitResponse[2]);
        } 

        setAiPressed(true);

      } catch (error) {
        console.error('Error sending chat request:', error);
      }
    }
    //end AI

    let finishDate = props.userEndDate;
    let daysInBetween;

  //const [subGoals, setSubGoals] = useState([]);
  function calculateDateInBetween() {
    var endDate = new Date(finishDate);
    var today = new Date();
    var oneDay = 24 * 60 * 60 * 1000;
    let betweenDay = Math.round(Math.abs((today.getTime() - endDate.getTime())/ oneDay));

    // let betweenDay = Math.ceil((endDate - today) / msDay);
    daysInBetween = betweenDay;
  }

  calculateDateInBetween();


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
      tempoList.push({subGoal: subGoal1, done: false, streakCounter: 0})
    ) 
    if(subGoal2) (
      tempoList.push({subGoal: subGoal2, done: false, streakCounter: 0})
    )
    if(subGoal3) (
      tempoList.push({subGoal: subGoal3, done: false, streakCounter: 0})
    )

    console.log(tempoList);


    firebase.firestore().collection('goals').doc(firebase.auth().currentUser.uid)
    .collection('userGoals')
    .add({
        goal: props.userNewGoal,
        subGoals: [...tempoList],
        done: false,
        reward: 0,
        creation: new Date().setHours(0,0,0,0), //firebase.firestore.FieldValue.serverTimestamp(),
        userEndDate: props.userEndDate.setHours(0,0,0,0),
        lastStampDate: new Date().setHours(0,0,0,0),
        periodInDay: daysInBetween
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
          <Text style={styles.subTitle}>Duration: {daysInBetween} days</Text>

          <Pressable style={({pressed}) => !aiPressed ? ( pressed ? [styles.aiButton, styles.pressed] : styles.aiButton ): [styles.aiButton, styles.pressedAiBtn]} 
          onPress={fetchAIResponse} disabled={aiPressed}>
          <View style={styles.aiButtonContainer}>
              <Text style={!aiPressed ? styles.aiText : [styles.aiText,styles.pressedAiText]}>Get AI suggestions</Text>
              <MaterialCommunityIcons  name="magic-staff" color={'#fff'} size={30} />
          </View>
                
          </Pressable>

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
    margin: '5%',
},
bigTitle: {
    fontFamily: 'TomeOfTheUnknown',
    fontSize: 24,
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
},
aiButton: {
  backgroundColor: '#4A8C72',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2, //android only property
    shadowColor: '#ffffff', //ios only
    shadowOffset: {width: 2 ,height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginHorizontal: '2%',
    marginTop: '5%'
},
pressedAiBtn : {
  backgroundColor: '#184735',
},
aiButtonContainer: {
  flexDirection:'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginVertical: '2%'
},
aiText: {
  fontWeight: 'bold', 
  color: '#fff', 
  fontSize: 16, 
  textTransform: 'uppercase'
},
pressedAiText: {
  color: '#6e6e6e'
}
})