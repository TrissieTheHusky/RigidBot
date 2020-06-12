module.exports = rigidbot => {

	rigidbot.items[11] = new rigidbot.Item({
		name: "Rope", space: 2,
		emoji: "<:rope:720801396638613545>",
		rarity: 6, id: 11, type: "Utility",
		data: {}, natural: false,
		desc: "Rope can tie things and be used to climb high surfaces."
	});

};