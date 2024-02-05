import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

function FriendDailyStreakComponent(props) {
    return (
      <View style={styles.eachContainer}>
  
      <View style={styles.friendStreakContainer}>
        <Text style={styles.streak}>{props.data.dailyStreak}</Text>
        <Text style={styles.streakSmallText}>streaks</Text>
      </View>
  
      <Text style={styles.friendStreakName}>{props.data.name}</Text>
  
      </View>
  
    )
  }

  export default FriendDailyStreakComponent;

  const styles = StyleSheet.create({
    eachContainer: {
        //flex: 1,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal: 5
      },
      friendStreakContainer: {
        borderRadius: 45,
        borderColor: '#4A8C72',
        borderWidth: 4,
        height: 80,
        width:80,
        backgroundColor: '#fffdf0',
        elevation: 2, //android only property
            shadowColor: '#4A8C72', //ios only
            shadowOffset: {width: 2 ,height: 2},
            shadowOpacity: 0.3,
            shadowRadius: 2,
        justifyContent: 'center',
        alignItems: 'center'
      },
      friendStreakName: {
        fontSize: 12,
        marginTop: 5,
        color: '#4A8C72',
        fontWeight: 'bold'
      },
      streak: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#D47B2B'
      },
      streakSmallText: {
        fontSize: 11,
        color: '#D47B2B',
        fontWeight: 'bold'
      }
  })

