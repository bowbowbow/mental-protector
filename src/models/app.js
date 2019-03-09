import queryString from 'query-string';
import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import _ from 'lodash';
import request from '../utils/request';

export default {
  namespace: 'app',
  state: {
    power: true,
    keywords: [],
    warning: '',
  },
  subscriptions: {
    setupHistory({ dispatch, history }) {
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
      return {
        ...state,
        ...payload,
      };
    },
  },
};
