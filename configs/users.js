const Config = require("../config.js");

Object.compare = function (obj1, obj2) {
	for (var p in obj1) {
		if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;
		switch (typeof (obj1[p])) {
			case 'object':
				if (!Object.compare(obj1[p], obj2[p])) return false;
				break;
			case 'function':
				if (typeof (obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString())) return false;
				break;
			default:
				if (obj1[p] != obj2[p]) return false;
		}
	}
 	for (var p in obj2) {
		if (typeof (obj1[p]) == 'undefined') return false;
	}
	return true;
};

module.exports = rigidbot => {

	return class Users extends Config {
		constructor() {
			super("./configs/data/users.json");
		}
		user(id) {
			this.create(id, "xp", 0);
			this.create(id, "level", 0);
			this.create(id, "xp-time", -1);
			this.create(id, "balance", 0);
			this.create(id, "backpack", "space", 64);
			this.create(id, "backpack", "items", []);
		}
		totalSpace(id) {
			this.user(id);
			return this.get(id, "backpack", "space");
		}
		spaceLeft(id) {
			const original = this.totalSpace(id);
			var space = 0;
			this.get(id, "backpack", "items").forEach(item => {
				space += rigidbot.items[item.id].space * item.quantity;
			});
			return original - space;
		}
		spaceTaken(id) {
			return this.totalSpace(id) - this.spaceLeft(id);
		}
		
		addItem(id, data, quantity = data.quantity) {
			this.user(id);
			const items = this.get(id, "backpack", "items");
			items.push({
				...data, quantity
			});
			this.set(id, "backpack", "items", rigidbot.utils.collapseItems(items));
		}
		removeItem(id, data, quantity = data.quantity) {
			this.user(id);
			const items = this.get(id, "backpack", "items");
			const index = rigidbot.utils.itemIndex(items, data);
			if (index != -1) {
				items[index].quantity -= quantity;
				if (items[index].quantity <= 0) {
					items.splice(index, 1);
				}
			}
		}
	}
};