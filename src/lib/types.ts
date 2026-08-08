export type CartLine = {
  id: string; // menu item id
  name: string;
  price: number;
  qty: number;
  image?: string;
  locationSlug: string;
};

export type PickupOrder = {
  id: string;
  createdAt: string;
  locationSlug: string;
  lines: CartLine[];
  subtotal: number;
  tax: number;
  total: number;
  status: "placed" | "preparing" | "ready" | "picked-up";
  customerEmail?: string;
  customerName?: string;
};

export type GiftCard = {
  code: string;
  amount: number;
  balance: number;
  purchaserEmail: string;
  recipientEmail: string;
  recipientName?: string;
  message?: string;
  createdAt: string;
};
