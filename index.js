const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const todosRouter = require('./routes/todos');
const userRouter = require('./routes/users');
const app = express();
const methodOverride = require('method-override');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.dev_port || 3000;

// View engine setup using express-handlebars
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
  })
);
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Configure express-session middleware
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);

// Use the todosRouter for routes under /todos
app.use('/home', requireAuth, todosRouter);

function requireAuth(req, res, next) {
  if (req.session.userId) {
    // User is authenticated, proceed to the next middleware
    next();
  } else {
    res.redirect('/login');
  }
}

// Use the userRouter for routes under /users
app.use('/', userRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
