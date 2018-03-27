// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'
import { u } from './libs/umbrella.min.js';
const log = process.env.NODE_ENV === 'development' ? console.log : () => { };
(() => {
  // comment window
  const findTargetElement = (selector) => {
    if (selector) {
      return u(selector);
    }
    const $cl = u('#comment_list');
    if ($cl.length) {
      return $cl;
    }
    return u('div:first-of-type');
  };
  const $commentList = findTargetElement();
  const buildCommentItemDiv = (request) => {
    const $div = u('<div class="comment_item"/>');
    const $user = u('<span class="user"/>');
    $user.text(request.user);
    const $comment = u('<span class="comment"/>');
    $comment.text(request.comment);
    $div.append($user);
    $div.append($comment);
    return $div;
  };
  const applyConfig = (config) => {
    log('config:', config);
    // background-color
    u('body').attr({style: `background-color: ${config.backgroundColor}`});
  };
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    log('request:', request, ',sender:', sender);
    switch (request.action) {
      case 'commented': { // コメント受信
        const $commentItem = buildCommentItemDiv(request);
        $commentList.prepend($commentItem);
        sendResponse({ status: 'ok', message: 'received' });
        break;
      }
      case 'config': { // 設定変更
        applyConfig(request.config);
        break;
      }
    }
  });
})();