module.exports = rigidbot => {

	rigidbot.items[13] = new rigidbot.Item({
		name: "Bottle", space: 2,
		emoji: "<:bottle:720802189362331678>",
		rarity: 6, id: 13, type: "Material",
		data: {}, natural: false,
		desc: "Bottles can store liquids such as water."
	});

};