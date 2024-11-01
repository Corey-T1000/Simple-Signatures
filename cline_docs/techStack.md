## Frontend
- Framework: React with TypeScript
- Build Tool: Vite
- Styling: 
  - Tailwind CSS
  - shadcn/ui components
  - CSS Variables for theming
  - Dark mode support
- State Management: React Hooks (useState, useEffect)
- Component Architecture: Functional Components
- Drag and Drop: @dnd-kit
- File Upload: react-dropzone

## Development Tools
- Package Manager: npm
- Linting: ESLint
- Type Checking: TypeScript
- Code Formatting: Prettier
- Build Configuration: Vite
- CSS Processing: PostCSS

## Key Dependencies
- PostCSS for CSS processing
- Tailwind for utility-first CSS
- shadcn/ui for component library
- Radix UI for accessible primitives
- TypeScript for type safety
- Vite for fast development
- ESLint for code quality
- Prettier for formatting
- Lucide for icons
- class-variance-authority for component variants
- clsx and tailwind-merge for class management
- @dnd-kit/core and @dnd-kit/sortable for drag-and-drop
- react-dropzone for file uploads

## Architecture Decisions
1. Component Structure
   - Modular components for each functionality
   - shadcn/ui for base components
   - Separation of UI components from feature components
   - Type definitions in separate directory
   - Utility functions for shared logic
   - Button variants in separate files
   - Error boundaries for component error handling

2. File Organization
   - /src/components: React components
   - /src/components/ui: shadcn/ui components
   - /src/types: TypeScript type definitions
   - /src/utils: Utility functions
   - /src/styles: Theme configuration
   - /cline_docs: Project documentation

3. Styling Approach
   - shadcn/ui for consistent component styling
   - Tailwind CSS for utility classes
   - CSS Variables for theming
   - Dark mode support
   - PostCSS for processing
   - Responsive design principles

4. Type Safety
   - Strict TypeScript configuration
   - Separate type definitions
   - Type-safe props
   - Interface-first development
   - Proper type exports
   - No implicit any types

## Development Requirements
1. Code Quality
   - ESLint rules enforcement
   - Prettier formatting
   - TypeScript strict mode
   - Component documentation
   - Proper type definitions
   - Separation of concerns

2. Testing Strategy
   - Unit tests for utilities
   - Component testing
   - Integration tests
   - Accessibility testing
   - Visual regression tests
   - Error boundary testing

3. Error Handling
   - React Error Boundaries
   - Input validation
   - Type checking
   - User feedback
   - Error logging
   - Graceful degradation

4. Documentation
   - JSDoc comments
   - Type documentation
   - Component usage examples
   - Development guidelines
   - Architecture documentation
   - Error handling documentation

5. Performance Considerations
   - Component optimization
   - Bundle size management
   - Code splitting
   - Lazy loading
   - Render optimization
   - Error recovery

6. UI/UX Standards
   - Consistent component styling
   - Dark mode support
   - Efficient space utilization
   - Responsive layouts
   - Accessibility compliance
   - Visual hierarchy
   - Color contrast
   - Focus management
   - Error state design
