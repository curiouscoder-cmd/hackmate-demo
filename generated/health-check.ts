```typescript
import express, { Request, Response } from 'express';
import log from './logger'; // Assuming a logger module exists

// Define the health check function
const healthCheck = (req: Request, res: Response): void => {
  try {
    // Perform health checks.  These could include:
    // - Database connection check
    // - External service availability checks
    // - Internal cache status
    //  Replace with your actual health checks.

    const isDatabaseHealthy = true; //Example - replace with your database health check
    const isExternalServiceHealthy = true; //Example - replace with your external service health check


    const healthStatus = {
      status: isDatabaseHealthy && isExternalServiceHealthy ? 'healthy' : 'unhealthy',
      database: isDatabaseHealthy ? 'OK' : 'Error',
      externalService: isExternalServiceHealthy ? 'OK' : 'Error',
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(healthStatus);
    log.info('Health check request successful');
  } catch (error: any) {
    log.error('Health check failed:', error);
    res.status(500).json({ status: 'error', message: 'Health check failed', error: error.message });
  }
};


// Export the health check route handler
const healthRoute = express.Router();
healthRoute.get('/health', healthCheck);

export default healthRoute;

```