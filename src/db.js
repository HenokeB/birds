import PouchDB from 'pouchdb-react-native';

// these settings let us use cuids
// see: https://github.com/ericelliott/cuid/issues/54
global.navigator.mimeTypes = '';
global.navigator.userAgent = 'reactnative';    

const settingsDB = new PouchDB('settings', { adapter: 'asyncstorage' });
const birdsListDB = new PouchDB('bird-watching', { adapter: 'asyncstorage' });

export { settingsDB, birdsListDB }