import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { User, UserDocument } from './models/user'; // Assumes a User model exists

const router = express.Router();

// Middleware for input validation
const validateRegistration = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
];

// API endpoint for user registration
router.post(
  '/register',
  validateRegistration,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, password } = req.body;

      // Check if username or email already exists
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ error: 'Username or email already exists' });
      }

      // Hash the password using bcrypt
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create a new user document
      const newUser: UserDocument = new User({
        username,
        email,
        password: hashedPassword,
      });

      // Save the user to the database
      await newUser.save();

      // Respond with success message (consider omitting sensitive data like password hash)
      return res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
      console.error('Error during user registration:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
);

export default router;