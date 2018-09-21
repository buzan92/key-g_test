import React from 'react';
import PropTypes from 'prop-types';
import { Table, Tooltip } from 'antd';
import { getInterval } from 'helpers/getInterval';

const columns = [
	{
		title: 'Price',
		dataIndex: 'price',
		key: 'price',
		render: price => {
			const currency = () => {
				switch (price.currency) {
					case 'USD':
						return '$';
					case 'EUR':
						return '€';
					default:
						return '';
				}
			};
			return (
				<span>
					{price.amount} <b>{currency()}</b>
				</span>
			);
		},
	},
	{
		title: 'Id',
		dataIndex: 'id',
		key: 'id',
	},
	{
		title: 'From / Until',
		dataIndex: 'date',
		key: 'date',
		render: date => (
			<Tooltip title={`Интервал: ${getInterval(date.from, date.until)}`}>
				{date.fromUntil}
			</Tooltip>
		),
	},
	{
		title: 'Passengers',
		dataIndex: 'passengers',
		key: 'passengers',
	},
];

// Функция для подготовки массива запросов к отображению в таблице
// объединение цены и валюты в объект для показа в одной ячейке
// объединение дат в объект для подсчета промежутка между ними, при наведении мыши
const prepareRequests = requests => {
	return requests.reduce((acc, req) => {
		acc.push({
			price: {
				amount: req.price,
				currency: req.currency,
			},
			id: req.id,
			date: {
				from: req.date_from,
				until: req.date_until,
				fromUntil: `${req.date_from} - ${req.date_until}`.replace(/\//g, '-'),
			},
			passengers: req.passengers,
		});
		return acc;
	}, []);
};

export const RequestsTable = ({ requests }) => {
	return (
		<Table
			dataSource={prepareRequests(requests)}
			columns={columns}
			pagination={false}
			rowKey="id"
			bordered
		/>
	);
};

RequestsTable.propTypes = {
	requests: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			date_from: PropTypes.string.isRequired,
			date_until: PropTypes.string.isRequired,
			passengers: PropTypes.number.isRequired,
			price: PropTypes.number.isRequired,
			currency: PropTypes.string.isRequired,
		})
	).isRequired,
};
