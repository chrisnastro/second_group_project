const User = require('./User');
const Pet = require('./Pet');
const Favorite = require('./Favorite');

User.belongsToMany(Pet, {
  through: {
    model: Favorite,
    foreignKey: 'user_id',
  },
    as: 'favorite_pets'
});

Pet.belongsToMany(User, {
  through: Favorite,
    foreignKey: 'pet_id',
  as: 'favorited_by_user'
})

module.exports = { User, Pet, Favorite };
