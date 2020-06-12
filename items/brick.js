module.exports = rigidbot => {

	rigidbot.items[3] = new rigidbot.Item({
		name: "Brick", space: 3,
		emoji: "<:brick:720803369039691856>",
		rarity: 3, id: 3, type: "Building",
		data: {}, natural: false,
		desc: "Bricks come from clay and previous civilizations."
	});

};