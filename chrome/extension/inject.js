import _ from 'lodash';
import $ from 'jquery';


window.addEventListener('load', () => {
  // const injectDOM = document.createElement('div');
  // injectDOM.className = 'inject-react-example';
  // injectDOM.style.textAlign = 'center';
  // document.body.appendChild(injectDOM);


  console.log('inject!!!');
  $('div:contains("코스모")').css('background-color', 'black');

  console.log($('div:contains("코스모")').css('background-color', 'black'));
});
