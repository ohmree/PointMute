const OBSWebSocket = require('obs-websocket-js');
const readline = require("readline");
//const config = require('./config.json')
const fs = require('fs')

const obs = new OBSWebSocket();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


const buffer = {}

obs.connect({
      address: 'localhost:4444',
    })
    .then(() => {
      return obs.send('GetSpecialSources');
    })
    .then(async data => {
    	const micName = await getMic(data)
    	console.log(micName)
    })


async function getMic(data){
	Object.keys(data).forEach(key =>{
    		if(key.startsWith('mic')){	
    		  rl.question(`Is "${data[key]}" the name of your mic source in OBS? (y/n): `, function (answer) {
						if(answer === 'y'){
							console.log(data[key])
							return data[key]
						}
				})
    	}
    })
}