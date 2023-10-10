const express = require('express');
const router = express.Router();
const pool = require('../database');
const bcrypt = require('bcrypt');

// Route to signup a user
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [
      username,
      hashedPassword,
    ]);
    res.redirect('/');
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to login a user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [
      username,
    ]);
    const user = result.rows[0];

    // Check if username is in users table before comparing password
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        req.session.id = user.id;
        res.redirect('/');
      } else {
        res.redirect('/login?error=1');
      }
    } else {
      res.redirect('/login?error=1');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to logout a user
router.get('/logout', (req, res) => {
  // Destroy the user session to log them out
  req.session.destroy((err) => {
    if (err) {
      console.error('Error logging out:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('/login');
    }
  });
});

// Route to login form view
router.get('/login', (req, res) => {
  res.render('login');
});

// Route to signup form view
router.get('/signup', (req, res) => {
  res.render('signup');
});

function requireAuth(req, res, next) {
  if (req.session.id) {
    // User is authenticated, proceed to the next middleware
    next();
  } else {
    res.redirect('/login');
  }
}

// Use the middleware to protect specific routes
router.get('/protected-route', requireAuth, (req, res) => {
  res.render('protected');
});

// Add a protected dashboard route
router.get('/dashboard', (req, res) => {
  if (req.session.id) {
    // User is authenticated, render the dashboard
    res.render('home');
  } else {
    res.redirect('/login');
  }
});
module.exports = router;
