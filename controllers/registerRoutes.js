const router = require('express').Router();
const statesUS = require('../utils/json/states_hash.json');
const { User, Employee } = require('../models');
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
                        id: req.body.id,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email,
                        personal_phone: req.body.personal_phone,
                        address1: req.body.address1,
                        address2: req.body.address2,
                        city: req.body.city,
                        state: req.body.state,
                        zip: req.body.zip,
                        sex: req.body.sex,
                        sexual_orientation: req.body.sexual_orientation,
                        hire_date: req.body.hire_date,
                        position: req.body.position,
                        title: req.body.title,
                        ethnicity: req.body.ethnicity,
                        work_phone: req.body.work_phone,
                        work_phoneext: req.body.work_phoneext,
                        base_rate: req.body.base_rate,
                        annual_salary: req.body.annual_salary
                    })
                })
                res.render("login", { message: "Successfully registered. Please log in." });
            }
        })
    } catch (err) {
        console.log(err);
        res.send(err)
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