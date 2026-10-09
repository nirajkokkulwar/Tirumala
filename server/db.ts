import { INITIAL_PRODUCTS } from '../src/data/catalog';
import {
  AppNotification,
  Appointment,
  InspirationRequest,
  Product,
  RewardTransaction,
  SavedVisitItem,
  UserProfile,
  UserRole
} from '../src/types';

export class BoutiqueDatabase {
  users: UserProfile[] = [
    {
      id: 'user-rahul',
      name: 'Rahul Sharma',
      phone: '+91 99805 46374',
      email: 'rahul.sharma@example.com',
      role: 'CUSTOMER',
      rewardCoins: 340,
      memberTier: 'Silver',
      joinedDate: '2024-03-12'
    },
    {
      id: 'user-priya-staff',
      name: 'Priya Sundaram (Draper)',
      phone: '+91 86604 91825',
      email: 'concierge@tirumalacloth.in',
      role: 'STAFF',
      rewardCoins: 500,
      memberTier: 'Royal Gold',
      joinedDate: '2022-01-10'
    },
    {
      id: 'user-shiva-mgmt',
      name: 'Shiva Kokkulwar (Business Mgmt)',
      phone: '+91 86604 91825',
      email: 'shiva@tirumalacloth.in',
      role: 'ADMIN',
      rewardCoins: 1200,
      memberTier: 'Heritage Club',
      joinedDate: '2020-05-15'
    },
    {
      id: 'user-srinivas-founder',
      name: 'Srinivas Kokkulwar (Founder)',
      phone: '+91 99805 46374',
      email: 'srinivas@tirumalacloth.in',
      role: 'OWNER',
      rewardCoins: 5000,
      memberTier: 'Heritage Club',
      joinedDate: '1984-10-24'
    }
  ];

  currentUser: UserProfile = this.users[0]; // defaults to Rahul (CUSTOMER)

  products: Product[] = [...INITIAL_PRODUCTS];

  wishlist: { id: string; userId: string; productId: string; addedAt: string }[] = [
    { id: 'w-1', userId: 'user-rahul', productId: 'prod-1', addedAt: '2026-09-10T10:00:00Z' },
    { id: 'w-2', userId: 'user-rahul', productId: 'prod-4', addedAt: '2026-09-11T14:30:00Z' }
  ];

  appointments: Appointment[] = [
    {
      id: 'apt-101',
      userId: 'user-rahul',
      customerName: 'Rahul Sharma',
      customerPhone: '+91 98450 23145',
      date: 'Upcoming Saturday',
      timeSlot: '5:30 PM',
      status: 'PREPARING',
      visitNotes: 'Looking for sister’s wedding reception wear. Prefer breathable fabrics with elegant zari work.',
      budgetRange: '₹2,000–₹3,000',
      savedItemIds: ['sv-1', 'sv-2', 'sv-3'],
      inspirationRequestId: 'insp-201',
      assignedStylist: 'Master Weaver Murthy & Stylist Priya',
      createdAt: '2026-09-12T11:00:00Z'
    }
  ];

  savedVisitItems: SavedVisitItem[] = [
    {
      id: 'sv-1',
      userId: 'user-rahul',
      productId: 'prod-3', // Handcrafted Chanderi Silk Kurta
      product: INITIAL_PRODUCTS[2],
      selectedSize: '40',
      selectedColor: 'Ivory Cream & Sage Embroidery',
      customerNote: 'Need to inspect the neckline threadwork in daylight.',
      appointmentId: 'apt-101',
      preparationStatus: 'READY',
      createdAt: '2026-09-12T11:05:00Z'
    },
    {
      id: 'sv-2',
      userId: 'user-rahul',
      productId: 'prod-6', // Embroidered Velvet Festive Nehru Jacket
      product: INITIAL_PRODUCTS[5],
      selectedSize: '40',
      selectedColor: 'Regal Forest Green',
      customerNote: 'Please keep size 40 and 42 ready for trial.',
      appointmentId: 'apt-101',
      preparationStatus: 'READY',
      createdAt: '2026-09-12T11:10:00Z'
    },
    {
      id: 'sv-3',
      userId: 'user-rahul',
      productId: 'prod-2', // Royal Heritage Raw Silk Bandhgala Suit
      product: INITIAL_PRODUCTS[1],
      selectedSize: '40',
      selectedColor: 'Deep Wine Maroon',
      customerNote: 'Need to check the shoulder pad drape.',
      appointmentId: 'apt-101',
      preparationStatus: 'PREPARING',
      createdAt: '2026-09-12T11:15:00Z'
    }
  ];

  inspirationRequests: InspirationRequest[] = [
    {
      id: 'insp-201',
      userId: 'user-rahul',
      customerName: 'Rahul Sharma',
      customerPhone: '+91 98450 23145',
      imageUrl: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80',
      category: 'men',
      gender: 'men',
      style: 'traditional',
      approxBudget: '₹2,000–₹3,000',
      preferredColor: 'Cream / White with Gold Accent',
      description: 'Looking for something similar to this for a family wedding. Minimal shine, high craftsmanship.',
      preferredVisitDate: 'Upcoming Saturday, 5:30 PM',
      appointmentId: 'apt-101',
      status: 'PREPARING',
      staffNotes: 'Checked Level 1 festive rack. Pulled Chanderi Silk Cream Kurta (prod-3) and Brocade Nehru Jacket.',
      customerMessage: 'Our senior draper Priya has gathered 3 matching weaves in Cream and Gold for your trial.',
      createdAt: '2026-09-12T11:02:00Z',
      updatedAt: '2026-09-13T09:30:00Z'
    }
  ];

  pastVisits: Appointment[] = [
    {
      id: 'apt-99',
      userId: 'user-rahul',
      customerName: 'Rahul Sharma',
      customerPhone: '+91 98450 23145',
      date: 'August 18, 2026',
      timeSlot: '4:00 PM',
      status: 'COMPLETED',
      visitNotes: 'Diwali festive pre-booking',
      savedItemIds: [],
      purchaseTotal: 7600,
      coinsEarned: 190,
      createdAt: '2026-08-10T14:00:00Z',
      arrivedAt: '2026-08-18T16:05:00Z',
      completedAt: '2026-08-18T17:15:00Z'
    }
  ];

  notifications: AppNotification[] = [
    {
      id: 'notif-1',
      userId: 'user-rahul',
      title: 'Store Visit Confirmed',
      message: 'Your Tirumala store visit is confirmed for Saturday at 5:30 PM. Stylist Priya has been assigned.',
      type: 'appointment',
      isRead: false,
      createdAt: '2026-09-12T11:05:00Z'
    },
    {
      id: 'notif-2',
      userId: 'user-rahul',
      title: 'Preparation in Progress',
      message: 'Our team is preparing suitable options and your saved garments for your visit.',
      type: 'preparation',
      isRead: false,
      createdAt: '2026-09-13T09:30:00Z'
    },
    {
      id: 'notif-3',
      userId: 'user-rahul',
      title: 'Inspiration Request Received',
      message: 'We’ve received your clothing inspiration reference. Our specialists are curating options.',
      type: 'inspiration',
      isRead: true,
      createdAt: '2026-09-12T11:03:00Z'
    }
  ];

  rewardsHistory: RewardTransaction[] = [
    {
      id: 'rew-1',
      userId: 'user-rahul',
      amount: 100,
      type: 'earned',
      description: 'Tirumala Heritage Welcome Bonus',
      date: '2026-03-12'
    },
    {
      id: 'rew-2',
      userId: 'user-rahul',
      amount: 50,
      type: 'earned',
      description: 'Appointment Scheduled in Advance',
      date: '2026-08-10'
    },
    {
      id: 'rew-3',
      userId: 'user-rahul',
      amount: 190,
      type: 'earned',
      description: '5% Coin Back on In-Store Purchase (₹7,600)',
      date: '2026-08-18',
      appointmentId: 'apt-99'
    }
  ];
}

export const db = new BoutiqueDatabase();
