import { apiService } from './api';
import type { LoginCredentials, RegisterData, User, ApiResponse } from '../types/index.js';

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    const response = await apiService.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    return response.data;
  },

  async register(userData: RegisterData): Promise<ApiResponse<AuthResponse>> {
    const response = await apiService.post<ApiResponse<AuthResponse>>('/auth/register', userData);
    return response.data;
  },

  async getCurrentUser(): Promise<ApiResponse<User>> {
    const response = await apiService.get<ApiResponse<User>>('/auth/me');
    return response.data;
  },

  async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    const response = await apiService.put<ApiResponse<User>>('/auth/profile', userData);
    return response.data;
  },

  async changePassword(passwordData: {
    currentPassword: string;
    newPassword: string;
  }): Promise<ApiResponse<{ message: string }>> {
    const response = await apiService.post<ApiResponse<{ message: string }>>('/auth/change-password', passwordData);
    return response.data;
  },

  async forgotPassword(email: string): Promise<ApiResponse<{ message: string }>> {
    const response = await apiService.post<ApiResponse<{ message: string }>>('/auth/forgot-password', { email });
    return response.data;
  },

  async resetPassword(token: string, newPassword: string): Promise<ApiResponse<{ message: string }>> {
    const response = await apiService.post<ApiResponse<{ message: string }>>('/auth/reset-password', {
      token,
      newPassword,
    });
    return response.data;
  },
}; 