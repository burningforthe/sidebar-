// Old https://share.thecoder.live/show/pakistan-bubble-lasting/
// New https://share.thecoder.live/show/mechanical-sheep-modern/
//Also https://share.thecoder.live/show/pakistan-pattern-psychological/

import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import * as TopicActions from '../actions/Topic.actions';

const { width, height } = Dimensions.get("window");

const item = {
  "id": "98aec405-bc79-46b4-8a7c-9c479480e037",
  "terafac_logo": "https://the-coder.s3.ap-south-1.amazonaws.com/terafac-images/Terafac-logo.png",
  "task_mark": "https://the-coder.s3.ap-south-1.amazonaws.com/terafac-images/TerafacTaskMark.png",
  "task_title": "A PLC is a Programmable Logic Controller used to control and...",
  "about_task": "A PLC comes in various forms. \n But basically, this is what it actually is:",
  "input": "Inputs",
  "plc_logic": "https://the-coder.s3.ap-south-1.amazonaws.com/terafac-images/PlcLogic.png",
  "output": "Outputs",
  "progress_level": "https://the-coder.s3.ap-south-1.amazonaws.com/terafac-images/ProgressLevel.png"
}


const TaskListScreen = (props) => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(TopicActions.getTopicList())
  }, [])

  const topicId = props.route.params.topicId

  const userDetail = useSelector((state) => state.topic.topic_data)

  const taskList = userDetail.topic_list.filter((item) => {
    if (item.id == topicId) {
      return true
    }
  })

  // console.log("TaskListScreen taskList", taskList)

  const getInProgressBlueVerticalBar = () => (<Image style={styles.tinyLogo} source={{ uri: 'https://attentionverse-data.s3.ap-south-1.amazonaws.com/vertical_blue_bar.png', }} />);
  const getDoneBlackVerticalBar = () => (<Image style={styles.tinyLogo} source={{ uri: 'https://attentionverse-data.s3.ap-south-1.amazonaws.com/vertical_black_bar.png', }} />);
  const getNotDoneGrayVerticalBar = () => (<Image style={styles.tinyLogo} source={{ uri: 'https://attentionverse-data.s3.ap-south-1.amazonaws.com/vertical_gray_bar.png', }} />);

  const getImage = (status) => {
    if (status.trim().toLowerCase() === "in progress") {
      return getInProgressBlueVerticalBar();
    } else if (status.trim().toLowerCase() === "done") {
      return getDoneBlackVerticalBar();
    } else if (status.trim().toLowerCase() === "not done") {
      return getNotDoneGrayVerticalBar();
    }
  }

  return (
    <View style={styles.feed}>
      <View style={styles.logo_view}>
        <Image
          style={styles.terafac_logo}
          source={{ uri: item.terafac_logo }}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.topic}>Topic - {taskList[0].topic}</Text>
      <Text style={styles.task_title}>{item.task_title}</Text>
      <View style={styles.task_status}>
        {/* <Text>{JSON.stringify(userDetail.topic_list[0].task_list)}</Text> */}
        {/* <Image resizeMode="contain" style={styles.progress_bar} source={{ uri: "https://the-coder.s3.ap-south-1.amazonaws.com/terafac-images/ThirdProgressBar.png" }} /> */}
        <View style={styles.task_box}>
          {
            taskList[0].task_list.map((item) => (
              <View key={item.id} style={styles.taskView}>
                {getImage(item.status)}
                <Text
                  onPress={() => props.navigation.navigate("TaskScreen", {
                    topicId: topicId,
                    taskId: item.id,
                    status: item.status
                  })}
                  style={styles.completed_task}
                >
                  {item.task}
                </Text>
              </View>
            ))
          }
        </View>
      </View>
    </View>
  )
}

export default TaskListScreen;

const styles = StyleSheet.create({
  feed: {
    flex: 1,
  },
  logo_view: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height*0.04,
  },
  terafac_logo: {
    width: width * 0.18,
    height: height * 0.08,
    alignSelf: 'flex-start',
    marginLeft: width * 0.02
  },
  task_title: {
    color: 'black',
    fontSize: 13,
    fontWeight: '400',
    alignSelf: 'center',
    marginTop: '5%',
    width: '90%'
  },
  topic: {
    alignSelf: 'center',
    fontSize: 22,
  },
  progress_bar: {
    height: '100%',
    width: '10%',
  },
  task_status: {
    marginTop: '8%',
    paddingHorizontal: '8%',
    height: '50%',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  task_box: {
    display: 'flex'
  },
  notStarted: {
    fontWeight: '500',
    color: '#C6C6C6',
    fontSize: 18
  },
  inProgress: {
    fontWeight: '500',
    color: '#19BEE7',
    fontSize: 18
  },
  completed_task: {
    fontWeight: '500',
    color: 'black',
    fontSize: 18,
    marginLeft: 10
  },
  tinyLogo: {
    width: 12,
    height: 48
  },
  taskView: {
    flexDirection: 'row',
    width: width * 0.4,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  }
});