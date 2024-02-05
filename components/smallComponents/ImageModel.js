import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

function ImageModal(props) {

    const [modalVisible, setModalVisible] = useState(false);

    function deletePost() {
      props.deletePost(props.data.id)
    }

    return (
    <View style={styles.rootContainer}>
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>

        <View style={styles.centeredView}>

          <View style={styles.modalView}>
            <Pressable
              style={styles.closeModal}
              onPress={() => setModalVisible(!modalVisible)}>
              <MaterialCommunityIcons  name="window-close" color={'#b60000'} size={30} />
            </Pressable>

            <Image 
                source={{uri: props.data.downloadURL}}
                style={{height: 400, width: 400}}
                resizeMode='cover'
            />
            
            <View style={styles.captionBox}>

              <View style={{flex:1}}>
              <Text style={styles.captionText}>{props.data.caption}</Text>
              <Text style={styles.creationText}>Created: {props.data.creation.toDate().toISOString().substring(0,10)}</Text>
              </View>

              <View style={{flex:1}}>
                <Pressable
                style={styles.closeModal}
                onPress={deletePost}>
                <MaterialCommunityIcons  name="trash-can-outline" color={'#b60000'} size={30} />
                </Pressable>
              </View>

            </View>
            

          </View>

        </View>

        

      </Modal>
    </View>
    
    {/* Print out image on list */}
    <View style={styles.containerImage}>
        <Pressable
            onPress={() => setModalVisible(true)}>
            <Image 
                source={{uri: props.data.downloadURL}}
                style={styles.image}
            />
        </Pressable>
    </View>

    </View>
    )
}

export default ImageModal;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      image: {
        flex: 1,
        aspectRatio: 1/1
      },
      containerImage: {
        flex: 1/3,
        marginHorizontal: 2
      },
      closeModal: {
        alignSelf: 'flex-end'
      },
      captionBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
      },
      captionText: {
        alignSelf: 'flex-start',
        fontWeight: 'bold',
      },
      creationText: {
        alignSelf: 'flex-start',
        fontStyle: 'italic',
        fontSize: 12
      }
})