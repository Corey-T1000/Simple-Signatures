## Key Components

### Feature Components
- ImageCustomizer: Handles image upload and customization
  - Image alignment controls
  - Scale factor adjustment
  - Preview integration
  - shadcn/ui controls
  - Dark mode support
- StyleCustomizer: Controls for style customization
  - Font selection
  - Color picker
  - Image settings
  - Dark mode support
- SignatureForm: Manages signature information input
  - Form validation
  - Data management
  - Real-time updates
  - shadcn/ui form components
- SignaturePreview: Real-time signature preview
  - Live updates
  - Responsive display
  - Template rendering
  - Dark mode support
- SignatureCode: Generates and displays HTML code
  - Code formatting
  - Copy functionality
  - Preview integration
  - Enhanced display
- TemplateCustomizer: Advanced template options
  - Layout controls
  - Padding adjustment
  - Alignment settings
  - Enhanced UI

### UI Components (shadcn/ui)
- Button: Enhanced button component
- Card: Container component
- Checkbox: Toggle component
- ColorPicker: Custom color selection
- Input: Form input component
- Label: Form label component
- Select: Dropdown component
- Slider: Range input component
- Tabs: Content organization
- All components support dark mode

### Types
- signature.ts: Contains type definitions
  - Template interfaces
  - Style definitions
  - Configuration types
  - UI component props

### Utils
- generateHtml.ts: HTML generation utility
- utils.ts: Shared utility functions
  - Class name management
  - Theme utilities
  - Type helpers

## Project Structure
```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── ColorPicker.tsx
│   │   ├── Input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── Slider.tsx
│   │   └── tabs.tsx
│   ├── ImageCustomizer.tsx
│   ├── SignatureCode.tsx
│   ├── SignatureForm.tsx
│   ├── SignaturePreview.tsx
│   ├── StyleCustomizer.tsx
│   └── TemplateCustomizer.tsx
├── types/              # TypeScript definitions
│   └── signature.ts
├── utils/              # Utility functions
│   └── generateHtml.ts
├── lib/               # Shared utilities
│   └── utils.ts
├── styles/            # Theme configuration
│   └── globals.css
├── App.tsx           # Main application
└── main.tsx         # Entry point
```

## Development Status

### Current Focus
1. Feature Implementation
   - Image upload
   - Local storage
   - Export options
   - Error handling

2. Testing Infrastructure
   - Unit tests
   - Component tests
   - Integration tests
   - Visual testing

### Implemented Features
1. Core Functionality
   - Signature customization
   - Template system
   - Real-time preview
   - HTML generation

2. UI Components
   - shadcn/ui integration
   - Dark mode support
   - Enhanced controls
   - Improved layout

3. Customization Options
   - Image settings
   - Style controls
   - Template options
   - Color management

### Pending Improvements
1. Additional Features
   - Image upload
   - Local storage
   - Export options
   - Error handling

2. Testing
   - Test setup
   - Unit tests
   - Component tests
   - Integration tests

3. Documentation
   - Usage examples
   - API documentation
   - Development guides
   - Testing guides

4. Performance
   - Optimization
   - Code splitting
   - Bundle analysis
   - Load time

## Development Guidelines
1. Component Creation
   - Use shadcn/ui
   - Implement dark mode
   - Add proper types
   - Include documentation

2. Type System
   - Define interfaces
   - Use strict typing
   - Document types
   - Validate props

3. Testing Requirements
   - Write unit tests
   - Test components
   - Verify dark mode
   - Check accessibility

4. Code Quality
   - Follow ESLint
   - Use Prettier
   - Add documentation
   - Handle errors

5. UI Standards
   - Use shadcn/ui
   - Support dark mode
   - Follow spacing
   - Ensure accessibility
