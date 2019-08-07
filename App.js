/**
 * Copyright (c) 2015-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
'use strict';

import React, { Component } from 'react';

import HelloWorldAR from './js/ARSample/HelloWorldAR';
import HelloWorldObjectsAR from './js/ARSample/HelloWorldObjectsAR';
import FunctionalAR from './js/ARSample/FunctionalAR';

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator,
} from 'react-viro';

const apiKey = "A2D64875-2513-4E1B-9EDC-CF4048491FF4";

export default class ViroCodeSamplesSceneNavigator extends Component {
  render() {
    return (
      <ViroARSceneNavigator
        initialScene={{
          // scene: HelloWorldAR,
          // scene: HelloWorldObjectsAR,
          scene: FunctionalAR,
        }}
        apiKey={apiKey} />
    )
  }
}