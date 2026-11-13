---
target: src/app/page.tsx
total_score: 27
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 1
target_identity: "file:/Users/hoanghieu/Documents/MySelf/wedding/src/app/page.tsx"
target_fingerprint: "sha256:6c05acf4b65efb72a7d39976955e07f02cbc029d3177b3a45202a28b3fb99bee"
target_path: /Users/hoanghieu/Documents/MySelf/wedding/src/app/page.tsx
timestamp: 2026-11-13T08-33-05Z
slug: src-app-page-tsx
closed: true
---
Method: dual-agent (A: DesignReviewA · B: DetectorEvidenceB)

## Điểm sức khỏe thiết kế — 27/40, Acceptable

| # | Heuristic | Điểm | Vấn đề chính |
|---|---|---:|---|
| 1 | Trạng thái hệ thống | 3 | Countdown và RSVP có phản hồi; nhạc bật nhưng nút tắt bị ẩn trên mobile khi còn ở Hero. |
| 2 | Khớp đời thực | 2 | Hero nhấn 09:00, trong khi lịch ngày cưới bắt đầu 07:00 ở nhà gái; phạm vi giờ chưa rõ. |
| 3 | Quyền kiểm soát | 2 | “Mở Thiệp” vừa mở trang vừa phát nhạc; không có lựa chọn vào thiệp mà không bật nhạc. |
| 4 | Nhất quán | 3 | Màu và font nhất quán; nhiều lớp card, glow và watermark cạnh tranh nhau. |
| 5 | Ngăn lỗi | 3 | RSVP có ràng buộc và focus lỗi; thông tin nhanh chỉ nêu một trong hai địa điểm. |
| 6 | Nhận diện thay vì ghi nhớ | 3 | Có facts và lối tắt; khách vẫn phải tự nối hai mốc giờ ở các section khác nhau. |
| 7 | Linh hoạt, hiệu quả | 3 | Có lối tắt, keyboard và form tuyến tính; rail mobile dùng icon, cần dựa vào aria-label. |
| 8 | Tối giản, thẩm mỹ | 2 | Bản sắc cưới rõ, nhưng nhiều card/hiệu ứng cùng lúc làm giảm độ tập trung. |
| 9 | Nhận diện và phục hồi lỗi | 3 | Lỗi RSVP hiển thị gần trường và giữ trạng thái nhập; phần logistics cần rõ hơn trước khi khách điền. |
| 10 | Trợ giúp | 3 | FAQ, bản đồ và gợi ý di chuyển có ích; chưa đưa lịch hai nghi lễ lên đường đọc đầu tiên. |
| **Tổng** |  | **27/40** | **Acceptable — 67,5%** |

## Mức độ đặc thù

**LLM assessment:** Trang có chất riêng của cặp đôi: ảnh cưới, hành trình yêu xa, tên và bảng màu navy/champagne. Nhưng IA vẫn là one-page dài; phần chuyện tình đứng trước lịch và địa điểm, trong khi khách cần biết giờ/đường đi trước. Bản sắc mạnh, ưu tiên tác vụ chưa đủ mạnh.

**Quét định lượng:** CLI detector quét route và 14 section components: **0 primary findings, 23 advisory findings**, đều là `design-system-font-size`. Ví dụ `LoveStorySection.tsx:120` (6/8/10rem), `RsvpBand.tsx:94` (watermark 8/14rem), `FooterSection.tsx` (watermark và nhãn 9–10px). Đây là cảnh báo lệch token, không phải lỗi tự động; watermark trang trí có thể là lựa chọn có chủ đích.

Detector trên trang chạy qua Chromium báo **33 anti-patterns**; log chi tiết có 48 entries — số tổng và số log không khớp. Rule chính: `dark-glow` (23), `image-hover-transform` (11), `nested-cards` (4), `gpt-thin-border-wide-shadow` (4), `all-caps-body` (3), `radial-spotlight-glow` (2), `line-length` (1). Glow/spotlight khớp DESIGN.md nên có thể là false positive; cần xem từng selector thay vì coi toàn bộ là lỗi.

**Visual evidence:** Assessment A kiểm tra tab mới ở desktop 1440×900 và mobile 390×844; Hero hiện ở cả hai. Chuyển tới `#schedule` trên mobile cho ảnh chụp chỉ thấy nền navy dù DOM/ARIA vẫn có lịch; chưa xác nhận đây là lỗi bền vững hay ảnh chụp rơi vào lúc animation chưa hiện. Detector B đã preflight và inject thành công trên tab Chromium riêng, nhưng tab headless/ẩn: **không có overlay hiển thị cho người dùng**. Live-server cổng 8400 đã dừng.

## Ấn tượng chung

Đẹp và nhận ra ngay là thiệp cưới của cặp đôi. Điểm yếu lớn nhất: khách phải tự ghép giờ và địa điểm từ Hero, quick facts, timeline; một lần đọc lướt có thể bỏ lỡ lễ 07:00.

## Điểm đang làm tốt

- Tông navy/champagne, ảnh và câu chuyện riêng tạo cảm xúc phù hợp, không giống landing page thương mại.
- Quick facts, lối tắt, lịch trình hai địa điểm, bản đồ và hướng dẫn di chuyển có mặt.
- RSVP có lỗi inline, focus trường sai đầu tiên, trạng thái gửi và xác nhận thành công.

## Vấn đề ưu tiên

1. **[P1] Giờ và địa điểm của hai nghi lễ chưa rõ ngay từ đầu.** Hero ghi Lễ Thành Hôn 09:00; lịch bắt đầu 07:00 ở nhà gái, rồi 09:00 ở nhà trai. Quick facts chỉ nêu “Tư gia nhà trai” dưới nhãn “Địa điểm”. Khách có thể hiểu 09:00 là giờ bắt đầu duy nhất. **Sửa:** hiển thị chuỗi “07:00 — Lễ Vu Quy, nhà gái → 09:00 — Lễ Thành Hôn, nhà trai” ở phần thông tin đầu, nêu rõ mốc nào áp dụng cho khách mời. Nguồn: `event-data.ts:188–205`, `QuickFactsBand.tsx:10–15`. **Lệnh:** `/impeccable clarify`.
2. **[P2] Lịch và chỉ đường bị đẩy xuống sau câu chuyện dài.** Trang đặt `LoveStorySection` trước `information`; story có sáu mốc. Khách đi tìm lịch phải cuộn qua phần cảm xúc trước phần thiết yếu. **Sửa:** đưa đường vào lịch/địa điểm lên sớm hơn hoặc tạo tóm tắt hai nghi lễ sát quick facts; giữ nguyên câu chuyện phía dưới. Nguồn: `src/app/page.tsx:110–128`. **Lệnh:** `/impeccable layout`.
3. **[P2] “Mở Thiệp” tự phát nhạc, nhưng điều khiển nhạc ẩn ở đầu trang mobile.** Nút gọi `audio.play()`; mobile rail bị ẩn khi Hero còn hiện. Người nghe có thể không thấy cách tắt nhạc ngay. **Sửa:** để nhạc opt-in riêng, báo trước nếu mở thiệp sẽ phát nhạc, và luôn cho phép tắt dễ dàng. Nguồn: `EnterInvitationOverlay.tsx:58–68`, `FloatingControls.tsx:11–22, 81–95`. **Lệnh:** `/impeccable onboard`.
4. **[P2] Mốc “Hôm Nay” mâu thuẫn với countdown còn ngày.** Đây là label tĩnh của milestone ngày cưới nên khách đọc trước ngày cưới thấy “hôm nay” sai thời điểm. **Sửa:** đổi thành “Ngày Cưới” hoặc dùng ngày sự kiện thật. Nguồn: `event-data.ts:251–255`. **Lệnh:** `/impeccable clarify`.

## Persona red flags

- **Jordan — khách lần đầu:** đọc “Lễ Thành Hôn 09:00” trước, dễ bỏ lỡ lễ 07:00 tại nhà gái; rail icon-only khó đoán.
- **Riley — người kiểm tra kỹ:** sẽ phát hiện label “Hôm Nay” trong lúc countdown vẫn còn ngày và thấy quick facts chỉ có nhà trai.
- **Casey — khách dùng điện thoại khi di chuyển:** phải cuộn qua story để tới logistics; mở thiệp làm nhạc phát trong khi nút tắt bị ẩn ở Hero.

## Tải nhận thức

**3/8 mục chưa đạt — mức vừa:** chunking (story sáu mốc dài), hierarchy (logistics ở sau story), working memory (phải nhớ/đối chiếu hai mốc 07:00 và 09:00). Các mục còn lại đạt: một CTA RSVP rõ, nhóm thông tin có cấu trúc, form tuyến tính, tối đa bốn lựa chọn cùng lúc và FAQ/gallery mở theo nhu cầu.

## Ghi chú nhỏ

- Caption gallery “Mỗi chuyến đi là một phần ký ức của chúng mình.” đứng tách dưới grid và giữ nguyên khi đổi album; có thể không khớp mọi nhóm ảnh. `GalleryTeaserSection.tsx:236–238`.
- Nhãn vùng gallery dùng `aria-label="Wedding Photo Gallery"` giữa giao diện tiếng Việt. `GalleryTeaserSection.tsx:156–160`.
- Thông tin quà mừng có QR và số tài khoản chọn văn bản được, nhưng không có nút sao chép; QR khó dùng nếu khách xem trên chính điện thoại. `GiftSection.tsx:74–98`.
- Ảnh chụp mobile tại `#schedule` chỉ hiện nền navy; chưa tính là lỗi xác nhận vì DOM vẫn có nội dung và chưa có ảnh sau khi animation ổn định.

## Câu hỏi gợi mở

- Nếu khách chỉ xem màn hình đầu vài giây, họ có phân biệt được mốc 07:00 nhà gái với 09:00 nhà trai không?
- Nhạc nền có thực sự cần tự chạy cùng hành động “Mở Thiệp”, hay nên là lựa chọn riêng?
