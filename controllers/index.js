const router = require('express').Router();

// const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const loginRoutes = require('./loginRoutes');
const registerRoutes = require('./registerRoutes');

router.use('/', homeRoutes);
router.use('/login', loginRoutes);
router.use('/register', registerRoutes);

module.exports = router;
