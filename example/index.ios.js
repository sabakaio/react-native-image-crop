/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import Crop from 'SampleApp/lib/index';

const options = {
  title: 'Select image',
}

export default class SampleApp extends Component {
  constructor() {
    super();
    this.state = {
      image: 'sample1',
    }
  }

  selectImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let {uri, width, height} = response;

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          image: {
            uri,
            width,
            height,
          }
        });
      }
    })
  }

  render() {
    const {image} = this.state;

    return (
      <View style={styles.container}>
        <Button
          title="Select image"
          onPress={this.selectImage}
        />
        {image ? (
          <Crop
            style={styles.cropArea}
            image={image}
          />
         ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  cropArea: {
    width: 300,
    height: 400,
    borderColor: 'red',
    borderWidth: 1,
  },
});

AppRegistry.registerComponent('SampleApp', () => SampleApp);
