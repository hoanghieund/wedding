# Hướng dẫn nhanh cho OpenCode

- **Chạy dự án**: `npm run dev` (khởi động Next.js 16 dev server trên http://localhost:3000).
- **Kiểm tra**: `npm run build`, `npm run lint`, `npx tsc --noEmit` – các lệnh này luôn phải chạy sạch trước khi commit.
- **Thư mục mã**: `src/app/` (App Router), `src/components/sections/` (các UI component), `src/lib/` (logic nghiệp vụ, DB, utils).
- **File không thay**: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `src/lib/db/client.ts`, `prisma/schema.prisma`, `next.config.ts`, `package.json`.
- **Prisma singleton**: dùng `src/lib/db/client.ts` để tạo `PrismaClient` một lần (`globalThis.prismaGlobal`). Các query DB nên import `prisma` từ file này.
- **Biến môi trường**: `.env.example` có `DATABASE_URL`, `ADMIN_SECRET`, `JWT_SECRET`. Không bao giờ commit giá trị thực tế; `.gitignore` đã bỏ qua `.env*`.
- **Chạy Prisma**: dùng `node node_modules/.bin/prisma …` (do RTK hook) thay cho `npx prisma`.
- **Tailwind**: v4 đã được cấu hình; dùng system‑font stack (`--font-serif`, `--font-sans`) và class Tailwind tiêu chuẩn.
- **Kiểm tra lint**: ESLint cấu hình `@next/eslint-plugin-next`; chạy `npm run lint` để đảm bảo không có lỗi.
- **Kiểm tra TypeScript**: dự án ở chế độ `strict`; luôn chạy `npx tsc --noEmit` sau khi thay đổi.
- **Kiểm tra build**: `npm run build` phải hoàn thành không lỗi; nếu có lỗi, kiểm tra lại TypeScript và ESLint trước.
- **Quy tắc commit**: Không commit các file `.env*`, `prisma/schema.prisma` khi chưa có migration; chỉ commit mã nguồn và tài liệu.
- **Thêm tính năng mới**: tạo file/component mới dưới `src/components/sections/` và cập nhật import trong `src/app/page.tsx`; đừng quên cập nhật export nếu cần.
- **Kiểm tra cấu trúc**: `src/lib/` chứa utils, constants (`event-data.ts`), formatters (`date-format.ts`); tuân thủ naming: snake_case cho DB, camelCase cho JS/TS.
- **Debug UI**: nếu component không render, kiểm tra `export default`/`export` đúng, và nhập đúng path (`@/components/...`).
- **Môi trường Vercel**: các biến môi trường được cấu hình trong dashboard; local dev cần sao chép `.env.example` thành `.env.local` với giá trị hợp lệ.
