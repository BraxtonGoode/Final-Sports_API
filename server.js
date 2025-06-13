const mongoDb = require('./DB/connect.js');
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Passport GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // Here you would typically save the user to your database
      return done(null, profile);
    }
  )
);
// Serialize user
passport.serializeUser((user, done) => {
  done(null, user);
});
// Deserialize user
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => {
  const user = req.session?.passport?.user;
  if (user) {
    res.send(`You are logged in, ${user.displayName || user.username}!`);
  } else {
    res.send('You are not logged in. Please log in with GitHub.');
  }
});

app.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home.
    req.session.user = req.user;
    res.redirect('/');
  }
);

app.get('/debug-session', (req, res) => {
  res.json({
    sessionUser: req.session.user,
    passportUser: req.session.passport?.user
  });
});

// Routes
app.use('/', require('./routes'));

mongoDb.initDb((err) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
  } else {
    console.log('Connected to the database successfully');

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
});
