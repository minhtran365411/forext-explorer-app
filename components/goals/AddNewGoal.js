import { Text, StyleSheet, View, SafeAreaView, Pressable, TextInput, Alert } from 'react-native'
import React from 'react'

import { useState, useEffect } from 'react';


function AddNewGoal ({onSubmitNewGoal, userNewGoal}) {
    const [newGoal, setNewGoal] = useState('');

    
    //called only once
    useEffect(() => {
        if(userNewGoal !== '') {
            setNewGoal(userNewGoal)
        }
    },[])

    //Alert if user try to click next without filling in info

    function addNewGoalHandler() {
        if (newGoal.length <=1) {
            Alert.alert(
                'No information received!',
                'Do you not have any goal? O.o',
                [{text: 'Ooppss...', style: 'cencel'}]
            );

            return;
        }
        onSubmitNewGoal(newGoal);
        setNewGoal('');
    }

    return (
        <SafeAreaView style={styles.rootView}>
        
        <View style={styles.titleContainer}>
            <Text style={styles.bigTitle}>Tell Us...</Text>
            <Text style={styles.subTitle}>What do you want to achieve?</Text>
        </View> 

        <View style={styles.inputContainer}>
            <TextInput 
                multiline
                numberOfLines={3}
                maxLength={100}
                style={styles.input}
                placeholder='Input your goal'
                value={newGoal}
                onChangeText={(value) => setNewGoal(value)}
            />
        </View>

        <View style={styles.buttonContainer}>
            <Pressable 
                style={({pressed}) => pressed ? [styles.pressed, styles.button] : styles.button}
                ndroid_ripple={{color: '#88245b'}}
                onPress={addNewGoalHandler}
            >
                <Text style={styles.buttonTitle}>Next</Text>
            </Pressable>
        </View>

        </SafeAreaView>
          
    )
}

export default AddNewGoal;

const styles = StyleSheet.create({
    rootView: {
        flex: 1
    },
    titleContainer: {
        margin: '10%',
    },
    bigTitle: {
        fontFamily: 'TomeOfTheUnknown',
        fontSize: 45,
        color: '#BA3D1F'
    },
    subTitle: {
        fontFamily: 'Eglantine',
        fontSize: 35,
        color: '#BA3D1F'
    },
    inputContainer: {
        marginHorizontal: 27,
    },
    input: {
        backgroundColor: 'white',
        height: 120,
        padding:30,
        paddingTop: 50,
        borderRadius: 25,
        fontSize: 15,
        elevation: 2, //android only property
        shadowColor: 'white', //ios only
        shadowOffset: {width: 2 ,height: 3},
        shadowOpacity: 0.5,
        shadowRadius: 5
    },
    buttonContainer: {
        alignItems: 'center'
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
    }

})