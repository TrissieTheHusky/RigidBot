
module.exports = class Command {
	constructor({
		name = "test", perms = [],
		alias = [], usage = [],
		desc = "", run = async (args, e) => {},
		root = false, info = []
	} = {}) {
		this.name = name;
		this.perms = perms;
		this.alias = alias;
		this.usage = usage;
		this.desc = desc;
		this.run = run;
		this.root = root;
		this.info = info;
	}
}