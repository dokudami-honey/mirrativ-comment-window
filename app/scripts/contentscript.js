// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'
import { u } from './libs/umbrella.min.js';
const log = process.env.NODE_ENV === 'development' ? console.log : () => { };
(() => {
  // // comment window
  // const findTargetElement = (selector) => {
  //   if (selector) {
  //     return u(selector);
  //   }
  //   const $cl = u('#comment_list');
  //   if ($cl.length) {
  //     return $cl;
  //   }
  //   return u('div:first-of-type');
  // };
  // const $commentList = findTargetElement();
  // const buildCommentItem = (request) => {
  //   const $div = u('<div class="comment_item"/>');
  //   const $user = u('<span class="user"/>');
  //   $user.text(request.user);
  //   const $comment = u('<span class="comment"/>');
  //   $comment.text(request.comment);
  //   $div.append($user);
  //   $div.append($comment);
  //   return $div;
  // };
  // chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  //   log(request);
  //   const $commentItem = buildCommentItem(request);
  //   $commentList.prepend($commentItem);
  // });
  // mirrativ window
  const $wrapper = u('.mrWrapper');
  const handlingEvent = 'DOMSubtreeModified';
  const commentBlockSelector = '.mrChatList__list span';
  const commentItemSelector = '.mrChatList__item';
  const sentFlagData = 'sent';
  $wrapper.on(handlingEvent, commentBlockSelector, e => {
    u(commentItemSelector).not('[data-' + sentFlagData + ']').each(elem => {
      const $elem = u(elem);
      $elem.data(sentFlagData, 'true');
      // コメント者の名前と発言内容を取得
      const $children = $elem.children();
      const $user_text = u($children.nodes[1]).children();
      const user_name = u($user_text.nodes[0]).text();
      const comment = u($user_text.nodes[1]).text();
      const message = { action: 'comment', user: user_name, comment: comment };
      log('message:', message);
      chrome.runtime.sendMessage(message, (response) => {
        log('response:', response);
      });
    });
  });
})();