import React, { PureComponent, Fragment } from 'react';
import { Card, Steps } from 'antd';
import PageHeaderWrapper from './components/PageHeaderWrapper';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import styles from './style.less';

const { Step } = Steps;

export default class StepForm extends PureComponent {
  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    switch (pathList[pathList.length - 1]) {
      case 'info':
        return 0;
      case 'confirm':
        return 1;
      case 'result':
        return 2;
      default:
        return 0;
    }
  }

  render() {
    const { location } = this.props;
    const { pathname } = location;
    let currentStep = null;
    if (/confirm\/?$/.test(pathname)) {
      currentStep = <Step2 />;
    } else if (/result\/?$/.test(pathname)) {
      currentStep = <Step3 />;
    } else {
      currentStep = <Step1 />;
    }
    return (
      <PageHeaderWrapper
        title="分步表单"
        tabActiveKey={location.pathname}
        content="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。"
      >
        <Card bordered={false}>
          <Fragment>
            <Steps current={this.getCurrentStep()} className={styles.steps}>
              <Step title="填写转账信息" />
              <Step title="确认转账信息" />
              <Step title="完成" />
            </Steps>
            {currentStep}
          </Fragment>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
