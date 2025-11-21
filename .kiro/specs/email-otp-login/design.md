# Design Document

## Overview

Tính năng đăng nhập bằng email + OTP sẽ được cải thiện để hỗ trợ cả người dùng mới và cũ, giải quyết lỗi "Signups not allowed for otp" và cung cấp trải nghiệm người dùng tốt hơn. Hệ thống sử dụng Next.js và Supabase với cấu hình OTP được tối ưu hóa.

## Architecture

### Tech Stack
- **Frontend**: Next.js 15 với React 19
- **Authentication**: Supabase Auth với OTP (cấu hình cho phép signup)
- **UI Components**: Radix UI + Tailwind CSS (đã có sẵn)
- **State Management**: React useState hooks

### Flow Diagram
```
User Input Email → Supabase OTP (Allow Signup) → Email Sent → User Input OTP → Authentication Success → Dashboard
                                                            ↓
                                                    Resend OTP Option
```

### Root Cause Analysis
Lỗi "Signups not allowed for otp" xảy ra vì:
1. Supabase project settings có thể tắt OTP signup
2. Code hiện tại sử dụng `shouldCreateUser: false`
3. Cần cấu hình Supabase để cho phép OTP authentication

## Components and Interfaces

### 1. Enhanced OTP Login Form Component
**File**: `components/otp-login-form.tsx`

**Props Interface**:
```typescript
interface OtpLoginFormProps {
  className?: string;
}
```

**Enhanced State Management**:
```typescript
interface OtpLoginState {
  email: string;
  otp: string;
  step: 'email' | 'otp';
  isLoading: boolean;
  isResending: boolean;
  error: string | null;
  canResend: boolean;
  resendCountdown: number;
}
```

**Key Changes**:
- Remove `shouldCreateUser: false` to allow new user registration
- Add resend OTP functionality with countdown timer
- Improve error handling for different scenarios
- Add loading states for both send and resend operations

### 2. Login Page Integration
**File**: `app/auth/login/page.tsx`

Đã được tích hợp với OTP login option.

### 3. Supabase Client Integration
**File**: `lib/supabase/client.ts`

**Updated OTP Methods**:
```typescript
// Allow both existing and new users
await supabase.auth.signInWithOtp({
  email: email,
  options: {
    shouldCreateUser: true, // KEY CHANGE: Allow new user creation
  },
});

// Verify OTP (unchanged)
await supabase.auth.verifyOtp({
  email: email,
  token: otp,
  type: 'email',
});
```

## Data Models

### OTP Request
```typescript
interface OtpRequest {
  email: string;
  type: 'email';
}
```

### OTP Verification
```typescript
interface OtpVerification {
  email: string;
  token: string;
  type: 'email';
}
```

## Error Handling

### Error Types & Solutions
1. **Invalid Email**: Email không đúng định dạng
   - Solution: Client-side validation với regex
2. **OTP Disabled Error**: "Signups not allowed for otp"
   - Solution: Set `shouldCreateUser: true` và kiểm tra Supabase settings
3. **Invalid OTP**: Mã OTP không chính xác hoặc hết hạn
   - Solution: Hiển thị lỗi rõ ràng và cho phép gửi lại
4. **Network Error**: Lỗi kết nối mạng
   - Solution: Retry mechanism và thông báo lỗi thân thiện
5. **Rate Limiting**: Gửi OTP quá nhiều lần
   - Solution: Countdown timer và giới hạn số lần gửi

### Error Display Strategy
- Hiển thị thông báo lỗi dưới form input
- Sử dụng màu đỏ (`text-red-500`) theo design system hiện tại
- Thông báo lỗi bằng tiếng Việt với ngữ cảnh rõ ràng
- Auto-clear error khi user thay đổi input

## Testing Strategy

### Unit Testing
- Test component rendering với các state khác nhau
- Test form validation
- Test error handling

### Integration Testing  
- Test flow hoàn chỉnh từ gửi OTP đến đăng nhập thành công
- Test với Supabase client

### Manual Testing
- Test với email thật để kiểm tra việc gửi OTP
- Test trên các trình duyệt khác nhau
- Test responsive design trên mobile

## Implementation Notes

### Critical Supabase Configuration Fixes
1. **Enable OTP Signup**: Trong Supabase Dashboard → Authentication → Settings
   - Enable "Enable email confirmations"
   - Enable "Enable phone confirmations" (nếu cần)
   - Đảm bảo "Disable signup" KHÔNG được bật
2. **Email Templates**: Cấu hình email templates trong Supabase dashboard
3. **SMTP Settings**: Kiểm tra SMTP settings cho việc gửi email
4. **Redirect URLs**: Cấu hình redirect URLs cho production

### Code Changes Required
1. **Remove shouldCreateUser: false**: Thay đổi thành `shouldCreateUser: true`
2. **Add Resend Functionality**: Implement countdown timer và resend logic
3. **Improve Error Handling**: Handle specific error cases từ Supabase
4. **Add Loading States**: Separate loading cho send và resend operations

### UI/UX Enhancements - Modern Design
- **Modern OTP Input**: Individual input boxes cho từng chữ số OTP (6 ô riêng biệt)
- **Smooth Animations**: Fade transitions giữa các bước, loading animations
- **Visual Feedback**: Success/error states với icons và colors
- **Progressive Enhancement**: 
  - Email step: Clean, minimal với focus states
  - OTP step: Prominent digit inputs với auto-advance
- **Countdown timer**: Circular progress indicator cho resend OTP (60 giây)
- **Micro-interactions**: 
  - Button hover effects
  - Input focus animations
  - Success checkmark animation
- **Modern Typography**: Improved hierarchy với font weights và spacing
- **Enhanced Loading States**: Skeleton loaders và spinner animations
- **Responsive Design**: Mobile-first với touch-friendly targets
- **Auto-focus và Auto-advance**: Focus vào OTP input đầu tiên, tự động chuyển sang ô tiếp theo

### Security & Performance
- Rate limiting được handle bởi Supabase
- OTP expiry: 1 giờ (Supabase default)
- Client-side validation để giảm server calls
- Secure OTP storage và transmission qua Supabase