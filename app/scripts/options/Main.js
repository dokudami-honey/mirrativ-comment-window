import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ChromePicker } from 'react-color';
import I18n, { i18n } from './I18n';
import Actions from './ActionCreators';
const log = process.env.NODE_ENV === 'development' ? console.log : () => { };

/**
 * 背景色の設定
 * @param {*} props
 */
class BackgroundColorOption extends Component {
  constructor() {
    super();
    this.state = {
      showPalette: false,
      foo: 'bar'
    };
  }
  togglePalette() {
    this.setState({ showPalette: !this.state.showPalette });
  }
  render() {
    const props = this.props;
    log('state:', this.state);
    return (<div>
      <div>
        <I18n res={props.labelRes} className='label' />
        <button onClick={e => this.togglePalette(e)}>{this.state.showPalette ? 'close' : 'open'}</button>
        <input type="text" value={props.value} readOnly onClick={e => this.togglePalette(e)} />
      </div>
      {this.state.showPalette &&
        <ChromePicker color={props.value} onChange={color => props.onChange(color.hex)} disableAlpha />
      }
    </div>);
  }
};
const UserNameColorOption = (props) => (<div>
  <I18n res='optionUserNameColor' className='label' />
  <input type="text" value={props.value} onChange={props.onChange} />
</div>);
const CommentColorOption = (props) => (<div>
  <I18n res='optionCommentColor' className='label' />
  <input type="text" value={props.value} onChange={props.onChange} />
</div>);
/**
 * 保存ボタン
 * @param {*} props
 */
const SaveButton = (props) => (<div>
  <button id='saveButton' onClick={props.onClick}><I18n res='saveButton' /></button>
</div>);

/**
 * プレビュー
 * @param {*} props
 */
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
const ColorOption = (props) => {
  return (<div>
    <div>
      <I18n res={props.labelRes} className='label' />
      <input type="text" value={props.value} readOnly onClick={props.toggleVisibility} />
    </div>
    {props.showPalette &&
      <ChromePicker color={props.value} onChange={color => props.onChange(color.hex)} disableAlpha />
    }
  </div>);
};
/**
 * 外観
 * @param {*} props
 */
function Main(props) {
  const config = props.config;
  const visibility = props.visibility;
  return (<div className="container">
    <ColorOption
      labelRes='optionBackgroundColor'
      showPalette={visibility.backgroundColorPalette}
      value={config.backgroundColor}
      onChange={props.onBackgroundColorChanged}
      toggleVisibility={props.toggleBackgroundColorPalette} />
    <ColorOption
      labelRes='optionUserNameColor'
      showPalette={visibility.userNameColorPalette}
      value={config.userNameColor}
      onChange={props.onUserNameColorChanged}
      toggleVisibility={props.toggleUserNameColorPalette} />
    <ColorOption
      labelRes='optionCommentColor'
      showPalette={visibility.userNameColorPalette}
      value={config.commentColor}
      onChange={props.onCommentColorChanged}
      toggleVisibility={props.toggleCommentColorPalette} />
    <Preview config={config} />
    <SaveButton onClick={() => props.save(props.config)} />
  </div>);
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  save: config => dispatch(Actions.save(config)),
  onBackgroundColorChanged: value => dispatch(Actions.changeBackgroundColor(value)),
  onUserNameColorChanged: e => dispatch(Actions.changeUserNameColor(e.target.value)),
  onCommentColorChanged: e => dispatch(Actions.changeCommentColor(e.target.value)),
  toggleBackgroundColorPalette: e => dispatch(Actions.toggleBackgroundColorPalette()),
  toggleUserNameColorPalette: e => dispatch(Actions.toggleUserNameColorPalette()),
  toggleCommentColorPalette: e => dispatch(Actions.toggleCommentColorPalette()),
  dispatch: action => dispatch(action)
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
