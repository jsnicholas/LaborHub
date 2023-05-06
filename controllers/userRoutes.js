const router = require('express').Router();
const { User } = require('../models');

// Login Routes //

// router.get('/login', (req, res) => {
//   if (req.session.logged_in) {
//     res.redirect('/');
//     return;
//   }

//   router.post('/login', async (req, res) => {
//     try {
//       await User.findOne({
//         where:
//         {
//           email: req.body.email
//         }
//       }).then(async (result) => {
//         console.log(`The user is logged in: ${JSON.stringify(result.id)}`);
//         const employeeID = await Employee.findOne({
//           where: {
//             user_id: result.id
//           }
//         })
//         console.log(`We found an employee : ${JSON.stringify(employeeID)}`);
//         hashedPassword = result.password;
//         if (req.body.password === hashedPassword) {
//           req.session.loggedIn = true;
//           res.render('dashboard', { first_name: employeeID.first_name, last_name: employeeID.last_name, loggedIn: req.session.loggedIn })
//         }
//       });

//     } catch (err) {
//       res.status(400).json(err);
//     }
//   });

//   res.render('login');
// });

// user logout route
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
