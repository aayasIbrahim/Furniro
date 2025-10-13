export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  imageUrl: string;
  badge?: string; // e.g. "-30%" or "New"
  isFeatured: boolean;
  createdAt?: string;
  updatedAt?: string;
}