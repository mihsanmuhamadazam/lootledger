import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { createUser, getUserByEmail, getUserById, generateId, generateShareCode } from '../lib/db';
import type { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, name: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hash password using SHA-256
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const SESSION_KEY = 'lootledger_session';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      const sessionUserId = localStorage.getItem(SESSION_KEY);
      if (sessionUserId) {
        const user = await getUserById(sessionUserId);
        if (user) {
          setState({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
          return;
        }
      }
      setState(prev => ({ ...prev, isLoading: false }));
    };
    checkSession();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const user = await getUserByEmail(email.toLowerCase());
    if (!user) {
      throw new Error('No account found with this email');
    }

    const hashedPassword = await hashPassword(password);
    if (user.passwordHash !== hashedPassword) {
      throw new Error('Incorrect password');
    }

    localStorage.setItem(SESSION_KEY, user.id);
    setState({
      user,
      isAuthenticated: true,
      isLoading: false,
    });
  }, []);

  const signUp = useCallback(async (email: string, name: string, password: string) => {
    const existingUser = await getUserByEmail(email.toLowerCase());
    if (existingUser) {
      throw new Error('An account with this email already exists');
    }

    const hashedPassword = await hashPassword(password);
    const user: User = {
      id: generateId(),
      email: email.toLowerCase(),
      name,
      passwordHash: hashedPassword,
      shareCode: generateShareCode(),
      createdAt: new Date().toISOString(),
    };

    await createUser(user);
    localStorage.setItem(SESSION_KEY, user.id);
    setState({
      user,
      isAuthenticated: true,
      isLoading: false,
    });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
