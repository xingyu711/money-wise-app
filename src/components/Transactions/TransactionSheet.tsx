import { Table, Popconfirm } from 'antd';
import React from 'react';
import styles from './TransactionSheet.css';
import moment from 'moment';


class TransactionSheet extends React.Component {
  componentDidMount() {
    fetch('http://localhost:3000/transaction')
    .then(response => response.json())
    .then(data => this.setState( {dataSource: data.sort((a, b) => moment(b.created).unix() - moment(a.created).unix())} ));
  }

  columns = [
    {
      title: 'Type',
      dataIndex: 'basic_type',
      key: 'basic_type',
      filters: [
        { text: 'Income', value: 'income' },
        { text: 'Expense', value: 'expense' },
      ],
      onFilter: (value, record) => record.basic_type.indexOf(value) === 0,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      width: '20%',
      key: 'category',
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
      render: (value) => value.toUpperCase(),
    },
    {
      title: 'Amount',
      key: 'amount',
      dataIndex: 'amount',
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Date',
      dataIndex: 'created',
      key: 'created',
      render: (value) => moment(value).format('l'),
      sorter: (a, b) => moment(a.created).unix() - moment(b.created).unix(),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) =>
        this.state.dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
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
        id: key
      })
    })
      .then(response => response.json())
      
    
    this.setState({
      dataSource: this.state.dataSource.filter(item => item.id !== key),
    });
  };

  render() {
    return (
      <Table
        columns = {this.columns}
        dataSource = {this.state.dataSource.map((entry, i) => ({...entry, key: entry.id}))}
        className={styles.table}
        expandable={{
          expandedRowRender: record => <p>Note: {record.note}</p>,
          rowExpandable: record => record.note !== null,
        }}
        scroll={{ y: 400}}
        pagination={{ pageSize: 10}}
        bordered
      />
    )
  }
}

export default TransactionSheet;