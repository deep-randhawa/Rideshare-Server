var db = require('../models').db
var uuid = require('node-uuid');

module.exports.createUser = function(req, res) {

	// TODO: validate data. right now you are entering whatever comes in

	var home = req.body.homeLat.toString() + ":" + req.body.homeLong.toString();

	db.User.create({
		user_id: uuid.v4(),
		name: req.body.name,
		home_location: home,
		merchant_id: req.body.merchant_id,
		auth_type: req.body.auth_type
	})
	.then(function(user) {
		res.sendStatus(200);
	})
	.error(function(err) {
		console.log('Error in creating user: ' + err);
		res.sendStatus(500);
	});

}

module.exports.getAllUsers = function(req, res) {
	db.User.findAll()
	.then(function(users) {
		res.write(JSON.stringify(users));
		res.end();
	});
}