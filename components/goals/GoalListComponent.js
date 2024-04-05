import { Text, StyleSheet, View, Pressable } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

function GoalListComponent (props) {

  var endDate = props.data.userEndDate;
  var lastStampDate = props.data.lastStampDate;
  let daysLeft = ~~((endDate - lastStampDate) / 86400000);
  

    
    return (
        <View style={styles.taskTab}>
        <Pressable style={({pressed}) => pressed ? [styles.pressed, styles.taskBtn] : styles.taskBtn}
        android_ripple={{color: '#88245b'}}
        onPress={() => props.navigation.navigate("Your Progress", {goalData: props.data})}
      >
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 17, }}>{props.data.goal}</Text>
            <Text style={{fontSize: 13, fontStyle: 'italic'}}>Sub Goals: {props.data.subGoals.length} | Days Left: {daysLeft} days.</Text>
          </View>
          <MaterialCommunityIcons  name="arrow-right-thick" color={'#4A8C72'} size={30} />
        </Pressable>
      </View>
    )
  
}

export default GoalListComponent;

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