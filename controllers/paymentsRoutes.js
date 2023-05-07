const router = require('express').Router();
const { User, Employee, PayHist } = require('../models');
const withAuth = require('../utils/auth')

router.get('/', withAuth, (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
});

module.exports = router;