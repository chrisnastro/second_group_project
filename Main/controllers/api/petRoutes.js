const router = require('express').Router();
const { Pet } = require('../../models');

// Route for fetching all pets
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.findAll();
    res.status(200).json(pets);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for fetching a single pet
router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (!pet) {
      res.status(404).json({ message: 'Pet not found!' });
      return;
    }
    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
