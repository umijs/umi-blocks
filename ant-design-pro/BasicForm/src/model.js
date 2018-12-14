import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { fakeSubmitForm } from './service';

export default {
  namespace: 'form',

  state: {},

  effects: {
    *submitRegularForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
  },
};
