import { View, Animated, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, {useEffect, useRef} from 'react'
import Svg, {G, Circle} from 'react-native-svg';
import { AntDesign } from '@expo/vector-icons'

export default function NextButton({percentage, scrollTo}) {

    const size = 80;
    const strokeWidth = 4;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;

    const progressAnimation = useRef(new Animated.Value(0)).current;
    const progressRef = useRef(null);

    const animation = (toValue) => {
        // console.log('Page ' + percentage)
        return Animated.timing(progressAnimation, {
            toValue,
            duration: 250,
            useNativeDriver: true
        }).start()
    }

    useEffect(() => {
        animation(percentage);
    }, [percentage]);

    useEffect(() => {
        progressAnimation.addListener((value) => {
            const strokeDashoffset = circumference - (circumference * value.value)/100
            
            if(progressRef?.current) {
                progressRef.current.setNativeProps({
                    strokeDashoffset
                })
            }
        
        },[percentage]);

        return () => {
            progressAnimation.removeAllListeners()
        };
    },[]); //clear whenever component unmount, only launch when first mount


  return (
    <View style={styles.container}>
        <Svg width={size} height={size} fill="none">
        <G rotation="-90" origin={center}>
            <Circle stroke="#dfbc86" cx={center} cy={center} r={radius} strokeWidth={strokeWidth}
            />

            <Circle ref={progressRef}
            stroke="#BA3D1F" cx={center} cy={center} r={radius} 
            strokeWidth={strokeWidth} 
            strokeDasharray={circumference}
            />
        </G>
        </Svg>
        
        <TouchableOpacity onPress={scrollTo} style={styles.button} activeOpacity={0.6}>
            {/* <AntDesign name='arrowright' size={32} color='#BA3D1F' /> */}
            {(percentage > 20 && percentage < 40) && <Image source={require('../../assets/boardingassets/flower1.png')} style={{width: 50, height:50}} /> }
            {(percentage > 50 && percentage < 70) && <Image source={require('../../assets/boardingassets/flower2.png')} style={{width: 50, height:50}} /> }
            {(percentage > 80) && <Image source={require('../../assets/boardingassets/flower3.png')} style={{width: 50, height:50}} />}
        </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex:1, 
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: -50
    },
    button: {
        position: 'absolute',
        borderRadius: 100,
        padding: '20'
    }
  })