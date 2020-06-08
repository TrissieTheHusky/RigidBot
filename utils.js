const Discord = require("discord.js");
module.exports = bot => {
const menus = [];
bot.on("messageDelete", async msg => {
	menus.forEach(async menu => {
		if (menu.message.id == msg.id) {
			await menu.delete();
		}
	});
});
bot.on("messageReactionAdd", async (reaction, user) => {
	if (user.id == bot.user.id) return;
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (e) {
			return;
		}
	}
	menus.forEach(async menu => {
		if (reaction.message == menu.message) {
			for (const emoji in menu.buttons) {
				const button = menu.buttons[emoji];
				if (reaction.emoji.name == emoji) {
					try {
						await reaction.users.remove(user);
					} catch (e) { }
					if (menu.user == undefined || menu.user.id == user.id) {
						button(user);
					}
				}
			}
		}
	});
});
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
class Message extends Menu {
	constructor(options, text) {
		super(options);
		this.content(text);
		this.addButton("\u274C", e => {
			this.delete();
		});
	}
}
class Embedded extends Menu {
	constructor(options, embedded) {
		super(options);
		this.content(embed(embedded));
		this.addButton("\u274C", e => {
			this.delete();
		});
	}
}
class Pages extends Menu {
	constructor(options, {
		pages = [], embed = {},
		jumpable = false, closable = true, page = 1
	} = {}) {
		super(options);
		this.pages = pages;
		this.embed = embed;
		this.page(page);
		if (jumpable) {
			this.addButton("\u23EA", e => {
				this.first();
			});
		}
		this.addButton("\u25C0", e => {
			this.prev();
		});
		if (closable) {
			this.addButton("\u274C", e => {
				this.delete();
			});
		}
		this.addButton("\u25B6", e => {
			this.next();
		});
		if (jumpable) {
			this.addButton("\u23E9", e => {
				this.last();
			});
		}
	}
	first() {
		this.page(1);
	}
	last() {
		this.page(this.pages.length);
	}
	prev() {
		this.page(this._page - 1);
	}
	next() {
		this.page(this._page + 1);
	}
	page(number) {
		if (this._page == number) {
			return false;
		} else {
			this._page = number;
			this.repage();
			return true;
		}
	}
	repage() {
		if (this._page > this.pages.length) {
			this._page = this.pages.length;
		}
		if (this._page < 1) {
			this._page = 1;
		}
		const empty = this.pages.length == 0;
		this.content(embed({
			...this.embed,
			desc: empty ? "" : this.pages[this._page - 1]
		}));
	}
}
class Items extends Pages {
	constructor(options, {
		items = [], embed = {},
		quantity = 8, count = 2048,
		jumpable = false, closable = true, page = 1
	} = {}) {
		super(options, {
			embed, jumpable, closable, page, items: []
		});
		var totalchars = 0;
		var totalitems = 0;
		var current = [];
		items.forEach(item => {
			totalitems++;
			const newline = current.length != 0;
			totalchars += item.length + (newline ? 1 : 0);
			current.push(item);
			if (totalitems >= quantity || totalchars >= count) {
				this.pages.push(current.join("\n"));
				current = [];
				totalchars = 0;
				totalitems = 0;
			}
		});
		if (current.length > 0) {
			this.pages.push(current.join("\n"));
		}
		this.repage();
	}
}
function embed(options = {}) {
	const res = new Discord.MessageEmbed();
	if ("color" in options) {
		res.setColor(options.color);
	}
	if ("title" in options) {
		res.setTitle(options.title);
	}
	if ("url" in options) {
		res.setURL(options.url);
	}
	if ("desc" in options) {
		res.setDescription(options.desc);
	}
	if ("time" in options) {
		if (options.time == null) {
			res.setTimestamp();
		} else {
			res.setTimestamp(options.time);
		}
	}
	if ("thumbnail" in options) {
		res.setThumbnail(options.thumbnail);
	}
	if ("image" in options) {
		res.setImage(options.image);
	}
	const author = [];
	if ("author" in options) {
		author.push(options.author);
	}
	if ("authorIcon" in options) {
		author.push(options.authorIcon);
	}
	if ("authorURL" in options) {
		author.push(options.authorURL);
	}
	if (author.length > 0) {
		res.setAuthor(...author);
	}
	const footer = [];
	if ("footer" in options) {
		footer.push(options.footer);
	}
	if ("footerIcon" in options) {
		footer.push(options.footerIcon);
	}
	if (footer.length > 0) {
		res.setFooter(...footer);
	}
	var files = [];
	if ("file" in options) {
		files.push(options.file);
	}
	if ("files" in options) {
		files = [...files, ...options.files];
	}
	if (files.length > 0) {
		res.attachFiles(files);
	}
	const fields = [];
	var current = [];
	if ("field" in options) {
		current.push(options.field);
	}
	if ("fieldText" in options) {
		current.push(options.fieldText);
	} else if ("field" in options) {
		current.push("");
	}
	if ("fieldInline" in options) {
		current.push(options.fieldInline);
	}
	if (current.length > 0) {
		fields.push(current);
		current = [];
	}
	if ("fields" in options) {
		options.fields.forEach(field => {
			if ("name" in field) {
				current.push(field.name);
			}
			if ("text" in field) {
				current.push(field.text);
			} else {
				current.push("");
			}
			if ("inline" in field) {
				current.push(field.inline);
			}
			if (current.length > 0) {
				fields.push(current);
				current = [];
			}
		});
	}
	if (fields.length > 0) {
		res.addFields(...fields);
	}
	return res;
}
const mentionRegex = new RegExp('^\<@\!?([0-9]{18})>$');
function toMember(input, guild) {
	const matches = input.match(mentionRegex);
	return matches && guild.members.cache.get(matches[1]);
}
function toUser(input) {
	const matches = input.match(mentionRegex);
	return matches && bot.users.cache.get(matches[1]);
}

return {
	Menu: Menu, Items: Items,
	Message: Message, Pages: Pages,
	Embedded: Embedded,
	embed: embed, toMember: toMember,
	toUser: toUser
}
}