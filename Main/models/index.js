const User = require('./User');
const Pet = require('./Pet');
const Favorite = require('./Favorite');

User.hasMany(Pet, {
  // through: {
    // model: Favorite,
    foreignKey: 'pet_id',
  // },
    // as: 'favorite_pets'
});

Pet.belongsToMany(User, {
  through: {
    model: Favorite,
    foreignKey: 'user_id',
  },
  as: 'starred_by_users'
})

module.exports = { User, Pet, Favorite };
