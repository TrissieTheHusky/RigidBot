module.exports = rigidbot => {

	rigidbot.items[1] = new rigidbot.Item({
		name: "Wood", space: 1,
		emoji: "<:wood:720799284550959196>",
		rarity: 1, id: 1, type: "Resource",
		data: {}, natural: true,
		desc: "It comes from trees and can be used to produce many things."
	});

};