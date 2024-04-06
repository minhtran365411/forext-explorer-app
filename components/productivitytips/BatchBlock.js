import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

export default function BatchBlock() {
  return (
    <ScrollView style={styles.root}>
    <View style={styles.container}>

    
    <View style={styles.block}>
      <Text style={styles.title}>Batching:</Text>
      <Text style={styles.subheading}>
        Batching involves grouping similar tasks together and completing them during dedicated blocks of time.
      </Text>
      <Text style={styles.desc}>
        Instead of switching between different types of tasks frequently, batching allows individuals to focus on one type of activity at a time, which can reduce cognitive load and increase productivity. For example, you might designate specific times of the day to respond to emails, make phone calls, or complete administrative tasks. By batching similar tasks together, you can minimize distractions and work more efficiently.
      </Text>
    </View>

    <View style={styles.block}>
      <Text style={styles.title}>Time Blocking:</Text>
      <Text style={styles.subheading}>
        Time blocking involves dividing your day into distinct blocks of time dedicated to specific tasks or activities. 
      </Text>
      <Text style={styles.desc}>
        Each block of time is assigned to a particular task, project, or category of activities, allowing you to focus solely on that task during the designated time period. Time blocking helps individuals prioritize their most important tasks and ensures that they allocate sufficient time to complete them. It also helps create a structured schedule and encourages better time management. For example, you might block off two hours in the morning for focused work on a project, followed by an hour for meetings, and then another block of time for administrative tasks.
      </Text>
    </View>

    <View style={styles.block}>
    <Text style={styles.title}>Combining Batching & Blocking:</Text>
      <Text>
      Both batching and blocking can be effective productivity systems on their own, but they can also be combined for even greater efficiency. For example, you might use batching to group similar tasks together (e.g., responding to emails) and then use time blocking to allocate specific blocks of time for each batch of tasks throughout your day. By incorporating these techniques into your workflow, you can optimize your time management, increase your productivity, and reduce distractions.
      </Text>
    </View>

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
      paddingVertical: '10%'
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D47B2B'
  },
  subheading: {
    fontSize: 16,
    fontWeight: 'bold',
  }

})
