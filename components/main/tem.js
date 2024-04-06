import { View, Text, StyleSheet, Pressable, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import axios from 'axios';

export default function Paramodo() {

    const [isPlaying, setIsPlaying] = useState(false);
    const [workingTime, setWorkingTime] = useState(0);
    const [breakTime, setBreakTime] = useState(0);
    const [key, setKey] = useState(0);
    const [quote, setQuote] = useState('Trust the process')

    useEffect(() => {
        async function fetchQuote () {
            const response = await axios.get("https://api.quotable.io/quotes/random?tags=Inspirational|Motivational|Success|Wisdom|Knowledge")
            setQuote(response.data[0].content);
        }
        
        fetchQuote();
       
    },[])

    const children = ({ remainingTime }) => {

        const minutes = Math.floor(remainingTime / 60)
        const seconds = remainingTime % 60
      
        //return `${minutes}:${seconds}`

        if (!remainingTime) {
            return (
                <Text style={{ fontSize: 40 }}>00:00</Text>
            )
        }

        return (
            <Text style={{ fontSize: 40 }}>
                {(minutes < 10) ? `0${minutes}` : minutes}:{(seconds < 10) ? `0${seconds}` : seconds}
            </Text>
        )
      }

      const workingTimeToSecs = workingTime*60;

  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()} accessible={false}>
    <View style={styles.container}>
        
        <View style={styles.settingMenu}>
            <Text style={styles.heading}>"{quote}"</Text>
        

        <View style={styles.timeSetting}>
            <View style={styles.timeItem}>
                <Text style={styles.desc}> Set Working Time</Text>
                <TextInput 
                value={workingTime}
                onChangeText={(value) => setWorkingTime(value)}
                style={styles.timeInput} maxLength={2} 
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
    
      <CountdownCircleTimer
       key={key}
      isPlaying={isPlaying}
      duration={workingTime*60}
      colors={["#44AE53", "#F7B801", "#BA3D1F", "#8e7155"]}
      colorsTime={[workingTimeToSecs, workingTimeToSecs*0.75, workingTimeToSecs*0.5, workingTimeToSecs*0.25]}
      onComplete={() => {
        // do your stuff here
        return { shouldRepeat: true, delay: breakTime*60 } 
      }}
      updateInterval={0}
    >
     {children}
      </CountdownCircleTimer>

        <View style={styles.buttonsContainer}>

            <Pressable style={({pressed}) => pressed ? [styles.pressed, styles.button] : styles.button}
            onPress={() => setIsPlaying(prev => !prev)}>
                <Text style={styles.buttonText}>
                    {isPlaying ? 
                    'Pause'
                    :
                    'Start'
                    }
                </Text>
            </Pressable>

            <Pressable style={({pressed}) => pressed ? [styles.pressed, styles.button ,styles.resetButton] : [styles.button ,styles.resetButton]}
            onPress={() => setKey(prevKey => prevKey + 1)}>
                <Text style={styles.buttonText}>
                    Restart
                </Text>
            </Pressable>

      </View>

    </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff9f0',
        flex: 1,
        alignItems: 'center'
    },
    settingMenu: {
        marginTop: '5%',
        marginBottom: '10%',
        alignItems: 'center'
    },
    heading: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: '6%',
        marginHorizontal: '5%',
        fontFamily: 'Eglantine',

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
    buttonsContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: '3%'
    },
    button: {
        marginTop: '10%',
        backgroundColor: '#d37b2b',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2, //android only property
        shadowColor: '#3d0d0d', //ios only
        shadowOffset: {width: 2 ,height: 3},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        flex: 1,
        marginHorizontal: '2%'
    },
    resetButton: {
        backgroundColor: '#BA3D1F',
    },
    buttonText: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Eglantine',
    },
    pressed: {
        opacity: 0.75
    }
})