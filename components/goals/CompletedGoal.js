import { Text, StyleSheet, View, Pressable } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

function CompletedGoal (props) {
    
    return (
        <View style={styles.taskTab}>
        <Pressable style={({pressed}) => pressed ? [styles.pressed, styles.taskBtn] : styles.taskBtn}
        android_ripple={{color: '#88245b'}}
        onPress={() =>{}}
      >
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 17, textDecorationLine: 'line-through', color: 'gray' }}>{props.data.goal}</Text>
            <Text style={{fontSize: 13, fontStyle: 'italic'}}>Rewards:{props.data.reward}</Text>
          </View>
          <MaterialCommunityIcons  name="check-circle-outline" color={'#4A8C72'} size={30} />
        </Pressable>
      </View>
    )
  
}

export default CompletedGoal;

const styles = StyleSheet.create({
    taskTab:{
        marginHorizontal: '5%',
        marginVertical: 6,
      },
      taskBtn:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal:20,
        borderRadius: 15,
        elevation: 2, //android only property
          shadowColor: 'white', //ios only
          shadowOffset: {width: 2 ,height: 2},
          shadowOpacity: 0.5,
          shadowRadius: 5
      },
      pressed: {
        opacity: 0.75
      }
})