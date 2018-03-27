// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'
import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import ReactDOM from 'react-dom';

import thunk from 'redux-thunk';

import Actions from './options/ActionCreators';
import Reducers from './options/Reducers';
import Main from './options/Main';

const log = process.env.NODE_ENV === 'development' ? console.log : () => { };
// middlewares
const middlewares = [thunk];
if (process.env.NODE_ENV !== 'production') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}
// store
const store = compose(applyMiddleware(...middlewares))(createStore)(Reducers);

/**
 * 表示枠
 */
class App extends Component {
  /**
   * 開いた時の初期表示のため設定をロードする。
   */
  componentDidMount() {
    log(this.props);
    const { dispatch } = this.props;
    dispatch(Actions.load());
  }
  render() {
    return (<Main />);
  }
}

const mapStateToProps = (state) => state;
const AppContainer = connect(mapStateToProps)(App);

export default class ReduxApp extends Component {
  render() {
    return (<Provider store={store}>
      <AppContainer />
    </Provider>);
  }
}
ReactDOM.render(<ReduxApp />, document.getElementById('root'));
