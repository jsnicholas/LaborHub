const router = require('express').Router();
const statesUS = require('../utils/json/states_hash.json')
const bcrypt = require('bcrypt');


router.post("/", async (req, res) => {
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
                    Employee.create({
                        // info goes here for employee
                    })
                })
                res.render("login", { message: "Successfully registered. Please log in." });
            }
        })
    } catch (err) {
        res.send("error")
    }
});

router.get('/', (req, res) => {
    const statesArr = Object.keys(statesUS)
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('register', { statesArr });
});

module.exports = router;