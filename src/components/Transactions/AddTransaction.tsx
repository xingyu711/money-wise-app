import React from 'react';
import moment from 'moment';
import { Button, DatePicker, Dropdown, Menu, Modal, Input, Select, TreeSelect, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './AddTransaction.css';
import { create } from 'lodash';

const { Option } = Select;
const { TreeNode } = TreeSelect;
const { TextArea } = Input;
const dateFormat = 'YYYY/MM/DD';

const defaultForm = {
  basic_type: undefined,
  category: undefined,
  amount: undefined,
  currency: undefined,
  created: moment(),
  note: undefined,
};

interface Category {
  displayName: string;
  children?: Category[];
}

interface TreeNode {
  title: string;
  value: string;
  children?: TreeNode[];
}

const incomeCategories: Category[] = [
  { displayName: 'Alimony' },
  { displayName: 'Award' },
  { displayName: 'Salary' },
  { displayName: 'Gifts' },
  { displayName: 'Selling' },
  { displayName: 'Investment' },
  { displayName: 'Interest' },
  { displayName: 'Others'}
]

const expenseCategories: Category[] = [
  { displayName: 'Bills & Utilities', 
    children: [
      { displayName: 'Electricity' },
      { displayName: 'Gas' },
      { displayName: 'Internet' },
      { displayName: 'Phone' },
      { displayName: 'Rentals' },
      { displayName: 'Water' }
    ]
  },
  { displayName: 'Bussiness' },
  { displayName: 'Education' },
  { displayName: 'Entertainment' },
  { displayName: 'Family',
    children: [
      { displayName: 'Home' },
      { displayName: 'Children' },
      { displayName: 'Pets' },
    ],
  },
  { displayName: 'Fees & Charges' },
  { displayName: 'Food & Beverages' },
  { displayName: 'Friends & Lovers' },
  { displayName: 'Gifts & Donations' },
  { displayName: 'Health & Fitness',
    children: [
      { displayName: 'Doctor' },
      { displayName: 'Pharmacy' },
      { displayName: 'Personal Care' },
      { displayName: 'Sports' },
    ]
  },
  { displayName: 'Insurances' },
  { displayName: 'Investment' },
  { displayName: 'Shoppings',
    children: [
      { displayName: 'Accesories' },
      { displayName: 'Clothing' },
      { displayName: 'Cosmetics' },
      { displayName: 'Electronics' },
      { displayName: 'Footware' },
    ]
  },
  { displayName: 'Transportations',
    children: [
      { displayName: 'Maintenance' },
      { displayName: 'Parking Fees' },
      { displayName: 'Petrol' },
      { displayName: 'Taxi' }
    ]
  },
  { displayName: 'Travel' },
  { displayName: 'Others' },
]

const convertCategoryToTreeNode: (category: Category) => TreeNode = (category: Category) => {
  if (!category.children || !category.children.length) {
    return {
      title: category.displayName, 
      value: category.displayName.toLowerCase(),
    };
  }
  return {
    title: category.displayName, 
    value: category.displayName.toLowerCase(),
    children: category.children.map((child: Category) => convertCategoryToTreeNode(child)),
  };
}

const buildExpenseTree = () => {
  const treeData: TreeNode[] = [];
  expenseCategories.forEach((category: Category) => {
    const treeNode: TreeNode = {
      title: category.displayName,
      value: category.displayName.toLowerCase(),
    };
    if (category.children) {
      treeNode.children = category.children.map((child: Category) => convertCategoryToTreeNode(child));
    }
    treeData.push(treeNode);
  })
  return treeData;
}

const buildIncomeTree = () => {
  const treeData: TreeNode[] = [];
  incomeCategories.forEach((category: Category) => {
    const treeNode: TreeNode = {
      title: category.displayName,
      value: category.displayName.toLowerCase(),
    };
    if (category.children) {
      treeNode.children = category.children.map((child: Category) => convertCategoryToTreeNode(child));
    }
    treeData.push(treeNode);
  })
  return treeData;
}


class AddTransaction extends React.Component {
  state = { 
    visibleIncome: false,
    visibleExpense: false,
    form: defaultForm,
  }

  showIncomeModal = () => {
    this.setState({
      visibleIncome: true,
      form: defaultForm,
    });
  }

  showExpenseModal = () => {
    this.setState({
      visibleExpense: true,
      form: defaultForm,
    });
  }

  menu = (
    <Menu>
      <Menu.Item>
        <Button type="link" onClick={this.showIncomeModal}>
          Add Income
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button type="link" onClick={this.showExpenseModal}>
          Add Expense
        </Button>
      </Menu.Item>
    </Menu>
  )

  handleAddIncome = () => {
    const { category, amount, currency, created, note} = this.state.form;
    console.log(created)
    fetch('http://localhost:3000/transaction', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user_id: window.sessionStorage.getItem('user_id'),
        basic_type: 'income',
        category: category,
        amount: amount,
        currency: currency,
        created: created,
        note: note
      })
    }).then(response => {
      this.props.loadTransactions();
    });

    this.setState({
      visibleIncome: false,
      visibleExpense: false,
    });
  }

  handleAddExpense = () => {
    const { category, amount, currency, created, note} = this.state.form;
    fetch('http://localhost:3000/transaction', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user_id: window.sessionStorage.getItem('user_id'),
        basic_type: 'expense',
        category: category,
        amount: amount,
        currency: currency,
        created: created,
        note: note
      })
    })
      .then(response => {
        this.props.loadTransactions();
      })

    this.setState({
      visibleIncome: false,
      visibleExpense: false,
    });
  }

  handleCancel = (e: any) => {
    this.setState({
      visibleIncome: false,
      visibleExpense: false,
    });
  }

  handleChange = (key: string) => {
    return (value: any) => {
      this.setState({
        form: {...this.state.form, [key]: value},
      });
    };
  }

  render () {
    return (
      <div>
        <Dropdown overlay={this.menu} placement="topLeft">
        <Button
          type="primary"
          size="large"
          shape="circle"
          icon={<PlusOutlined/>}
          className={styles.button}
        />
        </Dropdown>

        <Modal
          title="Add Transaction - Income"
          visible={this.state.visibleIncome}
          onOk={this.handleAddIncome}
          onCancel={this.handleCancel}
          width={650}
          footer={[
            <Button key="cancel" onClick={this.handleCancel}>Cancel</Button>,
            <Button key="add" type="primary" onClick={this.handleAddIncome}>Add</Button>,
          ]}
        >
          <Row gutter={[16, 24]} className={styles.row}>
            <Col className="gutter-row" span={12}>
              <div>
                <span className={styles.inputLabel}>Category</span>
                <TreeSelect
                  showSearch
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto'}}
                  className={styles.inputBox}
                  treeData={buildIncomeTree()}
                  onChange={this.handleChange('category')}
                />
              </div>
            </Col>

            <Col className="gutter-row" span={12}>
              <div>
                <span className={styles.inputLabel}>Date</span>
                <DatePicker
                  value={this.state.form.created}
                  format={dateFormat}
                  onChange={(date, dateString) => this.handleChange('created')(date)}
                  className={styles.inputBox}
                />
              </div>
            </Col>
          </Row>

          <Row gutter={[16, 24]} className={styles.row}>
            <Col className="gutter-row" span={12}>
              <div>
                <span className={styles.inputLabel}>Amount</span>
                <Input 
                  type="number" 
                  className={styles.inputBox} 
                  value={this.state.form.amount}
                  onChange={(e) => this.handleChange('amount')(e.target.value)}
                />
              </div>
            </Col>
            
            <Col className="gutter-row" span={12}>
              <div>
                <span className={styles.inputLabel}>Currency</span>
                <Select
                  showSearch
                  className={styles.inputBox}
                  value={this.state.form.currency}
                  optionFilterProp="children"
                  onChange={this.handleChange('currency')}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value="usd">USD</Option>
                </Select>
              </div>
            </Col>
          </Row>

          <Row gutter={[16, 24]} className={styles.row}>
            <Col className="gutter-row" span={24}>
              <div>
                <span className={styles.inputLabel}>Note</span>
                <TextArea
                  className={styles.note}
                  value={this.state.form.note}
                  onChange={(e) => this.handleChange('note')(e.target.value)}
                />
              </div>
            </Col>
          </Row>
        </Modal>

        <Modal
          title="Add Transaction - Expense"
          visible={this.state.visibleExpense}
          onOk={this.handleAddExpense}
          onCancel={this.handleCancel}
          width={650}
          footer={[
            <Button key="cancel" onClick={this.handleCancel}>Cancel</Button>,
            <Button key="add" type="primary" onClick={this.handleAddExpense}>Add</Button>,
          ]}
        >
          <Row gutter={[16, 24]} className={styles.row}>
            <Col className="gutter-row" span={12}>
              <div>
                <span className={styles.inputLabel}>Category</span>
                <TreeSelect
                  showSearch
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto'}}
                  className={styles.inputBox}
                  treeData={buildExpenseTree()}
                  onChange={this.handleChange('category')}
                />
              </div>
            </Col>

            <Col className="gutter-row" span={12}>
              <div>
                <span className={styles.inputLabel}>Date</span>
                <DatePicker
                  value={this.state.form.created}
                  format={dateFormat}
                  onChange={(date, dateString) => this.handleChange('created')(date)}
                  className={styles.inputBox}
                />
              </div>
            </Col>
          </Row>

          <Row gutter={[16, 24]} className={styles.row}>
            <Col className="gutter-row" span={12}>
              <div>
                <span className={styles.inputLabel}>Amount</span>
                <Input 
                  type="number" 
                  className={styles.inputBox} 
                  value={this.state.form.amount}
                  onChange={(e) => this.handleChange('amount')(e.target.value)}
                />
              </div>
            </Col>
            
            <Col className="gutter-row" span={12}>
              <div>
                <span className={styles.inputLabel}>Currency</span>
                <Select
                  showSearch
                  className={styles.inputBox}
                  value={this.state.form.currency}
                  optionFilterProp="children"
                  onChange={this.handleChange('currency')}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value="usd">USD</Option>
                </Select>
              </div>
            </Col>
          </Row>

          <Row gutter={[16, 24]} className={styles.row}>
            <Col className="gutter-row" span={24}>
              <div>
                <span className={styles.inputLabel}>Note</span>
                <TextArea
                  className={styles.note}
                  value={this.state.form.note}
                  onChange={(e) => this.handleChange('note')(e.target.value)}
                />
              </div>
            </Col>
          </Row>
        </Modal>

      </div>
    )
  }
}

export default AddTransaction;