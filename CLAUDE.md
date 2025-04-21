# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linting with ESLint
- Testing: Use `/api/test` endpoint in development mode only

## Code Style Guidelines
- TypeScript: Strict mode with strictNullChecks enabled
- ESLint: Extends Next.js core-web-vitals and TypeScript configs
- Imports: Use absolute imports with `@/` prefix for src directory
- Components: Use functional React components with TypeScript types
- Error handling: Use try/catch with specific error types when possible
- Naming: PascalCase for components, camelCase for functions/variables
- Styling: Use Tailwind CSS with custom theme extensions
- State management: Use React hooks (useState, useEffect)