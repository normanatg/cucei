/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  CameraRoll,
  ScrollView,
  TouchableHighlight,
} from 'react-native';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { StackNavigator } from 'react-navigation';
import { Container, Header, Content, Footer, FooterTab, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Title, Item, Input} from 'native-base';
import RNFetchBlob from 'react-native-fetch-blob';
import {getSaveDenuncia} from './api-cline';

const { width } = Dimensions.get('window');

const LATITUDE = 20.657316;
const LONGITUDE = -103.324948;
const LATITUDE_DELTA = 0.0110;
const LONGITUDE_DELTA = 0.0110;


export default class FormView extends Component<{}> {
  static navigationOptions = {header:null};
  constructor(props) {
    super(props);
    this.state = {
      coordinate: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      modalVisible: false,
      photos: [],
      index: null,
      baseFoto:null,
      text:"",
    };
  }
  onRegionChange(coordinate){
    this.setState({coordinate});
  }

  getPhotos = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'All',
    })
    .then(r => this.setState({ photos: r.edges }))
  };
  setIndex = (index)=>{
    if (index === this.state.index) {
      index = null
    }
    this.setState({index})
  }
  toggleModal = () =>{
    this.setState({modalVisible: !this.state.modalVisible });
  }

  base = () => {
    const image = this.state.photos[this.state.index].node.image.uri
    RNFetchBlob.fs.readFile(image, 'base64')
    .then((data) => {
        return data;
      })
  }
  saveDenuncia(){
    getSaveDenuncia(this.state.coordinate.latitude, this.state.coordinate.longitude, this.state.text).then(data => {
        if (data.id) {
         alert("Guardado");
        }else{
          alert("Algo fallo intente despues");
        }
    });
  }
  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container style={styles.container}>
        <MapView
          provider={ PROVIDER_GOOGLE }
          style={styles.map}
          region={this.state.coordinate}
          onRegionChange={coordinate => this.setState({coordinate})}
        >
          <MapView.Marker
            coordinate ={this.state.coordinate}
          />
        </MapView>
        <Header style={styles.lado}>
          <Left>
            <Button transparent
              onPress={() => navigate('List')}>
              <Icon name='megaphone' />
            </Button>
          </Left>
          <Body>
            <Title>Nueva denuncia</Title>
          </Body>
          <Right>
            <Button transparent
              onPress
            onPress={() => navigate('Home')}>
              <Icon name='exit' />
              </Button>
          </Right>
        </Header>
          <Content style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => { this.toggleModal(); this.getPhotos() }}
              style={[styles.bubbleTwo, styles.buttonTwo]}
            >
              <Icon name='md-add' />
            </TouchableOpacity>
            <Modal
              animationType={"slide"}
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => console.log('closed')}
            >
              <View style={styles.modalContainer}>
                <Button
                  title='Close'
                  onPress={this.toggleModal}
                >
                  <Icon name='md-attach' />
                </Button>
                <ScrollView
                  contentContainerStyle={styles.scrollView}>
                  {
                    this.state.photos.map((p, i) => {
                      return (
                        <TouchableHighlight
                          style={{opacity: i === this.state.index ? 0.5 : 1}}
                          key={i}
                          underlayColor='transparent'
                          onPress={() => this.setIndex(i)}
                        >
                          <Image
                            style={{
                              width: width/3,
                              height: width/3,
                            }}
                            source={{ uri: p.node.image.uri }}
                          />
                        </TouchableHighlight>
                      );
                    })
                  }
                </ScrollView>
              </View>
            </Modal>
          </Content>
          <Item style={[styles.bubbleTwo, styles.lado]}>
            <Input placeholder='Que ocurre??'
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}/>
            <Icon name='information-circle' />
          </Item>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {this.saveDenuncia()}}
            style={[styles.bubble, styles.button]}
          >
            <Text>Enviar</Text>
          </TouchableOpacity>
        </View>
      </Container> 
    );
  }
}

const styles = StyleSheet.create({
 container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    marginTop:'15%',
    height:'90%'
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  lado:{
    width,
  },
  modalContainer: {
    paddingTop: 20,
    flex: 1
  },
  scrollView: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  shareButton: {
    position: 'absolute',
    width,
    padding: 10,
    bottom: 0,
    left: 0
  },
  bubbleTwo: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 2,
  },
  buttonTwo: {
    width: 80,
    alignItems: 'center',
  },
});