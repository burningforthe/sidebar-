//https://share.thecoder.live/show/revenue-calculated-die/

import React, { useState, useRef, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { width, height } from '../config/layout';
import * as Device from 'expo-device';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import * as TopicActions from '../actions/Topic.actions';
import * as Notifications from 'expo-notifications';

const item = {
  "id": "2bdc42fa-6a9f-4b30-a7e3-e712f4415b10",
  "terafac_logo": "https://the-coder.s3.ap-south-1.amazonaws.com/terafac-images/Terafac-logo.png",
  "task_progress_bar": "https://the-coder.s3.ap-south-1.amazonaws.com/terafac-images/TerafacTaskProgressBar.png",
  "user_icon": "https://the-coder.s3.ap-south-1.amazonaws.com/terafac-images/UserIcon.png"
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const ProfileScreen = (props) => {

  const [selectedValue, setSelectedValue] = useState("java");

  const [expoPushToken, setExpoPushToken] = useState('')
  // const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();

  const taskButton = (button_name) => {
    // console.log(`You pressed ${button_name} button`)
  }

  const topicData = useSelector((state) => state.topic.topic_data)

  const dispatch = useDispatch()

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("registerForPushNotificationsAsync() ",token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }

  const pushNotification = async () => {
    console.log("pushNotification initialised", expoPushToken)
    try {
      const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // body: '{\n  "to": "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]",\n  "title":"hello",\n  "body": "world"\n}',
        body: JSON.stringify({
          'to': expoPushToken,
          'title': 'Terafac Technologies',
          'body': 'This is your first notification'
        })
      });

      const json = await response.json();

      if ("status" in response && response.status < 400 ) {
        console.log("apiResponse", await json)
      } else {
      }
    } catch (e) {
      console.log(e.message)
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  }, [])

  return (
    <View style={styles.tft_family} showsVerticalScrollIndicator={false}>
      <Image
        style={styles.terafac_logo}
        source={{ uri: item.terafac_logo }}
        resizeMode="contain"
      />
      <View style={styles.profile_view}>
        <View style={styles.name_view}>
          <TouchableOpacity style={styles.name_btn}>
            <Text style={{ color: 'white' }}>NAME</Text>
          </TouchableOpacity>
          <View style={styles.name_box}>
            <Text style={{ fontSize: 14 }}>{topicData.first_name} {topicData.last_name}</Text>
          </View>
          <Image resizeMode="contain" style={{ width: '15%', height: '7%' }} source={{ uri: item.user_icon }} />
        </View>
        <View style={styles.email_view}>
          <TouchableOpacity style={styles.name_btn}>
            <Text style={{ color: 'white' }}>EMAIL ID</Text>
          </TouchableOpacity>
          <View style={styles.name_box}>
            <Text style={{ fontSize: 11 }}>{topicData.email}</Text>
          </View>
          <TouchableOpacity onPress={() => props.navigation.navigate('EditProfileScreen')}>
            <View style={styles.edit_btn}>
              <Text style={{ fontSize: 12 }}>Edit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {
        topicData?.topic_list?.map((item) =>
          <>
            <View key={item.id} style={styles.learning_content}>
              <View key={item.id}  style={styles.learning_title_view}>
                <Text style={styles.learning_title}>{item.topic}</Text>
              </View>
              <View key={topicData} style={styles.learning_percent_view}>
                <View key={topicData}  style={[styles.percent_bar_view, { width: `${item['progress']}%`, backgroundColor: '#85DDF2', }]}>
                  <Text style={styles.learning_percent}></Text>
                </View>
                <View  style={[styles.absolute_bar_view]}>
                  <Text style={styles.learning_percent}>{item['progress']}%</Text>
                </View>
              </View>
            </View>
            {
              item.task_list.map((value) => (
                <View key ={value.id} style={styles.task_status_view}>
                  <View key={value.id} style={styles.task_count}>
                    <Text>{value.task}</Text>
                  </View>
                  <View style={styles.status}>
                    <Text>{value.status}</Text>
                  </View>
                </View>
              ))
            }
          </>
        )
      }
      <View style={styles.button_view}>
        <TouchableOpacity onPress={() => dispatch(TopicActions.logout())} style={styles.logout_btn}>
          <Text>Log Out</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={async () => {
        await pushNotification()
      }}>
        <Text>Get Notification</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProfileScreen;

const styles = StyleSheet.create({
  tft_family: {
    display: 'flex',
    alignItems: 'center'
  },
  terafac_logo: {
    width: '18%',
    height: '16%',
    alignSelf: 'flex-start',
    marginTop: height * 0.020,
    marginLeft: width * 0.03
  },
  name_view: {
    display: 'flex',
    flexDirection: 'row',
    width: '85%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: '0.5%'
  },
  profile_view: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '3%'
  },
  name_btn: {
    backgroundColor: '#9C9C9C',
    paddingVertical: '1.5%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%'
  },
  name_box: {
    width: '45%'
  },
  email_view: {
    display: 'flex',
    flexDirection: 'row',
    width: '85%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  edit_btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#19BEE7',
    width: width * 0.18,
    paddingVertical: '0.8%',
    marginTop: 2,
    borderRadius: 8
  },
  learning_content: {
    display: 'flex',
    flexDirection: 'row',
    width: '85%',
    justifyContent: 'space-between',
    marginTop: '6%'
  },
  learning_title_view: {
    borderWidth: 1,
    borderColor: '#C6C6C6',
    width: '30%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 5
  },
  learning_percent_view: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#C6C6C6',
    display: 'flex',

    paddingHorizontal: 5,
    paddingVertical: 8
  },
  learning_title: {
    color: '#19BEE7'
  },
  learning_percent: {

  },
  percent_bar_view: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: 50 * width / 100
  },
  task_status_view: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: '65%',
    alignItems: 'center',
    marginTop: '1%'
  },
  task_count: {
    borderColor: "#D4D4D4",
    borderWidth: 1,
    width: '45%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: '1%',
    paddingHorizontal: '2%'
  },
  status: {
    borderColor: "#D4D4D4",
    borderWidth: 1,
    width: '40%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '1%'
  },
  button_view: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    width: '100%',
    padding: '2.6%',
    marginLeft: 10
  },
  logout_btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#19BEE7',
    width: '40%',
    paddingVertical: '1.5%',
    borderRadius: 8
  },
  absolute_bar_view: {
    position: 'absolute',
    width: 50 * width / 100,
    top: 8,
    left: 10
  }
});