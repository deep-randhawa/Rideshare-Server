var db = require('../models').db

module.exports.getAllUsers = function(req, res) {
	db.User.findAll()
	.then(function(users) {
		res.write(JSON.stringify(users));
		res.end();
	});
}

module.exports.createUser = function(req, res) {
	db.User.create({
		user_id: 		req.body.user_id,
		name: 			req.body.name,
		home_location: 	req.body.home_location
	})
	.then(function(user) {
		res.sendStatus(200);
	})
	.error(function(err) {
		res.sendStatus(500);
	});
}