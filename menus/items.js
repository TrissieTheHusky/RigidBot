module.exports = rigidbot => {
	
	rigidbot.menus.Items = class Items extends rigidbot.menus.Pages {
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
	
};