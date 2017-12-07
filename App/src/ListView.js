/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import {getDenuncia} from './api-cline';
import Box from './Box';

export default class ListView extends Component<{}> {
  static navigationOptions = {
    title: 'Lista',
  };
  constructor(props) {
    super(props);
    this.state = {
      den: [],
    };
  }
  _keyExtractor = (item, index) => item.id;

  componentDidMount(){
    getDenuncia().then(data => this.setState({den: data}))
  }

  render() {
    const { navigate } = this.props.navigation;
    const den = this.state.den
    return (
      <FlatList
        data={den}
        keyExtractor={this._keyExtractor}
        renderItem={({item}) => 
          <Box denu={item}/>
        }
      />
    );
  }
}