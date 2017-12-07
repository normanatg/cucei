/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  FlatList,
} from 'react-native';

import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body} from 'native-base';

export default class Box extends Component<{}> {
  static navigationOptions = {header:null};
  render() {
  	const {foto, des} = this.props.denu;
    return (
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Body>
                <Image source={{uri: foto}} style={{height: 200, width: 325, flex: 1}}/>
                <Text>
                  {des}
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
    );
  }
}