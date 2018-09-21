import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, InputNumber, DatePicker, Button, message } from 'antd';
import moment from 'moment';
import PriceInput from 'components/PriceInput';
import { getInterval } from 'helpers/getInterval';
import { ADD_REQUEST_REQUEST } from 'constants/index';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

class CreateRequest extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const payload = Object.assign(
          {},
          values.price,
          { passengers: values.passengers },
          { date_from: moment(values.fromUntil[0]).format(dateFormat) },
          { date_until: moment(values.fromUntil[1]).format(dateFormat) },
        );
        this.props.addRequest(payload);
        this.props.history.push('/');
      }
    });
  }

  checkPrice = (rule, value, callback) => {
    if (value.price > 0) {
      callback();
      return;
    }
    callback('Price must greater than 0');
  }

  checkPassengers = (rule, value, callback) => {
    if (value > 0) {
      callback();
      return;
    }
    callback('Passengers must greater than 0');
  }

  handleCalendarChange = (value) => {
    if (value[0] && value[1]) {
      message.info(`Выбран интервал: ${getInterval(value[0], value[1])}`);
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const priceConfig = {
      initialValue: {price: null, currency: 'USD'},
      rules: [{required: true, validator: this.checkPrice}]
    };

    const passengersConfig = {
      rules: [{required: true, validator: this.checkPassengers}],
    };

    const fromUntilConfig = {
      rules: [{ type: 'array', required: true, message: 'Please select time!' }]
    };

    return(
      <React.Fragment>
        <h1>Create request</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="Price">
            {getFieldDecorator('price', priceConfig)(<PriceInput />)}
          </FormItem>
          <FormItem label="Passengers">
            {getFieldDecorator('passengers', passengersConfig)(<InputNumber
              style={{width: '100%'}} />)}
          </FormItem>
          <FormItem label="From / untill">
            {getFieldDecorator('fromUntil', fromUntilConfig)(<RangePicker
              format={dateFormat}
              onCalendarChange={this.handleCalendarChange}/>)}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit">
              Create
            </Button>
          </FormItem>
        </Form>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addRequest: (payload) => dispatch({ type: ADD_REQUEST_REQUEST, payload })
});


// Form.create для получения props.form
export default Form.create()(connect(null, mapDispatchToProps)(CreateRequest));

CreateRequest.propTypes = {
  showMessage: PropTypes.func.isRequired,
}