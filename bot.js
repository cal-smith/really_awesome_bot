var irc = require('irc');
var exec = require('child_process').exec;
fs = require('fs');
var path = require('path');
var events = equire("events");

if ( !String.prototype.contains ) {//string contains polyfill.
    String.prototype.contains = function() {
        return String.prototype.indexOf.apply( this, arguments ) !== -1;
    };
}

exports.say = function(response){
	client.say(channel, response);
}

exports.listen = function(opts, callback){
	plugins.push(opts);
	
	callback();
}

//plugin loading here
var plugins = [];//init plugin global
function reload(){
	plugins = [];//clear global
	fs.readdir(__dirname+'/plugins', function(err, files){
		for (var i = 0; i < files.length; i++) {
			var input = path.join(__dirname + '/plugins/'+files[i]);
			/*fs.readFile(input, function(err,data){
				loaded(JSON.parse(data));
			});*/
		}
	});
	function loaded(data){
		plugins.push(data);
	}
};
reload();

var conf = {};//init conf global
var client;
function init(){
	fs.readFile(path.join(__dirname + '/reallyawesome.json'), function(err,data){
		conf = (JSON.parse(data));
		console.log(conf.chan);
		client = new irc.Client(conf.server, conf.name,{
			userName:conf.name,
			realName:'ReallyAwesomeBot.js',
			autoConnect: false//so we dont go connecting before we load the conf and break EVERYTHING AAAAAHHHHHHHHHHHHHHHH
		});
		client.connect(function(){//yes the client joins after the conf is loaded. just to make sure we connect to the right channels
			for (var i = 0; i < conf.chan.length; i++) {//loops through the chans and connects to each
				client.join(conf.chan[i]);
			};
		});
		start();
	});
};
init();

function start(){
	client.addListener('message', function(from, channel, message){
		var namer = "^" + conf.name;
		namer = new RegExp(namer, "i");
		if (message.match(namer)) {
			/*if (message.search(/\s+search\s+/i) != -1){
				var split = message.search(/\s+search\s+/i);
				var search = message.slice(split + 8);
				search = encodeURIComponent(search);
				client.say(channel, from+" Searched for: https://www.google.ca/search?q="+search);
			}*/
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
				for (var i = 0; i < plugins.length; i++) {//loops through the plugins till it finds the correct one, then outputs its help contents
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
				} else if (message.match(re)){//regular expressions ftw! we can match anything including * (wildcard) commands ... cause its regexp
					
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
						exec(type + ' extensions/' + plugins[i].execute + ' ' + message + ' ' + from, function(error, stdout, stderr){
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
};