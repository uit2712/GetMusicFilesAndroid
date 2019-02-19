/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  ScrollView,
} from 'react-native'

import MusicFiles from 'react-native-get-music-files';
import TrackInfo from './models/TrackInfo';

export default class App extends Component {

  state = {
    trackInfoArray: []
  };

  componentWillMount() {
    MusicFiles.getAll({
      id: true, // get id
      artist: true, // get artist
      duration: true, // get duration
      genre: true, // get genre
      title: true, // get title
      fileName: true, // get file name
      minimumSongDuration: 1000 // get track has min duration is 1000 ms (or 1s)
    }).then(tracks => {
      let trackInfoArray = [];
      for (let i = 0; i < tracks.length; i++) {
        if (tracks[i]) {
          let trackInfo = new TrackInfo(tracks[i]);
          trackInfoArray.push(trackInfo);
        }
      }
      this.setState({ trackInfoArray });
      ToastAndroid.show(`There are ${trackInfoArray.length} tracks`, ToastAndroid.SHORT);
    }).catch(error => {
      ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT);
    });
  }

  renderTrackInfoArray = () => {
    let result;
    result = this.state.trackInfoArray.map((trackInfo: TrackInfo, index: number) => 
      <View key={index} style={styles.trackInfoContainer}>
        <Text key={index} style={styles.trackInfo}>{trackInfo.fileName}, duration: {trackInfo.duration / 1000}s</Text>
      </View>
    );
    return result;
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderTrackInfoArray()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  trackInfoContainer: {
    padding: 15,
  },
  trackInfo: {
    fontSize: 20,
  },
});