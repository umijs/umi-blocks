import React from 'react';
import { Row, Col } from 'antd';

export default () => {
  return (
    <Row>
      <Col span={12} style={{ minHeight: '20px', background: '#fecccc' }}>INSERT_BLOCK_PLACEHOLDER:Col 12</Col>
      <Col span={12} style={{ minHeight: '20px', background: '#82caff' }}>INSERT_BLOCK_PLACEHOLDER:Col 12</Col>
    </Row>
  );
}
