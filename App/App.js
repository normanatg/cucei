/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginView from './src/LoginView';
import FormView from './src/FormView';
import ListView from './src/ListView';
const SimpleApp = StackNavigator({
  Home: { screen: LoginView },
  Form: { screen: FormView },
  List: { screen: ListView},
});

export default class App extends Component<{}> {
  render() {
    return <SimpleApp />;
  }
}