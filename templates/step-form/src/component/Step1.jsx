import React, { useImperativeHandle } from '@alipay/bigfish/react';
import { Form, Input, Button } from '@alipay/bigfish/antd';
import { usePageState } from '@ali/tarzan-lib';
import { FormItem } from '@ali/tarzan-ui';

const Step1 = props => {
  const [pageState, setPageState] = usePageState();
  const { formModel } = props;

  const commonConfig = { style: { width: '250px' }, required: true, disabled: pageState.operateType === 'DETAIL' };

  const { currentStep } = pageState;

  // 提交的统一处理 ---
  const handleSubmit = e => {
    // eslint-disable-next-line no-unused-expressions
    e && e.preventDefault();
    return new Promise((resolve, reject) => {
      props.form.validateFields((err, values) => {
        if (err) {
          // 当在第三步提交时，判断发现该步骤有校验没通过，则聚焦到该页面
          // eslint-disable-next-line no-unused-expressions
          !e && setPageState({ currentStep: 0 });
          return reject(err);
        }

        // eslint-disable-next-line no-unused-expressions
        e && setPageState({ currentStep: currentStep + 1 });

        resolve(values);
      });
    })
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
        label="方案名称"
        id="name"
        required
        initialValue={formModel.name}
      >
        <Input {...commonConfig} />
      </FormItem>

      <FormItem
        form={form}
        label="方案描述"
        id="desc"
        initialValue={formModel.desc}
      >
        <Input.TextArea {...commonConfig} style={{ width: '100%' }} />
      </FormItem>

      <div className="form-detail-buttons" style={{ margin: '20px 0' }}>
        <Button type="primary" htmlType="submit">下一步</Button>
      </div>
    </Form>
  );
};

export default Form.create({ name: 'Step1' })(Step1);
