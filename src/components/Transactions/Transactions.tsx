import React from 'react';
import { Layout } from 'antd';
import styles from './Transactions.css';
import Navigation from '../Common/Navigation';
import AddTransaction from './AddTransaction';
import TransactionSheet from './TransactionSheet';
import moment from 'moment';

const {Content, Footer } = Layout;


export default class Transactions extends React.Component {
  state = {
    transactions: [],
  }
  
  componentDidMount() {
    this.loadTransactions();
  }

  loadTransactions = () => {
    const {userId} = this.props;
    fetch(`http://localhost:3000/transactions/${userId}`)
    .then(response => response.json())
    .then(data => {
      this.setState({
        transactions: data.sort((a, b) => moment(b.created).unix() - moment(a.created).unix()),
      });
    })
  }

  render() {
    const {userId} = this.props;
    const {transactions} = this.state;

    return (
      <div className={styles.container}>
        <Layout>
          <Navigation tab={'transactions'} userId={userId}/>
          <Layout>
            <Content className={styles.content}>
              <div className={styles.center}>
                <TransactionSheet userId={userId} transactions={transactions}/>
              </div>
            </Content>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>
        <AddTransaction userId={userId} loadTransactions={this.loadTransactions}/>
      </div>
    );
  }
}
