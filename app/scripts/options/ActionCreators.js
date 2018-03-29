import {
  createActions
} from 'redux-actions';
import {
  createActionThunk
} from 'redux-thunk-actions';

import initialConfig from './InitialConfig';

const log = process.env.NODE_ENV === 'development' ? console.log : () => {};

const normalActions = createActions({},
  'CHANGE_BACKGROUND_COLOR',
  'CHANGE_USER_NAME_COLOR',
  'CHANGE_COMMENT_COLOR',
  'TOGGLE_BACKGROUND_COLOR_PALETTE',
  'TOGGLE_USER_NAME_COLOR_PALETTE',
  'TOGGLE_COMMENT_COLOR_PALETTE'
);
const asyncActions = {
  // 非同期セーブ
  save: (config) => (dispatch) => {
    log('save(inner).');
    const t = createActionThunk('SAVE', () => new Promise((resolve, reject) => {
      log('start promise.');
      chrome.storage.local.set(config, (result) => {
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError.message);
        }
        chrome.runtime.sendMessage({
          action: 'config',
          config: config
        });
        resolve(result);
      });
    }));
    dispatch(t());
  },
  // 非同期ロード
  load: (config) => (dispatch) => {
    log('load(inner).');
    const t = createActionThunk('LOAD', () => new Promise((resolve, reject) => {
      log('start promise.');
      chrome.storage.local.get(initialConfig, (result) => {
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError.message);
        }
        log('loaded:', result);
        resolve(result);
      });
    }));
    dispatch(t());
  }
};
const Actions = {
  ...normalActions,
  ...asyncActions
}
export default Actions;
