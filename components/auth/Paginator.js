import { View, Animated, useWindowDimensions, StyleSheet } from 'react-native'
import React from 'react'

export default function Paginator({data, scrollX}) {

    const { width } = useWindowDimensions();

  return (
    <View style={{flexDirection: 'row', height: 64}}>
      {data.map((_, i) => {

        const inputRange = [(i - 1) * width, i * width, (i+1) * width];

        const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: 'clamp',
        });
        //opacity here dims the page indicator that are not currentlyy viewed
        const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1 , 0.3],
            extrapolate: 'clamp',
        });

        return <Animated.View style={[styles.dot, {width:dotWidth, opacity}]} key={i.toString()} /> //key is important because we will loop over this
      })}
    </View>
  )
}

const styles = StyleSheet.create({
    dot: {
        height:10,
        borderRadius: 5,
        backgroundColor: '#D47B2B',
        marginHorizontal: 8,
    }
})