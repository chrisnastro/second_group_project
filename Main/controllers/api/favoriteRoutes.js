const router = require('express').Router();
const { Pet, User, Favorite } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
res.send("hiyaaa")
});

router.post('/:id/add', withAuth, async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    
    if (!pet) {
      res.status(404).json({ message: 'No pet found with this id!' });
      return;
    }

    const currentUser = await User.findByPk(req.session.user_id);

    const isFavorite = await Favorite.findOne({
      where: {
        userId: currentUser.id,
        petId: pet.id
      }
    });

    if (isFavorite) {
      res.status(400).json({ message: 'This pet is already in your favorites list!'});
      return;
    }

    await Favorite.create({
      userId: currentUser.id,
      petId: pet.id
    });

    res.status(200).json({ message: 'Pet added to favorites!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id/remove', withAuth, async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    
    if (!pet) {
      res.status(404).json({ message: 'No pet found with this id!' });
      return;
    }

    const currentUser = await User.findByPk(req.session.user_id);

    await Favorite.destroy({
      where: {
        userId: currentUser.id,
        petId: pet.id
      }
    });

    res.status(200).json({ message: 'Pet removed from favorites!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
