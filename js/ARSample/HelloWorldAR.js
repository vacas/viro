'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants
} from 'react-viro';

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();
    this._onTrackingUpdated = this._onTrackingUpdated.bind(this);
    this.state = {
      hasARInitialized : false,
      text : "Initializing AR...",
    };
  }

  _onTrackingUpdated(state, reason) {
    if (!this.state.hasARInitialized && state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        hasARInitialized : true,
        text : "Hello World"
      });
    }
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onTrackingUpdated}>
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
      </ViroARScene>
    );
  }
}