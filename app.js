var express 			= require('express')
var Sequelize			= require('sequelize')
var fs					= require('fs')
var passport 			= require('passport');
var FacebookTokenStrategy = require('passport-facebook-token').Strategy
var bodyParser          = require('body-parser');
var session             = require('express-session');
var logger              = require('morgan');
var cookieParser        = require('cookie-parser');
var methodOverride      = require('method-override');

var db                  = require('./models');
var auth                = require('./auth');
var userAPI             = require('./controllers/user');
var rideAPI             = require('./controllers/ride');

var app 				= express();
var config 				= null;

// Passport serialize the user into the session
passport.serializeUser(function(user, done) {
      done(null, user);
});

// Passport deserialize the user out of the session
passport.deserializeUser(function(obj, done) {
      done(null, obj);
});

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

            // Setting up FB authentication //
            auth.setUpFBAuth(config, passport, FacebookTokenStrategy);            

    		// Set up globals in the req object.
            // Do this first or they will not show up in the req.
            app.use(function(req, res, next) {
                req.db = db.db;
                req.configName = configName;
                next();
            });

            app.use(session({
                secret: 'boilerup',
                cookie: {secure: false},
                resave: true,
                saveUninitialized: true
            }));

            app.set('port', port);
            app.use(methodOverride());
            app.use(cookieParser());
            app.use(logger('dev'));
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({extended: 'false'}));

            app.use(passport.initialize());
            app.use(passport.session());


            // -- ROUTES -- //
            app.get('/'
                , function(req, res) {
                    res.send('Welcome to Rideshare. You are NOT authenticated.')
            });
    		app.post('/'
                , auth.ensureAuthenticated
                , function(req, res) {
                        res.send('Welcome to Rideshare. You have been authenticated');
    		});


            app.post('/login/facebook', passport.authenticate('facebook-token'), function(req, res) {
                res.sendStatus(200);
            });
            app.get('/logout'
                , auth.ensureAuthenticated
                , function(req, res) {
                    req.logout();
                    res.sendStatus(200);
            });

            app.post('/get_all_users'
                , auth.ensureAuthenticated
                , userAPI.getAllUsers);
    	}
    });

    app.listen(port, function() {
    	console.log('Server running at port ' + port);
    });

});