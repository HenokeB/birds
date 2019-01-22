import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {  deleteBird } from '../actions/index';
import { ListItem } from 'react-native-elements'

class BirdsList extends Component {

  delete() {
    this.props.deleteBird(this.props.bird);
  }

  render() {
    let swipeBtns = [{
      text: 'Delete',
      backgroundColor: '#FF0000',
      onPress: () => { this.delete() }
    }];
    return (
      <Swipeout
        style={styles.swipeout}
        right={swipeBtns}
        autoClose={true}
        backgroundColor='transparent'
      >
        <TouchableHighlight underlayColor='transparent' style={styles.container} onPress={() => this.props.onListPressed(this.props.list)}>
          <View style={styles.list}>
          <ListItem
            key={this.props.bird._id}
            title={this.props.bird.name}
            titleStyle={{ fontSize: 20, color: '#00271f' }}
            leftAvatar={{ size:"medium", title: this.props.title }}
            subtitle={
              <View>
                <View><Text style={{ color: 'green', fontSize: 14 }}>{this.props.bird.note}</Text></View>
                <View style={styles.subtitleView}>
                  <Text>{this.props.bird.rarity}</Text>
                  <Text style={styles.timeText}>{this.props.bird.createdAt}</Text>
                </View>
              </View>
            }
        
          />
          </View>
        </TouchableHighlight>
      </Swipeout>
    );
  }
}

const styles = StyleSheet.create({
  swipeout: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 0
  },
  container: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  list: {
    marginTop: 5,
    backgroundColor: '#ddd',
    
  },
  subtitleView: {
    flexDirection: 'row',
    paddingTop: 5,
    flex: 1,
    justifyContent: 'space-between'
  },
 
  timeText: {
    color: 'grey',
  },
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    deleteBird: deleteBird
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(BirdsList);