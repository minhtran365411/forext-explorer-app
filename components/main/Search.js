import React, { useState } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity, ImageBackground, StyleSheet, SafeAreaView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import firebase from 'firebase/compat/app';
require('firebase/firestore')

export default function SearchScreen(props) {
    const [users, setUsers] = useState([])

    const fetchUsers = (search) => {
        firebase.firestore()
        .collection('users')
        .where('name', ">=", search)
        .get()
        .then((snapshot) => {
            //map seperated documents into little docs
            let users = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return {id, ...data}
            });
            setUsers(users)
        })
    }

  return (
    <LinearGradient style={styles.rootView}
      colors={['#DFBC86', '#ffffff']}
    >
      <ImageBackground 
        source={require('../../assets/imgs/forest.png')} 
        resizeMode='cover'
        style={styles.rootView}
        imageStyle={{opacity: 0.2}}
      >

        <SafeAreaView style={styles.container}>

        <View >
            <TextInput style={styles.searchBox} placeholder='Search for a user' onChangeText={(search) => fetchUsers(search)} />
            <FlatList 
                numColumns={1}
                horizontal={false}
                data={users}
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.userSearchResult}
                        onPress={() => props.navigation.navigate('Profile', {uid: item.id})}
                    >   
                        <View style={styles.content}>
                        <Text>{item.name}</Text>
                        <MaterialCommunityIcons  name="arrow-right-thick" color={'#4A8C72'} size={30} />
                        </View>
                        
                    </TouchableOpacity>
                )}
            />
        </View>
    </SafeAreaView>
    </ImageBackground>
      </LinearGradient>

  )
}


const styles = StyleSheet.create({
    rootView: {
      flex:1
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    container: {
        marginVertical: '15%',
        marginHorizontal: '5%'
    },
    searchBox: {
        marginBottom: '6%',
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 15,
        elevation: 2,
        shadowColor: '#311802', //ios only
        shadowOffset: {width: 2 ,height: 3},
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    userSearchResult: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: '4%',
        borderRadius:15,
        elevation: 2,
        shadowColor: '#f5f2cd', //ios only
        shadowOffset: {width: 2 ,height: 3},
        shadowOpacity: 0.3,
        shadowRadius: 2,
    }

})