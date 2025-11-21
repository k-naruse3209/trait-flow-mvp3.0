# Tài Liệu Logic Checkin và Intervention - Requirements

## Giới thiệu

Tài liệu này mô tả chi tiết logic checkin hiện tại và cách hệ thống sinh ra "Intervention" (can thiệp) sau khi người dùng thực hiện checkin. Đây là tài liệu kỹ thuật để hiểu rõ luồng xử lý và các thuật toán được sử dụng trong hệ thống.

## Thuật ngữ

- **Checkin**: Quá trình người dùng ghi lại tâm trạng và mức năng lượng hàng ngày
- **Mood Score**: Điểm tâm trạng từ 1-5 (1: rất tệ, 5: rất tốt)
- **Energy Level**: Mức năng lượng (low/mid/high)
- **Intervention**: Tin nhắn can thiệp được tạo tự động để hỗ trợ người dùng
- **Template Type**: Loại template intervention (compassion/reflection/action)
- **Mood Analytics**: Phân tích dữ liệu tâm trạng để đưa ra insights
- **Fallback Message**: Tin nhắn dự phòng khi AI generation thất bại
- **OpenAI Integration**: Tích hợp AI để tạo tin nhắn cá nhân hóa

## Yêu cầu

### Yêu cầu 1

**User Story:** Là một developer, tôi muốn hiểu rõ luồng xử lý checkin, để có thể maintain và phát triển tính năng này.

#### Tiêu chí chấp nhận

1. WHEN người dùng submit checkin data, THE System SHALL validate mood score trong khoảng 1-5
2. WHEN người dùng submit checkin data, THE System SHALL validate energy level thuộc ['low', 'mid', 'high']
3. WHEN người dùng submit checkin data, THE System SHALL validate free text không vượt quá 280 ký tự
4. WHEN validation thành công, THE System SHALL lưu checkin record vào database
5. WHEN checkin được lưu thành công, THE System SHALL tính toán mood analytics từ 7 checkin gần nhất

### Yêu cầu 2

**User Story:** Là một developer, tôi muốn hiểu thuật toán tính toán mood analytics, để có thể tối ưu hóa và cải thiện độ chính xác.

#### Tiêu chí chấp nhận

1. WHEN tính mood average, THE System SHALL sử dụng tối đa 7 checkin gần nhất
2. WHEN tính mood trend, THE System SHALL so sánh nửa đầu và nửa sau của checkin list
3. WHEN mood difference > 0.3, THE System SHALL đánh dấu trend là 'improving'
4. WHEN mood difference < -0.3, THE System SHALL đánh dấu trend là 'declining'
5. WHEN mood difference trong khoảng [-0.3, 0.3], THE System SHALL đánh dấu trend là 'stable'

### Yêu cầu 3

**User Story:** Là một developer, tôi muốn hiểu logic quyết định có tạo intervention hay không, để có thể điều chỉnh trigger conditions.

#### Tiêu chí chấp nhận

1. WHEN mood average <= 2, THE System SHALL trigger intervention generation
2. WHEN mood trend = 'declining' AND mood average <= 3, THE System SHALL trigger intervention generation
3. WHEN user có >= 3 checkin gần đây, THE System SHALL trigger intervention generation
4. WHEN không có intervention trong cùng ngày, THE System SHALL cho phép tạo intervention mới
5. WHEN đã có intervention trong ngày, THE System SHALL bỏ qua việc tạo intervention

### Yêu cầu 4

**User Story:** Là một developer, tôi muốn hiểu cách chọn template type cho intervention, để có thể tùy chỉnh logic phân loại.

#### Tiêu chí chấp nhận

1. WHEN mood average <= 2.5, THE System SHALL chọn 'compassion' template
2. WHEN mood average trong khoảng (2.5, 3.5], THE System SHALL chọn 'reflection' template
3. WHEN mood average > 3.5, THE System SHALL chọn 'action' template
4. WHEN có personality traits data, THE System SHALL enhance message với personality insights
5. WHEN không có personality traits, THE System SHALL sử dụng base message

### Yêu cầu 5

**User Story:** Là một developer, tôi muốn hiểu cơ chế OpenAI integration và fallback, để có thể troubleshoot khi có lỗi.

#### Tiêu chí chấp nhận

1. WHEN OpenAI API available, THE System SHALL generate personalized intervention message
2. WHEN OpenAI API fails, THE System SHALL sử dụng fallback template message
3. WHEN AI generation thành công, THE System SHALL set fallback flag = false
4. WHEN sử dụng fallback message, THE System SHALL set fallback flag = true
5. WHEN lưu intervention, THE System SHALL include template_type, message_payload, và fallback flag