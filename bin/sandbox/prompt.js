process.stdin.resume();
process.stdin.setEncoding('utf8');

var util = require('util');
var sys = require('sys');
var exec = require('child_process').exec;
var wolfram = require('wolfram').createClient("2P3U5X-5YLPLVYPJH");

process.stdin.on('data', function (text) {
    
	//console.log('received data:', util.inspect(text));

	//Use slice() to get rid of the newline character
	var q = text.slice(0,text.length-1);

	console.log("\nSending Query to Wolfram...");
	
	//query wolfram
	wolfram.query(q, function(err, result){
		if(err) throw err;
		
		var newResult = result[0].subpods[0].value + ", " + result[1].subpods[0].value;
		//Replace character | with , also need to replace mathematic operations with english equivalents
		var finalResult = newResult.replace(" |",",").replace("+"," plus ");		

		//console.log(result + "\n");
		//console.log(newResult);

	        //might need to consider asynchronous problems
       		var cmd = "./speech.sh \"" + finalResult + "\"";

		console.log(cmd);
		
        	child = exec(cmd, function(error, stdout, stderr) {
                	//sys.print('stdout:' + stdout);
                	//sys.print('stderr:' + stderr);

	                if(error !== null) {
        	                console.log('exec error' + error);
               		}
        	});
		
	});
	if (text === 'quit\n') {
      		done();
    	}
  });

  function done() {
    console.log('Now that process.stdin is paused, there is nothing more to do.');
    process.exit();
 }
