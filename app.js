"use strict";

const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const webdriverio = require('webdriverio');

var options = { 
	desiredCapabilities: {
		browserName: 'chrome',
		chromeOptions: {
        "args": [
            "window-size=1366,768",
            "no-proxy-server",
            "no-default-browser-check",
            "no-first-run",
            "disable-boot-animation",
            "disable-default-apps",
            "disable-extensions",
            "disable-translate",
        ],
      },
	},
	host: '127.0.0.1',
    port: 9515,
    path: '/', 
};
const client = webdriverio.remote(options)
client.init().url('http://patatap.com')
console.log("running chrome client")

app.use(express.static('views'))
app.use(bodyParser.json())
var router = express.Router();

router.post('/play_key', function(req, res) {
	
	switch(parseInt(req.body.id)) {
		case 1:
			console.dir("truning button 1")
			client.keys('a');
			break;
		case 2:
			console.dir("truning button 2")
			client.keys('b');
			break;
		case 3:
			console.dir("truning button 3")
			client.keys('c');
			break;
	}
	res.sendStatus(200);
});

app.use(router);
app.listen(3334, function() {
	console.log("listening on port 3334")
})
