---
name: Wedding Site
description: Midnight Champagne & Starry Sky - A romantic, elegant wedding invitation and RSVP portal.
colors:
  primary: "#f4e4c1" # Champagne Shimmer
  secondary: "#d4a574" # Warm Bronze
  neutral-bg: "#0a0e27" # Midnight Navy
  neutral-bg-elevated: "#1a2332"
  neutral-bg-deep: "#101728"
  neutral-text: "#fff8ee" # Warm Silk White
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2.5rem, 6vw, 5rem)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: "4px"
  md: "8px"
  lg: "16px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.sm}"
    padding: "10px 24px"
  button-primary-hover:
    backgroundColor: "{colors.secondary}"
---

# Design System: Wedding Site

## 1. Overview

**Creative North Star: "Midnight Champagne & Starry Sky"**

Một phong cách thiết kế lãng mạn, sang trọng và giàu cảm xúc dành cho trang thông tin lễ cưới. Hệ thống kết hợp giữa sắc xanh sâu thẳm của bầu trời đêm (Midnight Navy) làm nền và ánh vàng champagne lung linh, ấm áp làm điểm nhấn. Typography mang hơi hướng cổ điển, tao nhã với sự tương phản cao giữa tiêu đề Serif trang trọng và chữ viết tay mềm mại.

**Key Characteristics:**
- **Sự tương phản lung linh**: Ánh vàng champagne nổi bật trên nền đêm tối sâu thẳm, tạo cảm giác sang trọng, ấm cúng.
- **Tính tối giản tinh tế**: Viền siêu mỏng, bo góc nhẹ nhàng, tạo cảm giác cao cấp giống như một tấm thiệp mời in tay.
- **Hòa quyện tự nhiên**: Các hiệu ứng chuyển động mượt mà nhẹ nhàng như nhịp thở, tuyết rơi hoặc hạt lấp lánh (particles) tạo chiều sâu.

## 2. Colors

Bảng màu mang sắc đêm lãng mạn kết hợp cùng ánh kim champagne ấm áp.

### Primary
- **Champagne Shimmer** (#f4e4c1 / oklch(91.7% 0.057 85.8)): Màu nhấn chính, dùng cho các nút quan quan trọng, tiêu đề chính, hoặc các chi tiết lấp lánh cần sự chú ý lớn nhất.

### Secondary
- **Warm Bronze** (#d4a574 / oklch(74.6% 0.106 75.9)): Màu nhấn phụ, dùng cho các đường viền nhẹ, icon, tiêu đề phụ và văn bản nhấn nhẹ.

### Neutral
- **Midnight Navy** (#0a0e27 / oklch(14.8% 0.046 268.4)): Màu nền cơ bản, mang chiều sâu của bầu trời đêm huyền ảo.
- **Navy Elevated** (#1a2332 / oklch(22.8% 0.038 259.5)): Màu nền cho các phần nổi lên hoặc các thẻ nội dung (cards).
- **Navy Deep** (#101728 / oklch(17.9% 0.034 263.2)): Màu nền phụ hoặc nền sâu hơn của các dải thông tin.
- **Warm Silk White** (#fff8ee / oklch(98.1% 0.015 88.5)): Màu chữ chính, có sắc ấm nhẹ của lụa để tránh chói trên nền tối.

### Named Rules
**The Contrast Rule.** Mọi văn bản chính phải đạt độ tương phản tối thiểu 4.5:1 so với nền. Không sử dụng màu xám nhạt khó đọc trên nền tối.

## 3. Typography

**Display Font:** Playfair Display, Georgia, serif
**Body Font:** Cormorant Garamond, Georgia, serif
**Script Font:** Great Vibes, Dancing Script, cursive

**Character:** Tiêu đề Playfair Display mang phong cách cổ điển, sang trọng, kết hợp với Cormorant Garamond làm font chữ body cực kỳ thanh lịch và Great Vibes tạo điểm nhấn lãng mạn cho các đề mục đặc biệt hoặc lời mở đầu.

### Hierarchy
- **Display** (Regular, clamp(2.5rem, 6vw, 5rem), 1.2): Dùng cho tiêu đề lớn trang bìa (Hero title), tên cô dâu chú rể.
- **Headline** (Regular, 2.25rem, 1.3): Dùng cho tiêu đề các phần lớn (About, Venue, RSVP).
- **Title** (Medium, 1.25rem, 1.4): Dùng cho tiêu đề các thẻ con hoặc tiểu mục nhỏ.
- **Body** (Regular, 1.125rem, 1.6): Dùng cho các đoạn văn bản dài, thông tin giới thiệu. Giới hạn độ dài dòng từ 65–75ch để dễ đọc.
- **Label** (Medium, 0.875rem, normal, uppercase, tracked): Dùng cho các thẻ nhỏ, nhãn đi kèm thông tin chi tiết.

## 4. Elevation

Hệ thống sử dụng triết lý phân lớp màu sắc tối (Tonal Layering) và hiệu ứng phát sáng nhẹ (Soft Glow) thay vì đổ bóng cứng truyền thống để mô phỏng ánh sáng phản chiếu lung linh trong đêm.

### Shadow Vocabulary
- **Soft Glow** (`box-shadow: 0 18px 60px rgba(212, 165, 116, 0.18)`): Tạo hiệu ứng tỏa sáng ấm áp xung quanh các thẻ nội dung khi di chuột hoặc làm nổi bật các thành phần đặc biệt.

## 5. Components

### Buttons
- **Shape:** Bo góc nhẹ nhàng (4px / sm)
- **Primary:** Nền màu Champagne Shimmer (#f4e4c1), chữ màu Midnight Navy (#0a0e27), padding 10px 24px.
- **Hover / Focus:** Chuyển màu nền sang Warm Bronze (#d4a574) mượt mà trong 300ms, nâng nhẹ hoặc tỏa sáng dịu (shadow-glow-soft).

### Cards / Containers
- **Corner Style:** Bo góc vừa phải (8px / md)
- **Background:** Sử dụng nền Navy Elevated (#1a2332) kết hợp với viền mỏng mềm mại (`border: 1px solid rgba(244, 228, 193, 0.14)`).
- **Shadow Strategy:** Mặc định phẳng, tỏa sáng nhẹ (shadow-glow-soft) khi hover hoặc kích hoạt.

### Inputs / Fields
- **Style:** Nền tối trong suốt, viền mỏng Champagne nhạt, bo góc nhẹ.
- **Focus:** Viền chuyển sang màu Champagne Shimmer rõ hơn, đi kèm viền phát sáng nhẹ.

## 6. Do's and Don'ts

### Do:
- **Do** Đảm bảo văn bản chính luôn sử dụng màu Warm Silk White để có độ tương phản xuất sắc.
- **Do** Tận dụng khoảng trống lớn (white space) giữa các phần để thiết kế có nhịp điệu và cảm giác sang trọng.
- **Do** Sử dụng font chữ Great Vibes một cách có chọn lọc (chỉ làm chữ ký hoặc chữ trang trí) để không làm giảm khả năng đọc.

### Don't:
- **Don't** Sử dụng viền viền màu nổi bật ở một bên (side-stripe borders) làm điểm nhấn cho các card thông tin.
- **Don't** Sử dụng hiệu ứng chữ gradient (gradient text).
- **Don't** Lạm dụng glassmorphism quá đà trên toàn bộ trang web. Chỉ sử dụng cho thanh điều hướng cố định (sticky nav).
