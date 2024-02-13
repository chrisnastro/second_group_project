const User = require('./User');
const Pet = require('./Pet');
const Favorite = require('./Favorite');

User.belongsToMany(Pet, {
  through: {
    model: Favorite,
    foreignKey: 'userId',
  },
    as: 'favorite_pets'
});

Pet.belongsToMany(User, {
  through: {
    model: Favorite,
    foreignKey: 'petId',
  },
  as: 'starred_by_users'
})

module.exports = { User, Pet, Favorite };
