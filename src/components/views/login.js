import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  Modal,
  TouchableHighlight,
  View
} from 'react-native';


export default class extends Component {
  constructor(inProps){
    super(inProps);
    this.state = {
      visible: inProps.visible
    };
  }

  componentWillReceiveProps(inProps){
    const { visible } = inProps;
    if (visible !== this.state.visible ){
      this.setState({ visible });
    }
  }

  _onPress = e =>{
    this.setState({ visible: false });
  };

  render() {
    const { visible, ...props } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.visible}
        {...props}
        >
        <View style={{ marginTop: 22 }}>
          <View>
            <Text>LoginMODAL</Text>
            <Button onPress={this._onPress} title='close me' />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
