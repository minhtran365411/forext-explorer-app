import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import React from 'react'

export default function ProductivityItem({title, description, onPressHandler, url}) {

  return (
    <Pressable style={styles.itemBtn} onPress={onPressHandler}>
        <View style={styles.container}>
            <Image style={styles.image} source={url} />

            <View style={styles.infoBox}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
            
        </View>
      
    </Pressable>
  )
}

const styles = StyleSheet.create({
    itemBtn:{
        width: '90%',
        backgroundColor: 'white',
        marginBottom: '5%',
        borderRadius: 15,
        elevation: 2, //android only property
          shadowColor: '#823324', //ios only
          shadowOffset: {width: 2 ,height: 2},
          shadowOpacity: 0.2,
          shadowRadius: 5
      },
      pressed: {
        opacity: 0.75
      },
      container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
       
      },
      image: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15
      },
      infoBox: {
        marginLeft: '5%'
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#D47B2B'
      },
      description: {
        fontStyle: 'italic',
        color: '#7c7c7c'
      }
  })