# Implementation Plan

- [x] 1. Update MessagesClient to use API endpoint
  - Replace direct Supabase queries with fetch calls to `/api/interventions-history`
  - Update fetchInterventions function to use API parameters (limit, offset, include_stats)
  - Handle API response format instead of raw database results
  - _Requirements: 1.1, 1.2, 3.1, 3.2, 3.3_

- [x] 2. Implement enhanced statistics display
  - Use API stats when available instead of client-side calculations
  - Update stats cards to show API-provided statistics
  - Add fallback for when stats are not available
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 3. Update pagination logic
  - Use API pagination.has_more field instead of client-side calculation
  - Handle API pagination.total for accurate counts
  - Maintain existing infinite scroll behavior
  - _Requirements: 1.2, 3.3_

- [x] 4. Update error handling
  - Handle API error responses instead of database errors
  - Use API error messages for user display
  - Maintain existing retry functionality
  - _Requirements: 3.2_

- [x] 5. Remove unused Supabase imports and code
  - Remove direct Supabase client usage for intervention fetching
  - Keep Supabase client only for feedback submission
  - Clean up unused imports and variables
  - _Requirements: 3.4_