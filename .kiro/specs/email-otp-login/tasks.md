# Implementation Plan

- [x] 1. Create OTP login form component
  - Create new component `components/otp-login-form.tsx` with email and OTP input steps
  - Implement state management for email, OTP, current step, loading, and error states
  - Add form validation for email format
  - Integrate with existing UI components (Card, Button, Input, Label)
  - _Requirements: 1.1, 1.2, 2.1, 2.2_

- [x] 2. Implement Supabase OTP authentication logic
  - Add function to send OTP using `supabase.auth.signInWithOtp()`
  - Add function to verify OTP using `supabase.auth.verifyOtp()`
  - Handle authentication success and redirect to dashboard
  - Implement error handling for invalid email and OTP scenarios
  - _Requirements: 1.1, 2.1, 2.2_

- [x] 3. Integrate OTP login into existing login page
  - Update `app/auth/login/page.tsx` to include OTP login option
  - Add toggle or tab system to switch between password and OTP login
  - Ensure consistent styling with existing login form
  - _Requirements: 1.1, 2.1_

- [x] 4. Add Vietnamese language support for UI text
  - Update all UI text to Vietnamese as specified in requirements
  - Add proper error messages in Vietnamese
  - Ensure consistent language throughout the OTP flow
  - _Requirements: 1.2, 2.2_

- [x] 5. Fix OTP signup error by enabling user creation
  - Remove `shouldCreateUser: false` from signInWithOtp call
  - Set `shouldCreateUser: true` to allow new user registration via OTP
  - Test with both existing and new email addresses
  - Verify error "Signups not allowed for otp" is resolved
  - _Requirements: 1.1, 1.3_

- [x] 6. Implement resend OTP functionality
  - Add resend button to OTP input step
  - Implement countdown timer (60 seconds) before allowing resend
  - Add separate loading state for resend operation
  - Update UI to show countdown and disable/enable resend button appropriately
  - _Requirements: 3.1, 3.2, 3.3_

- [x] 7. Enhance error handling and user feedback
  - Add specific error messages for different OTP failure scenarios
  - Implement auto-clear error when user changes input
  - Add expired OTP detection and appropriate messaging
  - Improve network error handling with retry suggestions
  - _Requirements: 2.2, 2.3_

- [ ] 8. Verify Supabase configuration
  - Check Supabase Dashboard authentication settings
  - Ensure "Disable signup" is not enabled
  - Verify email confirmation settings are properly configured
  - Test email delivery and OTP generation
  - _Requirements: 1.1, 1.3_

- [x] 9. Modernize OTP login UI/UX design
  - Replace single OTP input with 6 individual digit input boxes
  - Add smooth fade transitions between email and OTP steps
  - Implement circular progress indicator for resend countdown
  - Add success/error icons with color-coded feedback
  - Enhance button hover effects and loading animations
  - Improve typography hierarchy and spacing
  - Add auto-advance functionality between OTP digit inputs
  - Implement skeleton loading states
  - _Requirements: 1.1, 1.2, 2.1, 2.2, 3.1, 3.2_

- [ ]* 10. Write unit tests for enhanced OTP functionality
  - Test OTP form component with resend functionality
  - Test error handling for various scenarios
  - Test countdown timer and resend logic
  - Test integration with updated Supabase auth methods
  - _Requirements: 1.1, 1.2, 2.1, 2.2, 3.1, 3.2_