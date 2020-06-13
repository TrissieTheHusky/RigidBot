module.exports = rigidbot => {

	rigidbot.items[7] = new rigidbot.Item({
		name: "Stick", space: 1,
		emoji: "<:stick:720800629387427870>",
		rarity: 2, id: 7, type: "Resource",
		data: {}, natural: true,
		desc: "Sticks fall on the ground and can be made from wood."
	});

};