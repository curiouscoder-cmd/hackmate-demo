import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { User, UserModel } from './user-model'; // Assuming a User model exists

// Configuration (replace with your actual config)
const SALT_ROUNDS = 10;
const EMAIL_HOST = 'your-email-host';
const EMAIL_PORT = 587;
const EMAIL_USER = 'your-email-user';
const EMAIL_PASS = 'your-email-password';


const router = express.Router();

// Generate a password reset token
const generateToken = () => uuidv4();

// Send password reset email
const sendResetEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Or your email service provider
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: 'Password Reset Request',
    text: `Click this link to reset your password: ${process.env.FRONTEND_URL}/reset-password?token=${token}`, // Replace with your frontend URL
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send password reset email.');
  }
};


// Request password reset
router.post('/reset-password-request', async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = generateToken();
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry
    await user.save();

    await sendResetEmail(email, token);
    return res.status(200).json({ message: 'Password reset email sent' });

  } catch (error: any) {
    console.error('Error in password reset request:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Reset password
router.post('/reset-password', async (req: Request, res: Response) => {
  const { token, password } = req.body;

  try {
    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error: any) {
    console.error('Error in password reset:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;