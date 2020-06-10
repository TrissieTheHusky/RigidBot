module.exports = rigidbot => {
	
	rigidbot.menus.Pages = class Pages extends rigidbot.Menu {
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
			this.content({embed: {
				...this.embed,
				description: empty ? "" : this.pages[this._page - 1]
			}});
		}
	}
	
};