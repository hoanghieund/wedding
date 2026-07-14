# Wedding UI P1 Remediation Design

## Scope

Sửa 7 finding P1 từ UI audit ngày 2026-07-14. Giữ nguyên nội dung tiếng Việt, palette midnight/champagne, API RSVP và cấu trúc component hiện tại. Không xử lý P2/P3 trong pass này.

## Goals

- Invitation overlay thao tác được ở `812×375` landscape.
- Hero không cắt tên hoặc event details ở landscape.
- Audio không tải trước user gesture.
- RSVP field errors từ API hiển thị đúng field, có semantics và focus recovery.
- Invitation/lightbox modal cô lập background khỏi accessibility tree/tab order.
- Section headings dùng đúng Playfair display token.
- OG image đồng bộ brand live và DESIGN.md.

## Design

### Responsive overlay and hero

Giữ `EnterInvitationOverlay` hiện tại. Outer dialog dùng `min-h-dvh`, safe vertical padding và vùng nội dung có `max-h-dvh overflow-y-auto`; không dùng `overflow-hidden` để khóa toàn bộ nội dung. Hero giữ background crop nhưng cho phép content reflow theo chiều cao landscape; tên dùng scale fluid với ceiling không vượt 6rem ở layout landscape. Desktop composition không đổi.

### Audio

Đổi `<audio preload="auto">` thành `preload="none"`. Chỉ `handleOpen` hoặc control click gọi `play()`. Không tự gọi play từ mount/effect.

### RSVP errors

Mở rộng client result type để nhận `fieldErrors`. Duy trì summary `role="alert"`, thêm error node id ổn định cho từng field, `aria-invalid` và `aria-describedby`. Khi response lỗi, lưu map field errors và focus field đầu tiên theo thứ tự form. Error server không thay đổi.

### Modal isolation

Khi invitation hoặc lightbox mở, đánh dấu page background inert/aria-hidden; modal subtree vẫn interactive. Khi đóng, khôi phục giá trị trước đó và focus về trigger. Không đổi keyboard semantics hiện có.

### Typography

Đổi `.chapter-title` sang `var(--font-display-serif)`, đúng token được khai báo trong `layout.tsx` và DESIGN.md.

### OG brand

Đổi palette OG từ cream/pink/purple sang semantic midnight/champagne values tương ứng live UI. Giữ solid text, contrast AA và kích thước metadata hiện tại. Dùng font hierarchy gần với display/body brand trong giới hạn `next/og`.

## Acceptance criteria

1. Browser `812×375`: dialog `scrollHeight <= viewport` hoặc nút mở nằm hoàn toàn trong viewport; click mở thành công.
2. Browser `812×375` sau mở: tên cô dâu/chú rể và event details visible; không bị cắt bởi hero overflow.
3. New page trước click không có resource `wedding-music.mp3`; click nhạc/open mới phát.
4. Mock/API `{ok:false, fieldErrors}` hiển thị lỗi cạnh field, `aria-invalid=true`, `aria-describedby` đúng, focus field đầu tiên.
5. Invitation/lightbox mở: background không inert=false/không xuất hiện trong tab/accessibility tree; đóng trả focus và body overflow.
6. Computed `.chapter-title` dùng Playfair Display.
7. OG source dùng midnight/champagne palette và không còn literal pink/light palette.
8. Existing tests, TypeScript, lint, build pass.
9. Browser screenshots và metrics được chụp lại; chạy lại Impeccable audit.

## Non-goals

- Touch target P2, muted contrast P2, custom radios, FAQ hidden semantics.
- Xóa toàn bộ eyebrow/card/glass/animation P2.
- Thay đổi RSVP API/schema hoặc dữ liệu sự kiện.
