import React from 'react';
import { Linking } from 'react-native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { width, height } from '../config/layout';

const item = {
    "id": "c04cb6b0-e442-4354-b25e-fd3798f055d1",
    "terafac_logo": "https://the-coder.s3.ap-south-1.amazonaws.com/terafac-images/Terafac-logo.png",
    "youtube_logo": "https://the-coder.s3.ap-south-1.amazonaws.com/terafac-images/YoutubeLogo.png",
    "video_intro": "Introduction to Smart Manufacturing"
}


const handlePress = () => {
    Linking.openURL('https://www.youtube.com/watch?v=-ro_c3JHu4g').catch((err) => console.error('An error occurred', err));
};

function NewWelcomeScreen() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.Header}>
                <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                    <Image
                        style={styles.terafac_logo}
                        source={{ uri: item.terafac_logo }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

                <Text style={styles.Welcome}>Welcome to the Terafac App</Text>
            </View>

            <View style={styles.body}>
                <Text style={styles.Intro_text}>We are so excited to start this journey with you. </Text>

                <View>
                    <Text style={styles.Intro1_text}>Let's watch to begin video with. </Text>
                </View>
                <View>
                    <TouchableOpacity onPress={handlePress}>
                        <Image
                            style={styles.youtube_logo}
                            source={{ uri: item.youtube_logo }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.Begin_your_journey} onPress={() => navigation.navigate("HomeScreen")}>
                    <Text style={{ fontSize: 15, fontWeight: '500' }}>Begin my Tft Journey</Text>
                </TouchableOpacity>

            </View>
        </View>

    );
}
export default NewWelcomeScreen;

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        flex: 1,
        position: 'absolute',
        alignItems: 'center',

    },
    Header: {
        width: width,
        height: 100,
        flexDirection: 'row',
        top: 40,
        marginHorizontal: 1,
        padding: 10,
        margin: 10,
        alignItems: 'center',
        borderWidth: 1,


    },
    terafac_logo: {
        width: 70,
        height: 70,
        marginTop: 9,
        marginLeft: 1,
        marginHorizontal: 40,
        padding: 50,
        margin: 10,
        alignItems: 'center',

    },
    Welcome: {
        width: 0.5 * width,
        height: 60,
        marginRight: 30,
        marginLeft: 1,
        marginTop: 9,
        fontSize: 18,
        borderWidth: 1,
        backgroundColor: '#ff7f50',

    },
    body: {
        width: width,
        height: height,
        marginTop: 30,
        borderWidth: 1,
        backgroundColor: 'blue',

    },
    Intro_text: {
        width: width,
        height: 0.3 * height,
        backgroundColor: 'red',


    },
    Intro1_text: {
        backgroundColor: 'orange',

    },
    youtube_logo: {
        width: 0.3 * width,
        height: 0.1 * height,
        marginLeft: 0.3 * width,
        borderWidth: 1,

    },
    Begin_your_journey: {
        backgroundColor: 'yellow',

    },




});