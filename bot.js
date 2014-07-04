var irc = require('irc');
var exec = require('child_process').exec;
fs = require('fs');
var path = require('path');
var client = new irc.Client('irc.reallyawesomedomain.com', 'yesman',{
	userName:'yesman',
	realName:'ReallyAwesomeBot.js',
	autoConnect: false//so we dont go connecting before we load the conf and break EVERYTHING AAAAAHHHHHHHHHHHHHHHH
});

//plugin loading here
var plugins = [];//init plugin global
function reload(){
	plugins = [];//clear global
	fs.readdir(__dirname+'/plugins', function(err, files){
		for (var i = 0; i < files.length; i++) {
			var input = path.join(__dirname + '/plugins/'+files[i]);
			fs.readFile(input, function(err,data){
				loaded(JSON.parse(data));
			});
		}
	});
	function loaded(data){
		plugins.push(data);
	}
}
reload();

var conf = {};//init conf global
function start(){
	fs.readFile(path.join(__dirname + '/reallyawesome.json'), function(err,data){
		conf = (JSON.parse(data));
		console.log(conf.chan)
		client.connect(function(){//yes the client joins after the conf is loaded. just to make sure we connect to the right channels
			for (var i = 0; i < conf.chan.length; i++) {//loops through the chans and connects to each
				client.join(conf.chan[i]);
			};
		});
	});
}
start();

/*
get a list of json files ("plugins") from /plugins
get a list of js files ("extensins") from /extensions
plugins use basic json + regex's here to match strings and respond
ex: 'match: "ping"'' gets matched by: yesman ping and responds with: 'response: "pong"'
lets also let json files do some basic web stuff
not sure how that will be defined, but it will end up just being args that are invoked after a regex is matched

extensions will load into the bot. 
lets provied some nice high level functions that abstract a lot of the grunt work
designed for doing things like setting up posting to reddit, deploying things, singing songs, database searches, ryancoin, subreddit management, etc
things that cant just be simplified down to command -> response no matter how much magic we throw at it

json files define extension arch, bot code exposes irc listenting capabilitys. extension creators will have to listen for and respond to messages on their own. this is probably the most flexible way to do it.
*/
if ( !String.prototype.contains ) {//string contains polyfill. cause contains is prettyer ;3
    String.prototype.contains = function() {
        return String.prototype.indexOf.apply( this, arguments ) !== -1;
    };
}

client.addListener('message', function(from, channel, message){
	if (message.match(/^yesman/i)) {
		if (message.search(/\s+search\s+/i) != -1){
			var split = message.search(/\s+search\s+/i);
			var search = message.slice(split + 8);
			search = encodeURIComponent(search);
			client.say(channel, from+" Searched for: https://www.google.ca/search?q="+search);
		}
		if(message.match(/\s+commands/i)){
			var response = "Commands: [built in: search, reload] ";
			for (var i = 0; i < plugins.length; i++) {
				response += plugins[i].command+", ";
			}
			client.say(channel, response);
		}
		if(message.match(/\s+reload/i)){
			if (conf.op.contains(from)){//checks if the sender is an allowed op.
				client.say(channel, "Reloading plugins!");
				reload();//reloads
			}
		}
		if(message.match(/\s+\w+\s+help/i)){//checks if the help command is precceded by a word and some spaces
			var help = message.split(" ");//splits on spaces
			for (var i = 0; i < plugins.length; i++) {//loops through the plugings till it finds the correct one, then outputs its help contents
				if (plugins[i].command == help[1]){
					client.say(channel, plugins[i].help);
				}
			}
		}
		for (var i = 0; i < plugins.length; i++) {//loops over the plugins, checks if the message matches, and outputs the response.
			var r = "\\s" + plugins[i].command;
			var re = new RegExp(r,"i");
			if (message.match(/\s+\w+\s+help/i)){//stops the help plugin, and other plugins, from emmiting the default help
				return false;
			} else if (message.match(re)){
				if (plugins[i].execute){
					var type;
					switch(plugins[i].type){
						case "ruby":
						case "rb":
							if (conf.windows) {
								type = "ruby.exe";
							} else{
								type = "ruby";
							}
							break;
						case "js":
						case "node":
						case "javascript":
							type = "node";
							break;
						case "bash":
						case "sh":
						case "shell":
							type = "sh";
							break;
						case "python":
						case "py":
							type = "python";
							break;
					}
					exec(type + ' extensions/' + plugins[i].execute, function(error, stdout, stderr){
						console.log(stderr);
						console.log(stdout);
						client.say(channel, stdout);
					});
				}
				console.log(message.match(re));
				client.say(channel, plugins[i].response);
			}
		}
		console.log(message);
	}
});

client.addListener('error', function(message) {
    console.log('error: ', message);
});