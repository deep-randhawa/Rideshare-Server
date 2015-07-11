module.exports = function(sequelize, DataTypes) {
    var Ride = sequelize.define('Ride', {
    	ride_id: { 
            type:               DataTypes.INTEGER,
            autoIncrement:      true,
            primaryKey:         true
        },
    	createdByID:            DataTypes.BIGINT,
        createdByProvider:      DataTypes.STRING,
        source:                 DataTypes.STRING,
        destination:            DataTypes.STRING,
        rideDate:               DataTypes.DATE,
        maxUsers:               DataTypes.INTEGER,
        status:                 DataTypes.ENUM('ACTIVE', 'INACTIVE')
    }, 
    {
        syncOnAssociation:      true,
        timestamps:             false,
        underscored:            true,
    });

    return Ride;
}
