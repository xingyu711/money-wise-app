import { Input, Table, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import React from 'react';
import styles from './TransactionSheet.css';
import moment from 'moment';

const {Search} = Input;

class TransactionSheet extends React.Component {
  componentWillReceiveProps(nextProps) {
    const {transactions} = nextProps;
    this.setState({
      dataSource: transactions,
    });
  }

  columns = [
    {
      title: 'Type',
      dataIndex: 'basic_type',
      key: 'basic_type',
      width: '12%',
      filters: [
        { text: 'Income', value: 'income' },
        { text: 'Expense', value: 'expense' },
      ],
      onFilter: (value, record) => record.basic_type.indexOf(value) === 0,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      width: '18%',
      key: 'category',
    },
    {
      title: 'Amount',
      key: 'amount',
      dataIndex: 'amount',
      width: '12%',
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
      width: '12%',
      render: (value) => value.toUpperCase(),
    },
    {
      title: 'Date',
      dataIndex: 'created',
      key: 'created',
      width: '15%',
      render: (value) => moment(value).format('l'),
      sorter: (a, b) => moment(a.created).unix() - moment(b.created).unix(),
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
      width: '23%',
    },
    {
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) => 
        this.state.dataSource.length >= 1 ? (
          <span>
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <DeleteOutlined />
            </Popconfirm>
          </span> 
        ) : null,
    },
  ];

  state = {
    dataSource: [],
  }

  handleDelete = (key: any) => {
    fetch('http://localhost:3000/transaction', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        transaction_id: key
      })
    })
      .then(response => response.json())
      
    this.setState({
      dataSource: this.state.dataSource.filter(item => item.transaction_id !== key),
    });
  };

  searchTransaction = (value: any) => {
    const userId = window.sessionStorage.getItem('user_id');
    fetch(`http://localhost:3000/transactions/${userId}?value=${value}`, {
      method: 'get',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => response.json())
      .then(data => this.setState( {dataSource: data.sort((a, b) => moment(b.created).unix() - moment(a.created).unix())} ));
  }

  render() {
    return (
      <div className={styles.container}>
        <Search
          placeholder="search transactions"
          onSearch={value => this.searchTransaction(value)}
          enterButton
          size="large"
          className={styles.searchBox}
        />
        <Table
          columns = {this.columns}
          dataSource = {this.state.dataSource.map((entry, i) => ({...entry, key: entry.transaction_id}))}
          className={styles.table}
          // expandable={{
          //   expandedRowRender: record => <p>Note: {record.note}</p>,
          //   rowExpandable: record => record.note !== null,
          // }}
          // scroll={{ y: 400}}
          pagination={{ pageSize: 7}}
        />
      </div>
      
    )
  }
}

export default TransactionSheet;