import React, { useState } from 'react';
import { 
  Bookmark, 
  Heart, 
  Trash2, 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  MapPin, 
  Shirt, 
  ArrowLeftRight,
  Plus
} from 'lucide-react';
import { Appointment, Product, SavedVisitItem } from '../types';

interface SaveForVisitViewProps {
  savedItems: SavedVisitItem[];
  wishlist: Product[];
  appointments: Appointment[];
  onRemoveItem: (id: string) => void;
  onMoveToWishlist: (id: string) => void;
  onMoveWishlistToVisit: (productId: string) => void;
  onUpdateAppointmentAssociation: (itemId: string, appointmentId?: string) => void;
  onScheduleVisit: () => void;
  onExploreCollection: () => void;
  onViewProduct: (product: Product) => void;
}

export const SaveForVisitView: React.FC<SaveForVisitViewProps> = ({
  savedItems,
  wishlist,
  appointments,
  onRemoveItem,
  onMoveToWishlist,
  onMoveWishlistToVisit,
  onUpdateAppointmentAssociation,
  onScheduleVisit,
  onExploreCollection,
  onViewProduct
}) => {
  const [activeTab, setActiveTab] = useState<'visit' | 'wishlist'>('visit');

  const upcomingAppointments = appointments.filter(
    a => a.status !== 'COMPLETED' && a.status !== 'CANCELLED'
  );

  return (
    <div id="save-for-visit-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header & Concept Explanation */}
      <div className="text-left mb-8 pb-6 border-b border-[#E8DFD4]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#781D2A]/10 text-[#781D2A] text-xs font-semibold uppercase tracking-wider mb-2">
              <Bookmark className="w-3.5 h-3.5" />
              <span>Personal Dressing Room Preparation</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif text-[#2B2625]">
              Save for Visit
            </h1>
            <p className="text-sm text-[#7A726B] mt-1 max-w-2xl leading-relaxed">
              These are garments you seriously want to inspect, drape, and try on during your physical store consultation. 
              Our team pre-arranges them in your dressing suite prior to your arrival.
            </p>
          </div>

          {/* Schedule button */}
          <div className="shrink-0 flex items-center gap-3">
            <button
              id="save-visit-schedule-btn"
              onClick={onScheduleVisit}
              className="bg-[#781D2A] hover:bg-[#58121D] text-white px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all shadow-sm flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#DFC07A]" />
              <span>Schedule Boutique Appointment</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher: Save for Visit vs Wishlist */}
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={() => setActiveTab('visit')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'visit'
                ? 'bg-[#781D2A] text-white shadow-sm'
                : 'bg-[#F5EFEB] text-[#2B2625] hover:bg-[#EBDDCF]'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved for Store Visit ({savedItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'wishlist'
                ? 'bg-[#781D2A] text-white shadow-sm'
                : 'bg-[#F5EFEB] text-[#2B2625] hover:bg-[#EBDDCF]'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Inspiration Wishlist ({wishlist.length})</span>
          </button>
        </div>
      </div>

      {/* Distinction Explainer Banner */}
      <div className="mb-8 p-4 bg-[#F5EFEB] rounded-xl border border-[#E8DFD4] grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-left">
        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-md bg-[#781D2A]/10 text-[#781D2A] flex items-center justify-center shrink-0 mt-0.5">
            <Bookmark className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-[#781D2A] uppercase tracking-wider block">
              Save for Visit:
            </span>
            <span className="text-[#7A726B]">
              Handled by physical store staff. Kept aside in your designated fitting room.
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-md bg-[#C59B4B]/20 text-[#C59B4B] flex items-center justify-center shrink-0 mt-0.5">
            <Heart className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-[#2B2625] uppercase tracking-wider block">
              Wishlist:
            </span>
            <span className="text-[#7A726B]">
              For products you simply admire or want to keep for seasonal reference.
            </span>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'visit' ? (
        <div>
          {savedItems.length === 0 ? (
            /* Empty State */
            <div className="text-center py-16 bg-[#FAF7F2] rounded-2xl border border-dashed border-[#E8DFD4] p-8 max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F5EFEB] flex items-center justify-center mx-auto text-[#781D2A]">
                <Bookmark className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#2B2625]">
                  Nothing planned for your next visit yet.
                </h3>
                <p className="text-xs sm:text-sm text-[#7A726B] mt-1.5 leading-relaxed">
                  Explore our collection and save pieces you’d like to see in person. We'll have them pressed and ready in your suite.
                </p>
              </div>
              <button
                onClick={onExploreCollection}
                className="inline-flex items-center gap-2 bg-[#781D2A] hover:bg-[#58121D] text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-all"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#DFC07A]" />
              </button>
            </div>
          ) : (
            /* List of Saved Visit Items */
            <div className="space-y-4">
              {savedItems.map((item) => {
                const isReady = item.preparationStatus === 'READY';
                const isUnavailable = item.preparationStatus === 'UNAVAILABLE';

                return (
                  <div
                    key={item.id}
                    className="bg-[#FAF7F2] rounded-xl border border-[#E8DFD4] p-4 sm:p-5 hover:border-[#C59B4B]/50 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5 text-left"
                  >
                    {/* Item Thumbnail & Core Info */}
                    <div className="flex items-start gap-4 flex-grow">
                      <div 
                        onClick={() => onViewProduct(item.product)}
                        className="w-20 sm:w-24 aspect-[3/4] rounded-lg overflow-hidden bg-[#F5EFEB] shrink-0 cursor-pointer shadow-sm"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[#C59B4B]">
                            {item.product.subcategory}
                          </span>
                          <span className="text-[10px] text-[#7A726B]">• {item.product.fabric}</span>
                        </div>

                        <h4 
                          onClick={() => onViewProduct(item.product)}
                          className="font-serif text-base sm:text-lg font-bold text-[#2B2625] hover:text-[#781D2A] cursor-pointer"
                        >
                          {item.product.name}
                        </h4>

                        <div className="flex items-baseline gap-2">
                          <span className="font-bold text-sm text-[#781D2A]">
                            ₹{item.product.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-[#7A726B]">
                            Size: <strong className="text-[#2B2625]">{item.selectedSize}</strong>
                          </span>
                        </div>

                        {/* Physical Store Location */}
                        <div className="flex items-center gap-1.5 text-[11px] text-[#7A726B] pt-0.5">
                          <MapPin className="w-3 h-3 text-[#C59B4B]" />
                          <span>{item.product.storeLocation}</span>
                        </div>

                        {/* Customer note if any */}
                        {item.customerNote && (
                          <div className="text-[11px] text-[#385E48] bg-[#EDF3EF] px-2.5 py-1 rounded inline-block mt-1">
                            Your Note: "{item.customerNote}"
                          </div>
                        )}

                        {/* Staff Alternative Note if item is unavailable */}
                        {isUnavailable && (
                          <div className="text-[11px] text-[#781D2A] bg-[#781D2A]/10 border border-[#781D2A]/20 p-2 rounded-lg mt-1.5 flex items-start gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                            <span>
                              {item.staffAlternativeNote || "This item is currently awaiting restock, but our drapers have selected 2 identical weave alternatives for your visit."}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Preparation Status Badge & Appointment Link */}
                    <div className="w-full md:w-auto flex flex-col md:items-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-[#E8DFD4]">
                      {/* Preparation Status Chip */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-[#7A726B]">Preparation Status:</span>
                        {isReady ? (
                          <span className="inline-flex items-center gap-1 bg-[#385E48] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>READY IN SUITE</span>
                          </span>
                        ) : isUnavailable ? (
                          <span className="inline-flex items-center gap-1 bg-[#781D2A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            <AlertCircle className="w-3 h-3" />
                            <span>UNAVAILABLE (ALTERNATIVES READY)</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-[#C59B4B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            <Clock className="w-3 h-3" />
                            <span>PREPARING</span>
                          </span>
                        )}
                      </div>

                      {/* Associated Appointment Selector */}
                      <div className="flex items-center gap-1.5 text-xs">
                        <Calendar className="w-3.5 h-3.5 text-[#385E48]" />
                        <select
                          value={item.appointmentId || ''}
                          onChange={(e) => onUpdateAppointmentAssociation(item.id, e.target.value || undefined)}
                          className="text-xs bg-[#F5EFEB] border border-[#E8DFD4] rounded px-2 py-1 text-[#2B2625] focus:outline-none focus:border-[#781D2A]"
                        >
                          <option value="">No appointment linked</option>
                          {upcomingAppointments.map(apt => (
                            <option key={apt.id} value={apt.id}>
                              Visit on {apt.date} ({apt.timeSlot})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Item Actions */}
                      <div className="flex items-center gap-3 text-xs pt-1">
                        {/* Move to Wishlist */}
                        <button
                          onClick={() => onMoveToWishlist(item.id)}
                          className="text-[#7A726B] hover:text-[#781D2A] transition-colors flex items-center gap-1 font-medium"
                          title="Move to Wishlist"
                        >
                          <ArrowLeftRight className="w-3 h-3" />
                          <span>Move to Wishlist</span>
                        </button>

                        {/* Remove */}
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-700/70 hover:text-red-700 transition-colors flex items-center gap-1 font-medium"
                          title="Remove from Visit"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Wishlist Tab Content */
        <div>
          {wishlist.length === 0 ? (
            <div className="text-center py-16 bg-[#FAF7F2] rounded-2xl border border-dashed border-[#E8DFD4] p-8 max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F5EFEB] flex items-center justify-center mx-auto text-[#C59B4B]">
                <Heart className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#2B2625]">
                  Your wishlist is empty.
                </h3>
                <p className="text-xs sm:text-sm text-[#7A726B] mt-1.5 leading-relaxed">
                  Browse products and tap the heart icon on any design you like.
                </p>
              </div>
              <button
                onClick={onExploreCollection}
                className="inline-flex items-center gap-2 bg-[#781D2A] hover:bg-[#58121D] text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-all"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#DFC07A]" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {wishlist.map(product => (
                <div 
                  key={product.id}
                  className="bg-[#FAF7F2] rounded-xl border border-[#E8DFD4] p-4 flex flex-col justify-between text-left space-y-3"
                >
                  <div className="flex gap-3">
                    <div className="w-20 aspect-[3/4] rounded-lg overflow-hidden bg-[#F5EFEB] shrink-0">
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-[#C59B4B] font-bold uppercase">{product.subcategory}</span>
                      <h4 className="font-serif text-sm font-bold text-[#2B2625] line-clamp-1">{product.name}</h4>
                      <div className="font-bold text-xs text-[#781D2A]">₹{product.price.toLocaleString('en-IN')}</div>
                    </div>
                  </div>

                  {/* Move to Save for Visit CTA */}
                  <button
                    onClick={() => onMoveWishlistToVisit(product.id)}
                    className="w-full py-2 bg-[#781D2A] hover:bg-[#58121D] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Bookmark className="w-3.5 h-3.5 text-[#DFC07A]" />
                    <span>Move to Save for Visit</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
