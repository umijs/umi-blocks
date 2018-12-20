import { getText } from './service';

export default {
  namespace: 'BLOCK_NAME_CAMEL_CASE',
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
