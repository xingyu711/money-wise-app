import React from 'react';
import { Layout } from 'antd';
import styles from './index.css';
import Navigation from '../components/Common/Navigation';
import Overview from '../components/Home/Overview';

const { Header, Content, Sider, Footer } = Layout;

export default () => {
  const {user_id} = history.state.state;
  
  return (
    <div className={styles.container}>
      <Layout>
        <Navigation tab={'overview'} userId={user_id}/>
        <Layout>
          <Content className={styles.content}>
            <Overview userId={user_id}/>
          </Content>
          <Sider width={'20%'} className={styles.sider}>Sider</Sider>
        </Layout>
        {/* <Footer className={styles.footer}>Footer</Footer> */}
      </Layout>
    </div>
  );
}