module.exports = rigidbot => {
	
	const menus = rigidbot.menulist;
	
	class Menu {
		constructor({
			message, user, channel
		}) {
			this.channel = channel;
			this.message = message;
			this.user = user;
			this.params = ["Test."];
			this.buttons = {};
			this.emojis = [];
		}
		async add(emoji) {
			if (this.emojis.indexOf(emoji) != -1) {
				return;
			}
			this.emojis.push(emoji);
			if (this.message) {
				await this.message.react(emoji).catch(err => { });
			}
		}
		async remove(emoji) {
			if (this.emojis.indexOf(emoji) == -1) {
				return;
			}
			if (this.message) {
				await this.message.reactions.cache.get(emoji).remove().catch(err => { });
			}
			this.emojis.splice(this.emojis.indexOf(emoji));
		}
		async addButton(emoji, callback) {
			this.buttons[emoji] = callback;
			await this.add(emoji);
		}
		async removeButton(emoji) {
			delete this.buttons[emoji];
			await this.remove(emoji);
		}
		async content(...args) {
			if (this.params == args) return;
			this.params = args;
			this.update();
			return;
		}
		async update() {
			if (!this.message) return;
			await this.message.edit(...this.params);
			return;
		}
		async create() {
			if (!this.message) {
				this.message = await this.channel.send(...this.params);
				this.emojis.forEach(async emoji => {
					await this.message.react(emoji);
				});
			}
			if (menus.indexOf(this) == -1) {
				menus.push(this);
			}
		}
		async delete() {
			if (menus.indexOf(this) != -1) {
				menus.splice(menus.indexOf(this), 1);
			}
			if (this.message) {
				await this.message.delete().catch(err => { });
				this.message = undefined;
			}
		}
	}
	
	return Menu;
	
};