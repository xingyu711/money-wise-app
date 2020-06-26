import React from 'react';
import Transactions from '../components/Transactions/Transactions';

export default () => {
  const {user_id} = history.state.state;

  return (
    <Transactions userId={user_id}/>
  );
}
