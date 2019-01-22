import { birdsListDB } from '../db'
import cuid from 'cuid';

export const SET_SYNC_URL = 'SET_SYNC_URL';
export const ADD_BIRD = 'ADD_BIRD';
export const DELETE_BIRD = 'DELETE_BIRD';
export const LOAD_BIRDS = 'LOAD_BIRDS';
export const SET_ACTIVE_BIRD = 'SET_ACTIVE_BIRD';
export const LOAD_ACTIVE_ITEMS = 'LOAD_ACTIVE_ITEMS';


export function setSyncUrl(url) {
  return {
    type: SET_SYNC_URL,
    payload: url
  };
}

export function loadBirds() {
  return dispatch => {
    let lists = [];
    // to load all lists we have to use allDocs due to an issue in pouchdb/React Native:
    // https://github.com/pouchdb/pouchdb/issues/6584
    birdsListDB.allDocs({include_docs: true})
      .then((result) => {
        // get lists
        for (let row of result.rows) {
          doc = row.doc;
          if (doc.type && doc.type == 'bird') {
            lists.push({listId: doc._id, list: doc});
          }
        }
        dispatch({
          type: LOAD_BIRDS,
          payload: lists
        });
      }).catch((err) => {
        // TODO:
        console.log(err);
      });
  };
}

export function setActiveBird(list) {
  return {
    type: SET_ACTIVE_BIRD,
    payload: list
  }
}

export function addBird(bird) {
  let createdAt = new Date().toUTCString();
  let list = {
    _id: 'bird:' + cuid(),
    type: 'bird',
    version: 1,
    name: bird.name,
    note: bird.note,
    rarity: bird.rarity,
    createdAt: createdAt,
    updatedAt: createdAt
  };
  return dispatch => {
    birdsListDB.put(list).then(result => {
      list._rev = result.rev;
      dispatch({
        type: ADD_BIRD,
        payload: {list: list}
      });
    });
  };
}

export function deleteBird(bird) {
  return dispatch => {
    let originalBird = bird;
    birdsListDB.get(bird._id).then(bird => {
      return birdsListDB.remove(bird);
    }).then(result => {
      dispatch({
        type: DELETE_BIRD,
        payload: originalBird
      });
    });
  };
}