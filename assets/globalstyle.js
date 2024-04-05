import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    //global
    brandTitle: {
        color: '#23671E',
        fontSize: 48,
    },
    headerTitle: {
        color: '#BA3D1F',
        fontSize: 50,
        // fontFamily: 'Eglantine',
        marginTop: 10,
    },
    headerContainer: {
        alignItems: 'center',
        marginTop: 70
    },
    formContainer: {
        alignItems: 'center',
        marginTop: 40
    },
    inputBox: {
        backgroundColor: '#fff',
        width: 300,
        height: 50,
        borderRadius:40,
        paddingLeft:25,
        margin: 10,
        //inset shadow
        borderColor: 'white',
        borderWidth: 10,
        // overflow: 'hidden',
        shadowColor: '#BA3D1F',
        shadowRadius: 2,
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 2,
            height: 2,
        },
    },
    signUpBtn: {
        backgroundColor: '#BA3D1F',
        width: 300,
        height: 50,
        borderRadius:40,
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
        //inset shadow
        shadowColor: 'black',
        shadowRadius: 2,
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 2,
            height: 2,
        },
    },
    messageText: {
        marginTop: 30,
        textDecorationLine: 'underline'
    },
    errorMsg: {
        fontSize: 12,
        fontStyle: 'italic'
    }
})

export default styles;