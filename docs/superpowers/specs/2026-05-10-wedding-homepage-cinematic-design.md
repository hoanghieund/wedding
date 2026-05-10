# Wedding Homepage Redesign Spec

**Date:** 2026-05-10  
**Status:** Approved in brainstorming  
**Scope:** Redesign toàn bộ homepage wedding website theo hướng romantic modern, dark dramatic, cinematic chapters.

## 1. Goal

Thiết kế lại homepage hiện tại thành một trải nghiệm mang cảm giác **cinematic drama** với ngôn ngữ thị giác **romantic modern**. Toàn bộ 12 section hiện có vẫn được giữ nguyên về mặt chức năng, nhưng được tái cấu trúc lại về visual system, nhịp chuyển cảnh, typography và hierarchy để tạo cảm giác như đang xem một bộ phim tình yêu cao cấp.

## 2. Core Direction

### Chosen concept
**Cinematic Chapters**

Mỗi section hoạt động như một “chapter” hoặc “scene” trong một bộ phim:
- có opening scene mạnh ở Hero
- có nhịp chuyển mượt giữa các section
- có reveal theo scroll thay vì phơi bày toàn bộ nội dung ngay lập tức
- có một cảnh kết rõ ràng ở RSVP

### Why this direction
- Phù hợp nhất với mục tiêu cảm xúc: **cinematic drama**
- Tận dụng tốt cấu trúc hiện có gồm nhiều section độc lập
- Cho phép giữ các component hiện tại nhưng nâng cấp ngôn ngữ thẩm mỹ thay vì viết lại toàn bộ logic
- Tương thích với gallery slideshow hiện có vốn đã mang tinh thần cinematic

## 3. Visual System

### Color palette
- **Champagne:** `#f4e4c1`
- **Midnight Navy:** `#0a0e27`
- **Deep Slate:** `#1a2332`
- **Rose Gold:** `#d4a574`
- **Cream:** `#fff8ee`

### Color usage rules
- Nền chính ưu tiên Midnight Navy + Deep Slate
- Champagne dùng cho điểm nhấn lớn: tiêu đề, countdown, CTA active states
- Rose Gold dùng cho chi tiết phụ: labels, outlines, glow accents
- Cream dùng cho body text và vùng sáng nhẹ
- Không dùng lại cyan neon hiện tại

### Background treatment
- Toàn trang giữ base dark dramatic
- Hero giữ ảnh `HAR01404.jpg` nhưng xử lý như lớp atmosphere:
  - overlay tối mạnh
  - giảm độ nổi của ảnh
  - tránh cạnh tranh với typography
- Các section còn lại ưu tiên gradient tối, glass layers và subtle glow

## 4. Typography System

### Font roles
- **Display serif:** `Playfair Display`
  - dùng cho section headings, countdown, key titles
- **Poetic script:** `Great Vibes` hoặc giữ `Dancing Script` nếu cần tương thích nhanh
  - dùng cho tên cặp đôi, quote lãng mạn, các điểm nhấn cảm xúc
- **Mono labels:** `JetBrains Mono`
  - dùng cho labels, metadata, timestamps, badges
- **Body serif:** `Cormorant Garamond`
  - dùng cho mô tả dài, love story copy, RSVP supporting text

### Typography rules
- Hero names phải là điểm nhấn lớn nhất trên trang
- Script font chỉ dùng có chủ đích, không lạm dụng trên body copy
- Label uppercase mono giữ nhịp hiện đại, tương phản với phần romantic
- Heading serif phải có khoảng thở rộng, không dày đặc

## 5. Motion and Interaction

### Motion principles
- Motion phải mang cảm giác điện ảnh, không “app-like”
- Ưu tiên few strong moments hơn nhiều micro-animation rời rạc

### Global motion patterns
- Scroll reveal cho từng section
- Stagger reveal cho card grids, timeline items, FAQ items
- Hover glow nhẹ bằng champagne / rose gold
- Fade + slide-up là motion mặc định
- Một số section quan trọng có thêm scale hoặc parallax

### Hero motion sequence
1. Background fade in
2. Particle layer fade in
3. Section label xuất hiện
4. Couple names fade + scale
5. Date xuất hiện
6. Countdown stagger reveal
7. Scroll indicator fade in

### Technical direction for motion
- Ưu tiên CSS + Intersection Observer
- Không thêm animation library nặng nếu không cần thiết
- Nếu đã có pattern animation hiện hữu thì tái sử dụng

## 6. Layout System

### Global layout
- `max-w-6xl` vẫn là container chính
- Một số section được mở rộng gần full-width: Hero, Gallery, Venue map
- Spacing giữa các chapter lớn hơn hiện tại để tạo cảm giác scene transition
- Ưu tiên rhythm xen kẽ giữa các khối dày và khối thoáng

### Chapter rhythm
- Hero: fullscreen
- Quick Facts: compressed info band
- Love Story: vertical narrative section
- Gallery: visual breathing room, gần full-width
- Schedule onward: alternating structured information chapters
- RSVP: ending chapter với trọng tâm centered

## 7. Section-by-Section Design

### 7.1 Hero Section
**Intent:** opening scene của toàn bộ trải nghiệm.

**Keep:** countdown, cặp đôi, ảnh nền hiện có.  
**Change:** toàn bộ màu sắc, hierarchy, rhythm, overlay và animation sequence.

**Design decisions:**
- Fullscreen hero
- 3-layer parallax:
  - ảnh nền tối mờ
  - particle/glow layer
  - text/content layer
- Couple names dùng poetic script lớn
- Date và countdown dùng refined serif
- Scroll indicator ở cuối hero
- CTA nếu giữ lại phải rất tiết chế, không phá mood

### 7.2 Quick Facts Band
**Intent:** chapter thông tin nhanh sau opening scene.

**Design decisions:**
- 4 glass cards inline
- Viền mảnh champagne-tinted
- Label mono uppercase
- Nội dung serif gọn, rõ
- Hover glow nhẹ
- Cards stagger reveal từ trái sang phải

### 7.3 Love Story Section
**Intent:** đưa người xem vào chiều sâu cảm xúc.

**Design decisions:**
- Vertical timeline
- Milestones như cinematic scene cards
- Timeline dots glow theo scroll
- Wedding day milestone nổi bật hơn các mốc khác
- Copy dùng body serif, tránh cảm giác quá tech

### 7.4 Gallery Section
**Intent:** chapter giàu cảm xúc thị giác.

**Design decisions:**
- Giữ `GalleryProvider` + slideshow hiện tại
- Giữ Ken Burns và animation modes
- Thay toàn bộ accent cyan thành champagne / rose gold
- Progress bar, dots, controls, tabs chuyển theo palette mới
- Gallery title mang cảm giác editorial-romantic hơn

### 7.5 Schedule Section
**Intent:** chuyển từ cảm xúc sang thông tin nhưng vẫn giữ mood phim.

**Design decisions:**
- Timeline ngang trên desktop
- Mobile cho phép cuộn ngang hoặc stack hợp lý
- Dot + connector animate tuần tự
- Timestamps dùng mono, event names dùng serif

### 7.6 Wedding Party Section
**Intent:** giới thiệu nhân vật phụ trong “bộ phim”.

**Design decisions:**
- Portrait grid
- Avatar xử lý clean, sang trọng
- Role labels bằng mono uppercase
- Hover glow nhẹ, không quá playful

### 7.7 Gift Section
**Intent:** giữ tính trang trọng, discrete.

**Design decisions:**
- Hai QR glass cards cân đối
- QR trên nền sáng sạch để dễ scan
- Phần thông tin tài khoản dùng mono / serif kết hợp
- Không dùng accent chói hoặc visual gây phân tâm

### 7.8 Venue Section
**Intent:** chapter định hướng không gian thực tế.

**Design decisions:**
- Map gần full-width
- Glass overlay card chứa địa chỉ và link chỉ đường
- Overlay phải readable trên nền map tối
- Nếu map styling có thể chỉnh thì ưu tiên dark mode phù hợp palette

### 7.9 Travel Section
**Intent:** hỗ trợ khách mời nhưng không phá mood tổng thể.

**Design decisions:**
- Tip cards rõ ràng
- Ưu tiên scanability
- Visual nhẹ hơn các chapter cảm xúc

### 7.10 FAQ Section
**Intent:** giải quyết băn khoăn theo cách thanh lịch.

**Design decisions:**
- Accordion tối giản
- Active state có champagne border/accent
- Motion smooth, không giật

### 7.11 RSVP Section
**Intent:** ending scene / final action.

**Design decisions:**
- Form centered như closing frame
- Tiêu đề mềm mại bằng script
- Fields dùng dark glass background, viền champagne nhẹ
- CTA gradient champagne rõ ràng nhưng vẫn refined
- Success state mang cảm giác “đã ghi nhận” sang trọng, không quá vui nhộn

### 7.12 Floating Controls / Overlay
**Intent:** utility layer nhưng không phá cinematic mood.

**Design decisions:**
- Re-skin floating controls theo palette mới
- Tránh cảm giác floating widget kiểu app
- Enter invitation overlay nếu còn giữ phải đồng bộ typography và màu mới

## 8. Component / Code Impact

### Files likely affected
- `src/app/page.tsx`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/QuickFactsBand.tsx`
- `src/components/sections/LoveStorySection.tsx`
- `src/components/sections/GalleryTeaserSection.tsx`
- `src/components/sections/ScheduleSection.tsx`
- `src/components/sections/WeddingPartySection.tsx`
- `src/components/sections/GiftSection.tsx`
- `src/components/sections/VenueSection.tsx`
- `src/components/sections/TravelSection.tsx`
- `src/components/sections/FaqSection.tsx`
- `src/components/sections/RsvpBand.tsx`
- `src/components/sections/FloatingControls.tsx`
- `src/components/sections/EnterInvitationOverlay.tsx`

### Implementation strategy constraints
- Không thay đổi hành vi nghiệp vụ không cần thiết
- Ưu tiên redesign class structure, typography, composition, animation
- Tái sử dụng logic countdown, gallery, RSVP flow đang có nếu còn đúng

## 9. Accessibility and Performance

### Accessibility
- Contrast phải đủ trên nền tối
- Focus states cần rõ, đặc biệt ở RSVP và FAQ
- Countdown, buttons, accordion vẫn keyboard accessible
- Decorative motion không được cản trở đọc nội dung

### Performance
- Không thêm motion quá nặng cho toàn bộ trang
- Hero background image cần được overlay đúng cách để không ảnh hưởng LCP quá mức
- Giữ gallery performant như hiện tại
- Các effect glow / blur phải dùng tiết chế trên mobile

## 10. Testing Expectations

### Visual verification
- Mở homepage thật trong browser sau khi implement
- Kiểm tra golden path trên desktop và mobile width
- Kiểm tra hero, gallery, FAQ, RSVP hoạt động đúng

### Regression checks
- Countdown vẫn chạy đúng
- Gallery controls vẫn hoạt động
- RSVP form vẫn submit đúng flow hiện có
- Map, FAQ, floating controls không bị hỏng layout

## 11. Out of Scope

- Thay đổi dữ liệu sự kiện
- Thay đổi logic RSVP backend/API/Prisma
- Viết lại gallery engine
- Thêm feature mới ngoài redesign UI/UX hiện có

## 12. Final Approved Direction

Homepage sẽ được redesign theo hướng **Cinematic Chapters** với:
- cảm xúc **cinematic drama**
- palette **Champagne & Midnight Navy**
- typography **Poetic Script + Refined Serif**
- hero dùng **ảnh nền hiện tại nhưng làm mờ/tối để tạo atmosphere**
- toàn bộ 12 section giữ chức năng nhưng thay đổi mạnh về visual language, hierarchy và motion
