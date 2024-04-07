import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useContext, useState, useEffect, useRef } from 'react'
import * as Progress from 'react-native-progress';
import ParamodoContext from '../../redux/ParamodoContext';
import { Audio } from 'expo-av';

export default function Timer() {

    //get sound
    const [sound, setSound] = useState();

    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync( require('../../assets/paramodoup.mp3')
        );
        setSound(sound);
    
        console.log('Playing Sound');
        await sound.playAsync();
      }
    
      useEffect(() => {
        return sound
          ? () => {
              console.log('Unloading Sound');
              sound.unloadAsync();
            }
          : undefined;
      }, [sound]);
    


    const ParamodoCtx = useContext(ParamodoContext);
    const [isPlaying, setIsPlaying] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(0);
    //what mode is it
    const [mode, setMode] = useState('work'); //work, break, null

    const secondsLeftRef = useRef(secondsLeft);
    const isPlayingRef = useRef(isPlaying);
    const modeRef = useRef(mode);

    function switchMode() {
        const nextMode = modeRef.current === 'work' ? 'break' : 'work';
        const nextSecondsLeft = nextMode === 'work' ? ParamodoCtx.workingTime*60 : ParamodoCtx.breakTime*60
        setMode(nextMode);
        modeRef.current = nextMode;
        setSecondsLeft(nextSecondsLeft);
        secondsLeftRef.current = nextSecondsLeft;

        //play sound on switch mode
        playSound();
    }

    function tick() {
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current);
    }

    function initTimer() {
        //how many seconds left on the timer
        secondsLeftRef.current = ParamodoCtx.workingTime*60;
        setSecondsLeft(secondsLeftRef.current);
    }

    useEffect(() => {
        initTimer();

        //because we use setInterval => all variable have to use ref to change and update
        const interval = setInterval(() => {
            if (!isPlayingRef.current) {
                return;
            } 
            if (secondsLeftRef.current === 0) {
                //change mode
                return switchMode();
            }
            tick(); //deduct 1 second
        }, 1000);

        return () => clearInterval(interval);

    },[ParamodoCtx]);

    const totalSeconds = mode === 'work' ? ParamodoCtx.workingTime*60 : ParamodoCtx.breakTime*60;
    let percentage
    if (totalSeconds == 0) {
        percentage = 0;
    } else {
        percentage = secondsLeft/totalSeconds;
    }
 
    const minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;
    if(seconds < 10) seconds = '0'+seconds //give 00 at the end
   
    let progressColor = mode === 'work' ? '#f75c1f' : '#52de6c'

  return (
    <View style={styles.container}>

    <Text style={styles.subText}>
             {secondsLeft>0 ? 
                (isPlaying ? 
                'Work Hard, Play Hard!'
                :
                'Enjoy Your Break!'
                )
            : null
            }
    </Text>

    <Progress.Circle 
            progress={percentage}
            color = {progressColor}
            unfilledColor='rgba(194, 186, 182, 0.36)'
            size={250} 
            thickness={10}
            showsText= {true}
            formatText={() => <Text>{minutes}:{seconds}</Text>}
            strokeCap='round'
        />

        <View style={styles.buttonsContainer}>

        <Pressable style={({pressed}) => pressed ? [styles.pressed, styles.button] : styles.button}
        onPress={() => {setIsPlaying(prev => !prev); isPlayingRef.current = !isPlayingRef.current}}>
            <Text style={styles.buttonText}>
                {isPlaying ? 
                'Pause'
                :
                'Start'
                }
            </Text>
        </Pressable>

        

        </View>

    </View>

  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subText: {
        textAlign: 'center',
        marginBottom: '5%',
        fontSize: 20
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