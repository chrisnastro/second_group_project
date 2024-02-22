const sequelize = require('../config/connection');
const { User, Pet, Favorite } = require('../models');

const userData = require('./userData.json');
const petData = require('./petData.json');

const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');

    await sequelize.sync({ force: true });

    console.log('Database synchronized successfully.');

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    console.log(`${users.length} users created successfully.`);

    for (const pet of petData) {
      const createdPet = await Pet.create({
        ...pet, 
        primary_breed: pet.breeds ? pet.breeds.primary : '',
        description: pet.description ? pet.description : '',
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });

      console.log(`Pet with ID ${createdPet.id} created successfully.`);

      // Add favorite entry for each pet and a random user
      const randomUser = users[Math.floor(Math.random() * users.length)];
      await Favorite.create({
        pet_id: createdPet.id,
        user_id: randomUser.id
      });
      console.log(`Favorite entry added for pet with ID ${createdPet.id} and user with ID ${randomUser.id}.`);
    }

    console.log('Database seeding completed successfully.');
  } catch (error) {
    console.error('An error occurred during database seeding:', error);
  } finally {
    process.exit(0);
  }
};

seedDatabase();
