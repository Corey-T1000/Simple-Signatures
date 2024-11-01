## Key Components

### Feature Components
- SignatureCustomizer: Combined style and template customization
  - Two-column layout
  - Font and color settings
  - Layout controls
  - Image settings
  - Padding controls
  - Dark mode support
- ImportSignature: Handles signature code importing
  - HTML code parsing
  - Error handling
  - User feedback
  - Modal interface
  - Data extraction
- SignaturePreview: Real-time signature preview
  - Live updates
  - Responsive display
  - Template rendering
  - Dark mode support
  - Theme-based styling
- SignatureCode: Generates and displays HTML code
  - Code formatting
  - Copy functionality
  - Preview integration
  - Enhanced display
  - Import/Export support
- SignatureElementsOrder: Drag-and-drop element ordering
  - Element visibility toggles
  - Order customization
  - Accessibility support
- ErrorBoundary: Error handling component
  - Graceful error display
  - Error logging
  - Component recovery

### UI Components (shadcn/ui)
- Button: Enhanced button component with variants
- Card: Container component
- Checkbox: Toggle component
- ColorPicker: Custom color selection
- Input: Enhanced form input component
- Label: Form label component
- Select: Dropdown component
- Slider: Range input component
- Tabs: Content organization
- Switch: Toggle switch component
- Dialog: Modal dialog component
- Textarea: Multiline text input
- ImageUploader: Drag-and-drop image upload
  - File type validation
  - Size restrictions
  - Preview support
- All components support dark mode

### Theme System
- Default Content: Dune-themed placeholder data
  - Character-based example data
  - Thematic styling
  - Professional layout
  - Engaging preview
- Color Schemes:
  - Desert-inspired palette
  - Dark mode support
  - Customizable colors
  - Consistent theming
- Typography:
  - Theme-appropriate fonts
  - Hierarchical text styles
  - Readable contrasts
- Layout:
  - Professional spacing
  - Balanced composition
  - Responsive design
  - Two-column customization

### Utils
- parseHtml.ts: HTML signature parser
  - Data extraction
  - Style recognition
  - Template detection
  - Error handling
- generateHtml.ts: HTML generation utility
- utils.ts: Shared utility functions
  - Class name management
  - Theme utilities
  - Type helpers
- button-variants.ts: Button styling variants

### Types
- signature.ts: Contains type definitions
  - Template interfaces
  - Style definitions
  - Configuration types
  - UI component props
  - SignatureElement type for ordering

## Project Structure
```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── button-variants.ts
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── ColorPicker.tsx
│   │   ├── dialog.tsx
│   │   ├── ImageUploader.tsx
│   │   ├── Input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── Slider.tsx
│   │   ├── switch.tsx
│   │   ├── tabs.tsx
│   │   └── textarea.tsx
│   ├── ErrorBoundary.tsx
│   ├── ImageCustomizer.tsx
│   ├── ImportSignature.tsx
│   ├── SignatureCode.tsx
│   ├── SignatureCustomizer.tsx
│   ├── SignatureElementsOrder.tsx
│   ├── SignatureForm.tsx
│   └── SignaturePreview.tsx
├── types/              # TypeScript definitions
│   └── signature.ts
├── utils/              # Utility functions
│   ├── generateHtml.ts
│   └── parseHtml.ts
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
   - Local storage
   - Export options
   - Error handling
   - Additional themes

2. Testing Infrastructure
   - Unit tests
   - Component tests
   - Integration tests
   - Visual testing
   - UI regression tests

### Implemented Features
1. Core Functionality
   - Signature customization
   - Template system
   - Real-time preview
   - HTML generation
   - Image upload with drag-and-drop
   - Error boundary implementation
   - Element ordering system
   - Theme-based content
   - HTML signature import
   - Combined customization interface

2. UI Components
   - shadcn/ui integration
   - Dark mode support
   - Enhanced controls
   - Improved layout
   - Button variant system
   - Image upload component
   - Themed defaults
   - Two-column customization
   - Import dialog

3. Customization Options
   - Font and color settings
   - Template options
   - Layout controls
   - Element ordering
   - Visibility toggles
   - Theme selection
   - Import/Export options
   - Padding controls

### Development Guidelines
1. Component Creation
   - Use shadcn/ui
   - Implement dark mode
   - Add proper types
   - Include documentation
   - Implement error boundaries
   - Support theming
   - Follow layout patterns

2. Type System
   - Define interfaces
   - Use strict typing
   - Document types
   - Validate props
   - Avoid any types

3. Testing Requirements
   - Write unit tests
   - Test components
   - Verify dark mode
   - Check accessibility
   - Test error scenarios
   - Validate themes
   - Test layouts

4. Code Quality
   - Follow ESLint
   - Use Prettier
   - Add documentation
   - Handle errors
   - Separate concerns
   - Theme consistency

5. UI Standards
   - Use shadcn/ui
   - Support dark mode
   - Follow spacing
   - Ensure accessibility
   - Implement proper error states
   - Maintain theme coherence
   - Use two-column layout where appropriate
