export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatPhoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d]/g, "")}`;
}
