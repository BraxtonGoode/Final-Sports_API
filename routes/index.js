const express = require('express');
const router = express.Router();


router.use('/', require('./swagger'));
router.use('/volleyball', require('./volleyball'));
router.use('/soccer', require('./soccer'));



// router.use('basketball', require('./basketball'));
// router.use('/user', require('./user'));

module.exports = router;