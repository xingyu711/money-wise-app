import React from 'react';
import { history } from 'umi';
import { Menu, Avatar } from 'antd';
import { LogoutOutlined, PieChartOutlined, SettingOutlined, WalletOutlined, TransactionOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import styles from './Navigation.css';
import logo from './logoText.png';

const {Item, SubMenu} = Menu;

export default class Navigation extends React.Component {
  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    fetch(`http://localhost:3000/validate_user?token=${token}`)
      .then(response => response.json())
      .then(data => {
        if (data !== 1) {
          history.push({
            pathname: '/about'
        })
      }
    })
  }

  render() {
    const tab = this.props;

    const navigate = (pathname: string) =>  () => {
      const token = window.sessionStorage.getItem('token');
      fetch(`http://localhost:3000/validate_user?token=${token}`)
      .then(response => response.json())
      .then(data => {
        if (data === 1) {
          history.push(pathname);
        } else {
          history.push('/signin');
        }
    })
    }
  
    const toSignOut = () => {
      window.sessionStorage.clear();
      history.push('/signin');
    }

    return (
      <Menu theme="light" mode="horizontal" className={styles.menuStyle} defaultSelectedKeys={[tab]}>
        <Item key="logo" disabled className={styles.logoItem}>
          <img src={logo} alt="logo" className={styles.logo} />
        </Item>
        <Item key="overview" icon={<WalletOutlined />} onClick={navigate('/')}>Overview</Item>
        <Item key="transactions" icon={<TransactionOutlined />} onClick={navigate('/transactions')}>Transactions</Item>
        <Item key="reports" icon={<PieChartOutlined />} onClick={navigate('/reports')}>Reports</Item>
        <Item key="settings" icon={<SettingOutlined />} onClick={navigate('/settings')}>Settings</Item>
        <Item key="contactus" icon={<PhoneOutlined />} onClick={navigate('/contactus')}>Contact Us</Item>
        <SubMenu className={styles.submenuButton} title={<Avatar icon={<UserOutlined />} />}>
          <Menu.Item key="signout" icon={<LogoutOutlined />} onClick={toSignOut}>Sign Out</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}
