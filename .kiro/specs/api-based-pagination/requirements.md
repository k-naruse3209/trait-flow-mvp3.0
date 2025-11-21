# Requirements Document

## Introduction

This feature involves refactoring the MessagesClient component to use the existing `api/interventions-history/route.ts` API endpoint instead of making direct Supabase database queries for fetching interventions with pagination. This will improve code organization, provide better error handling, and enable access to additional statistics that the API provides.

## Requirements

### Requirement 1

**User Story:** As a user viewing my coaching messages, I want the same functionality and performance as before, so that my experience remains consistent while the underlying implementation is improved.

#### Acceptance Criteria

1. WHEN the messages page loads THEN the system SHALL fetch interventions using the API endpoint instead of direct database queries
2. WHEN I scroll to load more messages THEN the system SHALL use API pagination parameters (limit and offset) to fetch additional interventions
3. WHEN interventions are loaded THEN the system SHALL display the same information as before (title, body, CTA, feedback status, etc.)
4. WHEN I submit feedback on a message THEN the system SHALL continue to work as before with direct database updates

### Requirement 2

**User Story:** As a user, I want to see enhanced statistics about my coaching messages, so that I can better understand my engagement with the coaching system.

#### Acceptance Criteria

1. WHEN the messages page loads THEN the system SHALL request statistics from the API using the include_stats parameter
2. WHEN statistics are available THEN the system SHALL display total interventions, feedback count, AI-generated count, and average feedback score
3. WHEN statistics are not available THEN the system SHALL fall back to calculating basic stats from loaded interventions
4. WHEN displaying statistics THEN the system SHALL show more accurate data than the current client-side calculations

### Requirement 3

**User Story:** As a developer, I want the code to be more maintainable and follow API-first principles, so that future changes are easier to implement and the codebase is more consistent.

#### Acceptance Criteria

1. WHEN fetching interventions THEN the system SHALL use the standardized API response format with success, data, and pagination fields
2. WHEN handling errors THEN the system SHALL use the API's error handling instead of direct database error handling
3. WHEN implementing pagination THEN the system SHALL use the API's has_more field to determine if more data is available
4. WHEN the component initializes THEN the system SHALL remove direct Supabase client usage for intervention fetching