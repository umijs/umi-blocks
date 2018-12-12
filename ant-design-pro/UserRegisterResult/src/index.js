import React from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Button } from 'antd';
import Link from 'umi/link';
import { Result } from 'ant-design-pro';
import styles from './style.less';
import UserLayout from './components/UserLayout';

const actions = (
  <div className={styles.actions}>
    <a href="">
      <Button size="large" type="primary">
        <FormattedMessage id="app.register-result.view-mailbox" />
      </Button>
    </a>
    <Link to="/">
      <Button size="large">
        <FormattedMessage id="app.register-result.back-home" />
      </Button>
    </Link>
  </div>
);

const RegisterResult = ({ location }) => (
  <UserLayout>
    <Result
      className={styles.registerResult}
      type="success"
      title={
        <div className={styles.title}>
          <FormattedMessage
            id="app.register-result.msg"
            values={{ email: location.state ? location.state.account : 'AntDesign@example.com' }}
          />
        </div>
      }
      description={formatMessage({ id: 'app.register-result.activation-email' })}
      actions={actions}
      style={{ marginTop: 56 }}
    />
  </UserLayout>
);

export default RegisterResult;
