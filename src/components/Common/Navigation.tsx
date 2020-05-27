import React from 'react';
import { history } from 'umi';
import { Menu, Avatar } from 'antd';
import { LogoutOutlined, PieChartOutlined, SettingOutlined, WalletOutlined, TransactionOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import styles from './Navigation.css';
import logo from './logoText.png';

const {Item, SubMenu} = Menu;

const Navigation = ({tab}: {tab: string}) => {
  const toOverview = () => {
    history.push('/');
  };

  const toTransactions = () => {
    history.push('/transactions'); 
  }

  const toReports = () => {
    history.push('/reports');
  }

  const toSettings = () => {
    history.push('/settings');
  }

  const toSignOut = () => {
    history.push('/signin');
  }

  const toContactUs = () => {
    history.push('/contactus');
  }

  return (
    <Menu theme="light" mode="horizontal" className={styles.menuStyle} defaultSelectedKeys={[tab]}>
      <Item key="logo" disabled className={styles.logoItem}>
        <img src={logo} alt="logo" className={styles.logo} />
      </Item>
      <Item key="overview" icon={<WalletOutlined />} onClick={toOverview}>Overview</Item>
      <Item key="transactions" icon={<TransactionOutlined />} onClick={toTransactions}>Transactions</Item>
      <Item key="reports" icon={<PieChartOutlined />} onClick={toReports}>Reports</Item>
      <Item key="settings" icon={<SettingOutlined />} onClick={toSettings}>Settings</Item>
      <Item key="contactus" icon={<PhoneOutlined />} onClick={toContactUs}>Contact Us</Item>
      <SubMenu className={styles.submenuButton} title={<Avatar icon={<UserOutlined />} />}>
        <Menu.Item key="signout" icon={<LogoutOutlined />} onClick={toSignOut}>Sign Out</Menu.Item>
      </SubMenu>
    </Menu>
  )
}

export default Navigation;