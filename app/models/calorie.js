module.exports = function(sequelize, DataTypes) {
    var Calorie = sequelize.define("Calorie", {
        amount: {
            type: DataTypes.INT,
            allowNull: false
        }
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