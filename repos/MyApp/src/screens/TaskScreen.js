// https://share.thecoder.live/show/busy-removing-proud/

import React, { useState, useEffect } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Dimensions, Modal, Button, ScrollView } from 'react-native';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import * as TopicActions from '../actions/Topic.actions';
import { useFocusEffect, useNavigation, useIsFocused } from '@react-navigation/native'

const { width, height } = Dimensions.get("window")

function TaskScreen(props) {
  const [item, setItem] = useState({
    "id": "d43e8fc4-9f85-4455-928c-f71bbceaab08",
    "tasks": [
      {
        "content": "A PLC is a Programmable Logic Controller used to control and monitor electro-mechanical processes.",
      },
      {
        "content": "https://the-coder.s3.ap-south-1.amazonaws.com/terafac-images/PLCMachine.png"
      }
    ],
    "info": "Did you know that the first PLC was invented in 1968 by Allen Bradley?",
    "next": "djkdfas-9f85-4455-928c-f71bbceaab08",
  });

  const local = {
    "terafac_logo": "https://the-coder.s3.ap-south-1.amazonaws.com/terafac-images/Terafac-logo.png",
    "progress_level": "https://the-coder.s3.ap-south-1.amazonaws.com/terafac-images/VerticalProgressBar1.png"
  }

  const [isLoading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [taskId, setTaskId] = useState(props.route.params.taskId)

  const dispatch = useDispatch()
  const id = props.route.params.id

  const getItems = async () => {
    try {
      const response = await fetch('https://api.thecoder.live/app_197/stories/' + props['id']);
      const json = await response.json();
      setItem(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const isFocused = useIsFocused();

  useEffect(() => {
    getItems();
    // getHomeFeed();
    dispatch(TopicActions.getTopicList())
    // console.log("TaskScreen objectstatus")
    console.log("TaskScreen props.route.params.status", props.route.params.status)
    // if (props.route.params.status !== "Done") {
    //   dispatch(TopicActions.updateTaskStatus(taskId, "In Progress"))
    // }
  }, []);

  const localItem = useSelector((state) => state.topic.topic_data)

  const topicId = props.route.params.topicId
  // const taskId = props.route.params.taskId

  const taskList = localItem.topic_list.filter((item) => {
    if (item.id == topicId) {
      return true
    }
  })

  // console.log("TaskScreen taskList", taskList)

  const taskObject = taskList[0].task_list.filter((item) => {
    if (item.id == taskId) {
      return true
    }
  })

  // console.log("TaskScreen TaskContent", taskObject)

  function getIndex(id) {
    const index = taskList[0].task_list.findIndex(object => {
      return object.id === id;
    });
    return index
  }

  function getPreviousId() {
    const index = getIndex(taskId)
    if (index > 0) {
      const generatedId = taskList[0].task_list[getIndex(taskId) - 1].id
      setTaskId(generatedId)
    } else {
      alert("You are on first task")
    }
  }

  function getNextId() {
    const index = getIndex(taskId)
    if (index < ((taskList[0].task_list).length - 1)) {
      const generatedId = taskList[0].task_list[getIndex(taskId) + 1].id
      setTaskId(generatedId)
    } else {
      alert("You have reached end")
    }
  }
  // const generatedId = taskList[0].task_list[getIndex(taskId) - 1].id

  // console.log("TaskScreen generatedId", generatedId)

  function updateStatus(id, status) {
    // if (status !== "Done") {
      const index = getIndex(taskId)
      console.log("TaskScren index", index)
      dispatch(TopicActions.updateTaskStatus(id, "In Progress"))

      const generatedId = taskList[0]?.task_list[getIndex(taskId) - 1]?.id
      dispatch(TopicActions.updateTaskStatus(generatedId, "Done"))

      if (index == ((taskList[0].task_list).length - 1)) {
        dispatch(TopicActions.updateTaskStatus(id, "Done"))
      }
    // }
  }

  return (
    isLoading ?
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
   
      :
      <>
      <ScrollView style={styles.feed}>
        {
          taskObject.map((item) => (
            <View style={styles.feed}>
              <View style={styles.logo_view}>
                <Image
                  style={styles.terafac_logo}
                  source={{ uri: local.terafac_logo }}
                  resizeMode="contain"
                />
                <Text style={styles.header}>{taskList[0].topic}</Text>
              </View>
              <View style={styles.progress_level_box}>
                <Image
                  style={styles.progress_level}
                  source={{ uri: item.horizontal_progress_bar }}
                  resizeMode="contain"
                />
              </View>
              <TouchableOpacity style={styles.task_title}>
                <Text style={styles.taskTitle}>{item.task}</Text>
              </TouchableOpacity>
              {
                item.task_content.map((value) => (
                  <View style={styles.contents_view}>
                    {
                      value.content.substring(0, 5) === "https" ?
                        <ImageBackground
                          source={{ uri: value.content }}
                          style={styles.task_image}
                          resizeMode="contain"
                        >
                          <View style={styles.modalContainer}>
                            <Modal
                              animationType={'slide'}
                              transparent={true}
                              visible={showModal}
                              onRequestClose={() => {
                                console.log('Modal has been closed.');
                              }}>
                              {/*All views of Modal*/}
                              {/*Animation can be slide, slide, none*/}
                              <View style={styles.popup_box}>
                                <View style={styles.cross_box}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      setShowModal(!showModal);
                                    }}
                                  >
                                    <Image
                                      resizeMode="contain"
                                      style={{ width: 23, height: 23 }}
                                      source={{ uri: "https://the-coder.s3.ap-south-1.amazonaws.com/terafac-images/Cross.png" }}
                                    />
                                  </TouchableOpacity>
                                </View>
                                <Text style={styles.popup_title}>TRIVIA POP-UP</Text>
                                <Text style={styles.popup_text}>A PLC is an example of a real time system.</Text>
                              </View>
                            </Modal>
                          </View>
                        </ImageBackground>
                        :
                        <Text style={[styles.about_task, { marginTop: '2%' }]}>{value.content}</Text>
                    }
                  </View>
                ))
              }
              <Text style={[styles.about_task, { marginTop: '1%' }]}>Where is PLC used?</Text>
              <Text style={[styles.about_task, { marginTop: '0.2%' }]}>{item.info}</Text>
            </View>
          ))
        }
      </ScrollView>
      <View style={styles.bottomView}>
      <View style={styles.arrowBox}>
        <TouchableOpacity onPress={() => getPreviousId()}>
          <Image
            resizeMode="contain"
            style={styles.arrow}
            source={{ uri: "https://the-coder.s3.ap-south-1.amazonaws.com/terafac-images/LeftArrow.png" }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShowModal(!showModal);
          }}
        >
          <Image
            resizeMode="contain"
            style={styles.arrow}
            source={{ uri: "https://the-coder.s3.ap-south-1.amazonaws.com/terafac-images/TopArrow.png" }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          getNextId()
          updateStatus(item.id, item.status)
        }}>
          <Image
            resizeMode="contain"
            style={styles.arrow}
            source={{ uri: "https://the-coder.s3.ap-south-1.amazonaws.com/terafac-images/RightArrow.png" }}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Image
          style={styles.info}
          resizeMode="contain"
          source={{ uri: "https://the-coder.s3.ap-south-1.amazonaws.com/terafac-images/Info.png" }}
        />
      </TouchableOpacity>
    </View>
    </>  
  )
}

export default TaskScreen;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  feed: {
    flex: 1,
  },
  logo_view: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: height*0.02,
    marginLeft: width*0.03
  },
  terafac_logo: {
    width: width * 0.18,
    height: height * 0.1,
    alignSelf: 'flex-start',
    marginTop: 2,
    marginLeft: 2
  },
  task_title: {
    backgroundColor: '#3D3D3D',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: '1.5%',
    marginBottom: '1%',
    width: '85%',
    alignSelf: 'center'
  },
  about_task: {
    color: 'black',
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'left',
    width: '85%',
    alignSelf: 'center',
  },
  input: {
    color: 'black',
    fontSize: 15,
    fontWeight: '400',
    paddingHorizontal: 10
  },
  plc_logic: {
    width: '45%',
    height: '45%',
  },
  output: {
    color: 'black',
    fontSize: 15,
    fontWeight: '400',
    paddingHorizontal: 10
  },
  progress_level: {
    width: width * 0.9,
    height: height * 0.05,
  },
  level: {
    fontSize: 9,
    width: '50%',
    alignSelf: 'center',
    color: 'white'
  },
  progress_level_box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  forward_icon: {
    width: '8%',
    height: '4%'
  },
  forward_btn: {
    backgroundColor: '#19BEE7',
    paddingHorizontal: 16,
    paddingVertical: 0,
    borderRadius: 20,
    marginRight: 5,
    marginLeft: 2
  },
  progress_bar_text: {
    fontSize: 10,
    alignSelf: 'center'
  },
  task_image: {
    width: width * 0.7,
    height: height * 0.36,
    alignSelf: 'center',
    marginTop: '1%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 23,
    marginLeft: width * 0.26,
    marginTop: height * 0.06
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white'
  },
  arrowBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '15%',
    marginBottom: '2%'
  },
  arrow: {
    height: 70,
    width: 60,
    marginHorizontal: 5
  },
  bottomView: {
    flex: 1,
    position: 'absolute',
    left:2,
    bottom:5,
    right:10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  info: {
    marginLeft: 20,
    marginBottom: 10,
    height: 60,
    width: 60,
  },
  popup_box: {
    width: width * 0.7,
    height: height * 0.15,
    backgroundColor: 'rgba(71, 203, 236, 0.75)',
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: height * 0.4,
    alignSelf: 'center'
  },
  cross_box: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingHorizontal: '2%',
    alignSelf: 'flex-end',
    paddingTop: '2%'
  },
  popup_title: {
    fontSize: 14,
    fontWeight: '700'
  },
  popup_text: {
    color: 'white',
    fontSize: 12,
    width: '70%',
    marginTop: '1%'
  },
  contents_view: {
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});


