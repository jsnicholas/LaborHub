const withAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
    console.log("User is not logged in")
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
