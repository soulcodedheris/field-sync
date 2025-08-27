import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

class ApiService {
  private api: any;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config: any) => {
        const token = localStorage.getItem('auth-storage');
        if (token) {
          try {
            const authData = JSON.parse(token);
            if (authData.state?.token) {
              config.headers.Authorization = `Bearer ${authData.state.token}`;
            }
          } catch (error) {
            console.error('Error parsing auth token:', error);
          }
        }
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response: any) => {
        return response;
      },
      (error: any) => {
        this.handleError(error);
        return Promise.reject(error);
      }
    );
  }

  private handleError(error: any) {
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - redirect to login
          localStorage.removeItem('auth-storage');
          window.location.href = '/login';
          toast.error('Session expired. Please login again.');
          break;
        case 403:
          toast.error('Access denied. You do not have permission for this action.');
          break;
        case 404:
          toast.error('Resource not found.');
          break;
        case 422:
          // Validation error
          if (data && typeof data === 'object' && 'detail' in data) {
            const details = data.detail;
            if (Array.isArray(details)) {
              details.forEach((detail: any) => {
                toast.error(`${detail.loc?.join('.')}: ${detail.msg}`);
              });
            } else {
              toast.error('Validation error occurred.');
            }
          }
          break;
        case 500:
          toast.error('Server error. Please try again later.');
          break;
        default:
          toast.error('An unexpected error occurred.');
      }
    } else if (error.request) {
      toast.error('Network error. Please check your connection.');
    } else {
      toast.error('An error occurred while processing your request.');
    }
  }

  // Generic methods
  async get<T>(url: string, params?: any): Promise<any> {
    return this.api.get(url, { params });
  }

  async post<T>(url: string, data?: any): Promise<any> {
    return this.api.post(url, data);
  }

  async put<T>(url: string, data?: any): Promise<any> {
    return this.api.put(url, data);
  }

  async patch<T>(url: string, data?: any): Promise<any> {
    return this.api.patch(url, data);
  }

  async delete<T>(url: string): Promise<any> {
    return this.api.delete(url);
  }

  // File upload method
  async upload<T>(url: string, formData: FormData): Promise<any> {
    return this.api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export const apiService = new ApiService(); 