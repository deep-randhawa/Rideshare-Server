var db = require('../models').db

module.exports.getAllUsers = function(req, res) {
	db.User.findAll()
	.then(function(users) {
		res.write(JSON.stringify(users));
		res.end();
	});
}