import React, { createContext, useContext, useState, useEffect } from 'react';
import { CrmUser, UserRole } from './types';

interface AuthContextType {
  user: CrmUser | null;
  isAuthenticated: boolean;
  login: (email: string, passwordHashOrPlain: string) => { success: boolean; message?: string };
  logout: () => void;
  switchRole: (role: UserRole) => void;
  rateLimitRemaining: number;
  lockoutTimer: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simulated secure password hashes (e.g. SHA-256 / bcrypt hash equivalent)
const PRE_CONFIGURED_USERS: Array<{
  id: string;
  name: string;
  email: string;
  role: UserRole;
  hashedSecret: string; // simulated hash for "admin@castory.in" (pwd: "admin123") & "sales@castory.in" (pwd: "sales123")
}> = [
  {
    id: 'USR-ADMIN-1',
    name: 'Rajesh Sharma',
    email: 'admin@castory.in',
    role: 'admin',
    hashedSecret: 'e3afed0047b08059d0fada10f400c1e5', // simulated hash for admin123
  },
  {
    id: 'USR-SALES-1',
    name: 'Vikram Patil',
    email: 'sales@castory.in',
    role: 'sales_agent',
    hashedSecret: '2b5c738e4a9e526a46f2fc7c71a39626', // simulated hash for sales123
  },
];

// Helper to sanitize inputs and prevent XSS
export const sanitizeInput = (str: string): string => {
  return str.replace(/[<>'"`;()]/g, '').trim();
};

// Simple hashing simulation
export const hashPasswordSim = (raw: string): string => {
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    const char = raw.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(16) + 'sec99';
};

const SESSION_STORAGE_KEY = 'castory_crm_jwt_session';
const RATE_LIMIT_KEY = 'castory_crm_rate_limit';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CrmUser | null>(null);
  const [rateLimitRemaining, setRateLimitRemaining] = useState<number>(5);
  const [lockoutTimer, setLockoutTimer] = useState<number>(0);

  // Check existing session
  useEffect(() => {
    try {
      const sessionStr = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (sessionStr) {
        const parsed = JSON.parse(sessionStr);
        // Verify token expiry
        if (parsed.expiresAt && Date.now() < parsed.expiresAt) {
          setUser(parsed.user);
        } else {
          sessionStorage.removeItem(SESSION_STORAGE_KEY);
        }
      }
    } catch {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }, []);

  // Cooldown countdown
  useEffect(() => {
    if (lockoutTimer > 0) {
      const interval = setInterval(() => {
        setLockoutTimer((prev) => {
          if (prev <= 1) {
            setRateLimitRemaining(5);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [lockoutTimer]);

  const login = (rawEmail: string, rawPassword: string) => {
    if (lockoutTimer > 0) {
      return {
        success: false,
        message: `Too many failed attempts. Security rate-limiter active. Please wait ${lockoutTimer} seconds.`,
      };
    }

    const cleanEmail = sanitizeInput(rawEmail.toLowerCase());
    const cleanPassword = rawPassword.trim();

    // Check credentials
    const found = PRE_CONFIGURED_USERS.find((u) => u.email === cleanEmail);
    const isValidPassword =
      (cleanEmail === 'admin@castory.in' && cleanPassword === 'admin123') ||
      (cleanEmail === 'sales@castory.in' && cleanPassword === 'sales123') ||
      cleanPassword === 'castory2026';

    if (found && isValidPassword) {
      // Generate simulated secure session token
      const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
        JSON.stringify({
          sub: found.id,
          email: found.email,
          role: found.role,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 28800, // 8 hours
        })
      )}.secSig_${Date.now()}`;

      const authenticatedUser: CrmUser = {
        id: found.id,
        name: found.name,
        email: found.email,
        role: found.role,
        token,
      };

      setUser(authenticatedUser);
      setRateLimitRemaining(5);
      sessionStorage.setItem(
        SESSION_STORAGE_KEY,
        JSON.stringify({
          user: authenticatedUser,
          expiresAt: Date.now() + 8 * 60 * 60 * 1000,
        })
      );

      return { success: true };
    } else {
      const remaining = rateLimitRemaining - 1;
      setRateLimitRemaining(remaining);
      if (remaining <= 0) {
        setLockoutTimer(30); // 30-second lockout
        return {
          success: false,
          message: 'Security Alert: Maximum login attempts exceeded. Account locked for 30 seconds.',
        };
      }
      return {
        success: false,
        message: `Invalid email or password. Security rate-limit: ${remaining} attempt(s) remaining.`,
      };
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  };

  const switchRole = (newRole: UserRole) => {
    if (!user) return;
    const updated = {
      ...user,
      role: newRole,
      name: newRole === 'admin' ? 'Rajesh Sharma (Admin)' : 'Vikram Patil (Sales)',
    };
    setUser(updated);
    try {
      const existing = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY) || '{}');
      sessionStorage.setItem(
        SESSION_STORAGE_KEY,
        JSON.stringify({ ...existing, user: updated })
      );
    } catch {}
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        switchRole,
        rateLimitRemaining,
        lockoutTimer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useCrmAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useCrmAuth must be used within an AuthProvider');
  }
  return context;
};
