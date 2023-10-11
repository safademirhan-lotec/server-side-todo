const express = require('express');
const router = express.Router();
const pool = require('../database');

// Route to list users own tasks
router.get('/', async (req, res) => {
  const user_id = req.session.userId; // Get the user's ID from the session
  try {
    const { rows } = await pool.query(
      'SELECT * FROM todos WHERE user_id = $1 ORDER BY id',
      [user_id]
    );
    res.render('home', { tasks: rows });
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to add a new task
router.post('/tasks', async (req, res) => {
  const { description, assignee } = req.body;
  const user_id = req.session.userId; // Get the user's ID from the session
  try {
    await pool.query(
      'INSERT INTO todos (description, assignee, user_id) VALUES ($1, $2, $3)',
      [description, assignee, user_id]
    );
    res.redirect('/home/');
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to mark a task as done
router.post('/tasks/:id/done', async (req, res) => {
  const taskId = req.params.id;
  try {
    await pool.query('UPDATE todos SET status = true WHERE id = $1', [taskId]);
    res.redirect('/home/');
  } catch (error) {
    console.error('Error marking task as done:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to mark a task as undone
router.post('/tasks/:id/undone', async (req, res) => {
  const taskId = req.params.id;
  try {
    await pool.query('UPDATE todos SET status = false WHERE id = $1', [taskId]);
    res.redirect('/home/');
  } catch (error) {
    console.error('Error marking task as undone:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to delete a task
router.post('/tasks/:id/delete', async (req, res) => {
  const taskId = req.params.id;
  try {
    await pool.query('DELETE FROM todos WHERE id = $1', [taskId]);
    res.redirect('/home/');
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to update a task by ID
router.post('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  const { description, assignee } = req.body;
  try {
    // Update the task in the database
    await pool.query(
      'UPDATE todos SET description = $1, assignee = $2 WHERE id = $3',
      [description, assignee, taskId]
    );
    res.redirect('/home/');
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
