const router = require('express').Router();
const { User, Employee } = require('../models');
const withAuth = require('../utils/auth');
const bcrypt = require('bcrypt');
const statesUS = require('../utils/json/states_hash.json')

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

router.post("/register", async (req, res) => {
  try {
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(async (result) => {
      if (result !== null) {
        res.render("register", { error: "User already exists. Please try registering with a new username or email" })
      } else {
        const salt = await bcrypt.genSalt(10)
        await bcrypt.hash(req.body.password, salt).then(function (hash) {
          User.create({
            usr_name: req.body.usr_name,
            email: req.body.email,
            password: hash
          })
        })
        res.render("login", { message: "Successfully registered. Please log in." });
      }
    })
  } catch (err) {
    res.send("error")
  }
});

router.get('/register', (req, res) => {
  const statesArr = Object.keys(statesUS)
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('register', { statesArr });
});

router.get('/dashboard', withAuth, (req, res) => {
  res.render('dashboard', { first_name: req.session.first_name, last_name: req.session.last_name, loggedIn: req.session.loggedIn })
})

module.exports = router;
