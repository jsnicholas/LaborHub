const router = require('express').Router();


router.get('/', (req, res) => {
    console.log(req.session.loggedIn)
    // if the user is already logged in, redirect them to dashboard
    if (req.session.loggedIn) {
        res.render('dashboard', { loggedIn: req.session.loggedIn });
    }
    // POST requests for login
    router.post('/', async (req, res) => {
        const userFromDb = await User.findOne({
            where:
            {
                email: req.body.email
            }
        });
        try {
            // we need to implement bcrypt compare
            if (bcrypt.compare(req.body.password, userFromDb.password)) {
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


module.exports = router;