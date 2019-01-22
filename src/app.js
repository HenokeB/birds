import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import BirdsListAddScreen from './screens/birds_add_screen';
//import BirdDetailScreen from './screens/bird_detail_screen';
import BirdsListsScreen from './screens/birds_screen';
import SettingsScreen from './screens/settings_screen';
import { settingsDB, birdsListDB } from './db';
import SyncManager from './sync';
import { loadBirds } from './actions/index';

const store = createStore(reducers, applyMiddleware(thunk));

const BirdsListNavigator = StackNavigator({
  BirdsLists: { screen: BirdsListsScreen },
  BirdDetail: { screen: SettingsScreen },
  BirdsListAdd: { screen: BirdsListAddScreen },
  Settings: { screen: SettingsScreen }
});

export default class BirdsListApp extends Component  {

  syncManager = null;
  
  constructor(props) {
    super(props);
    // load all lists
    store.dispatch(loadBirds());
    // create sync manager
    this.syncManager = new SyncManager(store, settingsDB, birdsListDB, this.onSyncComplete, this.onSyncError);
  }

  onSyncComplete(change) {
    if (change.direction == 'pull') {
      store.dispatch(loadBirds());
    }
  }

  onSyncError(error) {
    // TODO:
    console.log(err);
  }

  render() {
    return (
      <Provider store={store}>
        <BirdsListNavigator />
      </Provider>
    )
  }
}