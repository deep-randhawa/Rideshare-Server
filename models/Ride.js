module.exports = function(sequelize, DataTypes) {
    var Ride = sequelize.define('Ride', {
    	ride_id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true
        },
    	createdBy: DataTypes.INTEGER,
        source: DataTypes.STRING,
        destination: DataTypes.STRING,
        rideDate: DataTypes.TIME,
        maxUsers: DataTypes.INTEGER,
        status: DataTypes.ENUM('ACTIVE', 'INACTIVE')
    }, 
    {
        syncOnAssociation: true,
        timestamps: false,
        underscored: true,
    });

    return Ride;
}
