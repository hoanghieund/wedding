type VietQrImageInput = {
  bankId: string;
  accountNumber: string;
  accountName: string;
  transferNote: string;
  template?: "compact" | "compact2" | "qr_only" | "print";
};

export function buildVietQrImageUrl({
  bankId,
  accountNumber,
  accountName,
  transferNote,
  template = "compact2",
}: VietQrImageInput) {
  const params = `addInfo=${encodeURIComponent(transferNote)}&accountName=${encodeURIComponent(accountName)}`;

  return `https://img.vietqr.io/image/${bankId}-${accountNumber}-${template}.png?${params}`;
}
