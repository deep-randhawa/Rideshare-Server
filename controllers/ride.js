var db 			= require('../models').db
var request 	= require('request')
var async 		= require('async')

module.exports.newRide = function(req, res) {
	async.parallel({
		source: function(callback) {
			getAddress(req.body.source, function(data) {
				callback(null, data);
			});
		},
		destination: function(callback) {
			getAddress(req.body.destination, function(data) {
				callback(null, data);
			});
		},
	},
	function(err, results) {
		db.Ride.create({
			createdByID: 				req.user[0].user_id,
			createdByProvider: 			req.user[0].provider,
			sourceCoordinates: 			req.body.source,
			sourceAddress: 				results['source'],
			destinationCoordinates: 	req.body.destination,
			destinationAddress: 		results['destination'],
			rideDate: 					req.body.rideDate,
			maxUsers: 					req.body.maxUsers,
			status: 					'ACTIVE'
		})
		.then(function(ride) {
			res.end(JSON.stringify({
				objectId: ride.ride_id,
				createdAt: ride.created_at
			}));
		})
		.error(function(err) {
			console.log(err);
			res.sendStatus(500);
		});
	});
}

module.exports.getAllRides = function(req, res) {
	db.Ride.findAll()
	.then(function(users) {
		res.write(JSON.stringify(users));
		res.end();
	});
}

module.exports.getRide = function(req, res) {
	db.Ride.findOne({ where: {ride_id: req.params.id} })
	.then(function(ride) {
		console.log(JSON.stringify(ride));
		res.write(JSON.stringify(ride));
		res.end();
	})
	.error(function(err) {
		console.log("error in retrieving ride object. " + err);
		res.sendStatus(500);
	});
}

getAddress = function(coordinates, callback) {
	var queryString = {
		key: process.env.MAPS_KEY,
		latlng: coordinates.replace(":", ",")
	}
	var options = {
		host: 'https://maps.googleapis.com',
		path: '/maps/api/geocode/json'
	}
	request.get({
		url: options.host + options.path,
		qs: queryString
	}, function(err, response, body) {
		if (err) { console.log(err); callback(err); return; }
		var address = JSON.parse(body)['results'][0];
		callback(address['formatted_address']);
	});
}