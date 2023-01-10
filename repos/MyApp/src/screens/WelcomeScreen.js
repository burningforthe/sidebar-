//https://share.thecoder.live/show/ones-approaching-able/

import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const item = {
  "id": "c04cb6b0-e442-4354-b25e-fd3798f055d1",
  "terafac_logo": "https://the-coder.s3.ap-south-1.amazonaws.com/terafac-images/Terafac-logo.png",
  "exciting_text": "We are so excited to start this journey with you.",
  "begin_video_text": "Let's watch to begin video with.",
  "youtube_logo": "https://the-coder.s3.ap-south-1.amazonaws.com/terafac-images/YoutubeLogo.png",
  "video_intro": "Introduction to Smart Manufacturing"
}

const WelcomeScreen = (props) => (
  <View style={styles.tft_family} showsVerticalScrollIndicator={false}>
    <Image
      style={styles.terafac_logo}
      source={{ uri: item.terafac_logo }}
      resizeMode="contain"
    />
    <View style={styles.tft_family_btn}>
      <Text style={{ fontSize: 16, fontWeight: '500', color: 'white' }}>Welcome to TFT family.</Text>
    </View>
    <View style={styles.textView}>
      <Text style={styles.exciting_text}>{item.exciting_text}</Text>
      <Text style={styles.begin_video_text}>{item.begin_video_text}</Text>
    </View>
    <Image
      style={styles.youtube_logo}
      source={{ uri: item.youtube_logo }}
      resizeMode="contain"
    />
    <Text style={styles.video_intro}>{item.video_intro}</Text>
    <TouchableOpacity style={styles.begin_tft_journey} onpress={() => props.navigation.navigate("HomeScreen")}>
      <Text style={{ fontSize: 15, fontWeight: '500' }}>Begin my Tft Journey</Text>
    </TouchableOpacity>
  </View>
)

export default WelcomeScreen;

const styles = StyleSheet.create({
  tft_family: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'green'
  },
  terafac_logo: {
    width: '18%',
    height: '16%',
    alignSelf: 'flex-start',
    marginTop: 2,
    marginLeft: 2
  },
  tft_family_btn: {
    backgroundColor: '#3D3D3D',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '2.5%',
    marginTop: '6%',
    marginBottom: 4,
    paddingHorizontal: '11%'
  },
  exciting_text: {
    fontSize: 12,
    width: '90%',
    display: 'flex',
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 10,
    alignSelf: 'center'
  },
  begin_video_text: {
    fontSize: 12,
    paddingHorizontal: 10,
    marginTop: 2,
    fontWeight: '400'
  },
  youtube_logo: {
    width: '24%',
    height: '17%',
    marginTop: '10%',
  },
  video_intro: {
    fontSize: 13,
    paddingHorizontal: 10,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '400'
  },
  begin_tft_journey: {
    backgroundColor: '#19BEE7',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 6,
    marginTop: '6%'
  },
  textView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginTop: '3%'
  }
});