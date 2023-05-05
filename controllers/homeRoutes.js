const router = require('express').Router();
const { User, Employee } = require('../models');
const withAuth = require('../utils/auth');
const bcrypt = require('bcrypt');
const statesUS = require('../utils/json/states_hash.json')

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

  router.post('/login', async (req, res) => {
    try {
      await User.findOne({
        where:
        {
          email: req.body.email
        }
      }).then(async (result) => {
        console.log(`The user is logged in: ${JSON.stringify(result.id)}`);
        const employeeID = await Employee.findOne({
          where: {
            user_id: result.id
          }
        })
        console.log(`We found an employee : ${JSON.stringify(employeeID)}`);
        hashedPassword = result.password;
        if (req.body.password === hashedPassword) {
          req.session.loggedIn = true;
          res.render('dashboard', { first_name: employeeID.first_name, last_name: employeeID.last_name })
        }
      });
      // if (!userData) {
      //   res
      //     .status(400)
      //     .render('login', { error: 'Incorrect email or password, please try again' });
      //   return;
      // }

      // const validPassword = await userData.checkPassword(req.body.password);

      // if (!validPassword) {
      //   res
      //     .status(400)
      //     .render('login', { error: 'Incorrect email or password, please try again' });
      //   return;
      // }

      // req.session.save(() => {
      //   req.session.user_id = userData.id;
      //   req.session.logged_in = true;

      //   res.json({ user: userData, message: 'You are now logged in!' });
      // });

    } catch (err) {
      res.status(400).json(err);
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
  res.render('dashboard', { first_name: req.session.first_name, last_name: req.session.last_name })
})

module.exports = router;
