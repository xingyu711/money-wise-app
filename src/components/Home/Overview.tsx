import React from 'react';
import { Card, Col, Row, Table } from 'antd';
import styles from './Overview.css';
import moment from 'moment';
import _ from 'lodash';

const columns = [
  {
    title: '',
    dataIndex: 'basic_type',
    key: 'basic_type',
  },
  {
    title: 'Weekly',
    dataIndex: 'weekly',
    key: 'weekly',
  },
  {
    title: 'Monthly',
    dataIndex: 'monthly',
    key: 'monthly',
  },
  {
    title: 'Yearly',
    dataIndex: 'yearly',
    key: 'yearly',
  },
]


export default class Overview extends React.Component {

  state = {
    displayName: '',
    joined: '',
    duration: 0,
    numTransactions: 0,
    numIncome: 0,
    numExpense: 0,
    sumIncome: 0,
    sumExpense: 0,
    data: [
      {
        key: '1',
        basic_type: 'Income',
        weekly: '',
        monthly: '',
        yearly: '',
      },
      {
        key: '2',
        basic_type: 'Expense',
        weekly: '',
        monthly: '',
        yearly: '',
      }
    ]
  }

  getUserInfo = () => {
    const {userId} = this.props;
    fetch(`http://localhost:3000/user/${userId}`)
      .then(response => response.json())
      .then(data => {
        var a = moment(data[0].joined)
        var b = moment()
        this.setState({
          displayName: data[0].first_name,
          joined: moment(data[0].joined).format('l'),
          duration: b.diff(a, 'days')
        })
      })
  }

  getNumTransactions = () => {
    const {userId} = this.props;
    fetch(`http://localhost:3000/num_transactions/${userId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          numTransactions: data,
        })
      })
  }

  getNumIncome = () => {
    const {userId} = this.props;
    fetch(`http://localhost:3000/num_income/${userId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          numIncome: data,
        })
      })
  }

  getNumExpense = () => {
    const {userId} = this.props;
    fetch(`http://localhost:3000/num_expense/${userId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          numExpense: data,
        })
      })
  }

  getSumIncome = () => {
    const {userId} = this.props;
    fetch(`http://localhost:3000/sum_income/${userId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          sumIncome: parseFloat(data).toFixed(2),
        })
      })
  }

  getSumExpense = () => {
    const {userId} = this.props;
    fetch(`http://localhost:3000/sum_expense/${userId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          sumExpense: parseFloat(data).toFixed(2),
        })
      })
  }

  getWeeklyIncome = () => {
    const {userId} = this.props;
    fetch(`http://localhost:3000/weekly_income/${userId}`)
      .then(response => response.json())
      .then(value => {
        const data = _.cloneDeep(this.state.data)
        data[0].weekly = '$ ' + parseFloat(value).toFixed(2);
        this.setState({data});
      });
  }

  getWeeklyExpense = () => {
    const {userId} = this.props;
    fetch(`http://localhost:3000/weekly_expense/${userId}`)
      .then(response => response.json())
      .then(value => {
        const data = _.cloneDeep(this.state.data)
        data[1].weekly = '$ ' + parseFloat(value).toFixed(2);
        this.setState({data});
      });
  }

  getMonthlyIncome = () => {
    const {userId} = this.props;
    fetch(`http://localhost:3000/monthly_income/${userId}`)
      .then(response => response.json())
      .then(value => {
        const data = _.cloneDeep(this.state.data)
        data[0].monthly = '$ ' + parseFloat(value).toFixed(2);
        this.setState({data});
      });
  }

  getMonthlyExpense = () => {
    const {userId} = this.props;
    fetch(`http://localhost:3000/monthly_expense/${userId}`)
      .then(response => response.json())
      .then(value => {
        const data = _.cloneDeep(this.state.data)
        data[1].monthly = '$ ' + parseFloat(value).toFixed(2);
        this.setState({data});
      });
  }

  getYearlyIncome = () => {
    const {userId} = this.props;
    fetch(`http://localhost:3000/yearly_income/${userId}`)
      .then(response => response.json())
      .then(value => {
        const data = _.cloneDeep(this.state.data)
        data[0].yearly = '$ ' + parseFloat(value).toFixed(2);
        this.setState({data});
      });
  }

  getYearlyExpense = () => {
    const {userId} = this.props;
    fetch(`http://localhost:3000/yearly_expense/${userId}`)
      .then(response => response.json())
      .then(value => {
        const data = _.cloneDeep(this.state.data)
        data[1].yearly = '$ ' + parseFloat(value).toFixed(2);
        this.setState({data});
      });
  }

  componentDidMount() {
    this.getUserInfo();
    this.getNumTransactions();
    this.getNumIncome();
    this.getNumExpense();
    this.getSumIncome();
    this.getSumExpense();
    this.getWeeklyIncome();
    this.getWeeklyExpense();
    this.getMonthlyIncome();
    this.getMonthlyExpense();
    this.getYearlyIncome();
    this.getYearlyExpense();
  }

  render() {
    return (
      <div className={styles.content}>
        <div className={styles.textBox}>
          <p className={styles.text}>
            Welcome back, <strong>{this.state.displayName}</strong>.
          </p>
          <p className={styles.text}>
            You have used Money Wise for <strong>{this.state.duration}</strong> days, starting from <strong>{this.state.joined}</strong>. 
          </p>
          <p className={styles.text}>
            You have in total <strong>{this.state.numTransactions}</strong> transactions: {this.state.numExpense} expenses, and {this.state.numIncome} incomes.
          </p>
        </div>

        <p className={styles.title}>Asset Overview</p>
        <Row gutter={16} className={styles.box}>
          <Col span={8}>
            <Card bordered={false}>
              <p>You have earned:</p>
              <p className={styles.income}>$ {this.state.sumIncome}</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <p>You have spent:</p>
              <p className={styles.expense}>$ {this.state.sumExpense}</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <p>Your net income is:</p>
              <p className={styles.net}>$ {(this.state.sumIncome - this.state.sumExpense).toFixed(2)}</p>
            </Card>
          </Col>
        </Row>

        <p className={styles.title}>Balance Sheet</p>
        <Table columns={columns} dataSource={this.state.data} pagination={false} className={styles.box}/>

      </div>
    )
  }
}