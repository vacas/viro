'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroMaterials,
  ViroBox,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroButton,
  ViroQuad,
  ViroNode,
  ViroAnimations,
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

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90"
    },
    duration: 250,
  },
});

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();
    this._onTrackingUpdated = this._onTrackingUpdated.bind(this);
    this._onButtonClick = this._onButtonClick.bind(this);
    this.state = {
      hasARInitialized : false,
      text : "Initializing AR...",
      buttonStateTag: '',
      boxPosition: [0, -.5, -1],
      tapped: false,
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

  _onButtonClick() {
    this.setState({
      tapped: !this.state.tapped,
      text: `tapped: ${!this.state.tapped}`,
      boxPosition: !this.state.tapped ? [0, -.5, -5] : [0, -.5, -1],
    });
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onTrackingUpdated}>

        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />

        <ViroBox position={this.state.boxPosition}
          animation={{name: "rotate", run: true, loop: true}}
          scale={[.3, .3, .1]} materials={["grid"]} />

        <ViroButton
          source={require("./res/button_base.png")}
          position={[1, 3, -5]}
          height={2}
          width={3}
          onClick={this._onButtonClick}
        />

      </ViroARScene>
    );
  }
}