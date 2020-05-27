import React from 'react';
import { Layout } from 'antd';
import styles from './transactions.css';
import Navigation from '../components/Common/Navigation';
import AddTransaction from '../components/Transactions/AddTransaction';
import TransactionSheet from '../components/Transactions/TransactionSheet';

const {Content, Footer } = Layout;

export default () => {
  return (
    <div className={styles.container}>
      <Layout>
        <Navigation tab={'transactions'} />
        <Layout>
          <Content className={styles.content}>
            <div className={styles.center}>
              <TransactionSheet />
            </div>
          </Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
      <AddTransaction />
    </div>
  );
}
