# Requirements Document

## Introduction

This feature completes the Vietnamese localization for the messages page by updating the hardcoded English text in the messages page component to use the existing translation system. The Vietnamese translations are already available in the messages/vi.json file, but the page component is not utilizing them.

## Glossary

- **Messages Page**: The `/messages` route page component that displays coaching messages to users
- **Translation System**: The existing i18n system using TranslationProvider and useTranslations hook
- **Locale**: The language setting (en for English, vi for Vietnamese)
- **Translation Keys**: Dot-notation keys used to access translated strings from the messages JSON files

## Requirements

### Requirement 1

**User Story:** As a Vietnamese-speaking user, I want the messages page title and subtitle to display in Vietnamese, so that I can understand the page content in my preferred language.

#### Acceptance Criteria

1. WHEN a user visits the messages page with Vietnamese locale, THE Messages Page SHALL display the title using the translation key "messages.title"
2. WHEN a user visits the messages page with Vietnamese locale, THE Messages Page SHALL display the subtitle using the translation key "messages.subtitle"
3. THE Messages Page SHALL use the useTranslations hook to access translated strings
4. THE Messages Page SHALL maintain the same visual layout and styling as the current implementation

### Requirement 2

**User Story:** As a developer, I want the messages page to follow the established translation pattern, so that the codebase remains consistent and maintainable.

#### Acceptance Criteria

1. THE Messages Page SHALL import and use the useTranslations hook from the translation provider
2. THE Messages Page SHALL replace all hardcoded English strings with appropriate translation key lookups
3. THE Messages Page SHALL maintain backward compatibility with the English locale
4. THE Messages Page SHALL follow the same translation pattern used by other localized components in the application