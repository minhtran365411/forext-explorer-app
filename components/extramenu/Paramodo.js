import { View, Text, StyleSheet, ScrollView, TextInput, TouchableWithoutFeedback, Keyboard, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Timer from '../ui/Timer';
import ParamodoContext from '../../redux/ParamodoContext';
import { FontAwesome6 } from '@expo/vector-icons';


export default function Paramodo({navigation}) {

    const [quote, setQuote] = useState('Trust the process')

    
    const [workingTime, setWorkingTime] = useState(0);
    const [breakTime, setBreakTime] = useState(0);

    useEffect(() => {
        async function fetchQuote () {
            const response = await axios.get("https://api.quotable.io/quotes/random?tags=Inspirational|Motivational|Success|Wisdom|Knowledge")
            setQuote(response.data[0].content);
        }
        
        fetchQuote();
       
    },[])

    // function returnText() {
    //     return (
    //         <Text>{currentPogress}%</Text>
    //     )
    // }

    

  return (
    <ScrollView style={styles.root}>
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()} accessible={false}>
    <View style={styles.container}>
        
        <View style={styles.settingMenu}>

            <View style={styles.block}>
                <Text style={styles.heading}>"{quote}"</Text>
            </View>
            
        

        <View style={styles.timeSetting}>
            <View style={styles.timeItem}>
                <Text style={styles.desc}> Set Working Time</Text>
                <TextInput 
                value={workingTime}
                onChangeText={(value) => setWorkingTime(value)}
                style={styles.timeInput} maxLength={3} 
                placeholder='Minutes' keyboardType='number-pad' />
            </View>
            <Text style={{fontSize:30}}>:</Text>
            <View style={styles.timeItem}>
                <Text style={styles.desc}> Set Break Time</Text>
                <TextInput 
                value={breakTime}
                onChangeText={(value) => setBreakTime(value)}
                style={styles.timeInput} maxLength={2} 
                placeholder='Minutes' keyboardType='number-pad' />
            </View>
        </View>
           
        </View>

        <ParamodoContext.Provider
            value={{
                workingTime: workingTime,
                breakTime: breakTime
            }}
        >
             <Timer />
        </ParamodoContext.Provider>

        <View style={styles.questionBtn}>
            <Pressable onPress={() => navigation.navigate('Procrastination')}>
                <FontAwesome6 name="circle-question" size={50} color="#4A8C72" />
            </Pressable>
        </View>

        </View>
        </TouchableWithoutFeedback>
        </ScrollView>

  )
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#fff9f0',
        flex: 1,
    },
    container: {
        marginBottom: '20%',
        alignItems: 'center'
    },
    settingMenu: {
        marginTop: '5%',
        marginBottom: '10%',
        alignItems: 'center'
    },
    block: {
        backgroundColor: 'white',
        padding: '3%',
        borderRadius: 15,
        elevation: 2, //android only property
        shadowColor: 'black', //ios only
        shadowOffset: {width: 2 ,height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        width: '90%',
        marginBottom: '5%'
    },
    heading: {
        fontSize: 16,
        textAlign: 'center',
        //fontFamily: 'Eglantine',
    },
    timeSetting: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
         
    },
    timeItem: {
        backgroundColor: '#d79655',
        padding: 15,
        borderRadius: 25,
        marginHorizontal: '5%'
    },
    timeInput: {
        color: 'white',
        fontSize: 30
    },
    desc: {
        color: 'white',
        marginBottom: 5
    },
    questionBtn: {
        position: 'absolute',
        bottom:0,
        right:10,
    }
    
})