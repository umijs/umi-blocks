/* eslint-disable no-unused-expressions */
import React, { useImperativeHandle } from '@alipay/bigfish/react';
import { Form, Button, Checkbox } from '@alipay/bigfish/antd';
import { usePageState } from '@ali/tarzan-lib';
import { FormItem, Select } from '@ali/tarzan-ui';

const Step3 = props => {
  const [pageState, setPageState] = usePageState();
  const { formModel } = props;

  const isDetail = pageState.operateType === 'DETAIL';
  const commonConfig = { style: { width: '250px' }, required: true, disabled: isDetail };

  const { currentStep } = pageState;

  // 提交的统一处理 ---
  const handleSubmit = e => {
    e && e.preventDefault();
    return new Promise((resolve, reject) => {
      props.form.validateFields((err, values) => {
        if (err) {
          return reject(err);
        }
    
        resolve(values);
        e && props.handleSubmit();
      });
    });
  }
  const { stepRef, form } = props;
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
        label="部署单元"
        id="deplpyUnit"
        required
        initialValue={formModel.deplpyUnit}
      >
        <Checkbox.Group options={pageState.deplpyUnit} {...commonConfig} style={{ width: '100%' }} />
      </FormItem>
      <FormItem
        form={form}
        label="调度策略"
        id="strategy"
        required
        initialValue={formModel.strategy}
      >
        <Select data={pageState.strategy} isContainEmpty {...commonConfig} />
      </FormItem>

      <div className="form-detail-buttons" style={{margin: '20px 0'}}>
        <Button onClick={() => setPageState({ currentStep: currentStep - 1 })}>上一步</Button>
        {!isDetail && <Button type="primary" htmlType="submit">提 交</Button>}
      </div>
    </Form>
  );
};

export default Form.create({ name: 'Step3' })(Step3);
