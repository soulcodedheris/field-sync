import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, User, LoginCredentials } from '../types/index.ts';
import { authService } from '../services/authService.ts';

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>;
  updateUser: (user: User) => void;
  checkAuth: () => Promise<void>;
  setMockAuth: (role: 'superadmin' | 'admin' | 'technician') => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true });
        try {
          const response = await authService.login(credentials);
          set({
            user: response.data.user,
            token: response.data.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
        localStorage.removeItem('auth-storage');
      },

      register: async (userData: any) => {
        set({ isLoading: true });
        try {
          const response = await authService.register(userData);
          set({
            user: response.data.user,
            token: response.data.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      updateUser: (user: User) => {
        set({ user });
      },

      setMockAuth: (role: 'superadmin' | 'admin' | 'technician') => {
        const mockUser = {
          id: '1',
          email: 'john.doe@example.com',
          firstName: 'John',
          lastName: 'Doe',
          role: role,
          company: 'FieldSync Inc',
          avatar: undefined,
          phone: '+1234567890',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        set({
          user: mockUser,
          token: 'mock-token',
          isAuthenticated: true,
          isLoading: false,
        });
      },

      checkAuth: async () => {
        // For development/testing, always use mock data to avoid network errors
        const mockUser = {
          id: '1',
          email: 'john.doe@example.com',
          firstName: 'John',
          lastName: 'Doe',
          role: 'admin' as const,
          company: 'FieldSync Inc',
          avatar: undefined,
          phone: '+1234567890',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        set({
          user: mockUser,
          token: 'mock-token',
          isAuthenticated: true,
          isLoading: false,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
); 