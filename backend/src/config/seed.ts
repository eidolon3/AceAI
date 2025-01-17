import { database } from './database';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export async function seedDatabase() {
  // Check if test user exists
  const existingUser = await database.getUserByEmail('test@example.com');
  
  if (!existingUser) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    // Create test user
    await database.createUser({
      id: uuidv4(),
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
      createdAt: new Date().toISOString()
    });
    
    console.log('Test user created');
  }
} 