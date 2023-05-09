const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const statesUS = require('./utils/json/states_hash.json');
const paypal = require('paypal-rest-sdk');
// const __dirname = path.resolve()
// import fetch from "node-fetch";

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({
  helpers: {
    eachState: function () {
      const statesArr = Object.keys(statesUS)
      return statesArr;
    }
  }
})
const sess = {
  secret: process.env.sessionSecret,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync(
  // forcing a sync will delete all existing tables!
  // please be aware of this when setting force:true
  // { force: true }
).then(() => {
  app.listen(PORT, () => console.log(`Now listening at http://localhost:${PORT}`));
});
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': process.env.paypalClient,
  'client_secret': process.env.paypalSecret
});
