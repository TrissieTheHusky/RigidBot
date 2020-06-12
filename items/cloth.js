module.exports = rigidbot => {

	rigidbot.items[10] = new rigidbot.Item({
		name: "Cloth", space: 2,
		emoji: "<:cloth:720801396638613545>",
		rarity: 6, id: 10, type: "Material",
		data: {}, natural: false,
		desc: "You can use cloth to make covers and garments."
	});

};