// routes/kpiWeightDistribution.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Create a new KPI weight distribution
router.post('/', async (req, res) => {
    const { value } = req.body;
    try {
        const [result] = await db.execute('INSERT INTO kpi_weight_distribution (value) VALUES (?)', [value]);
        res.status(201).json({ id: result.insertId, value });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all KPI weight distributions
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM kpi_weight_distribution');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single KPI weight distribution by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.execute('SELECT * FROM kpi_weight_distribution WHERE Id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'KPI weight distribution not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a KPI weight distribution
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;
    try {
        await db.execute('UPDATE kpi_weight_distribution SET value = ? WHERE Id = ?', [value, id]);
        res.json({ id, value });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a KPI weight distribution
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM kpi_weight_distribution WHERE Id = ?', [id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;