/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

jest.mock('react-native-camera-kit', () => ({
  Camera: 'Camera',
  CameraType: {Back: 'back'},
}));
jest.mock('react-native-permissions', () => ({
  PERMISSIONS: {ANDROID: {CAMERA: 'camera'}, IOS: {CAMERA: 'camera'}},
  RESULTS: {GRANTED: 'granted'},
  request: jest.fn(),
}));

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
