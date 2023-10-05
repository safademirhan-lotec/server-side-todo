const express = require('express');
const router = express.Router();
const pool = require('../database');

// Route to list all tasks
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM todos ORDER BY id');
    res.render('home', { tasks: rows });
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to add a new task
router.post('/tasks', async (req, res) => {
  const { description, assignee } = req.body;
  try {
    await pool.query(
      'INSERT INTO todos (description, assignee) VALUES ($1, $2)',
      [description, assignee]
    );
    res.redirect('/');
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
    res.redirect('/');
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
    res.redirect('/');
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
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;