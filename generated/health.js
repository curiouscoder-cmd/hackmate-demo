const express = require('express');
const app = express();
const db = require('./db'); // Replace with your actual database connection module

// Replace with your actual health check functions
const checkDatabaseConnection = async () => {
  try {
    await db.query('SELECT 1'); // Replace with a suitable database query
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  }
};


const checkExternalService = async () => {
    try {
        // Add your external service check here.  For example, using fetch or axios.
        // const response = await fetch('http://external-service-url');
        // return response.ok;

        return true; // Replace with your actual check.
    } catch (error) {
        console.error("External service check failed:", error);
        return false;
    }
};


const healthCheck = async (req, res) => {
    try {
        const databaseHealthy = await checkDatabaseConnection();
        const externalServiceHealthy = await checkExternalService();

        const healthStatus = databaseHealthy && externalServiceHealthy;

        res.json({
            status: healthStatus ? 'healthy' : 'unhealthy',
            details: {
                database: {
                    healthy: databaseHealthy,
                    error: !databaseHealthy ? 'Database connection failed' : null,
                },
                externalService: {
                    healthy: externalServiceHealthy,
                    error: !externalServiceHealthy ? 'External service check failed' : null,
                },
            },
        });
    } catch (error) {
        console.error('Health check failed:', error);
        res.status(500).json({ status: 'unhealthy', details: { error: 'Internal server error' } });
    }
};

app.get('/health', healthCheck);


//For demonstration purposes only. Replace with your actual server start logic.
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Health check endpoint listening on port ${port}`);
});

module.exports = app; //for testing