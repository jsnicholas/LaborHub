const withAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.render('login', { error: "Please log in." });
  } else {
    next();
  }
};

module.exports = withAuth;
