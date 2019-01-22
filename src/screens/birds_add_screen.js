import React, { Component } from 'react';
import { StyleSheet, Text, Picker, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addBird } from '../actions/index';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class BirdsListAddScreen extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "New Birds List",
    headerRight: (
      <TouchableHighlight underlayColor='transparent' onPress={() => navigation.state.params.save(navigation)}>
        <Text style={{ fontSize: 17, color: '#FFFFFF' }}>Save</Text>
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
    this.state = {bird: {name:'', note:'', rarity:'Common' }}
  }

  save(navigation) {
    this.props.addBird(this.state.bird);
    // TODO: - this should probably happen after the save is successful
    navigation.goBack();
  }

  componentDidMount() {
    this.props.navigation.setParams({ save: (navigation) => this.save(navigation), bird: {name:'',note:'',rarity:'common'} });
  }

  render() {
    let bird = Object.assign({}, this.state.bird);
    return (
      <View style={styles.list}>
       <Input
        placeholder='name of the specie'
        onChangeText={(name) => {bird.name = name; this.setState({bird} )}}
        leftIcon={
            <Icon
            name='twitter'
            size={24}
            color='black'
            />
        }
        />
         <Input
        placeholder='note about the bird '
        onChangeText={(note) => {bird.note = note; this.setState({bird} )}}
        leftIcon={
            <Icon
            name='align-justify'
            size={24}
            color='black'
            />
        }
        />
         
        <Picker
            selectedValue={this.state.bird.rarity}
            onValueChange={(itemValue, itemIndex) => {bird.rarity = itemValue; this.setState({bird} )}}
            style={{ height: 50, width: 175 }}
            >
            <Picker.Item label="Common" value="Common" />
            <Picker.Item label="Rare" value="Rare" />
            <Picker.Item label="Extremly  rare" value="Extremly rare" />
        </Picker>

    </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    height: 40,
    padding: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2
  },
  list: {
    flex: 1,
    marginTop: 5,
    padding: 10,
    backgroundColor: '#ddd',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addBird: addBird
  }, dispatch);
}

function mapStateToProps(state) {
	return {
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(BirdsListAddScreen);