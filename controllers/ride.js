var db = require('../models').db

module.exports.newRide = function(req, res) {
	db.Ride.create({
		createdByID: 		req.user[0].user_id,
		createdByProvider: 	req.user[0].provider,
		source: 			req.body.source,
		destination: 		req.body.destination,
		rideDate: 			req.body.rideDate,
		maxUsers: 			req.body.maxUsers,
		status: 			'ACTIVE'
	})
	.then(function(ride) {
		res.sendStatus(200);
	})
	.error(function(err) {
		console.log(err);
		res.sendStatus(500);
	});
}