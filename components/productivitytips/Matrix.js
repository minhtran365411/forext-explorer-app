import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

export default function Matrix() {
  return (
    <View style={styles.root}>
      <View style={styles.block}>
        <Text style={styles.intro}>
          The Eisenhower Matrix, also known as the Urgent-Important Matrix, is a productivity tool that helps individuals prioritize tasks based on their urgency and importance. 
          It was popularized by Dwight D. Eisenhower, the 34th President of the United States, who was known for his efficient time management skills. 
          The matrix categorizes tasks into four quadrants: Urgent, Not Urgent, Important, Not Important.
        </Text>
      </View>
      <Image source={require('../../assets/imgs/eisenhowermatrix.png')} style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
      backgroundColor: '#fff9f0',
      flex: 1,
      alignItems: 'center',
      paddingVertical: '5%',
      justifyContent: 'flex-start'
  },
  block: {
    width: '90%',
    backgroundColor: 'white',
    padding: '3%',
    borderRadius: 15,
    elevation: 2, //android only property
    shadowColor: 'black', //ios only
    shadowOffset: {width: 2 ,height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2
  },
  intro: {
    //
    textAlign: 'center',
    marginBottom: '2%',
    
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
    marginLeft: 10
  }
})