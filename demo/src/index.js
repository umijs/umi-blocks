import { getText } from '@/utils/helper';
import styles from './index.less';
import React from 'react';
import { Button } from 'antd';

export default () => {
  return <Button className={styles.container}>{getText()}</Button>
}
