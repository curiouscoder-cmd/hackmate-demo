```typescript
import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, UserModel } from './user.model'; // Assuming you have a User model

const router = express.Router();
const saltRounds = 10; // Salt rounds for password hashing

// Register a new user
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;

        // Input validation
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Username, email, and password are required' });
        }

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const newUser = new UserModel({ username, email, password: hashedPassword });
        await newUser.save();

        // Send a success response (consider removing password from response)
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

// User Login
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        // Input validation
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        // Send the token in the response
        return res.json({ token, userId: user._id });
    } catch (error) {
        next(error);
    }
});


// Password Reset (Simplified -  Requires more robust implementation in production)
router.post('/password-reset', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;
        //  Implementation to send reset link via email would go here.
        // This is a placeholder, replace with actual email sending logic.
        return res.json({ message: 'Password reset email sent.  (Implementation needed)' });

    } catch (error) {
        next(error);
    }
});

// Logout (JWT based - requires token in header or cookie)
router.post('/logout', (req: Request, res: Response) => {
    //In a real application, you might invalidate the token on the server side or use cookies for more robust logout.
    res.clearCookie('token'); //if using cookies.
    res.json({ message: 'Logged out successfully' });
});


// Error handling middleware
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

export default router;
```