import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { toast } from 'react-toastify';
import signupAnimation from '../assets/signup-animation-3bf30a.png';
import fieldsyncLogo from '../assets/fieldsync-logo.png';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the Terms and Privacy Policies',
  }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { register: registerUser, isLoading, isAuthenticated, user } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // Split full name into first and last name
      const nameParts = data.fullName.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      const registerData = {
        firstName,
        lastName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        company: '', // Will be set by admin or during onboarding
        role: 'admin' as const, // Default to owner for new registrations
      };
      
      await registerUser(registerData);
      toast.success('Registration successful! Welcome to FieldSync!');
      
      // New registrations are owners, so redirect to admin dashboard
      navigate('/admin/dashboard', { replace: true });
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-gray-900">
      {/* Left side - Animation */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-[624px] h-[899px] rounded-[30px] overflow-hidden">
          <img 
            src={signupAnimation} 
            alt="Signup Animation" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right side - Register Form */}
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
          <div className="space-y-8 sm:space-y-12">
            {/* Welcome Text */}
            <div className="space-y-2 text-center sm:text-left">
              <h1 className="text-2xl sm:text-[32px] font-medium text-black dark:text-white leading-tight">
                {isAuthenticated ? 'Already Have an Organization' : 'Create Your Organization'}
              </h1>
              <p className="text-base sm:text-[18px] text-gray-600 dark:text-gray-400 opacity-75 leading-relaxed">
                {isAuthenticated 
                  ? `You are already logged in as ${user?.firstName} ${user?.lastName} (${user?.role})`
                  : 'Get started with FieldSync by creating your organization account'
                }
              </p>
            </div>
        
            {/* Registration Form or Dashboard Link */}
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
                    className="w-full h-12 sm:h-14 bg-[#10BF0A] text-white text-base sm:text-lg font-medium rounded-[10px] hover:bg-[#0EA50A] transition-all"
                  >
                    Go to Dashboard
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-[40px]">
              {/* Form Fields */}
              <div className="space-y-6">
                {/* Full Name Field */}
                <div className="space-y-3">
                  <label className="block text-base sm:text-[18px] font-medium text-black dark:text-white">
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register('fullName')}
                    className="w-full h-12 sm:h-14 px-4 sm:px-6 border border-[rgba(108,108,108,0.5)] rounded-[10px] text-base sm:text-[18px] focus:outline-none focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-500">{errors.fullName.message}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-3">
                  <label className="block text-base sm:text-[18px] font-medium text-black dark:text-white">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    className="w-full h-12 sm:h-14 px-4 sm:px-6 border border-[rgba(108,108,108,0.5)] rounded-[10px] text-base sm:text-[18px] focus:outline-none focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent transition-all"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div className="space-y-3">
                  <label className="block text-base sm:text-[18px] font-medium text-black dark:text-white">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    className="w-full h-12 sm:h-14 px-4 sm:px-6 border border-[rgba(108,108,108,0.5)] rounded-[10px] text-base sm:text-[18px] focus:outline-none focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent transition-all"
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-3">
                  <label className="block text-base sm:text-[18px] font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      {...register('password')}
                      className="w-full h-12 sm:h-14 px-4 sm:px-6 pr-12 sm:pr-14 border border-[rgba(108,108,108,0.5)] rounded-[10px] text-base sm:text-[18px] focus:outline-none focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent transition-all"
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400 text-black dark:text-white hover:text-black dark:hover:text-white dark:hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('agreeToTerms')}
                    className="w-5 h-5 rounded border-[rgba(108,108,108,0.5)] text-[#10BF0A] focus:ring-2 focus:ring-[#10BF0A] mt-0.5 flex-shrink-0"
                  />
                  <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    I agree to the{' '}
                    <Link to="/terms" className="text-[#10BF0A] hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-[#10BF0A] hover:underline">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <p className="text-sm text-red-500">{errors.agreeToTerms.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 sm:h-14 bg-[#10BF0A] text-white text-base sm:text-lg font-medium rounded-[10px] hover:bg-[#0EA509] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? 'Creating Organization...' : 'Create Organization'}
              </button>
            </form>
            )}

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-[#10BF0A] font-medium hover:underline transition-all"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 