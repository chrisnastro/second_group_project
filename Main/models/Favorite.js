const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Favorite extends Model {}

Favorite.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'user',
              key: 'id',
              onDelete: 'CASCADE',
            }
        },
        pet_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
              model: 'pet',
              key: 'id',
            }
        },
     },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'favorite',
      }
    );

    module.exports = Favorite;