var bot = require('../bot.js');

bot.register({
	"command":"search",
	"type":"node",
	"execute":"search.js",
	"help":"returns a google search url"
});

bot.on("search", function(x){
	console.log(x);
/*var split = message.search(/\s+search\s+/i);
var search = message.slice(split + 8);
search = encodeURIComponent(search);
bot.say(from+" Searched for: https://www.google.ca/search?q="+search);*/
});