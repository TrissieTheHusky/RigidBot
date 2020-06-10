module.exports = rigidbot => {
	
	const bot = rigidbot.bot;
	const menus = rigidbot.menulist;
	
	bot.on("messageDelete", async msg => {
		menus.forEach(async menu => {
			if (menu.message.id == msg.id) {
				await menu.delete();
			}
		});
	});
	bot.on("messageReactionAdd", async (reaction, user) => {
		if (user.bot) return;
		if (reaction.partial) {
			try {
				await reaction.fetch();
			} catch (e) {
				return;
			}
		}
		menus.forEach(menu => {
			if (reaction.message == menu.message) {
				for (const emoji in menu.buttons) {
					const button = menu.buttons[emoji];
					if (reaction.emoji.name == emoji) {
						reaction.users.remove(user).catch(err => {});
						if (menu.user == undefined || menu.user.id == user.id) {
							button(user);
						}
					}
				}
			}
		});
	});
	
};