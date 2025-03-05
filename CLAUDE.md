# SEASONFOOD DEVELOPMENT GUIDE

## Build Commands
- `yarn dev` or `npm run dev` - Start Vite development server
- `yarn build` - TypeScript compilation and Vite build
- `yarn build-app` - Build for mobile app (Capacitor)
- `yarn run-app-android` - Open Android project in Android Studio
- `yarn preview` - Preview the build locally

## Lint Commands
- `yarn lint` - Run ESLint with zero tolerance for warnings

## Code Style Guidelines
- **Components**: Use functional components with arrow function syntax
- **Naming**: PascalCase for components/types, camelCase for hooks/utilities
- **Imports**: Group by scope (React → external → internal → components)
- **Types**: Define interfaces in dedicated files, use explicit typing for props
- **State**: Use Context API with reducer pattern for global state
- **Formatting**: 2-space indentation, semicolons, double quotes in JSX
- **File Structure**: Component files match component names
- **Error Handling**: Component-level error boundaries for critical sections

## Tech Stack
React 18, TypeScript, Material UI, React Router, i18next, Capacitor