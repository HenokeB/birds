import React, { Component } from 'react';
import BirdsLists from '../components/birds_lists';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';

class BirdsListsScreen extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Birds of our planet",
    headerLeft: (
      <TouchableHighlight underlayColor='transparent' onPress={() => navigation.navigate('Settings')}>
        <Image style={{width: 25, height: 25, margin: 10}} source={require('../../img/settings.png')} />
      </TouchableHighlight>
    ),
    headerRight: (
      <TouchableHighlight underlayColor='transparent' onPress={() => navigation.navigate('BirdsListAdd')}>
        <Text style={{ fontSize: 22, color: '#FFFFFF' }}> + </Text>
      </TouchableHighlight>
    ),
    headerTintColor: '#FFFFFF',
    headerStyle: {
      backgroundColor: '#4A90E2',
      paddingRight: 10
    }
  });

  constructor(props) {
    super(props);
  }

  handleListPressed(list) {
    this.props.navigation.navigate('settings', {list: list});
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <BirdsLists lists={this.props.lists} onListPressed={(list) => this.handleListPressed(list)} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    lists: state.birdLists
  }
}

export default connect(mapStateToProps)(BirdsListsScreen);