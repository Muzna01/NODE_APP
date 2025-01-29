// routes/goal.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Create a new goal
router.post('/', async (req, res) => {
    const { Name, goal_level, goal_type, parent } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO goal (Name, goal_level, goal_type, parent) VALUES (?, ?, ?, ?)',
            [Name, goal_level, goal_type, parent]
        );
        res.status(201).json({ id: result.insertId, Name, goal_level, goal_type, parent });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all goals
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM goal');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single goal by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.execute('SELECT * FROM goal WHERE Id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Goal not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a goal
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { Name, goal_level, goal_type, parent } = req.body;
    try {
        await db.execute(
            'UPDATE goal SET Name = ?, goal_level = ?, goal_type = ?, parent = ? WHERE Id = ?',
            [Name, goal_level, goal_type, parent, id]
        );
        res.json({ id, Name, goal_level, goal_type, parent });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a goal
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM goal WHERE Id = ?', [id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;