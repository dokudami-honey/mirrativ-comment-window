// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'
const log = process.env.NODE_ENV === 'development' ? console.log : () => { };
(() => {
  const pageStateMatchers = [{
    hostEquals: '192.168.33.30'
  }].map((option) => new chrome.declarativeContent.PageStateMatcher({
    pageUrl: option
  }));
  // 対象のページのみpage actionを有効化する
  chrome.runtime.onInstalled.addListener((details) => {
    // log('previousVersion', details.previousVersion)
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: pageStateMatchers,
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  });
  // メッセージ送信先の集合
  let targets = [];
  /**
   * 各tab(comments.html)にメッセージを送信する
   * @param {*} targets
   * @param {*} sender
   * @param {*} user
   * @param {*} comment
   */
  const sendComment = (targets, sender, user, comment) => {
    if (!sender || !sender.tab || targets.length === 0) {
      return [];
    }
    // senderで送信元のタブを特定する
    const tabId = sender.tab.id;
    log('send to', targets);
    const promises = targets
      .filter(t => t.from === tabId) // tabIdが一致するもののみメッセージを送信する
      .map(t => new Promise((resolve, reject) => {
        chrome.tabs.sendMessage(t.to, {
          action: 'commented',
          user: user,
          comment: comment,
          background: true
        }, (result) => {
          resolve(result);
        });
      }));
    return promises;
  };
  // contentscriptからのメッセージを受信する
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    log('onMessage:', request, sender);
    switch (request.action) {
      case 'comment': { // コメント受信
        const promises = sendComment(targets, sender, request.user, request.comment);
        // 複数のタブが開かれた場合も一応考慮(意味があるか分からないが、漏れたら漏れたで調査が面倒になりそうなため)
        Promise.all(promises)
          .then((result) => {
            console.log('message sent.', result);
            sendResponse({ status: 'ok' });
          });
        break;
      }
      case 'config': { // 設定変更
        // nothing to do.
        break;
      }
      default:
        console.log('unknown action:', request.action);
    }
  });
  // タブの変更を検知して不要なメッセージ送信を抑制する
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      // comment.htmlタブから出て行った場合の判定をどうやるか……
      log('onUpdated:', tabId, changeInfo, tab);
    }
  });
  // タブを閉じたら対象から除去する
  chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    log('onRemoved:', tabId, removeInfo);
    targets = targets.filter(t => t.to !== tabId);
    log('targets:', targets);
  });
  // pageActionをクリックしたときの処理
  chrome.pageAction.onClicked.addListener((tab) => {
    log('pageAction.onClicked', tab);
    // comment.htmlタブを追加
    chrome.tabs.create({
      url: 'pages/comments.html',
      index: tab.index + 1 // currentのタブの右に追加
    }, (newTab) => {
      // 送信元と紐づけるために格納
      targets = [...targets, { from: tab.id, to: newTab.id }];
      log('targets:', targets);
    });
  });
})();
