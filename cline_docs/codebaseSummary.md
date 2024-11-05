## Key Components

### Feature Components
- SignatureCustomizer: Combined style and template customization
  - Two-column responsive layout
  - Font and color settings
  - Layout controls (horizontal/vertical)
  - Image settings (style, fit, alignment, scale)
  - Advanced padding controls with sliders
  - Content style options (compact/spacious)
  - Title/Company layout options (stacked/inline)
  - CTA layout options (stacked/inline)
  - Real-time updates
- ImageCustomizer: Enhanced image customization
  - Shadow controls (toggle, color, opacity, blur, offset)
  - Shape controls (rounded/square)
  - Corner radius adjustment
  - Size and aspect ratio controls
  - Rotation and zoom
  - Object fit options
  - Background settings
  - Real-time preview
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
  - Dark mode support with smart color adjustments
  - Theme-based styling
  - WCAG contrast checking
  - Non-intrusive color warnings
  - Enhanced image styling
  - Shadow rendering
  - Shape customization
  - Flexible layouts
    - Title/Company (stacked/inline)
    - CTAs (stacked/inline)
- SignatureCode: Generates and displays HTML code
  - Code formatting
  - Copy functionality
  - Preview integration
  - Enhanced display
  - Import/Export support
  - Image style generation
  - Shadow CSS generation
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
- Card: Container component with consistent styling
- Checkbox: Toggle component for boolean settings
- ColorPicker: Custom color selection with preview
- ColorWarning: Non-intrusive accessibility warnings
- Input: Enhanced form input component
- Label: Form label component with proper spacing
- Select: Dropdown component with search
- Slider: Range input component for numeric values
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
- Theme Context: Centralized theme management
  - Dark/Light mode support
  - Theme persistence
  - Type-safe theme values
- Theme Hook: Custom hook for theme access
  - Easy theme switching
  - Theme state management
  - TypeScript support
- Color System:
  - WCAG contrast checking
  - Smart dark mode adjustments
  - Color preservation
  - Accessibility warnings
- Default Content: Dune-themed placeholder data
  - Character-based example data
  - Thematic styling
  - Professional layout
  - Engaging preview
- Color Schemes:
  - Desert-inspired palette
  - Dark mode support with smart adjustments
  - Primary/Secondary color customization
  - Consistent theming
  - WCAG compliance
- Typography:
  - Extensive font options
  - Hierarchical text styles
  - Readable contrasts
  - System and web fonts support
- Layout:
  - Professional spacing
  - Balanced composition
  - Responsive design
  - Two-column customization interface
  - Flexible padding system
  - Multiple layout options

### Utils and Services
- storage.ts: Local storage management
  - User preferences persistence
  - Theme settings
  - Signature customizations
  - Layout preferences
  - Image settings storage
  - Error handling
  - Type-safe storage operations
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
- theme-context.tsx: Theme management
  - Context provider
  - Theme types
  - Theme utilities
- use-theme.ts: Theme hook
  - Theme access
  - Type-safe theme usage
  - Error handling

### Types
- signature.ts: Contains type definitions
  - Template interfaces
  - Style definitions
  - Configuration types
  - UI component props
  - SignatureElement type for ordering
  - Storage data types
  - Theme types
  - Image settings types

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
│   │   ├── ColorWarning.tsx
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
├── lib/               # Core utilities and services
│   ├── storage.ts    # Local storage management
│   ├── theme-context.tsx # Theme provider
│   ├── use-theme.ts  # Theme hook
│   └── utils.ts      # Shared utilities
├── types/            # TypeScript definitions
│   └── signature.ts
├── utils/            # Feature-specific utilities
│   ├── generateHtml.ts
│   └── parseHtml.ts
├── styles/           # Theme configuration
│   └── globals.css
├── App.tsx          # Main application
└── main.tsx         # Entry point
```

## Development Status

### Current Focus
1. Export Functionality
   - Multiple format support
   - Download capabilities
   - Clipboard integration
   - Format validation

2. Testing Infrastructure
   - Unit tests
   - Component tests
   - Integration tests
   - Visual testing
   - UI regression tests

### Implemented Features
1. Core Functionality
   - Combined signature customization interface
   - Advanced template system
   - Real-time preview
   - HTML generation
   - Image upload with drag-and-drop
   - Enhanced image customization
     - Shadow controls
     - Shape customization
     - Corner radius adjustment
   - Error boundary implementation
   - Element ordering system
   - Theme-based content
   - HTML signature import
   - Two-column customization interface
   - Local storage for preferences
   - Advanced padding controls
   - Multiple layout options
   - WCAG contrast checking
   - Smart dark mode colors

2. UI Components
   - shadcn/ui integration
   - Dark mode support with smart adjustments
   - Enhanced controls
   - Improved layout
   - Button variant system
   - Image upload component
   - Themed defaults
   - Two-column customization
   - Import dialog
   - Persistent preferences
   - Slider-based controls
   - Layout options
   - Color warnings
   - Accessibility indicators

3. Customization Options
   - Font and color settings with WCAG support
   - Template options
   - Layout controls
   - Element ordering
   - Visibility toggles
   - Theme selection
   - Import/Export options
   - Advanced padding controls
   - Image customization
     - Shadow effects
     - Shape options
     - Corner radius
     - Size and rotation
   - Content style options
   - Title/Company layout options
   - CTA layout options
   - Preference persistence

### Development Guidelines
1. Component Creation
   - Use shadcn/ui
   - Implement dark mode
   - Add proper types
   - Include documentation
   - Implement error boundaries
   - Support theming
   - Follow layout patterns
   - Handle persistence
   - Check accessibility

2. Type System
   - Define interfaces
   - Use strict typing
   - Document types
   - Validate props
   - Avoid any types
   - Type storage data
   - Theme types

3. Testing Requirements
   - Write unit tests
   - Test components
   - Verify dark mode
   - Check accessibility
   - Test error scenarios
   - Validate themes
   - Test layouts
   - Verify persistence
   - Check contrast ratios

4. Code Quality
   - Follow ESLint
   - Use Prettier
   - Add documentation
   - Handle errors
   - Separate concerns
   - Theme consistency
   - Type safety
   - WCAG compliance

5. UI Standards
   - Use shadcn/ui
   - Support dark mode
   - Follow spacing
   - Ensure accessibility
   - Implement proper error states
   - Maintain theme coherence
   - Use two-column layout where appropriate
   - Persist user preferences
   - Check color contrast
   - Show accessibility warnings
