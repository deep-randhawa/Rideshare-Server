module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
		user_id: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		name: DataTypes.STRING,
		home_location: DataTypes.STRING,									// will have coordinates of home <LAT:LONG>
		merchant_id: DataTypes.INTEGER,									// twitter/facebook/google unique ID
		auth_type: {
			type: DataTypes.ENUM('twitter', 'facebook', 'google'),
			allowNull: false
		}
	}, 
	{
		syncOnAssociation: true,
		timestamps: false,
		underscored: true
	});

	return User;
}