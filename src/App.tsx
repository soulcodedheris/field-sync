import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Theme
import { ThemeProvider } from './contexts/ThemeContext';

// Layouts
import { MainLayout } from './layouts/MainLayout';
import { TechnicianLayout } from './layouts/TechnicianLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { SuperAdminLayout } from './layouts/SuperAdminLayout';

// Pages
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { TechnicianDashboard } from './pages/TechnicianDashboard';
import { TechnicianJobs } from './pages/TechnicianJobs';
import { TechnicianClockInOut } from './pages/TechnicianClockInOut';
import { TechnicianSchedule } from './pages/TechnicianSchedule';
import { TechnicianJobLog } from './pages/TechnicianJobLog';
import { TechnicianAIAssistant } from './pages/TechnicianAIAssistant';
import { TechnicianInventory } from './pages/TechnicianInventory';
import TechnicianLibrary from './pages/TechnicianLibrary';
import { TechnicianSettings } from './pages/TechnicianSettings';
import { TechnicianHelp } from './pages/TechnicianHelp';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminJobManagement } from './pages/AdminJobManagement';
import { AdminProjectManagement } from './pages/AdminProjectManagement';
import { AdminTeamManagement } from './pages/AdminTeamManagement';
import { AdminTimeEntries } from './pages/AdminTimeEntries';
import { AdminAnalytics } from './pages/AdminAnalytics';
import { AdminSchedule } from './pages/AdminSchedule';
import { AdminInventory } from './pages/AdminInventory';
import AdminAIAssistant from './pages/AdminAIAssistant';
import { AdminAuditLog } from './pages/AdminAuditLog';
import AdminAnnouncement  from './pages/AdminAnnouncement';
import AdminLibrary from './pages/AdminLibrary';
import AdminSettings from './pages/AdminSettings';
import { AdminHelp } from './pages/AdminHelp';
import { SuperAdminDashboard } from './pages/SuperAdminDashboard';
import { SuperAdminCompanies } from './pages/SuperAdminCompanies';
import { SuperAdminUserManagement } from './pages/SuperAdminUserManagement';
import { SuperAdminPlansBilling } from './pages/SuperAdminPlansBilling';
import { SuperAdminAuditLogs } from './pages/SuperAdminAuditLogs';
import { SuperAdminAIAssistant } from './pages/SuperAdminAIAssistant';
import { SuperAdminAnnouncements } from './pages/SuperAdminAnnouncements';
import { SuperAdminSettings } from './pages/SuperAdminSettings';
import { SuperAdminHelp } from './pages/SuperAdminHelp';

// Stores
import { useAuthStore } from './stores/authStore';

// Utils
import { getDashboardRoute, canAccessRoute } from './utils/routing';

// Components
import { DashboardRedirect } from './components/DashboardRedirect';
import DevRoleSwitcher from './components/DevRoleSwitcher';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user, isLoading, checkAuth } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 dark:border-blue-400"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has access to the current route
  if (!canAccessRoute(user, location.pathname)) {
    // Redirect to appropriate dashboard if user doesn't have access
    const dashboardRoute = getDashboardRoute(user);
    return <Navigate to={dashboardRoute} replace />;
  }

  return <>{children}</>;
};

// Public Route Component (allows access to auth pages even when authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user, isLoading, checkAuth } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 dark:border-blue-400"></div>
      </div>
    );
  }

  // Define auth pages that should be accessible even when authenticated
  const authPages = ['/login', '/register'];
  const isAuthPage = authPages.includes(location.pathname);

  // If user is authenticated and trying to access a non-auth page, redirect to dashboard
  if (isAuthenticated && !isAuthPage) {
    const dashboardRoute = getDashboardRoute(user);
    return <Navigate to={dashboardRoute} replace />;
  }

  // Allow access to auth pages or if user is not authenticated
  return <>{children}</>;
};

function App() {
  return (
    <ThemeProvider>
      <Router future={{ v7_startTransition: true }}>
        <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />

          {/* Root route - redirect to appropriate dashboard */}
          <Route path="/" element={<DashboardRedirect />} />

          {/* Technician Routes */}
          <Route
            path="/technician"
            element={
              <ProtectedRoute>
                <TechnicianLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<TechnicianDashboard />} />
                               <Route path="jobs" element={<TechnicianJobs />} />
                               <Route path="clock-in-out" element={<TechnicianClockInOut />} />
                   <Route path="schedule" element={<TechnicianSchedule />} />
                               <Route path="job-log" element={<TechnicianJobLog />} />
            <Route path="library" element={<TechnicianLibrary />} />
            <Route path="inventory" element={<TechnicianInventory />} />
            <Route path="ai-assistant" element={<TechnicianAIAssistant />} />
            <Route path="settings" element={<TechnicianSettings />} />
            <Route path="help" element={<TechnicianHelp />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
                          <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="project-management" element={<AdminProjectManagement />} />
              <Route path="job-management" element={<AdminJobManagement />} />
              <Route path="team-management" element={<AdminTeamManagement />} />
              <Route path="time-entries" element={<AdminTimeEntries />} />
              <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="schedule" element={<AdminSchedule />} />
            <Route path="inventory" element={<AdminInventory />} />
            <Route path="audit-log" element={<AdminAuditLog />} />
            <Route path="library" element={<AdminLibrary />} />
            <Route path="ai-assistant" element={<AdminAIAssistant />} />
            <Route path="announcement" element={<AdminAnnouncement />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="help" element={<AdminHelp />} />
          </Route>

          {/* Super Admin Routes */}
          <Route
            path="/superadmin"
            element={
              <ProtectedRoute>
                <SuperAdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<SuperAdminDashboard />} />
                        <Route path="companies" element={<SuperAdminCompanies />} />
        <Route path="user-management" element={<SuperAdminUserManagement />} />
                <Route path="plans-billing" element={<SuperAdminPlansBilling />} />
                <Route path="audit-logs" element={<SuperAdminAuditLogs />} />
                <Route path="ai-assistant" element={<SuperAdminAIAssistant />} />
                <Route path="announcements" element={<SuperAdminAnnouncements />} />
        <Route path="settings" element={<SuperAdminSettings />} />
                <Route path="help" element={<SuperAdminHelp />} />
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<DashboardRedirect />} />
        </Routes>

        {/* Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        {/* Development Role Switcher */}
        <DevRoleSwitcher />
      </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
