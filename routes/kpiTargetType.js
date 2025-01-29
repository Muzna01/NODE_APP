// routes/kpiTargetType.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Create a new KPI target type
router.post('/', async (req, res) => {
    const { Name } = req.body;
    try {
        const [result] = await db.execute('INSERT INTO kpi_target_type (Name) VALUES (?)', [Name]);
        res.status(201).json({ id: result.insertId, Name });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all KPI target types
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM kpi_target_type');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single KPI target type by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.execute('SELECT * FROM kpi_target_type WHERE Id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'KPI target type not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a KPI target type
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { Name } = req.body;
    try {
        await db.execute('UPDATE kpi_target_type SET Name = ? WHERE Id = ?', [Name, id]);
        res.json({ id, Name });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a KPI target type
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM kpi_target_type WHERE Id = ?', [id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;