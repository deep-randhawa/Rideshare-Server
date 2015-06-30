module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
		user_id: {
			type: DataTypes.BIGINT,
			primaryKey: true
		},
		name: DataTypes.STRING,
		home_location: DataTypes.STRING,									// will have coordinates of home <LAT:LONG>
		provider: {
			type: DataTypes.ENUM('unknown', 'twitter', 'facebook', 'google'),
			primaryKey: true
		}
	}, 
	{
		syncOnAssociation: true,
		timestamps: false,
		underscored: true
	});

	return User;
}