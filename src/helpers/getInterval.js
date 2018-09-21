// Функция получения количества дней между датами
export const getInterval = (from, until) => {
	const date1 = new Date(from);
	const date2 = new Date(until);
	const interval = (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24);
	return `${interval} ${declOfNum(interval, ['день', 'дня', 'дней'])}`;
};

// функция для склонения числительных
function declOfNum(number, titles) {
	const cases = [2, 0, 1, 1, 1, 2];
	return titles[
		number % 100 > 4 && number % 100 < 20
			? 2
			: cases[number % 10 < 5 ? number % 10 : 5]
	];
}
