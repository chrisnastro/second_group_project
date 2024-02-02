const sequelize = require('../config/connection');
const { User, Pet } = require('../models');

const userData = require('./userData.json');
const petData = require('./petData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const pet of petData) {
    await Pet.create({
      ...pet, 
      primary_breed: pet.breeds ? pet.breeds.primary : '',
      name: pet.name,
      description: pet.description ? pet.description : '',
      // photos: pet.primary_photo_cropped,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
