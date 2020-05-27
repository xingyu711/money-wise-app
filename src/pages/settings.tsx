import React from 'react';
import {Layout} from 'antd';
import styles from './settings.css';
import Navigation from '../components/Common/Navigation';

const { Content, Footer } = Layout;

export default () => {
  return (
    <div className={styles.container}>
      <Layout>
        <Navigation tab={'settings'}/>
        <Layout>
          <Content className={styles.content}>Settings Page</Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
}
