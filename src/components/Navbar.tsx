import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  Calendar, 
  UploadCloud, 
  Award, 
  Bell, 
  Menu, 
  X, 
  Bookmark, 
  UserCheck, 
  Layers, 
  ChevronDown,
  Check,
  MapPin,
  Clock,
  Phone
} from 'lucide-react';
import { Logo } from './Logo';
import { AppNotification, UserProfile, UserRole } from '../types';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  savedItemsCount: number;
  wishlistCount: number;
  user: UserProfile;
  onSwitchRole: (role: UserRole) => void;
  notifications: AppNotification[];
  onMarkNotificationRead: (id: string) => void;
  onMarkAllNotificationsRead: () => void;
  onOpenSchedule: () => void;
  onOpenInspiration: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  savedItemsCount,
  wishlistCount,
  user,
  onSwitchRole,
  notifications,
  onMarkNotificationRead,
  onMarkAllNotificationsRead,
  onOpenSchedule,
  onOpenInspiration
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const roles: { role: UserRole; label: string; desc: string }[] = [
    { role: 'CUSTOMER', label: 'Rahul Sharma (Customer)', desc: 'Client boutique discovery & visit booking' },
    { role: 'STAFF', label: 'Priya Sundaram (Staff)', desc: 'Store floor, items preparation & appointments' },
    { role: 'ADMIN', label: 'Ramesh K. (Store Manager)', desc: 'Full store operations, moderation & audit' },
    { role: 'OWNER', label: 'Venkat Tirumala (Owner)', desc: 'Heritage management, analytics & config' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD4] transition-all">
      {/* Top Information Bar with Canonical Store Info & WhatsApp Concierge */}
      <div className="bg-[#781D2A] text-[#FAF7F2] text-[11px] font-medium tracking-wide py-1.5 px-4 border-b border-[#58121D]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#DFC07A]" />
            <span className="font-serif font-semibold tracking-wider text-[#DFC07A]">TIRUMALA CLOTH STORE</span>
            <span className="text-[#FAF7F2]/60 hidden sm:inline">•</span>
            <span className="font-medium flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#DFC07A] inline" />
              OPEN DAILY 9:00 AM — 9:00 PM
            </span>
            <span className="text-[#FAF7F2]/60 hidden md:inline">•</span>
            <span className="text-[#FAF7F2]/80 hidden md:inline flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#DFC07A] inline" />
              Near Shivaji Chowk, Narayankhed Road, Jamgi, Bidar
            </span>
          </div>

          <div className="flex items-center gap-4 text-[#DFC07A]">
            <a 
              href="https://wa.me/919980546374?text=Hello%20Srinivas%20Sir%2C%20I%20would%20like%20to%20know%20more%20about%20Tirumala%20Cloth%20Store%20and%20the%20available%20collection."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              title="Speak with Srinivas Kokkulwar on WhatsApp"
            >
              <Phone className="w-3 h-3" />
              <span>WhatsApp Concierge: +91 99805 46374</span>
            </a>
            <span className="hidden lg:inline-block bg-[#58121D] px-2 py-0.5 rounded text-[10px] text-[#FAF7F2] border border-[#C59B4B]/30 font-medium">
              Physical Store Pre-Trial
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Logo onClick={() => onNavigate('home')} />

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              id="nav-link-home"
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                currentTab === 'home'
                  ? 'text-[#781D2A] font-semibold bg-[#F5EFEB]'
                  : 'text-[#2B2625] hover:text-[#781D2A] hover:bg-[#F5EFEB]/60'
              }`}
            >
              Home
            </button>

            <button
              id="nav-link-collection"
              onClick={() => onNavigate('collection')}
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                currentTab === 'collection'
                  ? 'text-[#781D2A] font-semibold bg-[#F5EFEB]'
                  : 'text-[#2B2625] hover:text-[#781D2A] hover:bg-[#F5EFEB]/60'
              }`}
            >
              Collection
            </button>

            <button
              id="nav-link-style-assistant"
              onClick={() => onNavigate('style-assistant')}
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-md flex items-center gap-1.5 ${
                currentTab === 'style-assistant'
                  ? 'text-[#781D2A] font-semibold bg-[#F5EFEB]'
                  : 'text-[#2B2625] hover:text-[#781D2A] hover:bg-[#F5EFEB]/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C59B4B]" />
              <span>Style Assistant</span>
            </button>

            {/* Save for Visit CTA */}
            <button
              id="nav-link-saved-visit"
              onClick={() => onNavigate('saved-visit')}
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-md relative flex items-center gap-1.5 ${
                currentTab === 'saved-visit'
                  ? 'text-[#781D2A] font-semibold bg-[#F5EFEB]'
                  : 'text-[#2B2625] hover:text-[#781D2A] hover:bg-[#F5EFEB]/60'
              }`}
            >
              <Bookmark className="w-4 h-4 text-[#781D2A]" />
              <span>Save for Visit</span>
              {savedItemsCount > 0 && (
                <span className="bg-[#781D2A] text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-4 text-center">
                  {savedItemsCount}
                </span>
              )}
            </button>

            {/* My Visit Consultation Dashboard */}
            <button
              id="nav-link-my-visit"
              onClick={() => onNavigate('my-visit')}
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-md flex items-center gap-1.5 ${
                currentTab === 'my-visit'
                  ? 'text-[#781D2A] font-semibold bg-[#F5EFEB]'
                  : 'text-[#2B2625] hover:text-[#781D2A] hover:bg-[#F5EFEB]/60'
              }`}
            >
              <Calendar className="w-4 h-4 text-[#385E48]" />
              <span>My Visit</span>
            </button>

            <button
              id="nav-link-inspiration"
              onClick={onOpenInspiration}
              className="px-3 py-2 text-sm font-medium text-[#2B2625] hover:text-[#781D2A] hover:bg-[#F5EFEB]/60 rounded-md flex items-center gap-1.5"
            >
              <UploadCloud className="w-3.5 h-3.5 text-[#C59B4B]" />
              <span>Inspiration</span>
            </button>

            <button
              id="nav-link-requests"
              onClick={() => onNavigate('my-requests')}
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                currentTab === 'my-requests'
                  ? 'text-[#781D2A] font-semibold bg-[#F5EFEB]'
                  : 'text-[#2B2625] hover:text-[#781D2A] hover:bg-[#F5EFEB]/60'
              }`}
            >
              My Requests
            </button>

            {/* If Staff / Admin, show Staff Operations Tab */}
            {user.role !== 'CUSTOMER' && (
              <button
                id="nav-link-staff-dashboard"
                onClick={() => onNavigate('staff-dashboard')}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-md border flex items-center gap-1.5 ${
                  currentTab === 'staff-dashboard'
                    ? 'bg-[#385E48] text-white border-[#385E48]'
                    : 'bg-[#EDF3EF] text-[#385E48] border-[#385E48]/30 hover:bg-[#385E48] hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Store Ops</span>
              </button>
            )}
          </nav>

          {/* Right Action Icons & Badges */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Rewards Badge */}
            <button
              id="nav-button-rewards"
              onClick={() => onNavigate('rewards')}
              className="hidden sm:flex items-center gap-1.5 bg-[#F5EFEB] hover:bg-[#EBDDCF] border border-[#E8DFD4] px-2.5 py-1.5 rounded-full text-xs font-semibold text-[#781D2A] transition-all"
              title="Tirumala Rewards Balance"
            >
              <Award className="w-4 h-4 text-[#C59B4B]" />
              <span>{user.rewardCoins}</span>
              <span className="text-[10px] text-[#7A726B] font-normal uppercase tracking-wider">Coins</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                id="nav-notification-bell"
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 text-[#2B2625] hover:text-[#781D2A] hover:bg-[#F5EFEB] rounded-full transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#781D2A] border-2 border-[#FAF7F2] rounded-full" />
                )}
              </button>

              {/* Notification Dropdown */}
              {notifOpen && (
                <div 
                  id="notifications-dropdown"
                  className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#FAF7F2] rounded-xl shadow-xl border border-[#E8DFD4] py-3 px-4 z-50 animate-in fade-in slide-in-from-top-2"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#E8DFD4]">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-[#781D2A]" />
                      <span className="font-serif font-semibold text-[#2B2625]">Boutique Updates</span>
                      {unreadCount > 0 && (
                        <span className="bg-[#781D2A]/10 text-[#781D2A] text-[11px] font-bold px-2 py-0.5 rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={onMarkAllNotificationsRead}
                        className="text-[11px] text-[#781D2A] hover:underline font-medium"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-[#E8DFD4]/60 my-1">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-[#7A726B] py-6 text-center italic">
                        No notifications yet.
                      </p>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => onMarkNotificationRead(n.id)}
                          className={`py-3 text-left transition-colors cursor-pointer ${
                            !n.isRead ? 'bg-[#F5EFEB]/50 -mx-2 px-2 rounded-lg' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-[#781D2A]">{n.title}</span>
                            <span className="text-[10px] text-[#7A726B]">
                              {new Date(n.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-xs text-[#2B2625] mt-1 leading-relaxed">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="pt-2 border-t border-[#E8DFD4] text-center">
                    <button
                      onClick={() => {
                        setNotifOpen(false);
                        onNavigate('my-visit');
                      }}
                      className="text-xs font-semibold text-[#781D2A] hover:underline"
                    >
                      View Upcoming Visit Preparation →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Role Switcher (Allows testing Customer vs Staff vs Admin vs Owner) */}
            <div className="relative">
              <button
                id="role-switcher-button"
                onClick={() => setRoleOpen(!roleOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#E8DFD4] bg-[#F5EFEB] hover:bg-[#EBDDCF] text-xs font-medium text-[#2B2625] transition-all"
                title="Switch User Role for Evaluation"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#385E48]" />
                <span className="hidden md:inline font-semibold">{user.role}</span>
                <ChevronDown className="w-3 h-3 text-[#7A726B]" />
              </button>

              {roleOpen && (
                <div 
                  id="role-switcher-dropdown"
                  className="absolute right-0 mt-2 w-72 bg-[#FAF7F2] rounded-xl shadow-xl border border-[#E8DFD4] p-2 z-50"
                >
                  <div className="px-3 py-1.5 border-b border-[#E8DFD4] mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A726B]">
                      Select Active Role
                    </span>
                  </div>
                  {roles.map(r => (
                    <button
                      key={r.role}
                      onClick={() => {
                        onSwitchRole(r.role);
                        setRoleOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-start justify-between ${
                        user.role === r.role
                          ? 'bg-[#781D2A] text-white font-medium'
                          : 'hover:bg-[#F5EFEB] text-[#2B2625]'
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{r.label}</div>
                        <div className={`text-[10px] mt-0.5 ${user.role === r.role ? 'text-[#DFC07A]' : 'text-[#7A726B]'}`}>
                          {r.desc}
                        </div>
                      </div>
                      {user.role === r.role && <Check className="w-4 h-4 text-[#DFC07A] shrink-0 mt-0.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Schedule Store Visit Button */}
            <button
              id="nav-schedule-visit-btn"
              onClick={onOpenSchedule}
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#781D2A] hover:bg-[#58121D] text-white px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5 text-[#DFC07A]" />
              <span>Schedule Visit</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#2B2625] hover:text-[#781D2A] rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="lg:hidden border-t border-[#E8DFD4] bg-[#FAF7F2] px-4 py-4 space-y-2">
          <button
            onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-[#2B2625] hover:bg-[#F5EFEB] rounded-md"
          >
            Home
          </button>
          <button
            onClick={() => { onNavigate('collection'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-[#2B2625] hover:bg-[#F5EFEB] rounded-md"
          >
            Explore Collection
          </button>
          <button
            onClick={() => { onNavigate('style-assistant'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-[#2B2625] hover:bg-[#F5EFEB] rounded-md flex items-center justify-between"
          >
            <span>Tirumala Style Assistant</span>
            <Sparkles className="w-4 h-4 text-[#C59B4B]" />
          </button>
          <button
            onClick={() => { onNavigate('saved-visit'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-[#2B2625] hover:bg-[#F5EFEB] rounded-md flex items-center justify-between"
          >
            <span>Save for Visit</span>
            <span className="bg-[#781D2A] text-white text-xs px-2 py-0.5 rounded-full font-bold">
              {savedItemsCount}
            </span>
          </button>
          <button
            onClick={() => { onNavigate('my-visit'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-[#2B2625] hover:bg-[#F5EFEB] rounded-md"
          >
            My Visit (Consultation Hub)
          </button>
          <button
            onClick={() => { onOpenInspiration(); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-[#2B2625] hover:bg-[#F5EFEB] rounded-md flex items-center justify-between"
          >
            <span>Bring Your Inspiration</span>
            <UploadCloud className="w-4 h-4 text-[#C59B4B]" />
          </button>
          <button
            onClick={() => { onNavigate('my-requests'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-[#2B2625] hover:bg-[#F5EFEB] rounded-md"
          >
            My Requests
          </button>
          <button
            onClick={() => { onNavigate('rewards'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-[#2B2625] hover:bg-[#F5EFEB] rounded-md flex items-center justify-between"
          >
            <span>Tirumala Rewards</span>
            <span className="text-[#C59B4B] font-bold text-xs">{user.rewardCoins} Coins</span>
          </button>
          {user.role !== 'CUSTOMER' && (
            <button
              onClick={() => { onNavigate('staff-dashboard'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-[#385E48] bg-[#EDF3EF] rounded-md"
            >
              Store Operations Dashboard ({user.role})
            </button>
          )}
          <div className="pt-2 space-y-2">
            <a
              href="https://wa.me/919980546374?text=Hello%20Srinivas%20Sir%2C%20I%20would%20like%20to%20know%20more%20about%20Tirumala%20Cloth%20Store%20and%20the%20available%20collection."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white border border-[#25D366] text-[#128C7E] py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Store Concierge (+91 99805 46374)</span>
            </a>

            <button
              onClick={() => { onOpenSchedule(); setMobileMenuOpen(false); }}
              className="w-full bg-[#781D2A] text-white py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#DFC07A]" />
              <span>Schedule Store Visit</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
