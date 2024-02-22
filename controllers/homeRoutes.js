const router = require('express').Router();
const { Pet, User, Favorite } = require('../models');

router.get('/', async (req, res) => {
  try {
    // Get all pets and JOIN with user data
    const petData = await Pet.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
          as: 'favorited_by_user'
        },
      ],
    });

    // Serialize data so the template can read it
    const pets = petData.map((pet) => pet.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      pets, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get('/pet/:id', async (req, res) => {
  try {
    const petData = await Pet.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
          as: 'favorited_by_user',
        },
      ],
    });
    
    const pet = petData.get({ plain: true });
    let isFavorite = false;

    if (req.session.logged_in) {
      const currentUser = await User.findByPk(req.session.user_id);
      if (currentUser) {
        isFavorite = await currentUser.hasFavorite(pet);
      }
    }

    res.render('pet', {
      ...pet,
      logged_in: req.session.logged_in,
      isFavorite: isFavorite,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/profile', async (req, res) => {
  try {

    if (!req.session.logged_in) {
      res.redirect('/login');
      return;
    }

    const userData = await User.findByPk(req.session.user_id, {
      include: [{ model: Pet, as: 'favorite_pets' }],
    });

    const user = userData.get({ plain: true });
    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/profile/add-favorite', async (req, res) => {
  try {
    const { pet_id } = req.body;

    if (!pet_id) {
      return res.status(400).json({ message: "Pet ID is required" });
    }

    await Favorite.create({
      pet_id,
      user_id: req.session.user_id,
    });

    res.redirect('/profile');
  } catch (error) {
    console.error('Error adding to favorites:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



module.exports = router;
