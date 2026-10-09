import React, { useState, useEffect } from 'react';
import { 
  AppNotification, 
  Appointment, 
  InspirationRequest, 
  Product, 
  RewardTransaction, 
  SavedVisitItem, 
  UserProfile, 
  UserRole 
} from './types';
import { api } from './services/api';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CustomerJourney } from './components/CustomerJourney';
import { ProductCard } from './components/ProductCard';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { SaveForVisitView } from './components/SaveForVisitView';
import { MyVisitView } from './components/MyVisitView';
import { CollectionView } from './components/CollectionView';
import { StyleAssistantView } from './components/StyleAssistantView';
import { MyRequestsView } from './components/MyRequestsView';
import { RewardsView } from './components/RewardsView';
import { StaffDashboard } from './components/StaffDashboard';
import { ScheduleVisitModal } from './components/ScheduleVisitModal';
import { BringInspirationModal } from './components/BringInspirationModal';
import { StoreExperienceSection } from './components/StoreExperienceSection';
import { Footer } from './components/Footer';
import { 
  Sparkles, 
  Bookmark, 
  Calendar, 
  MapPin, 
  Phone, 
  Clock, 
  Award, 
  Check, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Core Domain State
  const [user, setUser] = useState<UserProfile>({
    id: 'user_1',
    name: 'Rahul Sharma',
    phone: '+91 98450 11223',
    role: 'CUSTOMER',
    rewardCoins: 1250,
    preferredStyles: ['traditional', 'festive']
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [savedVisitItems, setSavedVisitItems] = useState<SavedVisitItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [pastVisits, setPastVisits] = useState<Appointment[]>([]);
  const [inspirationRequests, setInspirationRequests] = useState<InspirationRequest[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [rewardsData, setRewardsData] = useState<{
    balance: number;
    tier: string;
    history: RewardTransaction[];
  }>({
    balance: 1250,
    tier: 'Gold',
    history: []
  });

  // Modal States
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [inspirationModalOpen, setInspirationModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Initial Data Fetch
  const loadAppData = async () => {
    try {
      const [u, prods, saved, wish, apts, history, insps, notifs, rews] = await Promise.all([
        api.getMe(),
        api.getProducts(),
        api.getSavedVisitItems(),
        api.getWishlist(),
        api.getAppointments(),
        api.getPastVisits(),
        api.getInspirationRequests(),
        api.getNotifications(),
        api.getRewards()
      ]);

      setUser(u);
      setProducts(prods);
      setSavedVisitItems(saved);
      setWishlist(wish);
      setAppointments(apts);
      setPastVisits(history);
      setInspirationRequests(insps);
      setNotifications(notifs);
      setRewardsData(rews);
    } catch (err) {
      console.error('Error loading initial data:', err);
    }
  };

  useEffect(() => {
    loadAppData();
  }, []);

  // Handlers: Role Switching
  const handleSwitchRole = async (role: UserRole) => {
    try {
      const updated = await api.switchRole(role);
      setUser(updated.user);
      showToast(`Switched active role to ${role}`);
      if (role !== 'CUSTOMER' && currentTab === 'home') {
        setCurrentTab('staff-dashboard');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handlers: Save for Visit
  const handleSaveForVisit = async (product: Product, size?: string, note?: string) => {
    try {
      const existing = savedVisitItems.find(i => i.product.id === product.id);
      if (existing) {
        // Toggle remove if already saved
        await api.removeSavedVisitItem(existing.id);
        setSavedVisitItems(prev => prev.filter(i => i.id !== existing.id));
        showToast(`Removed "${product.name}" from your visit items.`);
      } else {
        const defaultSize = size || product.availableSizes[0] || 'Standard';
        const saved = await api.saveForVisit({
          productId: product.id,
          selectedSize: defaultSize,
          customerNote: note
        });
        setSavedVisitItems(prev => [saved, ...prev]);
        showToast(`Saved "${product.name}" for your store visit! Prepared in your trial suite.`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveSavedVisitItem = async (id: string) => {
    try {
      await api.removeSavedVisitItem(id);
      setSavedVisitItems(prev => prev.filter(i => i.id !== id));
      showToast('Garment removed from store visit list.');
    } catch (err) {
      console.error(err);
    }
  };

  const handleMoveVisitToWishlist = async (id: string) => {
    try {
      await api.moveVisitItemToWishlist(id);
      // Reload items and wishlist
      const [saved, wish] = await Promise.all([
        api.getSavedVisitItems(),
        api.getWishlist()
      ]);
      setSavedVisitItems(saved);
      setWishlist(wish);
      showToast('Moved item from Visit list to Wishlist.');
    } catch (err) {
      console.error(err);
    }
  };

  const handleMoveWishlistToVisit = async (productId: string) => {
    try {
      await api.moveWishlistItemToVisit(productId);
      const [saved, wish] = await Promise.all([
        api.getSavedVisitItems(),
        api.getWishlist()
      ]);
      setSavedVisitItems(saved);
      setWishlist(wish);
      showToast('Garment moved to Save for Visit.');
    } catch (err) {
      console.error(err);
    }
  };

  // Handlers: Wishlist
  const handleToggleWishlist = async (product: Product) => {
    try {
      const res = await api.toggleWishlist(product.id);
      if (res.inWishlist) {
        setWishlist(prev => [...prev, product]);
        showToast(`Added "${product.name}" to your Wishlist.`);
      } else {
        setWishlist(prev => prev.filter(p => p.id !== product.id));
        showToast(`Removed from your Wishlist.`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handlers: Appointment Booking
  const handleBookAppointment = async (payload: {
    date: string;
    timeSlot: string;
    visitNotes?: string;
    budgetRange?: string;
    selectedItemIds?: string[];
    inspirationRequestId?: string;
  }) => {
    const apt = await api.createAppointment(payload);
    setAppointments(prev => [apt, ...prev]);
    // Refresh notifications and saved items
    const [saved, notifs] = await Promise.all([
      api.getSavedVisitItems(),
      api.getNotifications()
    ]);
    setSavedVisitItems(saved);
    setNotifications(notifs);
    showToast(`Appointment confirmed for ${apt.date} (${apt.timeSlot})!`);
    return apt;
  };

  const handleUpdateAppointmentStatus = async (appointmentId: string, status: string) => {
    try {
      const updated = await api.updateAppointmentStatus(appointmentId, status);
      setAppointments(prev => prev.map(a => a.id === appointmentId ? updated : a));
      const notifs = await api.getNotifications();
      setNotifications(notifs);
      showToast(`Visit status updated to ${status}.`);
    } catch (err) {
      console.error(err);
    }
  };

  // Handlers: Staff Operations
  const handleUpdateItemPreparation = async (id: string, status: string, altNote?: string) => {
    try {
      const updated = await api.updateVisitItemStatus(id, status, altNote);
      setSavedVisitItems(prev => prev.map(i => i.id === id ? updated : i));
      showToast(`Item status set to ${status}.`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRecordStorePurchase = async (appointmentId: string, amount: number) => {
    try {
      await api.recordStorePurchase(appointmentId, amount);
      // Reload appointments, user, and rewards
      const [u, apts, history, rews] = await Promise.all([
        api.getMe(),
        api.getAppointments(),
        api.getPastVisits(),
        api.getRewards()
      ]);
      setUser(u);
      setAppointments(apts);
      setPastVisits(history);
      setRewardsData(rews);
      showToast(`Purchase recorded! 5% Reward Coins added.`);
    } catch (err) {
      console.error(err);
    }
  };

  // Handlers: Inspiration Requests
  const handleCreateInspiration = async (payload: {
    imageUrl?: string;
    category: string;
    gender: string;
    style: string;
    approxBudget: string;
    preferredColor: string;
    description: string;
    preferredVisitDate?: string;
    appointmentId?: string;
  }) => {
    const created = await api.createInspirationRequest(payload);
    setInspirationRequests(prev => [created, ...prev]);
    showToast('Inspiration submitted privately. Our drapers will review your reference!');
  };

  const handleUpdateInspirationStatus = async (
    id: string, 
    status: string, 
    staffNotes?: string, 
    customerMessage?: string
  ) => {
    try {
      const updated = await api.updateInspirationStatus(id, {
        status,
        staffNotes,
        customerMessage
      });
      setInspirationRequests(prev => prev.map(r => r.id === id ? updated : r));
      showToast(`Inspiration request updated.`);
    } catch (err) {
      console.error(err);
    }
  };

  // Handlers: Notifications
  const handleMarkNotificationRead = async (id: string) => {
    await api.markNotificationRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleMarkAllNotificationsRead = async () => {
    await api.markAllNotificationsRead();
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const savedItemIds = savedVisitItems.map(item => item.product.id);
  const wishlistIds = wishlist.map(p => p.id);
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
  const upcomingAppointment = appointments.find(
    a => a.status !== 'COMPLETED' && a.status !== 'CANCELLED'
  ) || null;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2B2625] selection:bg-[#781D2A] selection:text-white">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div 
          id="app-toast-notification"
          className="fixed bottom-6 right-6 z-50 bg-[#2B2625] text-white px-5 py-3.5 rounded-xl shadow-2xl border border-[#DFC07A]/50 text-xs font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <div className="w-5 h-5 rounded-full bg-[#385E48] text-white flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-[#DFC07A]" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Navigation Header */}
      <Navbar
        currentTab={currentTab}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        savedItemsCount={savedVisitItems.length}
        wishlistCount={wishlist.length}
        user={user}
        onSwitchRole={handleSwitchRole}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
        onOpenSchedule={() => setScheduleModalOpen(true)}
        onOpenInspiration={() => setInspirationModalOpen(true)}
      />

      {/* Main App Surface based on active tab */}
      <main className="flex-grow">
        {currentTab === 'home' && (
          <div>
            {/* Hero Section */}
            <Hero
              onExplore={() => setCurrentTab('collection')}
              onPlanVisit={() => setScheduleModalOpen(true)}
              onBringInspiration={() => setInspirationModalOpen(true)}
            />

            {/* Featured Customer Journey */}
            <CustomerJourney
              onExplore={() => setCurrentTab('collection')}
              onAssistant={() => setCurrentTab('style-assistant')}
              onSchedule={() => setScheduleModalOpen(true)}
            />

            {/* Curated Weaves Showcase */}
            <section className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DFD4]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
                
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-widest text-[#781D2A] block mb-1">
                      Handpicked Heritage Weaves
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-serif text-[#2B2625]">
                      Curated For Your Next Celebration
                    </h2>
                    <p className="text-xs sm:text-sm text-[#7A726B] mt-1 max-w-lg">
                      Save what catches your eye. We'll have it ready in your personal fitting room.
                    </p>
                  </div>

                  <button
                    onClick={() => setCurrentTab('collection')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#781D2A] hover:underline self-start md:self-auto"
                  >
                    <span>View All {products.length} Garments</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C59B4B]" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featuredProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isSavedForVisit={savedItemIds.includes(product.id)}
                      isInWishlist={wishlistIds.includes(product.id)}
                      onSaveForVisit={(p) => handleSaveForVisit(p)}
                      onToggleWishlist={handleToggleWishlist}
                      onViewDetails={(p) => setSelectedProductForModal(p)}
                    />
                  ))}
                </div>

                {/* In-Store Experience Teaser Card */}
                <div className="mt-14 bg-[#F5EFEB] rounded-2xl p-6 sm:p-10 border border-[#DFC07A]/40 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="space-y-3 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#781D2A]/10 text-[#781D2A] text-xs font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-[#C59B4B]" />
                      <span>Complimentary Master Draper Consultation</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2B2625]">
                      Experience the Luxury of Private Suite Draping
                    </h3>
                    <p className="text-xs sm:text-sm text-[#7A726B] max-w-2xl leading-relaxed">
                      Whether you need a bridegroom sherwani or an heirloom bridal Kanchipuram silk, 
                      enjoy our private suites, custom draping assistants, and complimentary master tailoring.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                    <button
                      onClick={() => setCurrentTab('style-assistant')}
                      className="w-full sm:w-auto px-5 py-3 rounded-lg text-xs font-bold bg-white border border-[#E8DFD4] text-[#2B2625] hover:bg-[#FAF7F2] transition-colors flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-[#C59B4B]" />
                      <span>Ask Style Assistant</span>
                    </button>

                    <button
                      onClick={() => setScheduleModalOpen(true)}
                      className="w-full sm:w-auto px-6 py-3 rounded-lg text-xs font-bold bg-[#781D2A] hover:bg-[#58121D] text-white transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4 text-[#DFC07A]" />
                      <span>Book Consultation</span>
                    </button>
                  </div>
                </div>

              </div>
            </section>

            {/* Store Experience & Canonical Details (Visit, Concierge, Leadership, Instagram) */}
            <StoreExperienceSection
              onScheduleVisit={() => setScheduleModalOpen(true)}
              onOpenInspiration={() => setInspirationModalOpen(true)}
            />
          </div>
        )}

        {currentTab === 'collection' && (
          <CollectionView
            products={products}
            savedItemIds={savedItemIds}
            wishlistIds={wishlistIds}
            onSaveForVisit={(p) => handleSaveForVisit(p)}
            onToggleWishlist={handleToggleWishlist}
            onViewDetails={(p) => setSelectedProductForModal(p)}
            onAssistantSearch={() => setCurrentTab('style-assistant')}
          />
        )}

        {currentTab === 'style-assistant' && (
          <StyleAssistantView
            savedItemIds={savedItemIds}
            onSaveForVisit={(p) => handleSaveForVisit(p)}
            onViewProduct={(p) => setSelectedProductForModal(p)}
            onScheduleVisit={() => setScheduleModalOpen(true)}
          />
        )}

        {currentTab === 'saved-visit' && (
          <SaveForVisitView
            savedItems={savedVisitItems}
            wishlist={wishlist}
            appointments={appointments}
            onRemoveItem={handleRemoveSavedVisitItem}
            onMoveToWishlist={handleMoveVisitToWishlist}
            onMoveWishlistToVisit={handleMoveWishlistToVisit}
            onUpdateAppointmentAssociation={(itemId, aptId) => {
              setSavedVisitItems(prev => prev.map(i => i.id === itemId ? { ...i, appointmentId: aptId } : i));
              showToast('Appointment association updated.');
            }}
            onScheduleVisit={() => setScheduleModalOpen(true)}
            onExploreCollection={() => setCurrentTab('collection')}
            onViewProduct={(p) => setSelectedProductForModal(p)}
          />
        )}

        {currentTab === 'my-visit' && (
          <MyVisitView
            upcomingAppointment={upcomingAppointment}
            savedVisitItems={savedVisitItems}
            inspirationRequests={inspirationRequests}
            pastVisits={pastVisits}
            user={user}
            onUpdateStatus={handleUpdateAppointmentStatus}
            onScheduleNewVisit={() => setScheduleModalOpen(true)}
            onOpenInspiration={() => setInspirationModalOpen(true)}
            onExploreCollection={() => setCurrentTab('collection')}
            onViewProduct={(p) => setSelectedProductForModal(p)}
          />
        )}

        {currentTab === 'my-requests' && (
          <MyRequestsView
            requests={inspirationRequests}
            onOpenNewRequest={() => setInspirationModalOpen(true)}
            onScheduleVisit={() => setScheduleModalOpen(true)}
          />
        )}

        {currentTab === 'rewards' && (
          <RewardsView
            user={user}
            rewardsData={rewardsData}
            onScheduleVisit={() => setScheduleModalOpen(true)}
            onExploreCollection={() => setCurrentTab('collection')}
          />
        )}

        {currentTab === 'staff-dashboard' && (
          <StaffDashboard
            user={user}
            appointments={appointments}
            savedVisitItems={savedVisitItems}
            inspirationRequests={inspirationRequests}
            onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
            onUpdateItemStatus={handleUpdateItemPreparation}
            onRecordPurchase={handleRecordStorePurchase}
            onUpdateInspirationStatus={handleUpdateInspirationStatus}
          />
        )}
      </main>

      {/* Global Product Details Modal */}
      <ProductDetailsModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        isSavedForVisit={selectedProductForModal ? savedItemIds.includes(selectedProductForModal.id) : false}
        isInWishlist={selectedProductForModal ? wishlistIds.includes(selectedProductForModal.id) : false}
        onSaveForVisit={(p, size, note) => {
          handleSaveForVisit(p, size, note);
        }}
        onToggleWishlist={handleToggleWishlist}
        onScheduleVisit={() => {
          setSelectedProductForModal(null);
          setScheduleModalOpen(true);
        }}
        onSelectProduct={(rec) => setSelectedProductForModal(rec)}
      />

      {/* Global Schedule Visit Modal */}
      <ScheduleVisitModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        savedVisitItems={savedVisitItems}
        inspirationRequests={inspirationRequests}
        onBookAppointment={handleBookAppointment}
      />

      {/* Global Bring Inspiration Modal */}
      <BringInspirationModal
        isOpen={inspirationModalOpen}
        onClose={() => setInspirationModalOpen(false)}
        appointments={appointments}
        onSubmit={handleCreateInspiration}
      />

      {/* Global Boutique Footer */}
      <Footer
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSchedule={() => setScheduleModalOpen(true)}
        onOpenInspiration={() => setInspirationModalOpen(true)}
      />

    </div>
  );
}
