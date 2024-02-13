const router = require('express').Router();
const { Pet, User, Favorite } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {

    const petData = await Pet.findAll({
    });

    if (req.session.loggedIn) {
      includeOptions.push({
        model: Favorite,
        required: false,
        where: { userId: req.session.user_id },
      });
    }

    // Serialize data so the template can read it
    const pets = petData.map((pet) => pet.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      pets,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/pet/:id', async (req, res) => {
  try {
    const petData = await Pet.findByPk(req.params.id, {
    });

    const pet = petData.get({ plain: true });

    let isFavorite = false;
    if (req.session.loggedIn) {
      const currentUser = await User.findByPk(req.session.user_id);
      if (currentUser) {
        isFavorite = await currentUser.hasFavorite(petData);
      }
    }

    res.render('pet', {
      ...pet,
      loggedIn: req.session.loggedIn,
      isFavorite: isFavorite,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Pet }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      loggedIn: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
