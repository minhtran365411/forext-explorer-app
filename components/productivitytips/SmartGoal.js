import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome6 } from '@expo/vector-icons';

export default function SmartGoal() {

  const [currentLetter, setCurrentLetter] = useState('S');
  const [desc, setDesc] = useState('');
  const [ex, setEx] = useState('');

  useEffect(() => {
    for (let i = 0; i < smartItems.length; i ++) {
      if (currentLetter === smartItems[i].letter) {
        setDesc(smartItems[i].desc);
        setEx(smartItems[i].ex);
      }
    }
  },[currentLetter])

  const smartItems = [
    {
      letter: 'S',
      desc: 'S is for SPECIFIC. The Goal should described exactly what you are trying to accomplish. It answers the question "What?"',
      ex: 'Increase sales.'
    },
    {
      letter: 'M',
      desc: 'M is for MEASURABLE. The Goal should be easy to quantify, using a metric you can easily track.',
      ex: 'Increase sales by 15%.'
    },
    {
      letter: 'A',
      desc: 'A is for ACHIEVABLE. The Goal should be realistic about what can be attained, given the current resources and skills.',
      ex: 'Based on past performance and market analysis, a 15% increase is realistic in a decent time-frame.'
    },
    {
      letter: 'R',
      desc: 'R is for RELEVANT. The benefits of the goal should align with the needs of your business. It answers the question "Why?"',
      ex: 'Increasing revenue aligns with the objective to grow and remain competitive of the company.'
    },
    {
      letter: 'T',
      desc: 'T is for TIME-BOUND. Having a limited time-frame acts like a finish line, giving a healthy sense of challenge.',
      ex: 'Increase sales by 15% within the next fiscal year.'
    }
  ];


  function TabItem({item}) {
    return (
      <Pressable style={styles.letterBtn} onPress={() => setCurrentLetter(item.letter)}>
        <Text style={currentLetter === item.letter ? [styles.letter, styles.selectedLetter] : styles.letter}>{item.letter}</Text>
      </Pressable>
    )
  }


  return (
    <View style={styles.root}>
      

        <View style={styles.tab}>
          <FlatList 
            horizontal
            data={smartItems}
            renderItem={({item}) => <TabItem item={item} />}
            keyExtractor={(item) => item.letter}
          />
          </View>

          <View style={styles.info}>
            <Text style={styles.desc}>{desc}</Text>
            <Text style={styles.ex}>Example: {ex}</Text>
          </View>

          <View style={styles.quoteBox}>
            <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center'}}>
              <FontAwesome6 name="quote-left" size={24} color="#BA3D1F"/>
              <Text style={styles.quote}>A man without a goal is like a ship without a rudder.</Text>
            </View>
              
              <Text style={styles.ref}>- Thomas Carlyle</Text>
          </View>
        

    </View>
  )
}

const styles = StyleSheet.create({
  root: {
      backgroundColor: '#fff9f0',
      flex: 1,
      alignItems: 'center',
      paddingVertical: '10%',
  },
  tab: {
    marginTop: '2%',
    borderBottomWidth: 1,
    borderBottomColor: '#702807',
    height: '8%',
    justifyContent: 'space-between'
  },
  info: {
    width: '80%',
    marginTop: '5%',
    marginHorizontal: '5%',
    backgroundColor: 'white',
    padding: '4%',
    borderRadius: 15,
    elevation: 2, //android only property
    shadowColor: 'black', //ios only
    shadowOffset: {width: 2 ,height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2
  },
  letterBtn: {
    marginHorizontal: 10,
    
  },
  letter: {
    fontSize: 30,
    fontFamily: 'TomeOfTheUnknown',
    color: '#3f1106',
    paddingHorizontal: 20,
  },
  selectedLetter: {
    color: '#BA3D1F',
    fontSize: 35,
    textShadowColor: 'rgba(0, 0, 0, 0.38)',
    textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: 5
  },
  desc: {
    fontSize: 16
  },
  ex: {
    fontStyle: 'italic',
    marginTop: '3%',
    fontSize: 15,
    color: '#3f1106'
  },
  quoteBox: {
    marginTop: '15%',
    backgroundColor: '#ffcba9',
    height: 150,
    justifyContent:'center',
    borderRadius: 25,
    paddingHorizontal: '10%',
    width: '80%'
  },
  quote: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3f1106',
    marginLeft: 10
  },
  ref: {
    textAlign: 'right',
    fontStyle: 'italic',
    marginTop: '5%'
  }
})