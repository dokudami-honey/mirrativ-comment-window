import React, { Component } from 'react';

export const i18n = (res) => chrome.i18n.getMessage(res);
const I18n = (props) => {
  const mes = i18n(props.res);
  return <span data-resource={props.res} className={props.className}>{mes}</span>;
};
export default I18n;