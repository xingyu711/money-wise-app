import React from 'react';
import { Layout } from 'antd';
import styles from './index.css';
import Navigation from '../components/Common/Navigation';

const { Header, Content, Sider, Footer } = Layout;

export default () => {
  return (
    <div className={styles.container}>
      <Layout>
        <Navigation tab={'overview'}/>
        <Layout>
          <Content className={styles.content}>Content</Content>
          <Sider width={300} className={styles.sider}>Sider</Sider>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
}