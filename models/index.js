var fs 				= require('fs')
var Sequelize		= require('sequelize')
var path 			= require('path')

var mysequelize		= null
var db 				= {}

var seq = function(config, callback) {
	if (mysequelize == null) {
		mysequelize = new Sequelize(
			config.database.database,
            config.database.username,
            config.database.password,
            {
            	dialect: config.database.dialect,
                port: config.database.port,
                host: config.database.host
            }
		);
	}


	// create a table from all the files in models directory
	fs.readdirSync(__dirname).filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js')
    }).forEach(function(file) {
        var model = mysequelize.import(path.join(__dirname, file))
        db[model.name] = model
    });


    mysequelize.sync({force: true}).then(callback());
}

module.exports = {
	db: db,
	sequelize: seq
}