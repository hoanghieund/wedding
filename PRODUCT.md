# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Gia đình, bạn bè và người thân của cô dâu chú rể. Họ truy cập chủ yếu bằng điện thoại để xem thông tin lễ cưới, lên kế hoạch di chuyển và xác nhận tham dự.

## Product Purpose

Cung cấp thiệp mời trực tuyến với thông tin lễ cưới và công cụ RSVP để khách mời dễ dàng nắm lịch trình, địa điểm và phản hồi tham dự.

## Operating Context

Khách mời xem trang web trên thiết bị di động trước ngày cưới để nắm thông tin, tìm đường và gửi RSVP; trong ngày cưới, họ dùng lịch trình và chỉ đường để đến các địa điểm tổ chức.

## Capabilities and Constraints

- Trang công khai, ưu tiên truy cập trên di động; trình bày câu chuyện, lịch trình, địa điểm và chỉ đường, thư viện ảnh, thông tin quà mừng, FAQ và thông tin hữu ích.
- RSVP thu thập tên khách, trạng thái tham dự, số người và lời nhắn; dữ liệu được lưu vào Google Sheets.
- Phạm vi hiện tại không có cơ sở dữ liệu riêng, trang quản trị hoặc xác thực quản trị.
- Nội dung sự kiện và cấu hình Google Sheets phải giữ chính xác; không tự tạo thông tin lễ cưới hoặc thay đổi dữ kiện thật.

## Brand Commitments

- Tên cặp đôi: Hoàng Hiếu & Kim Liên.
- Tính cách thương hiệu đã ghi nhận: lãng mạn, sang trọng, ấm áp.

## Evidence on Hand

- Mã nguồn chứa tên cặp đôi, thời gian và lịch trình, thông tin hai địa điểm cùng liên kết bản đồ, nội dung câu chuyện/FAQ/di chuyển/quà mừng, ảnh và nhạc nền.
- RSVP dùng Google Sheets; biến môi trường bắt buộc và lệnh kiểm tra API có Sheets mock nằm trong `README.md`. Bài kiểm tra không ghi dữ liệu vào bảng tính.
- Chưa ghi nhận testimonial, số liệu sử dụng hoặc bằng chứng bên ngoài khác.

## Product Principles

- Giúp khách tìm nhanh lịch trình, địa điểm và đường đi.
- Làm RSVP thành tác vụ trọng tâm, dễ hoàn tất trên điện thoại.
- Chỉ trình bày dữ kiện sự kiện đã được xác nhận.

## Accessibility & Inclusion

- Văn bản đạt tương phản WCAG AA tối thiểu 4.5:1.
- Tôn trọng tùy chọn giảm chuyển động của hệ điều hành.
