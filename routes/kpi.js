// routes/kpi.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Create a new KPI
router.post('/', async (req, res) => {
    const { Name, Description, Target_kpi_val, Target_kpi_type, weight_distribution, kpi_type, kpi_subtype, kpi_level, segment, category, parent_kpi } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO kpi (Name, Description, Target_kpi_val, Target_kpi_type, weight_distribution, kpi_type, kpi_subtype, kpi_level, segment, category, parent_kpi) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [Name, Description, Target_kpi_val, Target_kpi_type, weight_distribution, kpi_type, kpi_subtype, kpi_level, segment, category, parent_kpi]
        );
        res.status(201).json({ id: result.insertId, Name, Description, Target_kpi_val, Target_kpi_type, weight_distribution, kpi_type, kpi_subtype, kpi_level, segment, category, parent_kpi });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all KPIs
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM kpi');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single KPI by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.execute('SELECT * FROM kpi WHERE Id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'KPI not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a KPI
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { Name, Description, Target_kpi_val, Target_kpi_type, weight_distribution, kpi_type, kpi_subtype, kpi_level, segment, category, parent_kpi } = req.body;
    try {
        await db.execute(
            'UPDATE kpi SET Name = ?, Description = ?, Target_kpi_val = ?, Target_kpi_type = ?, weight_distribution = ?, kpi_type = ?, kpi_subtype = ?, kpi_level = ?, segment = ?, category = ?, parent_kpi = ? WHERE Id = ?',
            [Name, Description, Target_kpi_val, Target_kpi_type, weight_distribution, kpi_type, kpi_subtype, kpi_level, segment, category, parent_kpi, id]
        );
        res.json({ id, Name, Description, Target_kpi_val, Target_kpi_type, weight_distribution, kpi_type, kpi_subtype, kpi_level, segment, category, parent_kpi });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a KPI
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM kpi WHERE Id = ?', [id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;