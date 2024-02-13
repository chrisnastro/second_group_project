const router = require('express').Router();
const userRoutes = require('./userRoutes');
const petRoutes = require('./petRoutes');
const favoriteRoutes = require('./favoriteRoutes');

router.use('/users', userRoutes);
router.use('/pets', petRoutes);
router.use('/favorites', favoriteRoutes);

module.exports = router;
