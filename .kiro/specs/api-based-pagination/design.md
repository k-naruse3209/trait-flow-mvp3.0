# Design Document

## Overview

This design refactors the MessagesClient component to use the existing `/api/interventions-history` endpoint instead of direct Supabase queries. The API already provides pagination, statistics, and proper error handling, making it a better architectural choice.

## Architecture

### Current Architecture
- MessagesClient directly queries Supabase database
- Client-side pagination logic with offset/limit
- Client-side statistics calculation
- Direct database error handling

### New Architecture
- MessagesClient calls `/api/interventions-history` API
- Server-side pagination with standardized response format
- Server-side statistics calculation with include_stats parameter
- Centralized error handling through API

## Components and Interfaces

### API Response Interface
```typescript
interface ApiResponse {
  success: boolean
  data: InterventionRecord[]
  pagination: {
    limit: number
    offset: number
    total: number
    has_more: boolean
  }
  stats?: {
    total_interventions: number
    with_feedback: number
    ai_generated: number
    template_generated: number
    avg_feedback_score: number | null
  }
}
```

### Modified MessagesClient
- Replace direct Supabase queries with fetch calls to API
- Use API pagination parameters (limit, offset, include_stats)
- Handle API response format instead of raw database results
- Maintain existing UI and user experience

## Data Models

The existing InterventionRecord interface remains unchanged. The API response wrapper provides additional metadata for pagination and statistics.

## Error Handling

- API-level error handling with proper HTTP status codes
- Client-side error display using API error messages
- Fallback behavior for network issues
- Maintain existing retry functionality

## Testing Strategy

- Verify pagination works identically to current implementation
- Test statistics display with and without include_stats parameter
- Validate error handling scenarios
- Ensure feedback submission continues to work
- Test infinite scroll behavior