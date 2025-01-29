// server.js
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Import routes
const goalLevelRoutes = require('./routes/goalLevel');
const goalTypeRoutes = require('./routes/goalType');
const goalRoutes = require('./routes/goal');
const kpiLevelRoutes = require('./routes/kpiLevel');
const segmentRoutes = require('./routes/segment');
const kpiTypeRoutes = require('./routes/kpiType');
const categoryRoutes = require('./routes/category');
const kpiSubtypeRoutes = require('./routes/kpiSubtype');
const kpiTargetTypeRoutes = require('./routes/kpiTargetType');
const kpiWeightDistributionRoutes = require('./routes/kpiWeightDistribution');
const kpiRoutes = require('./routes/kpi');

// Use routes
app.use('/api/goal-levels', goalLevelRoutes);
app.use('/api/goal-types', goalTypeRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/kpi-levels', kpiLevelRoutes);
app.use('/api/segments', segmentRoutes);
app.use('/api/kpi-types', kpiTypeRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/kpi-subtypes', kpiSubtypeRoutes);
app.use('/api/kpi-target-types', kpiTargetTypeRoutes);
app.use('/api/kpi-weight-distributions', kpiWeightDistributionRoutes);
app.use('/api/kpis', kpiRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});