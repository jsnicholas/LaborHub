const router = require('express').Router();
const { User, Employee, PayHist } = require('../models');
// const withAuth = require('../utils/auth')

router.get('/', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
        res.render('payments');        
});

module.exports = router;