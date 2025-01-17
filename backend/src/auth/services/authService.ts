import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
<<<<<<< HEAD
import { database } from '../../config/database';
import { UserSignupRequest, UserLoginRequest, AuthResponse } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-123';

export class AuthService {
  async signup(data: UserSignupRequest): Promise<AuthResponse> {
    const existingUser = await database.getUserByEmail(data.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = {
      id: uuidv4(),
      email: data.email,
      password: hashedPassword,
      name: data.name,
      createdAt: new Date().toISOString()
    };

    await database.createUser(user);
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET);

    const { password, ...userWithoutPassword } = user;
    return { token, user: userWithoutPassword };
  }

  async login(data: UserLoginRequest): Promise<AuthResponse> {
    const user = await database.getUserByEmail(data.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET);
    const { password, ...userWithoutPassword } = user;
    return { token, user: userWithoutPassword };
=======
import { User, UserSignupRequest, UserLoginRequest, AuthResponse } from '../types';

// Temporary in-memory storage (replace with database later)
const users: User[] = [];
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-123';

export class AuthService {
  private readonly JWT_EXPIRES_IN = '24h';

  async signup(request: UserSignupRequest): Promise<AuthResponse> {
    // Check if user already exists
    if (users.some(u => u.email === request.email)) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(request.password, 10);

    // Create new user
    const newUser: User = {
      id: uuidv4(),
      email: request.email,
      password: hashedPassword,
      name: request.name,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    users.push(newUser);
    console.log('Users after signup:', users); // Debug log

    // Generate JWT token with consistent secret
    const token = jwt.sign(
      { 
        userId: newUser.id,
        email: newUser.email
      },
      JWT_SECRET,
      { expiresIn: this.JWT_EXPIRES_IN }
    );

    // Return user data (without password) and token
    const { password, ...userWithoutPassword } = newUser;
    return {
      token,
      user: userWithoutPassword
    };
  }

  async login(request: UserLoginRequest): Promise<AuthResponse> {
    console.log('Users at login:', users); // Debug log
    console.log('Attempting login for:', request.email); // Debug log

    // Find user
    const user = users.find(u => u.email === request.email);
    if (!user) {
      console.log('User not found'); // Debug log
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(request.password, user.password);
    if (!isValidPassword) {
      console.log('Invalid password'); // Debug log
      throw new Error('Invalid credentials');
    }

    // Generate JWT token with consistent secret
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email
      },
      JWT_SECRET,
      { expiresIn: this.JWT_EXPIRES_IN }
    );

    // Return user data (without password) and token
    const { password, ...userWithoutPassword } = user;
    return {
      token,
      user: userWithoutPassword
    };
>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c
  }
}
