import { createUser, getUserByEmail, getUserById, generateId } from './db';
import type { User } from '../types';

const SESSION_KEY = 'cardspend_session';

// Hash password using SHA-256
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Compare password with hash
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}

// Sign up new user
export async function signUp(email: string, name: string, password: string): Promise<User> {
  // Check if user already exists
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error('A user with this email already exists');
  }

  const passwordHash = await hashPassword(password);
  const user: User = {
    id: generateId(),
    email: email.toLowerCase().trim(),
    name: name.trim(),
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  await createUser(user);
  saveSession(user.id);
  return user;
}

// Sign in existing user
export async function signIn(email: string, password: string): Promise<User> {
  const user = await getUserByEmail(email.toLowerCase().trim());
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) {
    throw new Error('Invalid email or password');
  }

  saveSession(user.id);
  return user;
}

// Sign out
export function signOut(): void {
  localStorage.removeItem(SESSION_KEY);
}

// Save session to localStorage
function saveSession(userId: string): void {
  localStorage.setItem(SESSION_KEY, userId);
}

// Get current session
export function getSession(): string | null {
  return localStorage.getItem(SESSION_KEY);
}

// Get current user from session
export async function getCurrentUser(): Promise<User | null> {
  const userId = getSession();
  if (!userId) return null;

  const user = await getUserById(userId);
  return user || null;
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return !!getSession();
}
