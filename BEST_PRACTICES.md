# 📘 Project Best Practices

## 1. Project Purpose
Velto is a Dutch payment request application that allows users to create, manage, and track payment requests. The app provides a mobile-first experience for creating payment links, managing multiple payment methods (Tikkie, PayPal, iDEAL, etc.), and tracking payment status. It's built as a React SPA with TypeScript, focusing on simplicity and user experience for Dutch/Belgian markets.

## 2. Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI primitives (shadcn/ui style)
│   ├── common/          # Business logic components
│   └── layout/          # Layout and structural components
├── pages/               # Route-level page components
├── lib/                 # Utilities, types, and constants
│   ├── constants.ts     # App-wide constants and configuration
│   ├── types.ts         # TypeScript type definitions
│   └── utils.ts         # Utility functions
└── hooks/               # Custom React hooks (currently empty)
```

**Key Directories:**
- `components/ui/` - Primitive components using Radix UI + class-variance-authority pattern
- `components/common/` - Business-specific reusable components (StatCard, RequestCard, etc.)
- `components/layout/` - Layout components (MobileLayout, Grid, Section, etc.)
- `pages/` - One file per route, named with "Page" suffix
- `lib/` - Centralized utilities, types, and constants

## 3. Test Strategy
**Current State:** No testing framework is currently configured.

**Recommended Setup:**
- Use Vitest for unit testing (Vite-native)
- React Testing Library for component testing
- Place test files adjacent to source files with `.test.tsx` extension
- Mock external dependencies and API calls
- Focus on testing business logic and user interactions rather than implementation details

## 4. Code Style

### Language-Specific Rules
- **TypeScript:** Strict typing enabled, but with relaxed settings (`noImplicitAny: false`, `strictNullChecks: false`)
- **Async/Await:** Prefer async/await over Promises for better readability
- **Imports:** Use absolute imports with `@/` alias for src directory
- **React:** Use function components with hooks, avoid class components

### Naming Conventions
- **Files:** PascalCase for components (`HomePage.tsx`), camelCase for utilities (`utils.ts`)
- **Components:** PascalCase with descriptive names (`StatCard`, `MobileLayout`)
- **Functions:** camelCase with verb-noun pattern (`formatCurrency`, `validateAmount`)
- **Variables:** camelCase for regular variables, SCREAMING_SNAKE_CASE for constants
- **Types/Interfaces:** PascalCase, prefer interfaces over types for object shapes

### Documentation & Comments
- Use JSDoc comments for utility functions with complex logic
- Include brief descriptions for non-obvious business logic
- Document component props using TypeScript interfaces
- Use `// TODO:` comments for planned improvements

### Error Handling
- Use try-catch blocks for async operations
- Provide user-friendly error messages in Dutch
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safe property access
- Implement error boundaries for component-level error handling

## 5. Common Patterns

### Component Architecture
- **Compound Components:** Use for complex UI patterns (forms, cards)
- **Render Props:** For sharing stateful logic between components
- **Custom Hooks:** Extract reusable stateful logic (planned for hooks/ directory)

### State Management
- React Query (@tanstack/react-query) for server state
- Local component state with useState for UI state
- Context API for global app state (theme, user preferences)

### Styling Patterns
- Tailwind CSS with custom design system
- `cn()` utility function for conditional class merging
- Class Variance Authority (CVA) for component variants
- Mobile-first responsive design approach

### Data Handling
- Centralized constants in `lib/constants.ts`
- Type-safe API responses with generic interfaces
- Mock data for development in constants file
- Local storage helpers with error handling in utils

## 6. Do's and Don'ts

### ✅ Do's
- Use the `cn()` utility for combining Tailwind classes
- Implement proper TypeScript interfaces for all data structures
- Follow the established folder structure for new components
- Use Dutch language for user-facing text and labels
- Implement proper loading and error states for async operations
- Use semantic HTML elements for accessibility
- Leverage React Query for data fetching and caching
- Use absolute imports with `@/` prefix

### ❌ Don'ts
- Don't use inline styles; prefer Tailwind classes
- Don't create deeply nested component hierarchies
- Don't ignore TypeScript errors; fix them properly
- Don't hardcode strings; use constants file
- Don't forget to handle loading and error states
- Don't use `any` type; create proper interfaces
- Don't mix English and Dutch in user-facing content
- Don't create components without proper TypeScript props

## 7. Tools & Dependencies

### Core Framework
- **React 19** - UI library with latest features
- **TypeScript** - Type safety and developer experience
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **class-variance-authority** - Component variant management
- **clsx + tailwind-merge** - Conditional class handling

### State & Data
- **React Query** - Server state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Development Tools
- **ESLint** - Code linting with React and TypeScript rules
- **PostCSS** - CSS processing
- **TypeScript ESLint** - TypeScript-specific linting

### Setup Instructions
```bash
npm install          # Install dependencies
npm run dev         # Start development server
npm run build       # Build for production
npm run lint        # Run ESLint
```

## 8. Other Notes

### LLM Code Generation Guidelines
- Always use TypeScript interfaces for component props
- Follow the established component structure (ui/ vs common/ vs layout/)
- Use the existing utility functions in `lib/utils.ts` before creating new ones
- Implement proper error handling with Dutch error messages
- Use the established design system colors and spacing
- Follow the mobile-first responsive design approach
- Leverage existing constants and types from `lib/` directory
- Use React Query for any data fetching operations
- Implement proper loading states using existing LoadingState components

### Special Considerations
- **Dutch Localization:** All user-facing text should be in Dutch
- **Mobile-First:** Design for mobile devices primarily, desktop is secondary
- **Payment Focus:** Components should handle payment-related data carefully
- **Accessibility:** Use semantic HTML and ARIA attributes where needed
- **Performance:** Leverage React Query caching and lazy loading for optimal performance

### Edge Cases & Constraints
- Handle offline scenarios gracefully
- Validate payment amounts according to Dutch/EU standards
- Support multiple payment methods with different validation rules
- Handle expired payment requests appropriately
- Ensure proper currency formatting for EUR
- Consider GDPR compliance for user data handling