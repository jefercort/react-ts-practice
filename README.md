# 🚀 React TypeScript Practice with Next.js

A comprehensive collection of TypeScript patterns, best practices, and advanced React concepts implemented with Next.js 14. This repository demonstrates type-safe development, modern React patterns, and production-ready architectures.

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [TypeScript Patterns](#-typescript-patterns)
- [Installation](#-installation)
- [Key Learnings](#-key-learnings)
- [Best Practices](#-best-practices)

## 🎯 Overview

This repository showcases advanced TypeScript usage with React and Next.js, demonstrating real-world patterns, type safety, and modern development practices. It serves as both a learning resource and a reference implementation for building scalable, type-safe applications.

### Goals
- Master TypeScript with React and Next.js
- Implement type-safe patterns and best practices
- Build performant, scalable applications
- Demonstrate advanced React patterns
- Showcase modern development workflows

## 🛠️ Tech Stack

### Core Technologies
- **Next.js 14** - Full-stack React framework with App Router
- **React 18** - UI library with Server Components
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework

### Key Libraries
- **React Hook Form** - Type-safe forms with validation
- **Zod** - Schema validation
- **TanStack Query** - Data fetching and caching
- **Zustand** - Lightweight state management
- **Framer Motion** - Animation library
- **React Testing Library** - Component testing
- **Jest** - Test runner

### Development Tools
- **ESLint** - Code quality
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Commitlint** - Commit message linting
- **GitHub Actions** - CI/CD

## ✨ Features

### TypeScript Excellence
- 🎯 **Strict Type Checking** - No `any` types, full type safety
- 🔧 **Advanced Types** - Generics, utility types, conditional types
- 📝 **Type Inference** - Leveraging TypeScript's powerful inference
- 🏗️ **Type-Safe APIs** - End-to-end type safety with tRPC/REST
- 🎨 **Component Patterns** - Strongly typed components and hooks

### Next.js 14 Features
- 📁 **App Router** - File-based routing with layouts
- 🚀 **Server Components** - Optimized server-side rendering
- 💾 **Server Actions** - Type-safe server mutations
- 🔄 **Streaming SSR** - Progressive rendering
- 🖼️ **Image Optimization** - Next/Image with lazy loading
- 🎯 **API Routes** - Type-safe backend endpoints

### Development Patterns
- 🏛️ **Clean Architecture** - Separation of concerns
- 🧩 **Component Composition** - Reusable, composable components
- 🎣 **Custom Hooks** - Encapsulated, reusable logic
- 🔒 **Error Boundaries** - Graceful error handling
- ♿ **Accessibility** - WCAG compliant components

## 📁 Project Structure

```
react-ts-practice/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Route group for auth
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/         # Protected routes
│   │   ├── layout.tsx
│   │   └── dashboard/
│   ├── api/                 # API routes
│   │   └── [...]/route.ts
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── ui/                  # UI components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   └── Form/
│   ├── features/            # Feature components
│   │   ├── auth/
│   │   └── dashboard/
│   └── layouts/             # Layout components
├── lib/                     # Library code
│   ├── api/                 # API clients
│   ├── auth/                # Authentication
│   ├── db/                  # Database utilities
│   └── utils/               # Utility functions
├── hooks/                   # Custom React hooks
│   ├── useAuth.ts
│   ├── useDebounce.ts
│   └── useLocalStorage.ts
├── types/                   # TypeScript types
│   ├── api.ts
│   ├── models.ts
│   └── global.d.ts
├── services/                # Business logic
│   ├── user.service.ts
│   └── product.service.ts
├── store/                   # State management
│   ├── auth.store.ts
│   └── cart.store.ts
├── styles/                  # Global styles
│   └── globals.css
├── tests/                   # Test utilities
│   ├── setup.ts
│   └── utils.tsx
├── public/                  # Static assets
├── .env.example            # Environment variables
├── next.config.js          # Next.js config
├── tsconfig.json           # TypeScript config
├── tailwind.config.ts      # Tailwind config
└── package.json
```

## 🎨 TypeScript Patterns

### 1. Component Patterns

```typescript
// Strongly typed functional component
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  onClick,
}) => {
  return (
    <button
      className={cn(
        'rounded-lg font-medium transition-all',
        variants[variant],
        sizes[size],
        isLoading && 'opacity-50 cursor-not-allowed'
      )}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};
```

### 2. Custom Hook with TypeScript

```typescript
// Type-safe custom hook
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  return [storedValue, setValue];
}
```

### 3. API Types with Zod

```typescript
// Schema validation with inference
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(2).max(50),
  role: z.enum(['user', 'admin', 'moderator']),
  createdAt: z.date(),
  preferences: z.object({
    theme: z.enum(['light', 'dark', 'system']),
    notifications: z.boolean(),
  }).optional(),
});

export type User = z.infer<typeof UserSchema>;

// Type-safe API function
export async function getUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return UserSchema.parse(data);
}
```

### 4. Generic Components

```typescript
// Generic list component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string;
  EmptyComponent?: React.ComponentType;
}

function List<T>({ 
  items, 
  renderItem, 
  keyExtractor, 
  EmptyComponent 
}: ListProps<T>) {
  if (items.length === 0 && EmptyComponent) {
    return <EmptyComponent />;
  }

  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor(item)}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}
```

### 5. Server Actions with Type Safety

```typescript
// app/actions/user.actions.ts
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const UpdateUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

export async function updateUser(
  userId: string,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  try {
    const validatedData = UpdateUserSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
    });

    await db.user.update({
      where: { id: userId },
      data: validatedData,
    });

    revalidatePath('/profile');
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    return { success: false, error: 'Failed to update user' };
  }
}
```

## 🔧 Installation

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm
- Git

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/jefercort/react-ts-practice.git
   cd react-ts-practice
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Type Checking
npm run type-check   # Run TypeScript compiler check
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report

# Formatting
npm run format       # Format with Prettier
npm run format:check # Check formatting
```

## 🎓 Key Learnings

### TypeScript Mastery
- **Type Safety**: Eliminating runtime errors through compile-time checks
- **Type Inference**: Leveraging TypeScript's powerful type inference
- **Generics**: Building reusable, type-safe components
- **Utility Types**: Using Partial, Required, Pick, Omit effectively
- **Discriminated Unions**: Handling complex state with type safety

### React Patterns
- **Compound Components**: Building flexible, composable UIs
- **Render Props**: Sharing logic between components
- **Higher-Order Components**: Enhancing component functionality
- **Custom Hooks**: Extracting and reusing stateful logic
- **Context with TypeScript**: Type-safe context providers

### Next.js Architecture
- **App Router**: Modern routing with layouts and groups
- **Server Components**: Optimal data fetching and rendering
- **Server Actions**: Type-safe mutations without API routes
- **Middleware**: Request interception and modification
- **Edge Runtime**: Deploying to edge locations

## 🏆 Best Practices

### TypeScript
- ✅ Enable strict mode in tsconfig.json
- ✅ Avoid using `any` type
- ✅ Use type inference where possible
- ✅ Create shared type definitions
- ✅ Validate external data with Zod

### React
- ✅ Use functional components with hooks
- ✅ Implement error boundaries
- ✅ Optimize with React.memo and useMemo
- ✅ Follow accessibility guidelines
- ✅ Write comprehensive tests

### Next.js
- ✅ Use Server Components by default
- ✅ Implement proper loading states
- ✅ Optimize images with next/image
- ✅ Use dynamic imports for code splitting
- ✅ Implement proper SEO with metadata

## 🚧 Future Enhancements

- [ ] Add E2E tests with Playwright
- [ ] Implement tRPC for end-to-end type safety
- [ ] Add Storybook for component documentation
- [ ] Implement Progressive Web App features
- [ ] Add internationalization (i18n)
- [ ] Implement real-time features with WebSockets
- [ ] Add monitoring with Sentry
- [ ] Implement feature flags
- [ ] Add GraphQL with type generation
- [ ] Create CI/CD pipeline with GitHub Actions

## 🤝 Contributing

Contributions are welcome! Please read the contributing guidelines before submitting PRs.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Kevin Cortes**
- GitHub: [@jefercort](https://github.com/jefercort)
- LinkedIn: [Kevin Cortes PRO](https://www.linkedin.com/in/kevinc-proservices)
- Portfolio: [PRO ENGINEERING](https://proserv.com.co/)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- TypeScript team for making JavaScript type-safe
- Vercel for hosting and deployment
- The React community for continuous innovation

---

⭐ **If you find this repository helpful, please give it a star!**

🔗 **[Live Demo](#)** | 📚 **[Documentation](#)** | 🐛 **[Report Bug](https://github.com/jefercort/react-ts-practice/issues)**
