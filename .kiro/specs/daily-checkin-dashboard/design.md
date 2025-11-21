# Design Document

## Overview

The daily check-in system integrates into the existing Next.js dashboard to provide mood tracking, AI-powered interventions, and analytics. The system leverages the existing Supabase authentication and database infrastructure while adding new components for check-in submission, mood analytics, and intervention display.

## Architecture

### System Components

```mermaid
graph TB
    A[Dashboard Page] --> B[CheckinCard Component]
    B --> C[CheckinForm Component]
    B --> D[CheckinHistory Component]
    C --> E[/api/checkins API Route]
    E --> F[Supabase Database]
    E --> G[Mood Analytics Service]
    G --> H[Intervention Processor]
    H --> I[Intervention Templates]
    H --> J[OpenAI Client]
    E --> K[Monitoring Service]
```

### Data Flow

1. **Check-in Submission**: User submits mood/energy data → API validates and saves → Analytics processing → Intervention generation (if needed)
2. **Dashboard Display**: Page loads → Fetch today's check-in → Display form or summary → Show recent history
3. **Intervention Generation**: Mood analysis → Template selection → AI generation (with fallback) → Save to database

## Components and Interfaces

### Frontend Components

#### CheckinCard Component
- **Purpose**: Main container for check-in functionality on dashboard
- **Props**: `userId: string`, `todayCheckin?: CheckinRecord`
- **State**: Loading states, error handling, submission status
- **Features**: Conditional rendering of form vs. summary based on today's check-in status

#### CheckinForm Component
- **Purpose**: Form for submitting daily check-ins
- **Props**: `onSubmit: (data: CheckinData) => Promise<void>`
- **State**: Form data (mood score, energy level, free text), validation errors
- **Features**: Mood slider (1-5), energy radio buttons, optional text area, form validation

#### CheckinHistory Component
- **Purpose**: Display recent check-ins and basic analytics
- **Props**: `checkins: CheckinRecord[]`, `analytics: MoodAnalytics`
- **Features**: Recent check-ins list, mood trend indicator, streak counter

#### InterventionMessage Component
- **Purpose**: Display AI-generated coaching messages
- **Props**: `intervention: InterventionRecord`
- **Features**: Message display, CTA button, dismissal functionality

### API Endpoints

#### POST /api/checkins
- **Purpose**: Submit new check-in data
- **Authentication**: Required (Supabase auth)
- **Input**: `{ moodScore: number, energyLevel: string, freeText?: string }`
- **Output**: `{ success: boolean, data: CheckinRecord, analytics: MoodAnalytics }`
- **Processing**: Validation → Save → Analytics → Intervention generation

#### GET /api/checkins
- **Purpose**: Fetch user's check-in history
- **Authentication**: Required (Supabase auth)
- **Query Params**: `limit?: number, offset?: number`
- **Output**: `{ success: boolean, data: CheckinRecord[] }`

### Database Schema

#### checkins table
```sql
- id: uuid (primary key)
- user_id: uuid (foreign key to auth.users)
- mood_score: integer (1-5)
- energy_level: text ('low', 'mid', 'high')
- free_text: text (nullable)
- created_at: timestamp
- updated_at: timestamp
```

#### interventions table
```sql
- id: uuid (primary key)
- user_id: uuid (foreign key to auth.users)
- checkin_id: uuid (foreign key to checkins)
- template_type: text ('compassion', 'reflection', 'action')
- message_payload: jsonb (title, body, cta_text)
- fallback: boolean
- viewed: boolean (default false)
- created_at: timestamp
```

## Data Models

### TypeScript Interfaces

```typescript
interface CheckinData {
  moodScore: number // 1-5
  energyLevel: 'low' | 'mid' | 'high'
  freeText?: string
}

interface CheckinRecord extends CheckinData {
  id: string
  userId: string
  createdAt: string
  updatedAt: string
}

interface InterventionRecord {
  id: string
  userId: string
  checkinId: string
  templateType: 'compassion' | 'reflection' | 'action'
  messagePayload: {
    title: string
    body: string
    cta_text: string
  }
  fallback: boolean
  viewed: boolean
  createdAt: string
}

interface MoodAnalytics {
  averageMood: number
  moodTrend: 'improving' | 'declining' | 'stable'
  energyDistribution: { low: number; mid: number; high: number }
  totalCheckins: number
  streakDays: number
}
```

## Error Handling

### Client-Side Error Handling
- **Form Validation**: Real-time validation with user-friendly error messages
- **API Errors**: Toast notifications for submission failures
- **Network Errors**: Retry mechanisms with exponential backoff
- **Loading States**: Skeleton loaders and disabled states during operations

### Server-Side Error Handling
- **Authentication Errors**: 401 responses with clear error codes
- **Validation Errors**: 400 responses with field-specific error details
- **Database Errors**: 500 responses with generic messages (detailed logging)
- **External Service Failures**: Graceful degradation with fallback functionality

### Error Logging
- **Structured Logging**: Use existing monitoring service for consistent error tracking
- **Error Context**: Include user ID, endpoint, timestamp, and relevant metadata
- **Performance Tracking**: Monitor API response times and success rates

## Testing Strategy

### Unit Testing
- **Component Testing**: Test form validation, state management, and user interactions
- **Service Testing**: Test mood analytics calculations and intervention logic
- **API Testing**: Test endpoint validation, authentication, and error handling

### Integration Testing
- **Database Integration**: Test Supabase operations with test database
- **Authentication Flow**: Test protected routes and user session handling
- **End-to-End Scenarios**: Test complete check-in submission and intervention flow

### Performance Testing
- **API Response Times**: Ensure check-in submission completes within 2 seconds
- **Database Queries**: Optimize queries for check-in history and analytics
- **Intervention Generation**: Test fallback mechanisms when AI services are slow

## Security Considerations

### Authentication & Authorization
- **Row Level Security**: Ensure users can only access their own check-in data
- **API Authentication**: Validate Supabase JWT tokens on all protected endpoints
- **Input Sanitization**: Sanitize free text input to prevent XSS attacks

### Data Privacy
- **Sensitive Data**: Treat mood and free text data as sensitive personal information
- **Data Retention**: Consider implementing data retention policies for old check-ins
- **Audit Logging**: Log access to sensitive user data for compliance

## Performance Optimization

### Frontend Optimization
- **Component Memoization**: Use React.memo for expensive components
- **Data Fetching**: Implement SWR or React Query for efficient data caching
- **Bundle Optimization**: Code splitting for check-in related components

### Backend Optimization
- **Database Indexing**: Index user_id and created_at columns for efficient queries
- **Caching**: Cache mood analytics calculations for frequently accessed data
- **Async Processing**: Move intervention generation to background jobs if needed

## Monitoring and Analytics

### Application Metrics
- **Check-in Completion Rate**: Track daily active users vs. check-in submissions
- **Intervention Effectiveness**: Monitor user engagement with generated messages
- **API Performance**: Track response times and error rates for check-in endpoints

### User Analytics
- **Mood Trends**: Aggregate anonymized mood data for platform insights
- **Feature Usage**: Track which check-in features are most/least used
- **User Retention**: Monitor correlation between check-ins and user retention