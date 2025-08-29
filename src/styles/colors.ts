// FieldSync Color Palette
export const colors = {
  // Primary Brand Colors
  primary: '#10BF0A', // Main green accent
  primaryLight: '#2ECC71', // Lighter green for hover states
  primaryHover: '#0EA50A', // Slightly darker for hover states (using existing hover color)
  
  // Secondary Colors
  secondary: '#FFD700', // Gold for highlights
  accent: '#FF6B35', // Orange for alerts/warnings
  
  // Status Colors
  success: '#10BF0A', // Green for success states
  warning: '#FFA500', // Orange for warnings
  error: '#DC2626', // Red for errors
  info: '#3B82F6', // Blue for informational (minimal use)
  
  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827'
  },
  
  // Dark Mode Colors
  dark: {
    bg: '#111827',
    surface: '#1F2937',
    border: '#374151',
    text: '#F9FAFB',
    textSecondary: '#9CA3AF'
  }
};

// CSS Custom Properties for easy use in components
export const cssVariables = {
  '--color-primary': colors.primary,
  '--color-primary-light': colors.primaryLight,
  '--color-primary-hover': colors.primaryHover,
  '--color-secondary': colors.secondary,
  '--color-accent': colors.accent,
  '--color-success': colors.success,
  '--color-warning': colors.warning,
  '--color-error': colors.error,
  '--color-info': colors.info,
};

export default colors;
