const router = require('express').Router();

// const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const loginRoutes = require('./loginRoutes');
const registerRoutes = require('./registerRoutes');
const paymentsRoutes = require('./paymentsRoutes')

router.use('/', homeRoutes);
router.use('/login', loginRoutes);
router.use('/register', registerRoutes);
router.use('/pay', paymentsRoutes);

module.exports = router;
