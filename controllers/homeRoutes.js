const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.render('dashboard', { first_name: req.session.first_name, last_name: req.session.last_name, loggedIn: req.session.loggedIn, title: "Welcome - LaborHub" })
    } else {
      res.render('login', { message: "Welcome! Please log in or register.", title: "Login - LaborHub" })
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, (req, res) => {
  res.render('dashboard', { first_name: req.session.first_name, last_name: req.session.last_name, loggedIn: req.session.loggedIn, title: "Dashboard - LaborHub" })
})

router.get('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy();
    res.render('index', { message: "You have been logged out", title: "Logged Out - LaborHub" })
    // res.status(204).end();
  } else {
    res.redirect('/')
  }
});

module.exports = router;
