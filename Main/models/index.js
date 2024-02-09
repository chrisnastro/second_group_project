const User = require('./User');
const Pet = require('./Pet');
const Favorite = require('./Favorite');

// User.hasMany(Pet, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });

// Pet.belongsTo(User, {
//   foreignKey: 'user_id'
// });

User.belongsToMany(Pet, {
  through: {
    model: Favorite,
    unique: false
  },
  as: 'favorite_pets'
});

Pet.belongsToMany(User, {
  through: {
    Favorite,
    unique: false
  },
  as: 'starred_pets'
})

module.exports = { User, Pet, Favorite };
