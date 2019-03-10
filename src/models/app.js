import queryString from 'query-string';
import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';
import _ from 'lodash';
import * as storage from '../utils/storage';

export default {
  namespace: 'app',
  state: {
    power: false,
    keywords: [],
    warning: '',
  },
  subscriptions: {
    setupHistory({ dispatch, history }) {
      storage.getState().then((state) => {
        dispatch({ type: 'updateState', payload: state });
      });
      chrome.runtime.onMessage.addListener(
        (request, sender, sendResponse) => {
          console.log('request :', request);
          return true; // for calling sendResponse asynchronously
        },
      );
      history.listen(({ pathname, search }) => {

      });
    },
  },
  effects: {
    * serviceStatus({ payload }, { put, call }) {
      // const res = yield call(service.serviceStatus, payload);
    },
  },
  reducers: {
    updateState(state, { payload }) {
      const nextState = {
        ...state,
        ...payload,
      };

      if (payload.keywords) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const tab = tabs[0];
          if (tab.url.indexOf('https://coinpan.com') === -1) return;

          chrome.tabs.sendMessage(tabs[0].id, {
            action: 'hide_keywords',
            data: { keywords: payload.keywords },
          }, (response) => {

          });
        });
      }

      storage.saveState(nextState);
      return nextState;
    },
  },
};
