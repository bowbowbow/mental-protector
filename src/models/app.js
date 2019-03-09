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
      storage.saveState(nextState);
      return nextState;
    },
  },
};
