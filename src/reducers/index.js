import { combineReducers } from 'redux';
import BirdsReducer from './reducer_birds';
import SetSyncUrlReducer from './reducer_set_sync_url';

const rootReducer = combineReducers({
  birdLists: BirdsReducer,
  syncUrl: SetSyncUrlReducer
});

export default rootReducer;