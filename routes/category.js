// routes/category.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Create a new category
router.post('/', async (req, res) => {
    const { Name } = req.body;
    try {
        const [result] = await db.execute('INSERT INTO category (Name) VALUES (?)', [Name]);
        res.status(201).json({ id: result.insertId, Name });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all categories
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM category');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single category by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.execute('SELECT * FROM category WHERE Id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Category not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a category
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { Name } = req.body;
    try {
        await db.execute('UPDATE category SET Name = ? WHERE Id = ?', [Name, id]);
        res.json({ id, Name });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a category
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM category WHERE Id = ?', [id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;