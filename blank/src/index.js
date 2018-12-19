import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';

import styles from './style.less';

@connect(({ BLOCK_NAME }) => BLOCK_NAME)
class Page extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'BLOCK_NAME/fetch',
    });
  }

  render() {
    const { text } = this.props;
    return (
      <div className={styles.container}>
        <Button>{text}</Button>
      </div>
    );
  }
}

export default Page;
