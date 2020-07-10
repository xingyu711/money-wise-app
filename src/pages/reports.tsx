import React from 'react';
import { Layout } from 'antd';
import styles from './reports.css';
import Navigation from '../components/Common/Navigation';

const { Content, Footer } = Layout;

export default () => {

  return (
    <div className={styles.container}>
      <Layout>
        <Navigation tab={'reports'}/>
        <Layout>
          <Content className={styles.content}>Reports Page</Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
}
