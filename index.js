const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const todosRouter = require('./routes/todos');
const pool = require('./database');
const app = express();
const port = process.env.PORT || 3000;

// View engine setup using express-handlebars
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
  })
);
app.set('view engine', 'handlebars');

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the todosRouter for routes under /todos
app.use('/', todosRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
