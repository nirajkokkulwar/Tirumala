export type UserRole = 'CUSTOMER' | 'STAFF' | 'ADMIN' | 'OWNER';

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  rewardCoins: number;
  memberTier: 'Classic' | 'Silver' | 'Royal Gold' | 'Heritage Club';
  joinedDate: string;
}

export type ClothingCategory = 'women' | 'men' | 'kids';

export type ClothingOccasion = 'wedding' | 'festive' | 'traditional' | 'family-function' | 'casual' | 'formal';

export type ClothingStyle = 'traditional' | 'royal-ethnic' | 'festive' | 'modern-ethnic' | 'casual-ethnic' | 'handloom';

export interface Product {
  id: string;
  name: string;
  category: ClothingCategory;
  subcategory: string;
  gender: 'men' | 'women' | 'boys' | 'girls' | 'unisex';
  price: number;
  originalPrice?: number;
  fabric: string;
  color: string;
  availableSizes: string[];
  style: ClothingStyle;
  occasion: ClothingOccasion[];
  inStock: boolean;
  storeLocation: string; // e.g., 'Section A - Kanchipuram Silk Wardrobe'
  description: string;
  careInstructions: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  tags: string[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
}

export type ItemPrepStatus = 'PREPARING' | 'READY' | 'UNAVAILABLE';

export interface SavedVisitItem {
  id: string;
  userId: string;
  productId: string;
  product: Product;
  selectedSize?: string;
  selectedColor?: string;
  customerNote?: string;
  appointmentId?: string; // linked appointment
  preparationStatus: ItemPrepStatus;
  staffAlternativeNote?: string;
  createdAt: string;
}

export type VisitStatus = 'PENDING' | 'PREPARING' | 'READY' | 'ARRIVED' | 'COMPLETED' | 'CANCELLED';

export interface Appointment {
  id: string;
  userId: string;
  customerName: string;
  customerPhone: string;
  date: string; // e.g., '2026-09-19'
  timeSlot: string; // e.g., '5:30 PM'
  status: VisitStatus;
  visitNotes?: string;
  budgetRange?: string;
  savedItemIds: string[];
  inspirationRequestId?: string;
  assignedStylist?: string;
  createdAt: string;
  arrivedAt?: string;
  completedAt?: string;
  purchaseTotal?: number;
  coinsEarned?: number;
}

export type InspirationStatus = 'PENDING' | 'REVIEWING' | 'PREPARING' | 'READY' | 'COMPLETED' | 'DECLINED';

export interface InspirationRequest {
  id: string;
  userId: string;
  customerName: string;
  customerPhone: string;
  imageUrl: string;
  category: ClothingCategory;
  gender: string;
  style: string;
  approxBudget: string;
  preferredColor: string;
  description: string;
  preferredVisitDate?: string;
  appointmentId?: string;
  status: InspirationStatus;
  staffNotes?: string; // Private staff-only note
  customerMessage?: string; // Customer-friendly status message
  createdAt: string;
  updatedAt: string;
}

export interface StyleAssistantQuery {
  rawQuery: string;
  parsedParams: {
    category?: ClothingCategory;
    gender?: string;
    style?: string;
    occasion?: string;
    budgetMin?: number;
    budgetMax?: number;
    color?: string;
    fabric?: string;
    ageGroup?: string;
  };
  explanation: string;
  matchingProducts: Product[];
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'appointment' | 'inspiration' | 'preparation' | 'rewards' | 'system';
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}

export interface RewardTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'earned' | 'redeemed';
  description: string;
  date: string;
  appointmentId?: string;
}
