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

// Add this helper interface or include it in your auth types file
export interface RegisterData {
  email: string;
  password_hash: string; // Matches backend naming convention
  firstName: string;
  lastName: string;
  roleId: number; // 3 for PLAYER, 4 for PARENT, etc.
}

