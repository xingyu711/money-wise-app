import React from 'react';
import { Layout } from 'antd';
import styles from './reports.css';
import Navigation from '../components/Common/Navigation';
import Reports from '../components/Reports/Reports';

const { Content, Footer } = Layout;

export default () => {
  return (
    <div className={styles.container}>
      <Layout>
        <Navigation tab={'reports'} />
        <Layout>
          <Content className={styles.content}>
            <Reports />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
