import { getText } from './service';

export default {
  namespace: 'page', // TODO: 修改为有意义的 namespace
  state: {
    text: 'loading...',
  },

  effects: {
    *fetch(_, { call, put }) {
      const { text } = yield call(getText);
      yield put({
        type: 'save',
        payload: {
          text,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
