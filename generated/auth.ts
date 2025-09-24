import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';

// In a real-world application, these would be fetched from a database or other secure storage.
const users = [
  { username: 'testuser', passwordHash: '$2b$10$X6.k/X5.i6jG/h.T.pZ9ZO.Z.i.r3e3.5M78k7eH6aK.63d2E3.o6' }, // Hashed password for testing purposes only!  DO NOT USE IN PRODUCTION
];

// JWT secret key.  Must be kept secret and securely stored in production.
const jwtSecret = process.env.JWT_SECRET || 'your-jwt-secret-key';

//Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});


const router = express.Router();

//Login endpoint
router.post(
  '/login',
  limiter,
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    const user = users.find((user) => user.username === username);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    //Create and send JWT
    const token = jwt.sign({ username }, jwtSecret, { expiresIn: '1h' });
    res.json({ token });
  }
);


export default router;