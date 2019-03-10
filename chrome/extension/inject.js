import $ from 'jquery';

// console.log('inject contents script to coinpan.com');

let beforeKeywords = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // console.log('[contents script] message :', message);
  const action = message.action;
  const data = message.data;

  if (action === 'hide_keywords') {
    const keywords = data.keywords;

    // console.log('beforeKeywords:', beforeKeywords, ', keywords:', keywords);

    for (let i = 0; i < keywords.length; i++) {
      const keyword = keywords[i];

      const beforeKeywordIndex = beforeKeywords.indexOf(keyword);
      if (beforeKeywordIndex >= 0) {
        beforeKeywords.splice(beforeKeywordIndex, 1);
      }

      $(`a:contains("${keyword}")`).parent('li').hide();
      $(`td:contains("${keyword}")`).parent('tr').hide();
    }

    for (let i = 0; i < beforeKeywords.length; i++) {
      const keyword = beforeKeywords[i];

      // console.log('restore :', keyword);

      $(`a:contains("${keyword}")`).parent('li').show();
      $(`td:contains("${keyword}")`).parent('tr').show();
    }

    beforeKeywords = keywords;
  }
});

// window.addEventListener('load', () => {
//   // const injectDOM = document.createElement('div');
//   // injectDOM.className = 'inject-react-example';
//   // injectDOM.style.textAlign = 'center';
//   // document.body.appendChild(injectDOM);
//
//   console.log('inject contents script to coinpan.com');
//
//   // $('div:contains("코스모")').css('background-color', 'black');
//
//   // $('td:contains("코스모")').parent('tr').hide();
//   $('a:contains("코스모")').hide();
//
//   console.log( $('div:contains("코스모")'));
// });
