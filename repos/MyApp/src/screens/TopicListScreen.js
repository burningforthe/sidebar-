// old 
// new https://share.thecoder.live/show/delete-victim-stakes/
// latest https://share.thecoder.live/show/hip-backed-chef/

import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { width, height } from '../config/layout';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import * as TopicActions from '../actions/Topic.actions'; 

const local_item = {
  "id": "237ce4e9-bc96-4a15-90a9-cf5d8580a453",
  "name": "Anubhi Khandelwal!",
  "next": "237adsfa-bc96-4a15-90a9-cf5d8580a453",
  "topic_list": [
    {
      "topic": "PLC",
      "progress": 50,
      "id": "qrqwerqe-bc96-4a15-90a9-cf5d8580a453"
    },
    {
      "topic": "HMI",
      "progress": 30,
      "id": "qrqwerqe-bc96-4a15-90a9-cf5d8580a453"
    },
    {
      "topic": "Networking",
      "progress": 15,
      "id": "qrqwerqe-bc96-4a15-90a9-cf5d8580a453"
    },
    {
      "topic": "IOT",
      "progress": 10,
      "id": "qrqwerqe-bc96-4a15-90a9-cf5d8580a453"
    },
    {
      "topic": "AR",
      "progress": 0,
      "id": "qrqwerqe-bc96-4a15-90a9-cf5d8580a453"
    },
    {
      "topic": "Digital Twin",
      "progress": 0,
      "id": "qrqwerqe-bc96-4a15-90a9-cf5d8580a453"
    },
    {
      "topic": "Motor and Drives",
      "progress": 0,
      "id": "qrqwerqe-bc96-4a15-90a9-cf5d8580a453"
    },
    {
      "topic": "Wiring",
      "progress": 0,
      "id": "qrqwerqe-bc96-4a15-90a9-cf5d8580a453"
    },
    {
      "topic": "3D Printing",
      "progress": 0,
      "id": "qrqwerqe-bc96-4a15-90a9-cf5d8580a453"
    }
  ]
}

const local = {
  "terafac_logo": "https://the-coder.s3.ap-south-1.amazonaws.com/terafac-images/Terafac-logo.png",
  "user_icon": "https://the-coder.s3.ap-south-1.amazonaws.com/terafac-images/UserIcon.png",
  "search_icon": "https://the-coder.s3.ap-south-1.amazonaws.com/terafac-images/Search.png",
  "setting_icon": "https://the-coder.s3.ap-south-1.amazonaws.com/terafac-images/Setting.png",
  "close_icon": "https://the-coder.s3.ap-south-1.amazonaws.com/terafac-images/Cross.png"
}


function TopicListScreen(props) {

  const userDetail = useSelector((state) => state.topic.topic_data)

  // const [selectedValue, setSelectedValue] = useState("java");
  const [item, setItem] = useState(local_item)
  const [data, setData] = useState(local_item)
  const [icon, setIcon] = useState(local['search_icon'])
  const [inputValue, setValue] = useState('')
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [updatedData, setUpdatedData] = useState(userDetail?.topic_list)

  const dispatch = useDispatch()

  const navigate = (screen) => {
    props.navigation.navigate(screen)
  }
  
  useEffect(() => {
    getItems();
    dispatch(TopicActions.getTopicList())
  }, []);

  const getItems = async () => {
    try {
      const response = await fetch('https://api.thecoder.live/app_197/stories/');
      const json = await response.json();
      //    setItem(json);
      //    setData(json);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  const onPress = (item) => {
    //some function to set id in the reducer 
    props.navigation.navigate("TaskList")
  }

  const searchFunction = (text) => {
    const updateData = userDetail.topic_list.filter((item) => {
      const item_data = `${item.topic.toUpperCase()})`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    // this.setState({ data: updatedData, searchValue: text });
    setUpdatedData(updateData)
  };

  const onChangeText = (text) => {
    setValue(text)
    if (text) {
      setIcon(local['close_icon'])
      //return setData({ ...item, topic_list: item['topic_list'].filter(item => (item['topic'].search(text.toUpperCase()) >= 0)) })
    }
    else {
      setIcon(local['search_icon'])
      //return setData(item)
    }
    searchFunction(text);
  }

  const onClick = () => {
    setIcon(local['search_icon'])
    onChangeText('')
  }

  return (
    <ScrollView style={{ backgroundColor: 'white' }} showsVerticalScrollIndicator={false}>
      <View style={styles.tft_family} >
        <View style={styles.topView}>
          <TouchableOpacity style={styles.terafac_logo} onPress={() => navigate("HomeScreen")}>
            <Image
              style={styles.terafac_logo}
              source={{ uri: local.terafac_logo }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.tft_family_btn} >
            <Text style={{ fontSize: 16, fontWeight: '500', color: 'white' }}>Welcome to the TFT family.</Text>
            <TouchableOpacity onPress={() => navigate("ProfileScreen")}>
              <Image resizeMode="contain" style={styles.user_icon} source={{ uri: local.user_icon }} />
            </TouchableOpacity>
          </View>
        </View>
        {/* <Text style={styles.welcome_message}>Welcome {data['name']}</Text> */}
        <Text style={styles.welcome_message}>Welcome {userDetail.first_name} {userDetail.last_name}</Text>
        <View style={styles.learn_input_view}>
          <TextInput style={styles.learn_input} placeholderTextColor="#9C9C9C" placeholder={'What would you like to learn today?'} value={inputValue} onChangeText={onChangeText} />
          <TouchableOpacity style={styles.search_icon_view}onPress={onClick}>
          <Image resizeMode="contain" style={styles.search_icon} source={{uri: icon}} />
        </TouchableOpacity>
        </View>
        {
          updatedData?.map((item) =>
            <View key={item.id} style={styles.learning_content}>
              <TouchableOpacity style={styles.learning_title_view} onPress={() => props.navigation.navigate("TaskListScreen", {
                topicId: item.id
              })}>
                <Text style={styles.learning_title}>{item['topic']}</Text>
              </TouchableOpacity>
              <View style={styles.learning_percent_view}>
                <View style={[styles.percent_bar_view, { width: `${item['progress']}%`, backgroundColor: '#85DDF2', }]}>
                  <Text style={styles.learning_percent}></Text>
                </View>
                <View style={[styles.absolute_bar_view]}>
                  <Text style={styles.learning_percent}>{item['progress']}%</Text>
                </View>
              </View>
            </View>
          )
        }
        <View style={styles.setting_icon}>
          <Image resizeMode="contain" source={{ uri: item.setting_icon }} style={{ width: 45, height: 45 }} />
        </View>
      </View>
    </ScrollView>
  )
}

export default TopicListScreen;

const styles = StyleSheet.create({
  tft_family: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    width: width
  },
  terafac_logo: {
    width: 16 * width / 100,
    height: 13 * height / 100,
  },
  tft_family_btn: {
    backgroundColor: '#3D3D3D',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4 * width / 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  welcome_message: {
    marginTop: 15 * width / 100,
    fontSize: 16
  },
  topView: {
    flex: 1,
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  learn_input: {
    fontSize: 16,
    fontWeight: '400',
    paddingHorizontal: 4,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#C6C6C6',
    width: 80 * width / 100,
    marginVertical: 3
  },
  learn_input_view: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 7 * height / 100
  },
  user_icon: {
    width: 30,
    height: 36,
    borderWidth: 1,
    marginLeft: 10
  },
  search_icon: {
    width: 20,
    height: 26,
    marginLeft: 4
  },
  search_icon_view: {
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#C6C6C6',
    marginVertical: 3,
    marginLeft: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  learning_content: {
    display: 'flex',
    flexDirection: 'row',
    width: 90 * width / 100,
    justifyContent: 'center',
    marginTop: 1 * height / 100,
  },
  learning_title_view: {
    borderWidth: 1,
    borderColor: '#C6C6C6',
    flex: 1,
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
    color: '#19BEE7',
    fontSize: 16
  },
  learning_percent: {

  },
  percent_bar_view: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: 50 * width / 100
  },
  absolute_bar_view: {
    position: 'absolute',
    width: 50 * width / 100,
    top: 8,
    left: 10
  },
  action_view: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10 * height / 100
  },
  action_btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#19BEE7',
    width: 90 * width / 100,
    paddingVertical: 1.5 * height / 100,
    marginTop: 0.8 * height / 100,
    paddingHorizontal: 3 * width / 100
  },
  setting_icon: {
    flex: 1,
    width: 94 * width / 100,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: 6
  }
});