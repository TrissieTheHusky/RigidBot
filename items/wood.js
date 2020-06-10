module.exports = rigidbot => {

	rigidbot.items.Wood = class Wood extends rigidbot.Item {
		constructor() {
			super({
				name: "Wood", space: 1,
				emoji: "<:wood:720351649842856016>",
				rarity: 1, id: 1, type: "Resource",
				data: {}, limit: 256,
				desc: "It comes from trees and can be used to produce many things."
			});
		}
	}

};