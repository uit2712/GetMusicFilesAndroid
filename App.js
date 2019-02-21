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
  TouchableOpacity,
} from 'react-native'

import MusicFiles from 'react-native-get-music-files';
import TrackInfo from './models/TrackInfo';

let Sound = require('react-native-sound');

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

          if (!trackInfo.track)
            trackInfo.track = new Sound(trackInfo.path, Sound.MAIN_BUNDLE, (error) => {
              if (error)
                ToastAndroid.show(`failed to load the sound: ${error}`, ToastAndroid.SHORT);
            });
        }
      }
      this.setState({ trackInfoArray });
      ToastAndroid.show(`There are ${trackInfoArray.length} tracks`, ToastAndroid.SHORT);
    }).catch(error => {
      ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT);
    });
  }

  playTrack = (trackInfo: TrackInfo) => {
    if (trackInfo && trackInfo.track) {
      trackInfo.track.play((success: boolean) => {
        if (success)
          ToastAndroid.show(`Play ${trackInfo.fileName} successfully!`, ToastAndroid.SHORT);
        else ToastAndroid.show(`Play ${trackInfo.fileName} failed!`, ToastAndroid.SHORT);
      });
    }
  }

  componentWillUnmount() {
    for (let i = 0; i < this.state.trackInfoArray.length; i++) {
      let trackInfo = this.state.trackInfoArray[i];
      if (trackInfo && trackInfo.track)
        trackInfo.track.release();
    }
  }

  renderTrackInfoArray = () => {
    let result;
    result = this.state.trackInfoArray.map((trackInfo: TrackInfo, index: number) => 
      <View key={index} style={styles.trackInfoContainer}>
        <Text key={index} style={styles.trackInfo}>{trackInfo.path}, duration: {trackInfo.duration / 1000}s</Text>
        <TouchableOpacity style={styles.playButtonContainer} onPress={() => this.playTrack(trackInfo)}>
          <Text style={styles.playText}>Play/Pause</Text>
        </TouchableOpacity>
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
  playText: {
    fontSize: 20,
    color: 'white',
  },
  playButtonContainer: {
    padding: 15,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});