module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
		user_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: DataTypes.STRING,
		homeLocation: DataTypes.STRING,									// will have coordinates of home <LAT:LONG>
		merchant_id: DataTypes.INTEGER,									// twitter/facebook/google unique ID
		authType: {
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