import { View, Text, StyleSheet, ImageBackground, Pressable, Linking, Alert, ScrollView } from 'react-native'
import React, { useState, useCallback } from 'react'
import YoutubePlayer from "react-native-youtube-iframe";

export default function AboutUs() {

  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  // const togglePlaying = useCallback(() => {
  //   setPlaying((prev) => !prev);
  // }, []);

  return (
    <ScrollView style={styles.root}>
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/imgs/ABOUTUS-BG.png')} resizeMode="cover" style={{flex: 1}}>

      <View style={styles.infoBox}>
        <Text style={styles.title}>Visit Us At</Text>
        <Pressable style={({pressed}) => pressed ? [styles.linkBox, styles.pressed] : styles.linkBox} onPress={ ()=>{ Linking.openURL('https://g00365411.wixsite.com/afoxestale')}}>
            <Text style={styles.link}>https://g00365411.wixsite.com/afoxestale</Text>
        </Pressable>
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>
          We are the team behind A Foxes Tale, a unique blend of gaming and productivity designed to redefine entertainment and personal development.
        </Text>
        <Text style={styles.text}>
          Our indie game immerses players in an enchanting world while educating them about forest fire dangers. Alongside the game, our Forest Explorer app offers engaging goal-tracking methods and social connectivity.
        </Text>
        <Text style={styles.text}>
          We're storytellers, educators, and advocates for positive change, committed to creating a platform where entertainment and self-improvement intertwine effortlessly. 
        </Text>
        <Text style={styles.text}>
         Join us on this transformative journey of growth and discovery. 
        </Text>
      </View>

      <Text style={[styles.title, {marginTop: '10%'}]}>Know More About Us</Text>
      <View style={styles.videoBox}>
        <YoutubePlayer
          height={300}
          play={playing}
          videoId={"mkHklo5jHts"}
          onChangeState={onStateChange}
          
        />
      </View>

      </ImageBackground>
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
    //alignItems: 'center',
    paddingVertical: '5%',
  },
  infoBox: {
    paddingHorizontal: '5%'
  },
  pressed: {
    opacity: 0.7
  },
  title: {
    color: '#D47B2B',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  linkBox: {
    paddingVertical: '4%',
    paddingHorizontal: '6%',
    marginTop: '3%',
    borderRadius: 25,
    backgroundColor :'white',
    elevation: 2, //android only property
    shadowColor: 'black', //ios only
    shadowOffset: {width: 2 ,height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2
  },
  link: {
    color: '#4A8C72',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textBox: {
    marginHorizontal: '5%',
    marginTop: '10%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: '3%',
    borderRadius: 25,
    textAlign: 'center'
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10
  },
  videoBox : {
    marginVertical: '10%',
    marginHorizontal: '5%',
    elevation: 2, //android only property
    shadowColor: 'black', //ios only
    shadowOffset: {width: 2 ,height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2
  }
})