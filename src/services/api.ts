import {
  AppNotification,
  Appointment,
  InspirationRequest,
  Product,
  RewardTransaction,
  SavedVisitItem,
  StyleAssistantQuery,
  UserProfile,
  UserRole
} from '../types';

export const api = {
  // Auth
  async getMe(): Promise<UserProfile> {
    const res = await fetch('/api/auth/me');
    if (!res.ok) throw new Error('Failed to fetch user');
    return res.json();
  },

  async switchRole(role: UserRole): Promise<{ success: boolean; user: UserProfile }> {
    const res = await fetch('/api/auth/switch-role', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role })
    });
    if (!res.ok) throw new Error('Failed to switch role');
    return res.json();
  },

  // Products
  async getProducts(params?: {
    category?: string;
    gender?: string;
    style?: string;
    occasion?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    inStock?: boolean;
  }): Promise<Product[]> {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.gender) query.append('gender', params.gender);
    if (params?.style) query.append('style', params.style);
    if (params?.occasion) query.append('occasion', params.occasion);
    if (params?.minPrice) query.append('minPrice', params.minPrice.toString());
    if (params?.maxPrice) query.append('maxPrice', params.maxPrice.toString());
    if (params?.search) query.append('search', params.search);
    if (params?.inStock) query.append('inStock', 'true');

    const res = await fetch(`/api/products?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  async getProduct(id: string): Promise<Product> {
    const res = await fetch(`/api/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    return res.json();
  },

  async getRecommendations(productId: string): Promise<Product[]> {
    const res = await fetch(`/api/recommendations/${productId}`);
    if (!res.ok) throw new Error('Failed to fetch recommendations');
    return res.json();
  },

  // Style Assistant
  async searchStyleAssistant(query: string): Promise<StyleAssistantQuery> {
    const res = await fetch('/api/style-assistant/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    if (!res.ok) throw new Error('Failed to query style assistant');
    return res.json();
  },

  // Save for Visit
  async getSavedVisitItems(): Promise<SavedVisitItem[]> {
    const res = await fetch('/api/visits/saved-items');
    if (!res.ok) throw new Error('Failed to fetch saved visit items');
    return res.json();
  },

  async saveForVisit(payload: {
    productId: string;
    selectedSize?: string;
    customerNote?: string;
    appointmentId?: string;
  }): Promise<SavedVisitItem> {
    const res = await fetch('/api/visits/saved-items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to save product for visit');
    return res.json();
  },

  async removeSavedVisitItem(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/visits/saved-items/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to remove saved visit item');
    return res.json();
  },

  async moveVisitItemToWishlist(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/visits/saved-items/${id}/move-to-wishlist`, {
      method: 'POST'
    });
    if (!res.ok) throw new Error('Failed to move item to wishlist');
    return res.json();
  },

  async moveWishlistItemToVisit(productId: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/wishlist/${productId}/move-to-visit`, {
      method: 'POST'
    });
    if (!res.ok) throw new Error('Failed to move item to visit');
    return res.json();
  },

  // Wishlist
  async getWishlist(): Promise<Product[]> {
    const res = await fetch('/api/wishlist');
    if (!res.ok) throw new Error('Failed to fetch wishlist');
    return res.json();
  },

  async toggleWishlist(productId: string): Promise<{ inWishlist: boolean }> {
    const res = await fetch('/api/wishlist/toggle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId })
    });
    if (!res.ok) throw new Error('Failed to toggle wishlist');
    return res.json();
  },

  // Appointments
  async getAppointments(): Promise<Appointment[]> {
    const res = await fetch('/api/appointments');
    if (!res.ok) throw new Error('Failed to fetch appointments');
    return res.json();
  },

  async getPastVisits(): Promise<Appointment[]> {
    const res = await fetch('/api/appointments/history');
    if (!res.ok) throw new Error('Failed to fetch visit history');
    return res.json();
  },

  async createAppointment(payload: {
    date: string;
    timeSlot: string;
    visitNotes?: string;
    budgetRange?: string;
    selectedItemIds?: string[];
    inspirationRequestId?: string;
  }): Promise<Appointment> {
    const res = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to create appointment');
    return res.json();
  },

  async updateAppointmentStatus(id: string, status: string): Promise<Appointment> {
    const res = await fetch(`/api/appointments/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Failed to update status');
    return res.json();
  },

  async getAppointmentPreparation(id: string) {
    const res = await fetch(`/api/appointments/${id}/preparation`);
    if (!res.ok) throw new Error('Failed to fetch preparation details');
    return res.json();
  },

  // Staff Operations
  async updateVisitItemStatus(id: string, status: string, alternativeNote?: string): Promise<SavedVisitItem> {
    const res = await fetch(`/api/admin/visit-items/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, alternativeNote })
    });
    if (!res.ok) throw new Error('Failed to update item status');
    return res.json();
  },

  async recordStorePurchase(appointmentId: string, amount: number) {
    const res = await fetch(`/api/admin/appointments/${appointmentId}/record-purchase`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount })
    });
    if (!res.ok) throw new Error('Failed to record purchase');
    return res.json();
  },

  // Inspiration Requests
  async getInspirationRequests(): Promise<InspirationRequest[]> {
    const res = await fetch('/api/inspiration');
    if (!res.ok) throw new Error('Failed to fetch inspiration requests');
    return res.json();
  },

  async createInspirationRequest(payload: {
    imageUrl?: string;
    category: string;
    gender: string;
    style: string;
    approxBudget: string;
    preferredColor: string;
    description: string;
    preferredVisitDate?: string;
    appointmentId?: string;
  }): Promise<InspirationRequest> {
    const res = await fetch('/api/inspiration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to submit inspiration request');
    return res.json();
  },

  async updateInspirationStatus(id: string, payload: {
    status?: string;
    staffNotes?: string;
    customerMessage?: string;
  }): Promise<InspirationRequest> {
    const res = await fetch(`/api/admin/inspiration/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to update inspiration status');
    return res.json();
  },

  // Rewards
  async getRewards(): Promise<{ balance: number; tier: string; history: RewardTransaction[] }> {
    const res = await fetch('/api/rewards');
    if (!res.ok) throw new Error('Failed to fetch rewards');
    return res.json();
  },

  // Notifications
  async getNotifications(): Promise<AppNotification[]> {
    const res = await fetch('/api/notifications');
    if (!res.ok) throw new Error('Failed to fetch notifications');
    return res.json();
  },

  async markNotificationRead(id: string): Promise<void> {
    await fetch(`/api/notifications/${id}/read`, { method: 'PATCH' });
  },

  async markAllNotificationsRead(): Promise<void> {
    await fetch('/api/notifications/mark-all-read', { method: 'POST' });
  }
};
