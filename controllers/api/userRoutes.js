const router = require('express').Router();
const { User, Pet, Favorite } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userData = await User.create({ name, email, password });

    req.session.user_id = userData.id;
    req.session.logged_in = true;
    req.session.save(() => {
      res.status(200).json({ user: userData, message: 'User profile created successfully!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.user_id = userData.id;
    req.session.logged_in = true;

    req.session.save(() => {
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Pet, as: 'favorite_pets' }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id/favorites', withAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Favorite, as: 'favorite_pets' }],
    });
    if (!user) {
      res.status(404).json({ message: 'User not found!' });
      return;
    }
    res.status(200).json(user.favorite_pets);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
