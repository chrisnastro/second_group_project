const router = require('express').Router();
const { Pet } = require('../../models');
const withAuth = require('../../utils/auth');

// Route for adding a pet to favorites
router.post('/:id/favorite', withAuth, async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    
    if (!pet) {
      res.status(404).json({ message: 'No pet found with this id!' });
      return;
    }

    // Mark the pet as a favorite for the current user
    await pet.update({ isFavorite: true });

    res.status(200).json({ message: 'Pet added to favorites!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for removing a pet from favorites
router.delete('/:id/favorite', withAuth, async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    
    if (!pet) {
      res.status(404).json({ message: 'No pet found with this id!' });
      return;
    }

    // Remove the pet from favorites for the current user
    await pet.update({ isFavorite: false });

    res.status(200).json({ message: 'Pet removed from favorites!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;