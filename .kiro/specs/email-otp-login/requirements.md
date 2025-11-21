# Requirements Document

## Introduction

Tính năng đăng nhập bằng email + OTP cho phép người dùng đăng nhập hoặc đăng ký bằng cách nhập email và mã OTP được gửi qua email. Tính năng này hỗ trợ cả người dùng mới và người dùng đã tồn tại.

## Glossary

- **OTP_System**: Hệ thống xác thực một lần qua email
- **User_Account**: Tài khoản người dùng trong hệ thống
- **Email_Service**: Dịch vụ gửi email OTP thông qua Supabase

## Requirements

### Requirement 1

**User Story:** Là một người dùng mới hoặc đã có tài khoản, tôi muốn nhập email để nhận mã OTP, để tôi có thể đăng nhập hoặc tạo tài khoản mới.

#### Acceptance Criteria

1. WHEN người dùng nhập email hợp lệ và nhấn "Gửi OTP", THE OTP_System SHALL gửi mã OTP 6 chữ số đến email đó
2. WHEN mã OTP được gửi thành công, THE OTP_System SHALL hiển thị form nhập OTP
3. WHEN email chưa tồn tại trong hệ thống, THE OTP_System SHALL cho phép tạo User_Account mới
4. IF email không đúng định dạng, THEN THE OTP_System SHALL hiển thị thông báo "Email không đúng định dạng"

### Requirement 2

**User Story:** Là một người dùng, tôi muốn nhập mã OTP để hoàn tất quá trình xác thực, để tôi có thể truy cập vào ứng dụng.

#### Acceptance Criteria

1. WHEN người dùng nhập mã OTP chính xác, THE OTP_System SHALL xác thực thành công và chuyển hướng đến dashboard
2. WHEN người dùng nhập mã OTP sai, THE OTP_System SHALL hiển thị thông báo lỗi "Mã OTP không chính xác"
3. WHEN mã OTP hết hạn, THE OTP_System SHALL hiển thị thông báo "Mã OTP đã hết hạn, vui lòng yêu cầu mã mới"

### Requirement 3

**User Story:** Là một người dùng, tôi muốn có thể yêu cầu gửi lại mã OTP, để tôi có thể hoàn tất đăng nhập nếu không nhận được email.

#### Acceptance Criteria

1. WHEN người dùng ở bước nhập OTP, THE OTP_System SHALL hiển thị nút "Gửi lại OTP"
2. WHEN người dùng nhấn "Gửi lại OTP", THE OTP_System SHALL gửi mã OTP mới đến email
3. WHILE đang gửi lại OTP, THE OTP_System SHALL hiển thị trạng thái loading