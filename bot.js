var irc = require('irc');
var client = new irc.Client('irc.reallyawesomedomain.com', 'yesman',{
	channels:['#main'],
});

var chan = "#main"

if ( !String.prototype.contains ) {
    String.prototype.contains = function() {
        return String.prototype.indexOf.apply( this, arguments ) !== -1;
    };
}

client.addListener('message'+chan, function(from, message){
	if (message.match(/yesman/i)) {
		if (message.search(/\s+search\s+/i) != -1){
			var split = message.search(/\s+search\s+/i);
			var search = message.slice(split + 8)
			search = encodeURIComponent(search);
			client.say(chan, from+" Searched for: https://www.google.ca/search?q="+search);
		}
	}
	//client.say('#main', "HELLO");
	console.log(message);
});