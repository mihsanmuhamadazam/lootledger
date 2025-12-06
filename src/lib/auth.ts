import { createUser, getUserByEmail, generateId, generateShareCode } from './db';
import type { User } from '../types';

// Simple hash function for demo purposes
// In production, use proper hashing like bcrypt
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function signUp(
  email: string,
  password: string,
  name: string
): Promise<User> {
  // Check if user already exists
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error('Email already registered');
  }

  const passwordHash = await hashPassword(password);
  
  const user: User = {
    id: generateId(),
    email,
    name,
    passwordHash,
    shareCode: generateShareCode(),
    createdAt: new Date().toISOString(),
  };

  return createUser(user);
}

export async function signIn(
  email: string,
  password: string
): Promise<User> {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const passwordHash = await hashPassword(password);
  if (user.passwordHash !== passwordHash) {
    throw new Error('Invalid email or password');
  }

  return user;
}
