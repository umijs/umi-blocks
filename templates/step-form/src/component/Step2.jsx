/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useImperativeHandle } from '@alipay/bigfish/react';
import { Drawer, Form, Card, Input, DatePicker, message, Button } from '@alipay/bigfish/antd';
import { usePageState } from '@ali/tarzan-lib';
import { FormItem, Select } from '@ali/tarzan-ui';

const Step2 = props => {
  const [pageState, setPageState] = usePageState(); // 共享的数据 ---

  const { formModel } = props; // 通过详情页传递的数据 ---

  const commonConfig = { style: { width: '250px' }, required: true, disabled: pageState.operateType === 'DETAIL' };
  const { currentStep } = pageState;

  // 提交的统一处理，可能在Edit中调用 ---
  const handleSubmit = e => {
    e && e.preventDefault();
    return new Promise((resolve, reject) => {
      props.form.validateFields((err, values) => {
        if (err) {
          !e && setPageState({ currentStep: 1 });
          return reject(err);
        }

        e && setPageState({ currentStep: currentStep + 1 });

        resolve(values);
      });
    })
  }

  const { stepRef, form } = props;
  // 暴露出去给edit页面调用
  useImperativeHandle(stepRef, () => ({
    handleSubmit,
  }));

  return (
    <Form
      className="form-detail"
      style={{ width: '600px', margin: '0 auto' }}
      onSubmit={handleSubmit}
    >
      <FormItem
        form={form}
        label="运营时间"
        id="operatingDate"
        required
        initialValue={formModel.operatingDate}
      >
        <DatePicker.RangePicker {...commonConfig} />
      </FormItem>
      <FormItem
        form={form}
        label="状态"
        id="status"
        required
        initialValue={formModel.status}
      >
        <Select data={pageState.statusMap} isContainEmpty {...commonConfig} />
      </FormItem>

      <div className="form-detail-buttons" style={{margin: '20px 0'}}>
        <Button onClick={() => setPageState({ currentStep: currentStep - 1 })}>上一步</Button>
        <Button type="primary" htmlType="submit">下一步</Button>
      </div>
    </Form>
  );
};

export default Form.create({ name: 'Step2' })(Step2);
