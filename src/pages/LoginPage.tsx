import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { toast } from 'react-toastify';
import loginAnimation from '../assets/login-animation-3bf30a.png';
import fieldsyncLogo from '../assets/fieldsync-logo.png';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, isLoading, isAuthenticated, user } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      toast.success('Login successful!');
      
      // Get the user from the auth store to determine the correct dashboard
      const { user } = useAuthStore.getState();
      const dashboardRoute = user ? 
        (user.role === 'technician' ? '/technician/dashboard' : '/admin/dashboard') : 
        '/admin/dashboard';
      
      navigate(dashboardRoute, { replace: true });
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-gray-900">
      {/* Left side - Animation */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-[624px] h-[816px] rounded-[30px] overflow-hidden">
          <img 
            src={loginAnimation} 
            alt="Login Animation" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-[400px] sm:max-w-[512px] space-y-8 sm:space-y-12">
          {/* Logo */}
          <div className="flex justify-center">
            <img 
              src={fieldsyncLogo} 
              alt="FieldSync Logo" 
              className="h-12 w-auto sm:h-[72px]"
            />
          </div>

          {/* Form Container */}
          <div className="space-y-8 sm:space-y-[48px]">
            {/* Welcome Text */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-[32px] font-medium text-black dark:text-white leading-[1.21]">
                {isAuthenticated ? 'Already Logged In' : 'Welcome back'}
              </h1>
              <p className="text-base sm:text-[18px] text-gray-600 dark:text-gray-400 opacity-75 leading-[1.21]">
                {isAuthenticated 
                  ? `You are currently logged in as ${user?.firstName} ${user?.lastName} (${user?.role})`
                  : 'Only authorized users can access this system.'
                }
              </p>
            </div>

            {/* Login Form or Dashboard Link */}
            {isAuthenticated ? (
              <div className="space-y-6 sm:space-y-[40px]">
                <div className="text-center space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    You are already logged in. Would you like to go to your dashboard?
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      const dashboardRoute = user?.role === 'technician' ? '/technician/dashboard' : '/admin/dashboard';
                      navigate(dashboardRoute, { replace: true });
                    }}
                    className="w-full h-12 sm:h-14 bg-[#10BF0A] text-white text-base sm:text-lg font-medium rounded-[10px] hover:bg-[#0EA509] transition-all"
                  >
                    Go to Dashboard
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-[40px]">

              {/* Email Input */}
              <div className="space-y-2 sm:space-y-3">
                <label className="text-sm sm:text-base font-medium text-black dark:text-white">
                  Email Address
                </label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-12 sm:h-14 px-4 sm:px-6 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-xl text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="space-y-2 sm:space-y-3">
                <label className="text-sm sm:text-base font-medium text-black dark:text-white">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="w-full h-12 sm:h-14 px-4 sm:px-6 py-3 sm:py-4 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-400"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 sm:w-6 sm:h-6" />
                    ) : (
                      <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    {...register('rememberMe')}
                    type="checkbox"
                    className="w-4 h-4 text-[#10BF0A] border-gray-300 rounded focus:ring-[#10BF0A]"
                  />
                  <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm sm:text-base text-[#10BF0A] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 sm:h-14 bg-[#10BF0A] text-white font-medium text-base sm:text-lg rounded-xl hover:bg-[#0EA509] active:bg-[#0C8A07] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
            )}

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-[#10BF0A] font-medium hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 