const User = require('./User');
const Pet = require('./Pet');
const Favorite = require('./Favorite');

User.belongsToMany(Pet, {
  through: {
    model: Favorite,
    foreignKey: 'user_id',
    unique: false
  },
  as: 'favorite_pets'
});

Pet.belongsToMany(User, {
  through: {
    Favorite,
    foreignKey: 'pet_id',
    unique: false
  },
  as: 'starred_by_users'
})

module.exports = { User, Pet, Favorite };
