const router = require('express').Router();
const { User, Employee } = require('../models');
const bcrypt = require('bcrypt');

//this is the /login route
router.get('/', (req, res) => {
    // if the user is already logged in, redirect them to dashboard
    if (req.session.loggedIn) {
        res.render('dashboard', { loggedIn: req.session.loggedIn });
    } else {
        //otherwise render login page
        res.render('login');
    }
});
// POST route for login
router.post('/', async (req, res) => {
    const userFromDb = await User.findOne({
        where:
        {
            email: req.body.email
        }
    });
    try {
        // compare entered pw to hashed pw from user db
        if (await bcrypt.compare(req.body.password, userFromDb.password)) {
            // if pw matches, get info from employee db
            const employeeFromDb = await Employee.findOne({
                where: {
                    id: userFromDb.id
                }
                // then set up their session and dashboard
            }).then((result) => { console.log(result); return result })
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
    res.render('login');
});


module.exports = router;