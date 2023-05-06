const router = require('express').Router();
const { User, Employee } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.render('dashboard', { first_name: req.session.first_name, last_name: req.session.last_name, loggedIn: req.session.loggedIn })
    } else {
      res.render('login', { message: "Welcome! Please log in or register." })
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  console.log(req.session.loggedIn)
  // if the user is already logged in, redirect them to dashboard
  if (req.session.loggedIn) {
    res.render('dashboard', { loggedIn: req.session.loggedIn });
  }
  // POST requests for login
  router.post('/login', async (req, res) => {
    const userFromDb = await User.findOne({
      where:
      {
        email: req.body.email
      }
    });
    try {
      // we need to implement bcrypt compare
      if (req.body.password === userFromDb.password) {
        const employeeFromDb = await Employee.findOne({
          where: {
            user_id: userFromDb.id
          }
        }).then((result) => { return result })
        req.session.loggedIn = true;
        res.render('dashboard', { first_name: employeeFromDb.first_name, last_name: employeeFromDb.last_name, loggedIn: req.session.loggedIn })
        // return;
      } else {
        res.render('login', { error: "Incorrect Email or Password. Please try again." })
        // return;
      }
    } catch (err) {
      res.render('login', { error: err });
      // return;
      // res.status(400).json(err);
    }
  });
  res.render('login');
});


router.get('/dashboard', withAuth, (req, res) => {
  res.render('dashboard', { first_name: req.session.first_name, last_name: req.session.last_name, loggedIn: req.session.loggedIn })
})

router.get('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy();
    res.render('index', { message: "You have been logged out" })
    // res.status(204).end();
  } else {
    res.redirect('/')
  }
});

module.exports = router;
