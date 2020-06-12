const readline = require("readline");

class Context {
	constructor(rigidbot) {
		this.rb = rigidbot;
	}
	run(text) {
		const items = text.split(/ +/);
		const name = items[0];
		const args = items.slice(1);
		const rb = this.rb;
		if (name == "eval") {
			try {
				console.log(eval(args.join(" ")));
			} catch(e) {
				console.log(e);
			}
		}
	}
}

const run = rigidbot => {
	var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	const ctx = new Context(rigidbot);
	const step = () => {
		rl.question("RigidBot > ", text => {
			ctx.run(text);
			step();
		});
	};
	step();
};
module.exports.run = run;
