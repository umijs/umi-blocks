import React, { useState, useEffect, useRef } from '@alipay/bigfish/react';
import { Steps, Form, Card, message } from '@alipay/bigfish/antd';
import { usePageState, request } from '@ali/tarzan-lib';
import moment from 'moment';
import { PageCover } from '@ali/tarzan-ui';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const { Step } = Steps;

const DrawerTitleByOperateType = {
  ADD: '创建账号',
  DETAIL: '账号详情',
  EDIT: '编辑账号',
};

const steps = {
  basic: {
    title: '创建方案',
    component: Step1
  },
  setting: {
    title: '设置参数',
    component: Step2
  },
  deploy: {
    title: '发布实验',
    component: Step3
  }
}

const PlanEdit = props => {
  const [pageState, setPageState] = usePageState();
  const [formModel, setFormModel] = useState({});

  const { visible, operateType, record, currentStep } = pageState;
  const { handleClose } = props;

  const refs = []; // 渲染时，子步骤组件的引用
  // 获取详情数据
  useEffect(() => {
    setPageState({ currentStep: 0 });
    setFormModel({});
    if (visible && record) {
      request('/tarzan/api/planDetail', { method: 'post', data: { id: record.id } }).then(res => {
        setFormModel({
          ...res,
          operatingDate: [moment(res.startDate), moment(res.endDate)],
        });
      });
    }
  }, []);

  // 提交的统一处理 ---
  const handleSubmit = async e => {
    const data = {};
    for (let i = 0; i < refs.length; i++) {
      const result = await refs[i].current.handleSubmit();
      data[Object.keys(steps)[i]] = result;
    }

    request(
      '/tarzan/api/planList/update',
      { method: 'post', data },
      { button: e && e.target },
    ).then(res => {
      message.success('编辑成功');
      handleClose(true);
    });
  };

  const renderStep = () => {
    const keys = Object.keys(steps);
    const eles = [];

    for (let i = 0; i < keys.length; i++) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const stepRef = useRef(null);
      refs.push(stepRef);
      const stepEle = React.createElement(steps[keys[i]].component, {
        key: keys[i],
        handleSubmit, // 传递给最后一步时提交调用，此时需要判断前几步参数是否都已提交
        stepRef, // 传递给组件内部的引用
        formModel // 传递给组件内部赋值用
      });

      eles.push(<div style={{ display: currentStep === i ? 'block' : 'none' }}>{stepEle}</div>);
    }

    return eles;
  }

  return (
    <PageCover
      title={DrawerTitleByOperateType[operateType]}
      onClose={() => handleClose(false)}
      visible={visible}
      destroyOnClose
    >
      <Card loading={record && !(formModel || formModel.id)}>
        <div style={{ width: '600px', margin: '0 auto' }}>
          <Steps size="small" current={pageState.currentStep} onChange={currentStep => setPageState({ currentStep })}>
            {Object.keys(steps).map((key, index) => (
              <Step key={key} title={steps[key].title} />
            ))}
          </Steps>
          <div style={{ marginTop: '30px', marginLeft: '18px' }}>
            {renderStep()}
          </div>
        </div>
      </Card>
    </PageCover>
  );
};

export default Form.create({ name: 'PlanEditForm' })(PlanEdit);
