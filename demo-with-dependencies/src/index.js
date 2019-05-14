import React from 'react';
import { Row, Col } from 'antd';
import Demo from './Demo';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.container}>
      <Row><Col span={24}>I am a block with dependencies.</Col></Row>
      <Row>
        <Col span={12}><Demo /></Col>
        <Col span={12}><Demo /></Col>
      </Row>
    </div>
  )
}
