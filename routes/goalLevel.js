// routes/goalLevel.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Create a new goal level
router.post('/', async (req, res) => {
    const { Name } = req.body;
    try {
        const [result] = await db.execute('INSERT INTO goal_level (Name) VALUES (?)', [Name]);
        res.status(201).json({ id: result.insertId, Name });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all goal levels
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM goal_level');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single goal level by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.execute('SELECT * FROM goal_level WHERE Id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Goal level not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a goal level
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { Name } = req.body;
    try {
        await db.execute('UPDATE goal_level SET Name = ? WHERE Id = ?', [Name, id]);
        res.json({ id, Name });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a goal level
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM goal_level WHERE Id = ?', [id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;