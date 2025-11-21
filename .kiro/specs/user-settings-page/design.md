# Design Document

## Overview

The User Settings Page provides a centralized interface for users to manage their account settings. The initial implementation focuses on password change functionality while establishing a scalable foundation for future settings features. The design integrates seamlessly with the existing Next.js application architecture, Supabase authentication system, and internationalization framework.

## Architecture

### Route Structure
- **Primary Route**: `/[locale]/settings` - Main settings page
- **Protected Route**: Inherits from existing `(protected)` route group
- **Internationalization**: Supports existing locale system (en, vi, ja)

### Component Hierarchy
```
SettingsPage (Server Component)
├── SettingsClient (Client Component)
    ├── SettingsNavigation (Settings sidebar/tabs)
    ├── PasswordChangeSection
    │   └── PasswordChangeForm
    └── FutureSettingsSections (placeholder for expansion)
```

### Integration Points
- **Authentication**: Leverages existing Supabase auth system
- **Layout**: Uses existing `(protected)` layout structure
- **Navigation**: Integrates with current HeaderNav component
- **Styling**: Follows existing design system and UI components
- **Internationalization**: Uses current translation system

## Components and Interfaces

### 1. Settings Page Structure

#### SettingsPage (Server Component)
```typescript
// app/[locale]/(protected)/settings/page.tsx
interface SettingsPageProps {
  params: Promise<{ locale: string }>;
}
```

**Responsibilities:**
- Server-side locale validation
- Initial data loading
- Render SettingsClient with proper props

#### SettingsClient (Client Component)
```typescript
// components/settings/SettingsClient.tsx
interface SettingsClientProps {
  locale: string;
}
```

**Responsibilities:**
- Manage settings navigation state
- Handle section switching
- Coordinate between different settings sections

### 2. Password Change Components

#### PasswordChangeForm (Client Component)
```typescript
// components/settings/PasswordChangeForm.tsx
interface PasswordChangeFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

interface PasswordChangeFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
```

**Responsibilities:**
- Form state management
- Password validation
- Supabase auth integration
- Loading states and error handling
- Success/error notifications

#### SettingsNavigation (Client Component)
```typescript
// components/settings/SettingsNavigation.tsx
interface SettingsNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  locale: string;
}

type SettingsSection = 'password' | 'profile' | 'preferences' | 'security';
```

**Responsibilities:**
- Display available settings sections
- Handle section navigation
- Responsive design (tabs on desktop, dropdown on mobile)

## Data Models

### Password Change Validation
```typescript
interface PasswordValidationRules {
  minLength: number; // 8 characters
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
}

interface PasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
}

interface PasswordChangeResponse {
  success: boolean;
  error?: string;
  message?: string;
}
```

### Settings State Management
```typescript
interface SettingsState {
  activeSection: SettingsSection;
  isLoading: boolean;
  notifications: {
    type: 'success' | 'error' | 'info';
    message: string;
    id: string;
  }[];
}
```

## Error Handling

### Password Change Error Scenarios
1. **Invalid Current Password**
   - Display: "Current password is incorrect"
   - Action: Focus current password field

2. **Weak New Password**
   - Display: Specific validation messages
   - Action: Show password requirements

3. **Password Mismatch**
   - Display: "Passwords do not match"
   - Action: Focus confirm password field

4. **Network/Auth Errors**
   - Display: "Unable to update password. Please try again."
   - Action: Enable retry mechanism

### Global Error Handling
- Use existing error boundary patterns
- Integrate with application's notification system
- Provide fallback UI for critical failures

## Testing Strategy

### Unit Testing
- **PasswordChangeForm**: Form validation logic, state management
- **SettingsNavigation**: Section switching, responsive behavior
- **Validation utilities**: Password strength validation

### Integration Testing
- **Settings page routing**: Locale handling, protected route access
- **Supabase integration**: Password update flow
- **Translation integration**: Multi-language support

### User Experience Testing
- **Responsive design**: Mobile and desktop layouts
- **Accessibility**: Keyboard navigation, screen reader support
- **Form usability**: Error states, loading indicators

## Implementation Details

### File Structure
```
app/[locale]/(protected)/settings/
├── page.tsx                          # Settings page server component
└── loading.tsx                       # Loading UI

components/settings/
├── SettingsClient.tsx                 # Main settings client component
├── SettingsNavigation.tsx             # Settings navigation
├── PasswordChangeForm.tsx             # Password change form
└── SettingsSection.tsx                # Reusable section wrapper

lib/validation/
└── password-validation.ts             # Password validation utilities
```

### Navigation Integration
- Add "Settings" link to HeaderNav component
- Position after "History" in navigation order
- Use appropriate translation keys

### Translation Keys
```json
{
  "settings": {
    "title": "Settings",
    "password": {
      "title": "Change Password",
      "currentPassword": "Current Password",
      "newPassword": "New Password",
      "confirmPassword": "Confirm New Password",
      "updateButton": "Update Password",
      "success": "Password updated successfully",
      "errors": {
        "currentIncorrect": "Current password is incorrect",
        "passwordMismatch": "Passwords do not match",
        "weakPassword": "Password must be at least 8 characters"
      }
    }
  }
}
```

### Responsive Design Considerations
- **Desktop**: Sidebar navigation with content area
- **Mobile**: Tab-based navigation with full-width content
- **Breakpoint**: Use existing md: breakpoint (768px)

### Security Considerations
- Validate current password before allowing changes
- Implement rate limiting for password change attempts
- Clear sensitive form data on component unmount
- Use secure password validation on both client and server

### Performance Optimizations
- Lazy load settings sections
- Debounce password validation
- Optimize re-renders with proper memoization
- Use React.memo for static components

### Accessibility Features
- Proper ARIA labels and descriptions
- Keyboard navigation support
- Screen reader announcements for state changes
- Focus management for form interactions
- High contrast support for password visibility toggles