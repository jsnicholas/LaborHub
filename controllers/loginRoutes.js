const router = require('express').Router();
const { User, Employee } = require('../models');
const bcrypt = require('bcrypt');
// Added variables to check for seed users
const tina = "tina@email.com"
const nick = "nick@email.com"

//this is the /login route
router.get('/', (req, res) => {
    // if the user is already logged in, redirect them to dashboard
    if (req.session.loggedIn) {
        res.render('dashboard', { loggedIn: req.session.loggedIn, title: "Dashboard - LaborHub" });
    } else {
        //otherwise render login page
        res.render('login', { title: "Login - LaborHub" });
    }
});
// POST route for login
router.post('/', async (req, res) => {
    console.log("we are starting the login POST req")
    const userFromDb = await User.findOne({
        where:
        {
            email: req.body.email
        }
    });
    try {
        // checks to see if tina seed is being used, and doesn't try to unsalt/unhash password if so. 
        // if (req.body.email = tina) {
        //     if (req.body.password == 'Password1') {
        //         const employeeFromDb = await Employee.findOne({
        //             where: {
        //                 id: userFromDb.id
        //             }
        //             // then set up their session and dashboard
        //         }).then((result) => { console.log(result); return result })
        //         req.session.loggedIn = true;
        //         res.render('dashboard', { first_name: employeeFromDb.first_name, last_name: employeeFromDb.last_name, loggedIn: req.session.loggedIn, title: "Dashboard - LaborHub" })
        //         // return;
        //     }
        // }
        // checks to see if nick seed is being used, and doesn't try to unsalt/unhash password if so. 
        // if (req.body.email = nick) {
        //     console.log("Is the error happening before or after this")
        //     if (req.body.password == '123456789') {
        //         const employeeFromDb = await Employee.findOne({
        //             where: {
        //                 id: userFromDb.id
        //             }
        //             // then set up their session and dashboard
        //         }).then((result) => { console.log(result); return result })
        //         req.session.loggedIn = true;
        //         res.render('dashboard', { first_name: employeeFromDb.first_name, last_name: employeeFromDb.last_name, loggedIn: req.session.loggedIn })

        //         // return;
        //     }
        // }

        // compare entered pw to hashed pw from user db
        console.log("we are checking passwords")
        if (await bcrypt.compare(req.body.password, userFromDb.password)) {
            // if pw matches, get info from employee db
            const employeeFromDb = await Employee.findOne({
                where: {
                    id: userFromDb.id
                }
                // then set up their session and dashboard
            }).then((result) => { console.log(result); return result })
            req.session.loggedIn = true;
            res.render('dashboard', { first_name: employeeFromDb.first_name, last_name: employeeFromDb.last_name, loggedIn: req.session.loggedIn, title: "Dashboard - LaborHub" })
            // return;
        } else {
            console.log("we are rendering the login page again")
            res.render('login', { error: "Incorrect Email or Password. Please try again." })
            // return;
        }
    } catch (err) {
        console.log("we got an error on logging in")
        res.render('login', { error: err, title: "Login - LaborHub" });
    }

});


module.exports = router;