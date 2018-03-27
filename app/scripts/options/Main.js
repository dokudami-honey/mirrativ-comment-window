import React from 'react';
import { connect } from 'react-redux';
import I18n, { i18n } from './I18n';
import Actions from './ActionCreators';

/**
 * 背景色の設定
 * @param {*} props
 */
const BackgroundColorOption = (props) => (<div>
  <I18n res='optionBackgroundColor' className='label' />
  <input type="text" value={props.value} onChange={props.onChange} />
</div>);
/**
 * 保存ボタン
 * @param {*} props
 */
const SaveButton = (props) => (<div>
  <button id='saveButton' onClick={props.onClick}><I18n res='saveButton' /></button>
</div>);

const Preview = (props) => (
  <div class="preview" style={{ backgroundColor: props.config.backgroundColor }}>
    <span className="username" style={{
      color: props.config.userNameColor
    }}>username</span>
    <span className="comment" style={{
      color: props.config.commentColor
    }}>comment</span>
  </div>
);

function Main(props) {
  const config = props.config;
  return (<div className="container">
    <BackgroundColorOption value={config.backgroundColor} onChange={props.onBackgroundColorChanged} />
    <Preview config={config} />
    <SaveButton onClick={() => props.save(props.config)} />
  </div>);
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  save: config => dispatch(Actions.save(config)),
  onBackgroundColorChanged: e => dispatch(Actions.changeBackgroundColor(e.target.value)),
  dispatch: action => dispatch(action)
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
