var bot = require('../bot.js');


lol.on("search", function(){

});
bot.listen({
	"command":"search",
	"type":"node",
	"execute":"search.js",
	"help":"returns a google search url"
}, function(message){
//var split = message.search(/\s+search\s+/i);
//var search = message.slice(split + 8);
search = encodeURIComponent(search);
bot.say(from+" Searched for: https://www.google.ca/search?q="+search);
});