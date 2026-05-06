/**
 * Định dạng chuỗi ngày ISO sang định dạng dễ đọc cho con người bằng tiếng Việt.
 * Ví dụ: "Chủ Nhật, ngày 22 tháng 11, 2026"
 */
export function formatEventDate(isoString: string): string {
  const date = new Date(isoString);
  
  return date.toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Định dạng thời gian sang định dạng ngắn gọn (HH:MM).
 */
export function formatTime(isoString: string): string {
  const date = new Date(isoString);
  
  return date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
