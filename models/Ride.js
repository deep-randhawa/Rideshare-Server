module.exports = function(sequelize, DataTypes) {
    var Ride = sequelize.define('Ride', {
    	ride_id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true
        },
    	createdBy: DataTypes.INTEGER,
        fromLocation: DataTypes.STRING,
        toLocation: DataTypes.STRING,
        rideDate: DataTypes.TIME
    }, 
    {
        syncOnAssociation: true,
        timestamps: false,
        underscored: true,
    });

    return Ride;
}
