module.exports = rigidbot => {
	
	const utils = rigidbot.utils;
	const bot = rigidbot.bot;
	const config = rigidbot.configs.config;
	
	utils.randomNatural = () => {
		const res = [];
		Object.values(rigidbot.items).forEach(item => {
			if (item.natural) res.push(item);
		});
		return res[Math.floor(Math.random() * res.length)];
	};
	
	utils.itemIndex = (items, item) => {
		var index = -1;
		for (var i = 0; i < items.length; i++) {
			if (items[i].id == item.id) {
				index = i;
				break;
			}
		}
		return index;
	};
	utils.collapseItems = items => {
		const res = [];
		items.forEach(item => {
			const index = utils.itemIndex(res, item);
			if (index == -1) {
				res.push(item);
			} else {
				res[index].quantity += item.quantity;
			}
		});
		return res;
	};
	
};