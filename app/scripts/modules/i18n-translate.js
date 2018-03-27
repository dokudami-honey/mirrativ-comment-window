import { u } from '../libs/umbrella.min.js';
export default () => {
  u('[data-resource]').each((elem) => {
    const $elem = u(elem);
    const text = chrome.i18n.getMessage($elem.data('resource'));
    $elem.html(text);
  });
}