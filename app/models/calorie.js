module.exports = function(sequelize, DataTypes) {
    var Calorie = sequelize.define("Calorie", {
        calories: DataTypes.INT
    },
    {
        classMethods: {
            associate: function(models) {
                Calorie.belongsto(models.User, {
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
};