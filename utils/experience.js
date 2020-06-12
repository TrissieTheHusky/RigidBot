module.exports = rigidbot => {
	
	const utils = rigidbot.utils;
	const bot = rigidbot.bot;
	const config = rigidbot.configs.config;
	
	utils.levelGoal = lvl => {
		return lvl * lvl * config.get("xp-goal-rate") + config.get("xp-goal-base")
	};
	
	utils.checkXP = uid => {
		const users = rigidbot.configs.users;
		var xp = users.get(uid, "xp");
		var lvl = users.get(uid, "level");
		if (xp < 0) xp = 0;
		if (lvl < 0) lvl = 0;
		const levelups = [];
		while (xp >= utils.levelGoal(lvl)) {
			xp -= utils.levelGoal(lvl);
			lvl++;
			levelups.push(utils.rewardXP(uid, lvl));
		}
		if (xp < 0) xp = 0;
		if (lvl < 0) lvl = 0;
		users.set(uid, "xp", xp);
		users.set(uid, "level", lvl);
		return levelups;
	};

	utils.randomNatural = rarity => {
		var res;
		const options = [];
		var min = -1;
		var max = -1;
		Object.values(rigidbot.items).forEach(item => {
			if (!item.natural) return;
			if (min == -1 || item.rarity < min) {
				min = item.rarity;
			}
			if (max == -1 || item.rarity > max) {
				max = item.rarity;
			}
			if (item.rarity == rarity && item.natural) {
				options.push(item);
			}
		});
		if (!options.length && rarity > max) {
			rarity = max;
			Object.values(rigidbot.items).forEach(item => {
				if (item.rarity == rarity) {
					options.push(item);
				}
			});
		} else if (!options.length && rarity < min) {
			rarity = min;
			Object.values(rigidbot.items).forEach(item => {
				if (item.rarity == rarity && item.natural) {
					options.push(item);
				}
			});
		}
		if (options.length) return options[Math.floor(Math.random() * options.length)];
		const all = [];
		Object.values(rigidbot.items).forEach(item => {
			if (item.natural) all.push(item);
		});
		return all[Math.floor(Math.random() * all.length)];
	};
	
	utils.itemIndex = (items, item) => {
		var index = -1;
		for (var i = 0; i < items.length; i++) {
			if (items[i].id == item.id) {
				index = i;
				break;
			}
		}
		return index;
	};
	utils.collapseItems = items => {
		const res = [];
		items.forEach(item => {
			const index = utils.itemIndex(res, item);
			if (index == -1) {
				res.push(item);
			} else {
				res[index].quantity += item.quantity;
			}
		});
		return res;
	};

	utils.rewardXP = (user, level) => {
		const users = rigidbot.configs.users;
		const itemMod = level * config.get("xp-item-rate");
		const coinMod = level * config.get("xp-coin-rate");
		var itemAmt = Math.floor((Math.random() - 0.5) * itemMod + itemMod);
		const coinAmt = Math.floor((Math.random() - 0.5) * coinMod + coinMod);
		users.set(user, "balance", users.get(user, "balance") + coinAmt);
		var rarity = 1;
		var items = [];
		while (itemAmt > 0) {
			const amount = Math.ceil(itemAmt / config.get("xp-section-divider"));
			itemAmt -= amount;
			items.push({
				id: utils.randomNatural(Math.floor(rarity)).id,
				quantity: amount
			});
			rarity += config.get("xp-rarity-gap");
		}
		items = utils.collapseItems(items);
		items.forEach(item => users.addItem(user, item));
		users.set(user, "backpack", "space", Math.max(users.spaceTaken(user), users.get(user, "backpack", "space")));
		return {
			coins: coinAmt,
			items
		};
	};
	
	utils.addXP = (user, xp) => {
		const users = rigidbot.configs.users;
		users.set(user, "xp", users.get(user, "xp") + xp);
		return utils.checkXP(user);
	};
	
	utils.rewardEmbeds = (channel, user, rewards) => {
		rewards.forEach(reward => {
			const items = [];
			if (reward.coins > 0) {
				items.push("**+" + reward.coins + "** coins");
			}
			reward.items.forEach(slot => {
				const i = rigidbot.items[slot.id];
				items.push("**+" + slot.quantity + "** " + i.emoji + " " + i.name);
			});
			const text = items.join("\n");
			utils.sendBox(channel, "Level Up: __" + user.username + "__", config.color("done"), text);
		});
	};
	
};