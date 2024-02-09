const router = require('express').Router();
const { Pet } = require('../../models');
const withAuth = require('../../utils/auth');

// Route for fetching all pets
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.findAll();
    res.status(200).json(pets);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
