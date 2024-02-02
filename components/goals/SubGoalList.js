import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useState } from 'react'

function SubGoalList (props) {

   
    const [done, setDone]  = useState(props.data.done);

    function changeStatusHandler() {
        if (props.data.done == false) {
            setDone(true)
        } else {
            setDone(false)
        }
        props.toggleDoneHandler(props.data.subGoal)
    }
    

    //console.log(props.data)
    return (
        <View style={styles.taskTab}>
        <View style={styles.taskBtn}>
          <View>
            <Text style={done == true ? [styles.text, styles.crossedText] : styles.text}>
            {/* //get subGoals */}
                {props.data.subGoal} 
            </Text>
          </View>
          
          {done ==  false ?
          <TouchableOpacity onPress={changeStatusHandler} >
                <MaterialCommunityIcons  name="checkbox-blank-circle-outline" color={'#4A8C72'} size={30} />
          </TouchableOpacity>
            
            :
            <TouchableOpacity onPress={changeStatusHandler} >
                <MaterialCommunityIcons  name="checkbox-marked-circle-outline" color={'#4A8C72'} size={30} />
            </TouchableOpacity>
            }
          
          </View>
      </View>
    )
  
}

export default SubGoalList;

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
        elevation: 1, //android only property
          shadowColor: '#D47B2B', //ios only
          shadowOffset: {width: 1 ,height: 1},
          shadowOpacity: 0.2,
          shadowRadius: 2
      },
      pressed: {
        opacity: 0.75
      },
      text: {
        fontWeight: 'bold', 
        fontSize: 17, 
        color: '#4A8C72' 
      },
      crossedText: {
        textDecorationLine: 'line-through',
        color: '#546b62' 
      }
})