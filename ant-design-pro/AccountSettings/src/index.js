import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { FormattedMessage } from 'umi/locale';
import { Menu } from 'antd';
import styles from './style.less';
import BaseView from './components/base';
import SecurityView from './components/security';
import BindingView from './components/binding';
import NotificationView from './components/notification';

const { Item } = Menu;

@connect(({ BLOCK_NAME }) => ({
  currentUser: BLOCK_NAME.currentUser,
}))
class PAGE_NAME_UPPER_CAMEL_CASE extends Component {
  constructor(props) {
    super(props);
    const { match, location } = props;
    const menuMap = {
      base: <FormattedMessage id="app.settings.menuMap.basic" defaultMessage="Basic Settings" />,
      security: (
        <FormattedMessage id="app.settings.menuMap.security" defaultMessage="Security Settings" />
      ),
      binding: (
        <FormattedMessage id="app.settings.menuMap.binding" defaultMessage="Account Binding" />
      ),
      notification: (
        <FormattedMessage
          id="app.settings.menuMap.notification"
          defaultMessage="New Message Notification"
        />
      ),
    };
    const key = location.pathname.replace(`${match.path}/`, '');
    this.state = {
      mode: 'inline',
      menuMap,
      selectKey: menuMap[key] ? key : 'base',
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { location } = props;
    let selectKey = location.pathname.split('/').pop();
    selectKey = state.menuMap[selectKey] ? selectKey : 'base';
    if (selectKey !== state.selectKey) {
      return { selectKey };
    }
    return null;
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'BLOCK_NAME/fetchCurrent',
    });
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  getmenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map(item => <Item key={item}>{menuMap[item]}</Item>);
  };

  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    return menuMap[selectKey];
  };

  selectKey = ({ key }) => {
    router.push(`/account/settings/${key}`);
    this.setState({
      selectKey: key,
    });
  };

  resize = () => {
    if (!this.main) {
      return;
    }
    requestAnimationFrame(() => {
      if (!this.main) {
        return;
      }
      let mode = 'inline';
      const { offsetWidth } = this.main;
      if (this.main.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      this.setState({
        mode,
      });
    });
  };

  renderChildren = () => {
    const { selectKey } = this.state;
    switch (selectKey) {
      case 'base':
        return <BaseView />;
      case 'security':
        return <SecurityView />;
      case 'binding':
        return <BindingView />;
      case 'notification':
        return <NotificationView />;
      default:
        break;
    }

    return null;
  };

  render() {
    const { currentUser } = this.props;
    if (!currentUser.userid) {
      return '';
    }
    const { mode, selectKey } = this.state;
    return (
      <div
        className={styles.main}
        ref={ref => {
          this.main = ref;
        }}
      >
        <div className={styles.leftmenu}>
          <Menu mode={mode} selectedKeys={[selectKey]} onClick={this.selectKey}>
            {this.getmenu()}
          </Menu>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>{this.getRightTitle()}</div>
          {this.renderChildren()}
        </div>
      </div>
    );
  }
}

export default PAGE_NAME_UPPER_CAMEL_CASE;
