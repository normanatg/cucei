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
import { StackNavigator } from 'react-navigation';

import { Container, Header, Content, Form, Item, Input, Label, Button, Text,Body,Title  } from 'native-base';
import {getLogin} from './api-cline';

export default class LoginView extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      cod:"211401309",
      nip:"norman95"
    };
  }
  entrar(){
    //getLogin(this.state.cod, this.state.nip);
    getLogin(this.state.cod, this.state.nip).then(data => {
        if (data.id) {
          this.props.navigation.navigate('Form');
        }else{
          alert("Datos erroneos");
        }
    });
  }
  static navigationOptions = {header:null};
  render() {
    const { navigate } = this.props.navigation;
    return (
       <Container>
        <Header>
          <Body>
            <Title>CUCEI entra</Title>
          </Body>
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Codigo</Label>
              <Input 
                onChangeText={(cod) => this.setState({cod})}
                value={this.state.cod}
              />
            </Item>
            <Item floatingLabel>
              <Label>Nip</Label>
              <Input
                onChangeText={(nip) => this.setState({nip})}
                value={this.state.nip}
              />
            </Item>
          </Form>
          <Button 
            style={styles.Login} 
            onPress={() => { this.entrar() }}
            rounded block success>
            <Text> Entrar </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
 Login:{
  marginTop:10,
 }
});