export interface User {
  email: string;
  role: 'ADMIN' | 'COACH' | 'PLAYER' | 'PARENT';
  firstName: string;
  lastName: string;
}

export interface AuthResponse extends User {
  token: string;
}

export interface ApiError {
  timestamp: string;
  message: string;
  details: string;
  validationErrors?: Record<string, string> | null;
}