import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  UserCheck, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  UploadCloud, 
  Award, 
  Phone, 
  ShieldCheck, 
  Store, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { Appointment, InspirationRequest, Product, SavedVisitItem, UserProfile } from '../types';

interface MyVisitViewProps {
  upcomingAppointment: Appointment | null;
  savedVisitItems: SavedVisitItem[];
  inspirationRequests: InspirationRequest[];
  pastVisits: Appointment[];
  user: UserProfile;
  onUpdateStatus: (appointmentId: string, status: string) => void;
  onScheduleNewVisit: () => void;
  onOpenInspiration: () => void;
  onExploreCollection: () => void;
  onViewProduct: (product: Product) => void;
}

export const MyVisitView: React.FC<MyVisitViewProps> = ({
  upcomingAppointment,
  savedVisitItems,
  inspirationRequests,
  pastVisits,
  user,
  onUpdateStatus,
  onScheduleNewVisit,
  onOpenInspiration,
  onExploreCollection,
  onViewProduct
}) => {
  const currentStatus = upcomingAppointment?.status || 'PENDING';

  // Status steps sequence
  const statusPipeline = [
    { key: 'PENDING', label: 'Requested' },
    { key: 'PREPARING', label: 'Drapers Preparing' },
    { key: 'READY', label: 'Ready in Suite' },
    { key: 'ARRIVED', label: 'Customer Arrived' },
    { key: 'COMPLETED', label: 'Visit Completed' }
  ];

  const getCurrentStepIndex = () => {
    return statusPipeline.findIndex(s => s.key === currentStatus);
  };

  const linkedInspiration = upcomingAppointment?.inspirationRequestId
    ? inspirationRequests.find(i => i.id === upcomingAppointment.inspirationRequestId)
    : inspirationRequests[0];

  return (
    <div id="my-visit-dashboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left">
      
      {/* Top Banner */}
      <div className="mb-8 pb-6 border-b border-[#E8DFD4] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#385E48]/10 text-[#385E48] text-xs font-semibold uppercase tracking-wider mb-2">
            <Store className="w-3.5 h-3.5" />
            <span>Personal Boutique Consultation Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#2B2625]">
            My Boutique Visit
          </h1>
          <p className="text-sm text-[#7A726B] mt-1 max-w-xl">
            Welcome back, {user.name}. Track your fitting suite preparation, drapers assigned, and in-store privileges.
          </p>
        </div>

        {/* Schedule or Re-book */}
        <div className="flex items-center gap-3">
          <button
            onClick={onScheduleNewVisit}
            className="px-4 py-2.5 bg-[#781D2A] hover:bg-[#58121D] text-white text-xs font-semibold rounded-lg transition-all shadow-sm flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-[#DFC07A]" />
            <span>{upcomingAppointment ? 'Change or Reschedule' : 'Schedule a Visit'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Active Visit or Empty State */}
      {upcomingAppointment ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left 8 Cols: Active Appointment & Garments Preparation */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Appointment Main Card */}
            <div className="bg-[#FAF7F2] rounded-2xl border-2 border-[#C59B4B]/40 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E8DFD4]">
                <div>
                  <span className="text-xs uppercase font-bold tracking-widest text-[#781D2A]">
                    Upcoming Boutique Consultation
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2B2625] mt-1 flex items-center gap-3">
                    <span>{upcomingAppointment.date}</span>
                    <span className="text-xl sm:text-2xl font-sans font-semibold text-[#781D2A]">
                      • {upcomingAppointment.timeSlot}
                    </span>
                  </h2>
                </div>

                {/* Arrived Action Button */}
                {currentStatus !== 'ARRIVED' && currentStatus !== 'COMPLETED' && (
                  <button
                    onClick={() => onUpdateStatus(upcomingAppointment.id, 'ARRIVED')}
                    className="bg-[#385E48] hover:bg-[#2D4A3E] text-white px-5 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all shadow-md flex items-center gap-2 shrink-0 animate-pulse"
                  >
                    <Store className="w-4 h-4 text-[#DFC07A]" />
                    <span>I Have Arrived at Store</span>
                  </button>
                )}

                {currentStatus === 'ARRIVED' && (
                  <div className="bg-[#385E48]/15 border border-[#385E48] text-[#385E48] px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Welcome to Store • Draper Assigned</span>
                  </div>
                )}
              </div>

              {/* Status Pipeline Visualizer */}
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider font-bold text-[#7A726B]">
                  Boutique Preparation Status:
                </span>

                <div className="grid grid-cols-5 gap-1 pt-2">
                  {statusPipeline.map((step, idx) => {
                    const currentIndex = getCurrentStepIndex();
                    const isPassed = idx <= currentIndex;
                    const isCurrent = idx === currentIndex;

                    return (
                      <div key={step.key} className="space-y-1 text-center">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            isPassed ? 'bg-[#781D2A]' : 'bg-[#E8DFD4]'
                          } ${isCurrent ? 'ring-2 ring-[#C59B4B] ring-offset-1' : ''}`}
                        />
                        <span className={`text-[10px] font-semibold block leading-tight ${
                          isCurrent ? 'text-[#781D2A]' : isPassed ? 'text-[#2B2625]' : 'text-[#7A726B]'
                        }`}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Consultation Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E8DFD4] text-xs">
                <div>
                  <span className="text-[#7A726B] block">Assigned Boutique Stylist:</span>
                  <strong className="text-[#2B2625] font-serif text-sm">
                    {upcomingAppointment.assignedStylist || 'Master Draper Priya'}
                  </strong>
                </div>

                <div>
                  <span className="text-[#7A726B] block">Dressing Suite:</span>
                  <strong className="text-[#385E48] text-sm">Suite #3 (Silk Private Suite)</strong>
                </div>

                <div>
                  <span className="text-[#7A726B] block">Approximate Budget:</span>
                  <strong className="text-[#781D2A] text-sm">{upcomingAppointment.budgetRange}</strong>
                </div>
              </div>

              {/* Customer Visit Notes */}
              {upcomingAppointment.visitNotes && (
                <div className="bg-[#F5EFEB] p-4 rounded-xl border border-[#E8DFD4] text-xs">
                  <span className="font-bold text-[#781D2A] block mb-1">Your Consultation Notes:</span>
                  <p className="text-[#2B2625] italic leading-relaxed">
                    "{upcomingAppointment.visitNotes}"
                  </p>
                </div>
              )}
            </div>

            {/* Saved Products For This Visit */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#2B2625]">
                    Garments Prepared for Your Trial ({savedVisitItems.length})
                  </h3>
                  <p className="text-xs text-[#7A726B] mt-0.5">
                    Our master drapers will have these steam-pressed and waiting in Suite 3.
                  </p>
                </div>
                <button
                  onClick={onExploreCollection}
                  className="text-xs font-semibold text-[#781D2A] hover:underline flex items-center gap-1"
                >
                  <span>+ Add More Garments</span>
                </button>
              </div>

              {savedVisitItems.length === 0 ? (
                <div className="p-8 text-center bg-[#FAF7F2] rounded-xl border border-dashed border-[#E8DFD4]">
                  <p className="text-xs text-[#7A726B]">
                    No garments saved specifically for this visit yet.
                  </p>
                  <button
                    onClick={onExploreCollection}
                    className="mt-3 text-xs bg-[#781D2A] text-white px-4 py-2 rounded-lg font-semibold"
                  >
                    Browse Collection
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedVisitItems.map(item => {
                    const isReady = item.preparationStatus === 'READY';
                    const isUnavailable = item.preparationStatus === 'UNAVAILABLE';

                    return (
                      <div
                        key={item.id}
                        className="bg-[#FAF7F2] rounded-xl border border-[#E8DFD4] p-3.5 flex gap-3 hover:border-[#C59B4B] transition-all"
                      >
                        <div 
                          onClick={() => onViewProduct(item.product)}
                          className="w-16 aspect-[3/4] rounded-lg overflow-hidden bg-[#F5EFEB] shrink-0 cursor-pointer shadow-sm"
                        >
                          <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex flex-col justify-between flex-grow text-left space-y-1">
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-[#C59B4B] font-bold uppercase">{item.product.subcategory}</span>
                              {isReady ? (
                                <span className="text-[9px] bg-[#385E48] text-white px-1.5 py-0.2 rounded font-bold">READY</span>
                              ) : isUnavailable ? (
                                <span className="text-[9px] bg-[#781D2A] text-white px-1.5 py-0.2 rounded font-bold">ALTERNATIVE READY</span>
                              ) : (
                                <span className="text-[9px] bg-[#C59B4B] text-white px-1.5 py-0.2 rounded font-bold">PREPARING</span>
                              )}
                            </div>
                            <h4 
                              onClick={() => onViewProduct(item.product)}
                              className="font-serif text-sm font-bold text-[#2B2625] hover:text-[#781D2A] line-clamp-1 cursor-pointer"
                            >
                              {item.product.name}
                            </h4>
                            <div className="text-xs font-bold text-[#781D2A]">
                              ₹{item.product.price.toLocaleString('en-IN')}
                            </div>
                            <div className="text-[10px] text-[#7A726B]">
                              Size: <strong>{item.selectedSize}</strong>
                            </div>
                          </div>

                          <div className="text-[10px] text-[#385E48]">
                            📍 {item.product.storeLocation.split('—')[0]}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

          {/* Right 4 Cols: Inspiration Request & Boutique Amenities */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Linked Inspiration Request Card */}
            <div className="bg-[#FAF7F2] rounded-2xl border border-[#E8DFD4] p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8DFD4] pb-3">
                <div className="flex items-center gap-2">
                  <UploadCloud className="w-4 h-4 text-[#C59B4B]" />
                  <h3 className="font-serif text-base font-bold text-[#2B2625]">
                    Your Reference Request
                  </h3>
                </div>
                <span className="text-[10px] bg-[#385E48]/10 text-[#385E48] px-2 py-0.5 rounded font-bold">
                  PRIVATE
                </span>
              </div>

              {linkedInspiration ? (
                <div className="space-y-3">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[#F5EFEB] border border-[#E8DFD4]">
                    <img 
                      src={linkedInspiration.imageUrl} 
                      alt="Customer inspiration reference"
                      className="w-full h-full object-cover" 
                    />
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#7A726B]">Category & Style:</span>
                      <strong className="text-[#2B2625] capitalize">{linkedInspiration.category} • {linkedInspiration.style}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A726B]">Approx Budget:</span>
                      <strong className="text-[#781D2A]">{linkedInspiration.approxBudget}</strong>
                    </div>
                  </div>

                  <p className="text-xs text-[#2B2625] italic bg-[#F5EFEB] p-2.5 rounded-lg border border-[#E8DFD4]">
                    "{linkedInspiration.description}"
                  </p>

                  <div className="p-2.5 rounded-lg bg-[#EDF3EF] border border-[#385E48]/20 text-[11px] text-[#385E48]">
                    <span className="font-bold block">Status Note:</span>
                    {linkedInspiration.customerMessage || "Our styling team has curated 3 matching weaves for your trial."}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 space-y-3">
                  <p className="text-xs text-[#7A726B]">
                    Have a photo or reference of what you want to wear?
                  </p>
                  <button
                    onClick={onOpenInspiration}
                    className="text-xs font-semibold bg-[#F5EFEB] hover:bg-[#EBDDCF] border border-[#E8DFD4] px-4 py-2 rounded-lg text-[#781D2A]"
                  >
                    Upload Inspiration Reference
                  </button>
                </div>
              )}
            </div>

            {/* In-Store Concierge Privileges */}
            <div className="bg-[#FAF7F2] rounded-2xl border border-[#E8DFD4] p-5 shadow-sm space-y-3">
              <h4 className="font-serif text-sm font-bold text-[#781D2A] uppercase tracking-wider">
                Tirumala Boutique Privileges
              </h4>

              <div className="space-y-2.5 text-xs text-[#2B2625]">
                <div className="flex items-start gap-2">
                  <span className="text-[#C59B4B] font-bold">✓</span>
                  <span><strong>Complimentary Trial Suite:</strong> Air-conditioned dressing room reserved exclusively for 60 minutes.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#C59B4B] font-bold">✓</span>
                  <span><strong>Master Saree Draper:</strong> Experienced staff assistance for pleating and traditional draping.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#C59B4B] font-bold">✓</span>
                  <span><strong>In-House Master Tailor:</strong> Immediate minor alterations for sleeve, hem, and waist fitting.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#C59B4B] font-bold">✓</span>
                  <span><strong>5% Reward Coins:</strong> Direct coin cashback on your in-store invoice.</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E8DFD4] flex items-center justify-between text-xs text-[#7A726B]">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#385E48]" />
                  <span>Concierge: <a href="tel:9980546374" className="font-bold text-[#781D2A] hover:underline">+91 99805 46374</a></span>
                </div>
                <a 
                  href="https://wa.me/919980546374?text=Hello%20Srinivas%20Sir%2C%20I%20have%20a%20question%20about%20my%20upcoming%20store%20visit."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:underline font-semibold"
                >
                  WhatsApp
                </a>
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* Empty State when no appointment is booked */
        <div className="text-center py-16 bg-[#FAF7F2] rounded-2xl border border-[#E8DFD4] p-8 max-w-lg mx-auto space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#F5EFEB] flex items-center justify-center mx-auto text-[#781D2A]">
            <Calendar className="w-8 h-8 text-[#781D2A]" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#2B2625]">
              Ready for your next visit?
            </h3>
            <p className="text-sm text-[#7A726B] mt-1.5 leading-relaxed">
              Schedule a visit with our master drapers in Jamgi, Bidar. We’ll reserve an exclusive dressing suite and keep your preferred garments pre-arranged.
            </p>
          </div>
          <button
            onClick={onScheduleNewVisit}
            className="inline-flex items-center gap-2 bg-[#781D2A] hover:bg-[#58121D] text-white px-6 py-3 rounded-lg text-xs font-semibold tracking-wide transition-all shadow-md"
          >
            <Calendar className="w-4 h-4 text-[#DFC07A]" />
            <span>Schedule Boutique Visit Now</span>
          </button>
        </div>
      )}

      {/* Previous Visits Section */}
      {pastVisits.length > 0 && (
        <div className="mt-12 pt-8 border-t border-[#E8DFD4] space-y-4">
          <h3 className="font-serif text-2xl font-bold text-[#2B2625]">
            Previous Boutique Visits & In-Store Purchases
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pastVisits.map(visit => (
              <div
                key={visit.id}
                className="bg-[#FAF7F2] rounded-xl border border-[#E8DFD4] p-5 flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#385E48]" />
                    <span className="font-semibold text-sm text-[#2B2625]">{visit.date}</span>
                    <span className="text-xs text-[#7A726B]">({visit.timeSlot})</span>
                  </div>
                  <span className="text-[10px] bg-[#385E48]/10 text-[#385E48] font-bold px-2 py-0.5 rounded">
                    COMPLETED
                  </span>
                </div>

                {visit.purchaseTotal && (
                  <div className="flex items-center justify-between text-xs bg-[#F5EFEB] p-3 rounded-lg border border-[#E8DFD4]">
                    <div>
                      <span className="text-[#7A726B]">In-Store Purchase:</span>
                      <strong className="text-[#781D2A] font-bold text-sm block">
                        ₹{visit.purchaseTotal.toLocaleString('en-IN')}
                      </strong>
                    </div>
                    {visit.coinsEarned && (
                      <div className="text-right">
                        <span className="text-[#7A726B]">Coins Earned:</span>
                        <strong className="text-[#C59B4B] font-bold text-sm flex items-center gap-1">
                          <Award className="w-3.5 h-3.5" /> +{visit.coinsEarned}
                        </strong>
                      </div>
                    )}
                  </div>
                )}

                <div className="text-[11px] text-[#7A726B]">
                  Attended at Tirumala Cloth Store, Jamgi • Completed by Master Draper
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
