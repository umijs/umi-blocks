import * as usersService from './service';

export default {
  namespace: 'BLOCK_NAME',
  state: {
    list: [],
    total: null,
    page: null,
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
  },
  effects: {
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const { data, total, page: currentPage } = yield call(usersService.fetch, { page });
      yield put({
        type: 'save',
        payload: {
          data,
          total,
          page: currentPage,
        },
      });
    },
    *remove({ payload: id }, { call, put, select }) {
      yield call(usersService.remove, id);
      const page = yield select(state => state['BLOCK_NAME'].page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *patch({ payload: { id, values } }, { call, put, select }) {
      yield call(usersService.patch, id, values);
      const page = yield select(state => state['BLOCK_NAME'].page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *create({ payload: values }, { call, put, select }) {
      yield call(usersService.create, values);
      const page = yield select(state => state['BLOCK_NAME'].page);
      yield put({ type: 'fetch', payload: { page } });
    },
  },
};
