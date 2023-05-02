const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');
const bcrypt = require('bcrypt');

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
        res.render("login", { error: "Successfully registered. Please log in." });
      }
    })
  } catch (err) {
    res.send("error")
  }
});

router.get('/register', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('register');
});

router.get('/dashboard', (req, res) => {
  res.render('dashboard')
})

module.exports = router;
