# Implementation Plan

- [x] 1. Create combined history API endpoint
  - Create new API route at `/api/history` that combines checkins and interventions data
  - Implement filtering logic for type, date range, mood range, and template types
  - Add pagination support with limit/offset parameters
  - Calculate and return comprehensive stats (total checkins, interventions, mood trends, etc.)
  - _Requirements: 1.1, 1.5, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 3.4_

- [x] 2. Add history translation keys
  - Add comprehensive translation keys for history page in all three languages (en, vi, ja)
  - Include keys for stats, filters, timeline, and error messages
  - Ensure consistent terminology with existing translation structure
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 3. Create timeline item components
- [x] 3.1 Create CheckinTimelineItem component
  - Build component to display checkin data with mood, energy, and free text
  - Include date formatting and responsive design
  - Add proper icons and color coding for mood/energy levels
  - _Requirements: 1.2, 4.1, 4.2, 4.3, 4.4_

- [x] 3.2 Create InterventionTimelineItem component
  - Build component to display intervention data with title, body, and template type
  - Include feedback stars and AI/template badges
  - Reuse existing intervention display logic from MessagesClient
  - _Requirements: 1.3, 4.1, 4.2, 4.3, 4.4_

- [x] 3.3 Create GroupedTimelineItem component
  - Build component that combines checkin and related interventions
  - Implement visual grouping with proper spacing and connection indicators
  - Handle responsive layout for grouped items
  - _Requirements: 1.4, 4.1, 4.2, 4.3, 4.4_

- [ ] 4. Create history stats component
- [x] 4.1 Create HistoryStats component
  - Build stats cards displaying total checkins, interventions, mood average, and streak
  - Implement responsive grid layout (4 columns desktop, 2x2 tablet, single column mobile)
  - Add proper icons and color coding for different metrics
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 4.1, 4.2, 4.3_

- [ ] 5. Create history filters component
- [x] 5.1 Create HistoryFilters component
  - Build filter controls for type, date range, mood range, and template types
  - Implement responsive layout with collapsible mobile drawer
  - Add proper form controls and validation
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 4.1, 4.2, 4.3_

- [ ] 6. Create main HistoryClient component
- [x] 6.1 Implement data fetching and state management
  - Create React Query integration for history API
  - Implement infinite scroll or pagination logic
  - Add proper loading and error states
  - _Requirements: 1.1, 1.5, 5.2, 5.3, 5.4_

- [x] 6.2 Implement timeline rendering logic
  - Create timeline data merging and sorting logic
  - Implement filter application on client side
  - Add proper date grouping and separation
  - _Requirements: 1.1, 1.4, 3.5_

- [x] 6.3 Add responsive layout and interactions
  - Implement responsive design for all screen sizes
  - Add proper touch interactions for mobile
  - Ensure minimum 44px touch targets
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 7. Update history page component
  - Replace existing placeholder content with HistoryClient component
  - Add proper authentication checks and locale setup
  - Implement proper error boundaries and fallback UI
  - _Requirements: 1.1, 5.1, 5.4, 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 8. Add error handling and loading states
- [x] 8.1 Implement comprehensive error handling
  - Add error boundaries for component crashes
  - Implement retry mechanisms for failed API calls
  - Add proper error messages with translation support
  - _Requirements: 5.1, 5.2, 5.4_

- [x] 8.2 Add loading and empty states
  - Create skeleton loading components for timeline items
  - Implement empty state with helpful messaging
  - Add loading indicators for filter changes and pagination
  - _Requirements: 5.3, 5.4_

- [ ]* 9. Add comprehensive testing
- [ ]* 9.1 Write unit tests for components
  - Test timeline item components with various props
  - Test data merging and filtering logic
  - Test stats calculation functions
  - _Requirements: All requirements_

- [ ]* 9.2 Write integration tests
  - Test API endpoint functionality
  - Test complete data flow from API to UI
  - Test filter interactions and pagination
  - _Requirements: All requirements_

- [ ]* 9.3 Add accessibility testing
  - Ensure proper ARIA labels and roles
  - Test keyboard navigation
  - Verify screen reader compatibility
  - _Requirements: 4.5_