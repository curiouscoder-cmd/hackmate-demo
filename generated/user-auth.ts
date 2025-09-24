```typescript
import bcrypt from 'bcrypt';
// Placeholder for database interaction.  Replace with your actual database library.
const db = {
  findUserByEmail: async (email: string): Promise<any | null> => {
    // Replace with your actual database query
    console.log(`Simulating database lookup for user with email: ${email}`);
    // Simulate a database result. Replace with actual DB interaction
    const users = [
        {id: 1, email: 'test@example.com', passwordHash: '$2a$10$C.u5hZ/d26mU.4f.wWq36eR0G5b/t9N.t8x6r.rU5s2l.l7Z/k9iO'}, //hashed password for testing
    ];
    return users.find(user => user.email === email) || null;
  },
  createUser: async (user: any): Promise<any> => {
    //Replace with actual database interaction
    console.log(`Simulating database creation for user:`, user);
    return { id: 1, ...user };
  }
};


interface User {
  email: string;
  password?: string; // Only used for registration
  passwordHash?: string; // Used after hashing
}

//Regular expression for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const registerUser = async (user: User): Promise<User | null> => {
  if (!user.email || !user.password || !emailRegex.test(user.email)) {
    throw new Error('Invalid email or password. Email must be valid.');
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    const newUser = { ...user, passwordHash: hashedPassword, password: undefined }; // Remove plain password
    const createdUser = await db.createUser(newUser);
    return createdUser;
  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error('Failed to register user.');
  }
};


const loginUser = async (user: User): Promise<User | null> => {
  if (!user.email || !user.password || !emailRegex.test(user.email)) {
    throw new Error('Invalid email or password. Email must be valid.');
  }

  try {
    const dbUser = await db.findUserByEmail(user.email);
    if (!dbUser) {
      throw new Error('User not found.');
    }

    const passwordMatch = await bcrypt.compare(user.password, dbUser.passwordHash);
    if (!passwordMatch) {
      throw new Error('Incorrect password.');
    }
    return dbUser; //Return only the relevant data
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};


export { registerUser, loginUser };
```