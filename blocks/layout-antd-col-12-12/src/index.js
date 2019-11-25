import React from 'react';
import { Row, Col } from 'antd';

export default () => {
  return (
    <Row>
      <Col span={12} style={{ minHeight: 400, padding: 16, borderRight: '1px solid #DDD' }}>
        INSERT_BLOCK_PLACEHOLDER:Col 12
      </Col>
      <Col span={12} style={{ minHeight: 400, padding: 16 }}>
        INSERT_BLOCK_PLACEHOLDER:Col 12
      </Col>
    </Row>
  );
};
