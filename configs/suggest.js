const Config = require("../config.js");

module.exports = rigidbot => {
	return class Logs extends Config {
		
		constructor() {
			super("./configs/data/suggest.json");
		}
		
		setup() {
			
		}
		
		user(user) {
			this.create(user, []);
		}
		
		submit(user, item, limit) {
			this.user(user);
			const items = this.get(user);
			const pre = items.length;
			items.push(item);
			while(items.length > limit && items.length > 0) {
				items.shift();
			}
			const post = items.length;
			return {pre, post};
		}
		
	}
};