module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
		user_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: DataTypes.STRING,
		location: DataTypes.STRING,
		fb_id: DataTypes.INTEGER,
		email: DataTypes.STRING
	}, 
	{
		syncOnAssociation: true,
		timestamps: false,
		underscored: true
	});

	return User;
}