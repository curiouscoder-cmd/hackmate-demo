import express, { Request, Response } from 'express';
import { Pool } from 'pg'; // Assuming PostgreSQL database

// Replace with your actual database configuration
const pool = new Pool({
  user: 'your_db_user',
  host: 'your_db_host',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432, // or your database port
});


const router = express.Router();

// Define the health check function
const healthCheck = async (): Promise<{ status: string; message?: string }> => {
  try {
    // Perform database connection check
    const client = await pool.connect();
    client.release();
    return { status: 'OK', message: 'Database connection successful' };
  } catch (error: any) {
    //Handle database errors specifically for better debugging
    const errorMessage = error.message || 'Database connection failed';
    console.error("Database health check failed:", errorMessage); // Log the error for debugging
    return { status: 'ERROR', message: errorMessage };
  }
};

// /health endpoint
router.get('/health', async (req: Request, res: Response) => {
  try {
    const health = await healthCheck();
    res.json(health);
  } catch (error: any) {
    console.error("Health check failed:", error); // Log errors for debugging
    res.status(500).json({ status: 'ERROR', message: 'Internal Server Error' });
  }
});

export default router;