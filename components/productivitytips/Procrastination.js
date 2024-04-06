import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import React from 'react'

export default function Procrastination({navigation}) {
  return (
    <ScrollView style={styles.root}>
    <View style={styles.container}>

    <Text style={styles.heading}>Paramodo Technique</Text>
    
    <View style={styles.block}>
      <Text style={styles.title}>Work Intervals:</Text>
      <Text style={styles.desc}>
      The Pomodoro Technique divides work into intervals, typically 25 minutes long, known as "Pomodoros." During each Pomodoro, you focus exclusively on a single task without any distractions or interruptions.
      </Text>
    </View>

    <View style={styles.block}>
      <Text style={styles.title}>Breaks:</Text>
      <Text style={styles.desc}>
        After each Pomodoro, you take a short break, usually around 5 minutes. These breaks allow you to relax, recharge, and prepare for the next Pomodoro session.
      </Text>
    </View>

    <View style={styles.block}>
      <Text style={styles.title}>Pomodoro Sessions:</Text>
      <Text style={styles.desc}>
      A series of Pomodoros and breaks make up a Pomodoro session. After completing four Pomodoros, you take a longer break, typically 15-30 minutes, to rest and rejuvenate.
      </Text>
    </View>

    <View style={styles.block}>
      <Text style={styles.title}>Common Work/Break Time:</Text>
      <Text style={styles.desc}>
      Some of the most common and effective paramodo timing sessions are: 25-5, 50-10, 60-15.
      </Text>
    </View>

    <Pressable style={({pressed}) => pressed ? [styles.pressed, styles.button] : styles.button }
        onPress={() => {
          navigation.goBack();
          navigation.navigate('Paramodo')
        }}>
            <Text style={styles.buttonText}>
                Try Paramodo Timer
            </Text>
        </Pressable>

    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff9f0',
    flex: 1,
  },
  container: {     
      alignItems: 'center',
      paddingVertical: '5%'
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#BA3D20',
    textAlign: 'center',
    marginBottom: '2%'
  },
  block: {
    marginHorizontal: '5%',
    marginBottom: '5%',
    backgroundColor: 'white',
    padding: '3%',
    borderRadius: 15,
    elevation: 2, //android only property
    shadowColor: 'black', //ios only
    shadowOffset: {width: 2 ,height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D47B2B',
    
  },
  subheading: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    marginTop: '2%',
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
    marginHorizontal: '5%'
},
pressed: {
    opacity: 0.75
}

})