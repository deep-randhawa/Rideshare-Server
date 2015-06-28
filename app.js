var express 			= require('express')
var Sequelize			= require('sequelize')
var fs					= require('fs')
var db					= require('./models')

var app 				= express()
var config 				= null


fs.readFile('config.json', 'utf8', function(err, data) {
	if (err) {
        if (err.code == 'ENOENT')
            console.log("Could not find any config file.");
        process.exit(-1);
    }

    try {
    	config = JSON.parse(data);
    } catch (e) {
    	console.log("Error while parsing \'config.json\' file: " + e);
    	process.exit(-1);
    }

    var configName 	= process.argv[2] || 'development';
    var port 		= process.env.PORT || 5000;

    app.get('/', function(req, res) {
    	res.send('Hello world, this works !!!');
    });

    app.listen(port);

});