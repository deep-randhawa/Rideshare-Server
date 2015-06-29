var express 			= require('express')
var Sequelize			= require('sequelize')
var fs					= require('fs')
var passport 			= require('passport');
var FacebookStrategy 	= require('passport-facebook').Strategy;
var bodyParser          = require('body-parser');
var logger              = require('morgan');

var db                  = require('./models')
var userAPI             = require('./controllers/user')
var rideAPI             = require('./controllers/ride')

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
    var port 		= process.env.PORT || config[configName].port;

    db.sequelize(config[configName], function(err) {
    	if (err) {
    		console.log('Sequelize error: ' + e);
    		process.exit(-1);
    	} else {

    		// Set up globals in the req object.
            // Do this first or they will not show up in the req.
            app.use(function(req, res, next) {
                req.db = db.db;
                req.configName = configName;
                next();
            });

            app.set('port', port);
            app.use(logger('dev'));
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({extended: 'false'}));


            // -- ROUTES -- //
    		app.get('/', function(req, res) {
    			res.send('Welcome to Rideshare. Its still in production.')
    		});

            app.post('/create_user', userAPI.createUser);
            app.post('/get_all_users', userAPI.getAllUsers);
    	}
    });

    app.listen(port, function() {
    	console.log('Server running at port ' + port);
    });

});