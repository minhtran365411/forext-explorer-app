import { Text, StyleSheet, View, SafeAreaView, Pressable, TextInput, Alert, TouchableWithoutFeedback, Keyboard, Button  } from 'react-native'
import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';

import { useState, useEffect } from 'react';


function AddNewGoal ({onSubmitNewGoal, userNewGoal, userEndDate}) {
    const [newGoal, setNewGoal] = useState('');
    const [endDate, setEndDate] = useState(userEndDate);
    const [show, setShow] = useState(false);

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const onChange = (event, selectedDate) => {
        const endDate = selectedDate;
        setShow(false);
        setEndDate(endDate);
      };
    
      const showDatepicker = () => {
        setShow(true);
      };

    
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
        onSubmitNewGoal(newGoal, endDate);
        setNewGoal('');
    }

    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()} accessible={false}>
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
        

        <View style={styles.inputContainer}>
            <Text style={styles.subTitle}>Pick an end date of the goal tracker</Text>
            {/* <Button onPress={showDatepicker} title="Show Date Picker!" /> */}
            <View style={styles.buttonContainer}>
                <Pressable style={({pressed}) => pressed ? [styles.btnPicker, styles.pressed] : styles.btnPicker} onPress={showDatepicker}>
                    <Text style={{color: 'white'}}>Show Date Picker!</Text>
                </Pressable>

                {show && (
                <DateTimePicker
                testID="datePicker"
                value={endDate}
                mode='date'
                // is24Hour={true}
                onChange={onChange}
                display='default'
                minimumDate={tomorrow}
                />
                )} 

                <Text style={{marginTop: 10}}>End Date: {endDate.toLocaleString()}</Text>

            </View>
            
            

            
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
        </TouchableWithoutFeedback>
          
    )
}

export default AddNewGoal;

const styles = StyleSheet.create({
    rootView: {
        flex: 1
    },
    titleContainer: {
        marginHorizontal: '10%',
        marginTop: '8%',
        marginBottom: '5%'
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
        paddingTop: 20,
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
        marginTop: 20,
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
    btnPicker: {
        backgroundColor: '#4A8C72',
        height: 30,
        marginVertical: 10,
        width: '60%',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1, //android only property
        shadowColor: '#ffffff', //ios only
        shadowOffset: {width: 2 ,height: 3},
        shadowOpacity: 0.5,
        shadowRadius: 2
    }

})