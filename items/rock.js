module.exports = rigidbot => {

	rigidbot.items[2] = new rigidbot.Item({
		name: "Rock", space: 2,
		emoji: "<:rock:720799282797477918>",
		rarity: 1, id: 2, type: "Resource",
		data: {}, natural: true,
		desc: "Many rocks can be found, generally in the same spot because they broke apart."
	});

};