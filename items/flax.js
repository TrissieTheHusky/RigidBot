module.exports = rigidbot => {

	rigidbot.items[6] = new rigidbot.Item({
		name: "Flax", space: 1,
		emoji: "<:flax:720801397288730644>",
		rarity: 3, id: 6, type: "Resource",
		data: {}, natural: true,
		desc: "You can use flax to produce linens."
	});

};