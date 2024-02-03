import {StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

//import components
import AddNewGoal from '../goals/AddNewGoal';
import AddNewSubGoal from '../goals/AddNewSubGoal';

function NewGoal (props) {
  const [userNewGoal, setUserNewGoal] = useState('');
  const [filledGoal, setFilledGoal] = useState(0);
  const [ userEndDate, setUserEndDate] = useState(new Date());

  function clearInfo() {
    setUserNewGoal('');
    setUserEndDate(new Date())
  }

  function goBack() {
    setFilledGoal(0);
  }

  function newGoalButtonHanlder(goal, date) {
    // console.log(goal);
    // console.log(date)
    setUserNewGoal(goal);
    setUserEndDate(date)
    setFilledGoal(1);
  }

    let screen = <AddNewGoal onSubmitNewGoal={newGoalButtonHanlder} userNewGoal={userNewGoal} userEndDate={userEndDate} navigation={props.navigation} />

    if(filledGoal === 1) {
      screen = <AddNewSubGoal userNewGoal={userNewGoal} userEndDate={userEndDate} goBack={goBack} clearInfo={clearInfo} navigation={props.navigation} />
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

          {screen}

        </ImageBackground>
        </LinearGradient>
      
    )
}

export default NewGoal;

const styles = StyleSheet.create({
    rootView: {
      flex: 1
    }
})