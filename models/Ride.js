module.exports = function(sequelize, DataTypes) {
    var Ride = sequelize.define('Ride', {
    	ride_id: { 
            type:               DataTypes.INTEGER,
            autoIncrement:      true,
            primaryKey:         true
        },
    	createdByID:            DataTypes.BIGINT,
        createdByProvider:      DataTypes.STRING,
        sourceCoordinates:      DataTypes.STRING,
        destinationCoordinates: DataTypes.STRING,
        sourceAddress:          DataTypes.STRING,
        destinationAddress:     DataTypes.STRING,
        rideDate:               DataTypes.DATE,
        maxUsers:               DataTypes.INTEGER,
        status:                 DataTypes.ENUM('ACTIVE', 'INACTIVE')
    }, 
    {
        syncOnAssociation:      true,
        timestamps:             true,
        underscored:            true,
    });

    return Ride;
}
