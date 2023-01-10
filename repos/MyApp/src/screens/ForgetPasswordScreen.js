import React, { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity, Text, ScrollView, StyleSheet, View, Image } from 'react-native';
import { width, height } from '../config/layout';
import {
    useDispatch,
    useSelector
} from 'react-redux';
import * as TopicActions from '../actions/Topic.actions';
import { useNavigation } from '@react-navigation/native';


const ForgetPassword = (props) => {

    const [email, setEmail] = useState('')

    const dispatch = useDispatch();

    useEffect(() => {
    }, [])

    const handleEmailChange = text => setEmail(text)

    const navigation = useNavigation()

    const item = {
        "id": "d2964073-4c2e-4a6d-9dee-e59e83dbd99d",
        "heading": "Forget Password",
        "email_label": "Email Id",
        "about_input": "We will use your email to find your account and send you a reset password link.",
        "terafac_logo": "https://the-coder.s3.ap-south-1.amazonaws.com/terafac-images/Terafac-logo.png",
    }

    const navigateToLogin = () => {
        alert("Reset password link has been sent to your email.")
        navigation.navigate('LoginScreen')
    }

    return (
        <View style={styles.forget_password}>
            <View style={styles.logo_view}>
                <Image
                    style={styles.terafac_logo}
                    source={{ uri: item.terafac_logo }}
                    resizeMode="contain"
                />
            </View>
            <Text style={styles.heading}>{item.heading}</Text>
            <View style={styles.input_box}>
                <View style={styles.label_box}>
                    <Text style={styles.email_label}>{item.email_label}</Text>
                </View>
                <TextInput style={styles.your_email} placeholderTextColor="#9C9C9C" placeholder={'Email Id'} value={email} onChangeText={handleEmailChange} />
            </View>
            <Text style={styles.about_input}>{item.about_input}</Text>
            <TouchableOpacity style={styles.reset_password} onPress={() => {
                dispatch(TopicActions.resetPassword(email)).then(result => navigateToLogin())
            }}>
                <Text style={{ fontSize: 16 }}>Reset Password</Text>
            </TouchableOpacity>
        </View >
    )
}

export default ForgetPassword;

const styles = StyleSheet.create({
    heading: {
        color: 'black',
        fontSize: 20,
        fontWeight: '400',
        alignSelf: 'center'
    },
    email_label: {
        color: 'black',
        fontSize: 15,
        fontWeight: '400',
        marginLeft: width * 0.07,
    },
    about_input: {
        fontSize: 12,
        fontWeight: '300',
        marginTop: height * 0.02,
        width: width * 0.85,
        alignSelf: 'center'
    },
    reset_password: {
        flex: 1,
        padding: 10,
        margin: 5,
        textAlign: 'center',
        backgroundColor: '#1ACDA5',
        color: 'white'
    },
    logo_view: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    terafac_logo: {
        width: width * 0.2,
        height: width * 0.18,
        margin: width * 0.05
    },
    your_email: {
        fontSize: 14,
        fontWeight: '400',
        paddingHorizontal: 4,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: '#C6C6C6',
        width: width * 0.85,
        marginVertical: 3,
    },
    input_box: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: height * 0.1,
        width: width
    },
    label_box: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: height,
        height: height * 0.06
    },
    reset_password: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#19BEE7',
        width: width * 0.6,
        paddingVertical: height * 0.02,
        marginTop: height * 0.04,
        borderRadius: 8,
        alignSelf: 'center'
    }
});