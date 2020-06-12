module.exports = rigidbot => {

	rigidbot.items[4] = new rigidbot.Item({
		name: "Sand", space: 1,
		emoji: "<:sand:720803368993423402>",
		rarity: 2, id: 4, type: "Resource",
		data: {}, natural: true,
		desc: "Endless fields of sand lie along sunny beaches on the coast."
	});

};