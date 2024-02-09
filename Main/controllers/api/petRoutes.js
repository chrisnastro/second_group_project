const router = require('express').Router();
const { Pet } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/api/pets', (req, res) => {res.json(`${req.method} request recieved`)});

const favButtonHandler = async (event) => {
  event.preventDefault();
  console.log(event.target);
  
  const id = document.querySelector('#favorite-pet').getAttribute(
      "data-id"
  );

  const response = await fetch(`/api/pets/${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ id: id }), // Include the id in the request body
  });

  if (response.ok) {
      document.location('/profile');
  } else {
      alert('Could not add to favorites');
  }
};
// Route for adding a pet to favorites
router.put('/:id/favorite', withAuth, async (req, res) => {
  try {
    const pet = await Pet.update(req.params.id);
    
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