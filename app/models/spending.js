module.exports = function(sequelize, DataTypes) {
    var Spending = sequelize.define("Spending", {
        amount: { 
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }

    });

    Spending.associate(function(models) {
        Spending.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    });

    return Spending;
};