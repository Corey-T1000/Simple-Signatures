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
- LayoutCustomizer: Advanced layout controls
  - Layout direction (horizontal/vertical)
  - Content style (compact/spacious)
  - Title layout (stacked/inline)
  - CTA layout (stacked/inline)
  - Image settings
    - Size scale control
    - Spacing adjustments
  - Real-time updates
- SpacingCustomizer: Independent padding controls
  - Top padding adjustment
  - Right padding adjustment
  - Bottom padding adjustment
  - Left padding adjustment
  - Numeric slider interface
  - Real-time updates
- ExportOptions: Signature export functionality
  - Multiple format support
    - HTML
    - Plain Text
    - Rich Text
  - Copy to clipboard
  - Download capability
  - Format conversion
  - Error handling
  - Success feedback
  - Modern UI design
- ErrorBoundary: Error handling component
  - Graceful error display
  - Error logging
  - Component recovery

### UI Components (shadcn/ui)
[Previous UI components section remains unchanged...]

### Theme System
[Previous Theme System section remains unchanged...]

### Utils and Services
[Previous Utils and Services section remains unchanged...]

### Types
[Previous Types section remains unchanged...]

## Project Structure
```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   │   [Previous ui components remain unchanged...]
│   ├── ErrorBoundary.tsx
│   ├── ExportOptions.tsx
│   ├── ImageCustomizer.tsx
│   ├── ImageSettings.tsx
│   ├── ImportSignature.tsx
│   ├── LayoutCustomizer.tsx
│   ├── SignatureCode.tsx
│   ├── SignatureElementsOrder.tsx
│   ├── SignatureForm.tsx
│   ├── SignaturePreview.tsx
│   ├── SpacingCustomizer.tsx
│   ├── StyleCustomizer.tsx
│   ├── TemplateCustomizer.tsx
│   └── TemplateSelector.tsx
[Rest of the structure remains unchanged...]
```

## Development Status

### Current Focus
1. Export Functionality Polish
   - Format preview implementation
   - Enhanced error handling
   - Loading state addition
   - Format validation

2. Testing Infrastructure
   - Test framework setup
   - Unit test creation
   - Component testing
   - Integration testing

### Implemented Features
[Previous Implemented Features section remains unchanged with the addition of:]
- Layout customization system
  - Direction controls
  - Content style options
  - Title/Company layout
  - CTA layout
  - Image settings
- Spacing customization system
  - Independent padding controls
  - Numeric slider interface
- Export functionality
  - Multiple format support
  - Copy to clipboard
  - Download capability
  - Error handling

### Development Guidelines
[Previous Development Guidelines section remains unchanged...]
