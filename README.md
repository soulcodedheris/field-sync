# FieldSync React Frontend

A modern React + TypeScript frontend for **FieldSync**, a cross-industry field operations platform supporting HVAC, Electrical, MEP, and Systems Engineering sectors.

## 🌟 Features

- **Modern Tech Stack**: React 18+, TypeScript, Vite, Tailwind CSS
- **Authentication**: JWT-based auth with route protection
- **Responsive Design**: Mobile-first approach with dark mode support
- **Form Handling**: React Hook Form + Zod validation
- **State Management**: Zustand for lightweight state management
- **API Integration**: Axios with typed service hooks
- **UI Components**: Lucide React icons, modern design system
- **Testing**: Vitest + React Testing Library setup

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 8+ or yarn
- FastAPI backend running (optional for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fieldsync-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   Edit `.env.local` with your configuration:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components
│   ├── forms/          # Form components
│   └── layout/         # Layout components
├── features/           # Feature-based modules
│   ├── auth/           # Authentication
│   ├── projects/       # Project management
│   ├── checklists/     # Checklist functionality
│   ├── logs/           # Log management
│   └── profile/        # User profile
├── hooks/              # Custom React hooks
├── layouts/            # Page layouts
├── pages/              # Page components
├── services/           # API services
├── stores/             # Zustand stores
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## 🎨 Design System

### Colors
- **Primary**: Blue shades for main actions and branding
- **Secondary**: Gray shades for text and backgrounds
- **Success**: Green for positive actions
- **Warning**: Yellow for caution states
- **Error**: Red for errors and destructive actions

### Components
- **Buttons**: Primary, secondary, and outline variants
- **Cards**: Consistent container styling
- **Forms**: Input fields with validation states
- **Navigation**: Sidebar and header navigation

## 🔐 Authentication

The app uses JWT-based authentication with:
- Login/Register pages
- Protected routes
- Token persistence in localStorage
- Automatic token refresh (planned)
- Role-based access control

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions
- Optimized for field use on mobile devices

## 🧪 Testing

- **Unit Tests**: Component testing with React Testing Library
- **Integration Tests**: API service testing
- **E2E Tests**: Full user flow testing (planned)

Run tests:
```bash
npm run test
```

## 🔧 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Use functional components with hooks
- Implement proper error handling
- Write meaningful commit messages

### Component Structure
```typescript
import React from 'react';
import { ComponentProps } from './types';

export const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Component logic here
  
  return (
    <div className="component-classes">
      {/* JSX content */}
    </div>
  );
};
```

### API Integration
- Use typed service hooks
- Implement proper error handling
- Use loading states
- Cache responses when appropriate

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables
Set the following in your production environment:
- `VITE_API_BASE_URL` - Your FastAPI backend URL
- `VITE_APP_NAME` - Application name
- `VITE_APP_VERSION` - Application version

## 🔮 Future Features

- **AI Assistant**: Context-aware technical support
- **Real-time Updates**: WebSocket integration
- **File Upload**: Document and image uploads
- **Offline Support**: Service worker for offline functionality
- **Push Notifications**: Mobile push notifications
- **Advanced Analytics**: Project and performance analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**FieldSync** - Streamlining field operations across industries 🏗️⚡🔧
