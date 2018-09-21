import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { RequestsTable } from 'components/RequestsTable';
import { GET_REQUESTS_REQUEST } from 'constants/index';

class Requests extends Component {

  componentDidMount() {
    this.props.getRequests();
  }

  render() {
    const { requests, isFetching, error } = this.props.store;
    return (
      <React.Fragment>
        <h1>Requests</h1>
        <Button type="primary" href="/create" style={{margin: '10px 0'}}>Add new</Button>
        {isFetching ?
          <p>Loading... please wait</p>
            : error
            ? <p>Error: {error}</p>
              : requests.length > 0
                ? <RequestsTable requests={requests}/>
                  : <p>There are no requests yet</p>}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (store) => ({ store });

const mapDispatchToProps = (dispatch) => ({
  getRequests: () => dispatch({ type: GET_REQUESTS_REQUEST }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Requests);
