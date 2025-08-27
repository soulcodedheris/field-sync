import type { User } from '../types';

export const getDashboardRoute = (user: User | null): string => {
  if (!user) {
    return '/login';
  }

  switch (user.role) {
    case 'superadmin':
      return '/superadmin/dashboard';
    case 'admin':
      return '/admin/dashboard';
    case 'technician':
      return '/technician/dashboard';
    default:
      return '/admin/dashboard';
  }
};

export const canAccessRoute = (user: User | null, route: string): boolean => {
  if (!user) {
    return false;
  }

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/register'];
  if (publicRoutes.includes(route)) {
    return true;
  }

  // Route access based on role
  switch (user.role) {
    case 'superadmin':
      // SuperAdmin can access everything
      return true;
    case 'admin':
      // Admins can access admin and technician routes
      return route.startsWith('/admin') || route.startsWith('/technician');
    case 'technician':
      // Technicians can only access technician routes
      return route.startsWith('/technician');
    default:
      return false;
  }
};
