import React from 'react';
import { Route } from 'react-router-dom';
import { message } from 'antd';

import Requests from './Requests';
import CreateRequest from './CreateRequest';

const Root = () => {
  const showMessage = (text) => {
    message.info(text);
  }

  return (
  <React.Fragment>
    <Route exact path="/" component={Requests} />
    <Route path="/create" render={(props) => (
      <CreateRequest {...props} showMessage={showMessage}/>
    )} />
  </React.Fragment>
)};


export default Root;