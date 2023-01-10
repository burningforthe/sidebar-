import React, { useState, useEffect } from 'react';
import { Image, TextInput, TouchableOpacity, ScrollView, StyleSheet, View, Text } from 'react-native';
import { width, height } from '../config/layout';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import * as TopicActions from '../actions/Topic.actions';

const item = {
  "id": "b9a5b522-7a40-41c5-9781-a69349fd68e1",
  "terafac_logo": "https://the-coder.s3.ap-south-1.amazonaws.com/terafac-images/Terafac-logo.png"
}

const EditProfileScreen = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(TopicActions.getTopicList())
  }, []);

  const topicData = useSelector((state) => state.topic.topic_data)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [university, setUniversity] = useState('')
  const [branch, setBranch] = useState('')
  const [year, setYear] = useState('')
  const [degree, setDegree] = useState('')

  const handleFirstName = text => setFirstName(text)
  const handleLastName = text => setLastName(text)
  const handleEmailChange = text => setEmail(text)
  const handleUniversityChange = text => setUniversity(text)
  const handleBranchChange = text => setBranch(text)
  const handleYearChange = text => setYear(text)
  const handleDegreeChange = text => setDegree(text)

  const callEditProfileAction = async () => {
    if (firstName != '' && lastName != '') {
      dispatch(TopicActions.editProfile(firstName, lastName, email, university, branch, year, degree, topicData.id))
    } else {
      alert("First name and Last name field is mandatory.")
    }
    
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.terafac_logo}
        source={{ uri: item.terafac_logo }}
        resizeMode="contain"
      />
      <View style={styles.input_box}>
        <View>
          <TextInput
            style={styles.first_name}
            placeholderTextColor="#9C9C9C"
            placeholder={'First Name'}
            onChangeText={handleFirstName}
          />
        </View>
        <TextInput
          style={styles.first_name}
          placeholderTextColor="#9C9C9C"
          placeholder={'Last Name'}
          onChangeText={handleLastName}
        />
        <TextInput
          style={styles.first_name}
          placeholderTextColor="#9C9C9C"
          placeholder={'Email Id'}
          onChangeText={handleEmailChange}
        />
        <TextInput
          style={styles.first_name}
          placeholderTextColor="#9C9C9C"
          placeholder={'University'}
          onChangeText={handleUniversityChange}
        />
        <TextInput
          style={styles.first_name}
          placeholderTextColor="#9C9C9C"
          placeholder={'Branch'}
          onChangeText={handleBranchChange}
        />
        <TextInput
          style={styles.first_name}
          placeholderTextColor="#9C9C9C"
          placeholder={'Year'}
          onChangeText={handleYearChange}
        />
        <TextInput
          style={styles.first_name}
          placeholderTextColor="#9C9C9C"
          placeholder={'Degree'}
          onChangeText={handleDegreeChange}
        />
      </View>
      <TouchableOpacity onPress={() => callEditProfileAction().then(result => alert('Edited Successfully'))}>
        <View style={styles.sign_up}>
          <Text style={{ fontSize: 16 }}>Next</Text>
        </View>
      </TouchableOpacity>
    </View >
  )
}

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  terafac_logo: {
    width: width * 0.18,
    height: width * 0.16,
    alignSelf: 'flex-start',
    marginTop: 2,
    marginLeft: 2
  },
  login: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#19BEE7',
    width: width * 0.6,
    paddingVertical: height * 0.028,
    marginTop: 2,
    borderRadius: 8
  },
  sign_up: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#19BEE7',
    width: width * 0.4,
    paddingVertical: height * 0.014,
    marginTop: height * 0.048,
    borderRadius: 8
  },
  input_box: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 0.84,
    marginTop: height * 0.03
  },
  first_name: {
    fontSize: 14,
    fontWeight: '400',
    paddingHorizontal: 4,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#C6C6C6',
    width: width * 0.75,
    marginVertical: 3
  },
  label_style: {
    fontSize: 20,
    marginRight: 10,
    fontWeight: '500'
  },
  suggestion: {
    textAlign: 'center',
    color: 'white',
    marginTop: height * 0.015,
  }
});