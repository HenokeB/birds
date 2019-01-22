import { ADD_BIRD, DELETE_BIRD, LOAD_BIRDS } from '../actions/index'

export default function (state = null, action) {
  if (action) {
    switch (action.type) {
      case LOAD_BIRDS:
        state = action.payload;
        break;
      case ADD_BIRD:
        if (state) {
          state = Array.from(state);
          state.push(action.payload);
        }
        else {
          state = [action.payload];
        }
        break;
      case DELETE_BIRD:
        if (state) {
          for (let i = state.length - 1; i >= 0; i--) {
            if (state[i].list._id == action.payload._id) {
              state.splice(i, 1);
              state = Array.from(state);
              break;
            }
          }
        }
        break;
    }
  }
  return state;
}