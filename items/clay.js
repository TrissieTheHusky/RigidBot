module.exports = rigidbot => {

	rigidbot.items[5] = new rigidbot.Item({
		name: "Clay", space: 1,
		emoji: "<:clay:720805198695759875>",
		rarity: 2, id: 5, type: "Resource",
		data: {}, natural: true,
		desc: "Clay can be found naturally underground."
	});

};