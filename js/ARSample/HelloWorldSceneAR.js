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
  ViroARPlane,
  ViroARPlaneSelector,
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
    duration: 250, //.25 seconds
  },
});

// var createReactClass = require('create-react-class');
export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();
    this._onTrackingUpdated = this._onTrackingUpdated.bind(this);
    this._onButtonGaze = this._onButtonGaze.bind(this);
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
    // if the state changes to "TRACKING_NORMAL" for the first time, then
    // that means the AR session has initialized!
    if (!this.state.hasARInitialized && state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        hasARInitialized : true,
        text : "Fucking hell"
      });
    }
  }

  _onButtonGaze() {
    this.setState({
        buttonStateTag: "onGaze"
    });
}

  _onButtonClick() {
    const { tapped } = this.state;
    
    this.setState({
      tapped: !tapped,
      text: `tapped: ${tapped}`,
      boxPosition: tapped ? [0, -.5, -5] : [0, -.5, -1],
    });
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onTrackingUpdated}>

        {/* Text to show whether or not the AR system has initialized yet, see ViroARScene's onTrackingInitialized*/}
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />

        <ViroBox position={this.state.boxPosition}
          animation={{name: "rotate", run: true, loop: true}}
          scale={[.3, .3, .1]} materials={["grid"]} />

        <ViroAmbientLight color={"#aaaaaa"} influenceBitMask={1} />

        <ViroButton
          source={require("./res/button_base.png")}
          position={[1, 3, -5]}
          height={2}
          width={3}
          onClick={this._onButtonClick}
        />

        <ViroSpotLight
            innerAngle={5}
            outerAngle={90}
            direction={[0,-1,-.2]}
            position={[0, 3, 1]}
            color="#aaaaaa"
            castsShadow={true}
            />

        {/* Node that contains a light, an object and a surface to catch its shadow
            notice that the dragType is "FixedToWorld" so the object can be dragged
            along real world surfaces and points. */}
        <ViroNode position={[-.5, -.5, -.5]} dragType="FixedToWorld" onDrag={()=>{}} >

          {/* Spotlight to cast light on the object and a shadow on the surface, see
              the Viro documentation for more info on lights & shadows */}
          <ViroSpotLight
            innerAngle={5}
            outerAngle={45}
            direction={[0,-1,-.2]}
            position={[0, 3, 0]}
            color="#ffffff"
            castsShadow={true}
            influenceBitMask={2}
            shadowMapSize={2048}
            shadowNearZ={2}
            shadowFarZ={5}
            shadowOpacity={.7} />

          <Viro3DObject
              source={require('./res/emoji_smile/emoji_smile.vrx')}
              position={[0, .2, 0]}
              scale={[.2, .2, .2]}
              type="VRX"
            lightReceivingBitMask={3}
            shadowCastingBitMask={2}
            transformBehaviors={['billboardY']}
            resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
                       require('./res/emoji_smile/emoji_smile_specular.png'),
                       require('./res/emoji_smile/emoji_smile_normal.png')]}/>

          <ViroQuad
            rotation={[-90,0,0]}
            width={.5} height={.5}
            arShadowReceiver={true}
            lightReceivingBitMask={2} />

        </ViroNode>

        {/* Node that contains a light, an object and a surface to catch its shadow
          notice that the dragType is "FixedToWorld" so the object can be dragged
          along real world surfaces and points. */}
        <ViroNode position={[.5,-.5,-.5]} dragType="FixedToWorld" onDrag={()=>{}} >

          {/* Spotlight to cast light on the object and a shadow on the surface, see
              the Viro documentation for more info on lights & shadows */}
          <ViroSpotLight
            innerAngle={5}
            outerAngle={45}
            direction={[0,-1,-.2]}
            position={[0, 3, 0]}
            color="#ffffff"
            castsShadow={true}
            influenceBitMask={4}
            shadowMapSize={2048}
            shadowNearZ={2}
            shadowFarZ={5}
            shadowOpacity={.7} />

          <Viro3DObject
            source={require('./res/object_soccerball/object_soccer_ball.vrx')}
            position={[0, .15, 0]}
            scale={[.3, .3, .3]}
            type="VRX"
            lightReceivingBitMask={5}
            shadowCastingBitMask={4}
            transformBehaviors={['billboardY']}
            resources={[require('./res/object_soccerball/object_soccer_ball_diffuse.png'),
                       require('./res/object_soccerball/object_soccer_ball_normal.png'),
                       require('./res/object_soccerball/object_soccer_ball_specular.png')]}/>
          <ViroQuad
            rotation={[-90,0,0]}
            width={.5} height={.5}
            arShadowReceiver={true}
            lightReceivingBitMask={4} />

        </ViroNode>

      </ViroARScene>
    );
  }
}