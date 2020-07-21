import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export default class Reports extends React.Component {
  state = {
    monthly_trend: [],
    daily_income_trend: [],
    daily_expense_trend: [],
  };

  getMonthlyTrend = () => {
    const userId = window.sessionStorage.getItem('user_id');
    const start = '2020-04-01';
    const end = '2020-07-31';
    fetch(
      `http://localhost:3000/monthly_trend/?user_id=${userId}&start=${start}&end=${end}`,
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          monthly_trend: data,
        });
        console.log(this.state);
      });
  };

  componentDidMount() {
    this.getMonthlyTrend();
  }

  render() {
    return (
      <LineChart
        width={600}
        height={300}
        data={this.state.monthly_trend}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="linear"
          dataKey="monthly_income"
          name="Monthly Income"
          stroke="#8884d8"
          activeDot={{ r: 6 }}
        />
        <Line
          type="linear"
          dataKey="monthly_expense"
          name="Monthly Expense"
          stroke="#82ca9d"
          activeDot={{ r: 6 }}
        />
      </LineChart>
    );
  }
}
