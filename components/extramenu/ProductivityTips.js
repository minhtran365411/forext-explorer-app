import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import ProductivityItem from '../ui/ProductivityItem'

export default function ProductivityTips({navigation}) {
  return (
    <View style={styles.root}>
      <ProductivityItem onPressHandler={() => navigation.navigate("SmartGoal")} title="SMART Goal" description="Technique to create achievable goals." url={require("../../assets/imgs/productivitytips1.png")} />
      <ProductivityItem onPressHandler={() => navigation.navigate("Matrix")} title="Eisenhower Matrix" description="Technique to optimise productivity." url={require("../../assets/imgs/productivitytips2.png")} />
      <ProductivityItem onPressHandler={() => navigation.navigate("BatchBlock")} title="Batching & Blocking" description="Technique to optimise productivity." url={require("../../assets/imgs/productivitytips3.png")} />
      <ProductivityItem onPressHandler={() => navigation.navigate("Procrastination")} title="Stop Procrastination" description="Ways to anti-procrastination." url={require("../../assets/imgs/productivitytips4.png")} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
      backgroundColor: '#fff9f0',
      flex: 1,
      alignItems: 'center',
      paddingVertical: '10%'
  },
})