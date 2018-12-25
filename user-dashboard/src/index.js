import { Component } from 'react';
import { connect } from 'dva';
import Users from './components/Users';

class BLOCK_NAME extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'BLOCK_NAME/fetch',
      payload: {
        page: 1,
      },
    });
  }

  render() {
    return (
      <div>
        <Users />
      </div>
    );
  }
}

export default connect()(BLOCK_NAME);
