const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    res.render('index', { loggedIn: req.session.loggedIn });

    // const userData = await User.findAll({
    //   attributes: { exclude: ['password'] },
    //   order: [['name', 'ASC']],

    // const users = userData.map((project) => project.get({ plain: true }));

    // res.render('homepage', {
    //   users,
    //   logged_in: req.session.logged_in,})
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/register', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('register');
});

router.get('/dashboard', withAuth, (req, res) => {
  res.send('dashboard')
})

module.exports = router;
