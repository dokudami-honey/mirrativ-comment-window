import React, { Component } from 'react';
import { connect } from 'react-redux';
import I18n, { i18n } from './I18n';
import Actions from './ActionCreators';
const log = process.env.NODE_ENV === 'development' ? console.log : () => { };

/**
 * 保存ボタン
 * @param {*} props
 */
const SaveButton = (props) => (
  <button className='saveButton' id='saveButton' onClick={props.onClick}><I18n res='saveButton' /></button>
);

/**
 * プレビュー
 * @param {*} props
 */
const Preview = (props) => (
  <div class="preview" style={{ backgroundColor: props.config.backgroundColor }}>
    <span className="username" style={{
      color: props.config.userNameColor,
      fontWeight: props.config.userNameBold ? 'bold' : 'normal'
    }}>username</span>
    <span className="comment" style={{
      color: props.config.commentColor,
      fontWeight: props.config.commentBold ? 'bold' : 'normal'
    }}>comment</span>
  </div>
);
const ColorOption = (props) => {
  return (<tr>
    <td><I18n res={props.labelRes} className='label' /></td>
    <td><input type="text" value={props.value} onChange={e => props.onChange(e.target.value)} /></td>
    {props.showBold &&
      <td>
        <label>
          <input type="checkbox" onChange={e => props.onBoldChange(e.target.checked)} checked={props.checked} /> bold
      </label>
      </td>
    }
  </tr>);
};
/**
 * 外観
 * @param {*} props
 */
function Main(props) {
  const config = props.config;
  const visibility = props.visibility;
  return (<div className="container">
    <table>
      <ColorOption
        labelRes='optionBackgroundColor'
        value={config.backgroundColor}
        onChange={props.onBackgroundColorChanged} />
      <ColorOption
        showBold={true}
        labelRes='optionUserNameColor'
        value={config.userNameColor}
        checked={config.userNameBold}
        onChange={props.onUserNameColorChanged}
        onBoldChange={props.onUserNameBoldChanged} />
      <ColorOption
        showBold={true}
        labelRes='optionCommentColor'
        value={config.commentColor}
        onChange={props.onCommentColorChanged}
        checked={config.commentBold}
        onBoldChange={props.onCommentBoldChanged} />
      <tr>
        <td colspan="3">
          <Preview config={config} />
        </td>
      </tr>
      <tr>
        <td colspan="3">
          <SaveButton onClick={() => props.save(props.config)} />
        </td>
      </tr>
    </table>
  </div>);
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  save: config => dispatch(Actions.save(config)),
  onBackgroundColorChanged: value => dispatch(Actions.changeBackgroundColor(value)),
  onUserNameColorChanged: value => dispatch(Actions.changeUserNameColor(value)),
  onCommentColorChanged: value => dispatch(Actions.changeCommentColor(value)),
  onUserNameBoldChanged: value => dispatch(Actions.changeUserNameBold(value)),
  onCommentBoldChanged: value => dispatch(Actions.changeCommentBold(value)),
  dispatch: action => dispatch(action)
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
