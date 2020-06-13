module.exports = rigidbot => {

	rigidbot.items[15] = new rigidbot.Item({
		name: "Copper", space: 2,
		emoji: "<:copper:720799282785026188>",
		rarity: 6, id: 15, type: "Resource",
		data: {}, natural: true,
		desc: "Copper can be used to make lots of tools."
	});

};