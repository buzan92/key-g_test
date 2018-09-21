import React, { Component } from 'react';
import { Input, Select } from 'antd';

const Option = Select.Option;

class PriceInput extends Component {
	state = { ...this.props.value };

	// для обновления состояния из данных формы
	static getDerivedStateFromProps(props, state) {
		if ('value' in props) {
			return { ...props.value };
		}
	}

	handlePriceChange = e => {
		const price = parseInt(e.currentTarget.value || 0, 10);
		if (isNaN(price)) {
			return;
		}
		this.triggerChange({ price });
	};

	handleCurrencyChange = currency => {
		this.triggerChange({ currency });
	};

	// Событие для передачи данных в форму компонента CreateRequest
	triggerChange = changedValue => {
		const onChange = this.props.onChange;
		if (onChange) {
			onChange(Object.assign({}, this.state, changedValue));
		}
	};

	render() {
		const selectCurrency = (
			<Select
				value={this.state.currency}
				onChange={this.handleCurrencyChange}
				defaultValue="USD">
				<Option value="USD">$</Option>
				<Option value="EUR">€</Option>
			</Select>
		);

		return (
			<Input
				value={this.state.price}
				onChange={this.handlePriceChange}
				addonBefore={selectCurrency}
				addonAfter={'.00'}
			/>
		);
	}
}

export default PriceInput;
