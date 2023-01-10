import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, StyleSheet, View } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';


const HomeScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch('https://terafac.feignbird.live/api/v1/topic/');
      const json = await response.json();
      console.log(json);
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const mappedData = this.state.data.map((item => {
    return {
      topic:item.topic,
    }
   }))

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text>{JSON.stringify(data)}</Text> */}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
        {/* <Text>{JSON.stringify(data)}</Text> */}
          {/* <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text>{item.story_owner}, {item.releaseYear}</Text>
            )}
          /> */}
          <Timeline style={styles.container1} data={mappedData} />
        </>
      )}
    </View>
  );
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 65,
    backgroundColor: 'white'
  },
  container1: {
    flex: 1,
    marginTop: 20,
  },
});
