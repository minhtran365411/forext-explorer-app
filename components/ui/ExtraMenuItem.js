import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

export default function ExtraMenuItem({navigation, link, pageName}) {
  return (
    <Pressable onPress={() => navigation.navigate(link)}
    style={({pressed}) => pressed ? [styles.itemContainer, styles.pressed] : styles.itemContainer}
    >
        <View >
            <Text style={styles.text}>{pageName}</Text>
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75
    },
    itemContainer: {
        padding: 10,
        backgroundColor: '#44AE53',
        borderRadius: 25,
        width: '80%',
        marginVertical: 10,
        alignItems: 'center',
        elevation: 2, //android only property
        shadowColor: '#5d513c', //ios only
        shadowOffset: {width: 2 ,height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 5
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: 'white'
    }

})

