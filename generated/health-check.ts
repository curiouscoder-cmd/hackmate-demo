import express, { Request, Response } from 'express';

// Create a new Express app
const app = express();

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  try {
    // Perform health checks here.  Example: Check database connection, etc.
    const isHealthy = checkDatabaseConnection(); // Replace with your actual health check function

    if (isHealthy) {
      res.status(200).json({ status: 'OK' });
    } else {
      res.status(500).json({ status: 'ERROR', message: 'Database connection failed' }); // Replace with appropriate error message
    }
  } catch (error: any) {
    console.error('Error during health check:', error); // Log the error for debugging
    res.status(500).json({ status: 'ERROR', message: 'Internal Server Error' });
  }
});

// Placeholder for a database connection health check. Replace with your actual implementation
function checkDatabaseConnection(): boolean {
  // Example:  Check if a database connection pool is active and healthy.
  // Replace with your specific database connection check logic
  // This is a dummy implementation, replace it with your actual database connection check
  return true; 
}


// Start the server (This would normally be handled by a server like PM2 or systemd)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Health check server listening on port ${port}`);
});