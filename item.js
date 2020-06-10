module.exports = rigidbot => {

	rigidbot.Item = class Item {

		constructor({
			name, space, emoji,
			rarity, desc, id,
			type, data, limit
		}) {
			this.name = name;
			this.space = space;
			this.emoji = emoji;
			this.rarity = rarity;
			this.desc = desc;
			this.id = id;
			this.type = type;
			this.data = data;
			this.limit = limit;
		}

	}

};