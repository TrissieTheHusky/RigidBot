module.exports = rigidbot => {

	rigidbot.Item = class Item {
		constructor(options = {
			name, space, emoji, rarity,
			type, id, data, desc, natural
		}) {
			Object.assign(this, options);
		}
	}

};