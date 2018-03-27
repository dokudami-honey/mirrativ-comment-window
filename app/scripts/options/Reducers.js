import { handleActions } from 'redux-actions';

import initialConfig from './InitialConfig';

const initialState = {
  config: initialConfig
};
const reducer = handleActions({
  'LOAD_STARTED': (state, action) => {
    return state;
  },
  'LOAD_SUCCEEDED': (state, action) => {
    return { ...state, config: action.payload };
  },
  'LOAD_FAILED': (state, action) => {
    log(action.payload);
    return initialState;
  },
  'CHANGE_BACKGROUND_COLOR': (state, action) => {
    const config = state.config;
    return { ...state, config: { ...config, backgroundColor: action.payload } };
  }
}, initialState);
export default reducer;
