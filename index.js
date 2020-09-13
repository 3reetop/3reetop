const Mustache = require('mustache');
const fs = require('fs');

const MUSTACHE_MAIN_DIR = './main.mustache';
const CONFIG_FILE = './config.json';

const RAW_DATA = fs.readFileSync(CONFIG_FILE);
var DATA = JSON.parse(RAW_DATA);
DATA.gen_date = new Date().toLocaleDateString('en-US', {
	weekday: 'long',
	month: 'long',
	day: 'numeric',
	year: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	timeZoneName: 'short',
	timeZone: 'America/New_York'
});

function generateReadMe() {
	fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
		if (err) throw err;
		const output = Mustache.render(data.toString(), DATA);
		fs.writeFileSync('README.md', output);
	});
}

generateReadMe();
