import React from 'react';
import { Layout } from 'antd';
import styles from './index.css';
import Navigation from '../components/Common/Navigation';
import Overview from '../components/Home/Overview';

const { Header, Content, Sider, Footer } = Layout;

export default () => {
  
  return (
    <div className={styles.container}>
      <Layout>
        <Navigation tab={'overview'}/>
        <Layout>
          <Content className={styles.content}>
            <Overview/>
          </Content>
          <Sider width={'20%'} className={styles.sider}>Sider</Sider>
        </Layout>
        {/* <Footer className={styles.footer}>Footer</Footer> */}
      </Layout>
    </div>
  );
}