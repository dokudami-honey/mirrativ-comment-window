import { handleActions } from 'redux-actions';

import initialConfig from './InitialConfig';

const initialState = {
  config: initialConfig,
  visibility: {
    backgroundColorPalette: false,
    userNameColorPalette: false,
    commentColorPalette: false
  }
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
  },
  'CHANGE_USER_NAME_COLOR': (state, action) => {
    const config = state.config;
    return { ...state, config: { ...config, userNameColor: action.payload } };
  },
  'CHANGE_COMMENT_COLOR': (state, action) => {
    const config = state.config;
    return { ...state, config: { ...config, commentColor: action.payload } };
  },
  'TOGGLE_BACKGROUND_COLOR_PALETTE': (state, action) => {
    const visibility = state.visibility;
    return {
      ...state, visibility: {
        backgroundColorPalette: !visibility.backgroundColorPalette,
        userNameColorPalette: false,
        commentColorPalette: false
      }
    };
  },
  'TOGGLE_USER_NAME_COLOR_PALETTE': (state, action) => {
    const visibility = state.visibility;
    return {
      ...state, visibility: {
        backgroundColorPalette: false,
        userNameColorPalette: !visibility.userNameColorPalette,
        commentColorPalette: false
      }
    };
  },
  'TOGGLE_COMMENT_COLOR_PALETTE': (state, action) => {
    const visibility = state.visibility;
    return {
      ...state, visibility: {
        backgroundColorPalette: false,
        userNameColorPalette: false,
        commentColorPalette: !visibility.commentColorPalette
      }
    };
  }
}, initialState);
export default reducer;
