module.exports = function(sequelize, DataTypes) {
    var Spending = sequelize.define("Spending", {
        amount: { 
            type: DataTypes.INT,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
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