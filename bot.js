var irc = require('irc');
var client = new irc.Client('irc.reallyawesomedomain.com', 'yesman',{
	channels:['#main'],
});

if ( !String.prototype.contains ) {
    String.prototype.contains = function() {
        return String.prototype.indexOf.apply( this, arguments ) !== -1;
    };
}

client.addListener('message#main', function(from, message){
	if (message.match(/yesman/i)) {
		if (message.match(/search/)){

		}
	}
	//client.say('#main', "HELLO");
	console.log(message);
});