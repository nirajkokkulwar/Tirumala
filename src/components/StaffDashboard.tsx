import React, { useState } from 'react';
import { 
  Layers, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  UploadCloud, 
  Award, 
  Search, 
  Filter, 
  Check, 
  Phone, 
  DollarSign, 
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { Appointment, InspirationRequest, SavedVisitItem, UserProfile } from '../types';

interface StaffDashboardProps {
  user: UserProfile;
  appointments: Appointment[];
  savedVisitItems: SavedVisitItem[];
  inspirationRequests: InspirationRequest[];
  onUpdateAppointmentStatus: (id: string, status: string) => Promise<void>;
  onUpdateItemStatus: (id: string, status: string, altNote?: string) => Promise<void>;
  onRecordPurchase: (appointmentId: string, amount: number) => Promise<void>;
  onUpdateInspirationStatus: (id: string, status: string, staffNotes?: string, customerMessage?: string) => Promise<void>;
}

export const StaffDashboard: React.FC<StaffDashboardProps> = ({
  user,
  appointments,
  savedVisitItems,
  inspirationRequests,
  onUpdateAppointmentStatus,
  onUpdateItemStatus,
  onRecordPurchase,
  onUpdateInspirationStatus
}) => {
  const [activeTab, setActiveTab] = useState<'appointments' | 'inspiration'>('appointments');
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string>(appointments[0]?.id || '');
  const [purchaseAmount, setPurchaseAmount] = useState<number>(14500);
  const [purchaseSuccess, setPurchaseSuccess] = useState<string>('');

  // Find active appointment
  const currentAppointment = appointments.find(a => a.id === selectedAppointmentId) || appointments[0];

  // Get items for this appointment
  const appointmentItems = currentAppointment
    ? savedVisitItems.filter(item => 
        item.appointmentId === currentAppointment.id || 
        currentAppointment.savedItemIds.includes(item.id)
      )
    : [];

  const handleCompletePurchase = async (aptId: string) => {
    if (!purchaseAmount || purchaseAmount <= 0) return;
    try {
      await onRecordPurchase(aptId, purchaseAmount);
      setPurchaseSuccess(`Purchase of ₹${purchaseAmount.toLocaleString('en-IN')} recorded! 5% Reward Coins credited.`);
      setTimeout(() => setPurchaseSuccess(''), 4000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="staff-dashboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left">
      
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-[#E8DFD4] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#385E48] text-white text-xs font-bold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Store Operations • Floor & Trial Suite Concierge</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#2B2625]">
            Visit Preparation & In-Store Operations
          </h1>
          <p className="text-sm text-[#7A726B] mt-1">
            Logged in as <strong className="text-[#2B2625]">{user.name}</strong> ({user.role} Privilege Level).
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'appointments'
                ? 'bg-[#781D2A] text-white shadow-sm'
                : 'bg-[#F5EFEB] text-[#2B2625] hover:bg-[#EBDDCF]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Trial Suite Preparation ({appointments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inspiration')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'inspiration'
                ? 'bg-[#781D2A] text-white shadow-sm'
                : 'bg-[#F5EFEB] text-[#2B2625] hover:bg-[#EBDDCF]'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>Inspiration Requests ({inspirationRequests.length})</span>
          </button>
        </div>
      </div>

      {activeTab === 'appointments' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (4 Cols): Appointments Selector */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#2B2625] mb-2">
              Scheduled Customer Visits
            </h3>

            <div className="space-y-2.5 max-h-[700px] overflow-y-auto pr-1">
              {appointments.map(apt => {
                const isSelected = apt.id === currentAppointment?.id;

                return (
                  <div
                    key={apt.id}
                    onClick={() => setSelectedAppointmentId(apt.id)}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#F5EFEB] border-[#781D2A] shadow-md'
                        : 'bg-[#FAF7F2] border-[#E8DFD4] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#2B2625]">{apt.customerName}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        apt.status === 'READY' 
                          ? 'bg-[#385E48] text-white' 
                          : apt.status === 'ARRIVED'
                          ? 'bg-[#781D2A] text-white animate-pulse'
                          : apt.status === 'COMPLETED'
                          ? 'bg-gray-200 text-gray-700'
                          : 'bg-[#C59B4B] text-white'
                      }`}>
                        {apt.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-[#781D2A] font-semibold mt-1">
                      <Calendar className="w-3.5 h-3.5 text-[#385E48]" />
                      <span>{apt.date} • {apt.timeSlot}</span>
                    </div>

                    <div className="text-[11px] text-[#7A726B] mt-1 line-clamp-1">
                      Budget: {apt.budgetRange} • {apt.savedItemIds.length} Garments
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (8 Cols): Preparation Desk for Selected Visit */}
          {currentAppointment && (
            <div className="lg:col-span-8 space-y-6">
              
              {/* Customer Visit Summary Card */}
              <div className="bg-[#FAF7F2] rounded-2xl border border-[#E8DFD4] p-6 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8DFD4]">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C59B4B]">
                      VIP Customer Consultation Card
                    </span>
                    <h2 className="text-2xl font-serif font-bold text-[#2B2625]">
                      {currentAppointment.customerName}
                    </h2>
                    <div className="text-xs text-[#7A726B] flex items-center gap-3 mt-1">
                      <span>Phone: {currentAppointment.customerPhone}</span>
                      <span>•</span>
                      <span>Assigned Suite: <strong>Suite #3</strong></span>
                    </div>
                  </div>

                  {/* Master Appointment Status Changer */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#7A726B]">Visit Status:</span>
                    <select
                      value={currentAppointment.status}
                      onChange={(e) => onUpdateAppointmentStatus(currentAppointment.id, e.target.value)}
                      className="text-xs font-bold px-3 py-2 rounded-lg bg-white border border-[#E8DFD4] text-[#781D2A] focus:outline-none focus:border-[#781D2A]"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="PREPARING">PREPARING (Drapers on floor)</option>
                      <option value="READY">READY (In Fitting Suite)</option>
                      <option value="ARRIVED">ARRIVED (Customer in boutique)</option>
                      <option value="COMPLETED">COMPLETED (Checkout done)</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </div>
                </div>

                {/* Consultation Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-[#F5EFEB] p-3 rounded-lg border border-[#E8DFD4]">
                    <span className="text-[#7A726B] block">Customer Notes / Focus:</span>
                    <p className="text-[#2B2625] italic mt-0.5">
                      "{currentAppointment.visitNotes || 'General consultation'}"
                    </p>
                  </div>

                  <div className="bg-[#F5EFEB] p-3 rounded-lg border border-[#E8DFD4]">
                    <span className="text-[#7A726B] block">Staff Internal Note:</span>
                    <p className="text-[#385E48] font-medium mt-0.5">
                      {currentAppointment.staffNotes || 'Keep 2 matching pastel stoles and size 42 alternatives ready in Suite 3.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Garments to be Prepared for Trial */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-bold text-[#2B2625]">
                    Garments for Trial Suite ({appointmentItems.length})
                  </h3>
                  <span className="text-xs text-[#7A726B]">
                    Pull from racks and verify steam press
                  </span>
                </div>

                {appointmentItems.length === 0 ? (
                  <div className="p-8 text-center bg-[#FAF7F2] rounded-xl border border-dashed border-[#E8DFD4] text-xs text-[#7A726B]">
                    No specific items attached to this appointment. Curate recommendations from the main collection.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {appointmentItems.map(item => (
                      <div
                        key={item.id}
                        className="bg-[#FAF7F2] rounded-xl border border-[#E8DFD4] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3.5">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-14 h-16 object-cover rounded-lg bg-[#F5EFEB]"
                          />
                          <div className="space-y-0.5">
                            <span className="text-[10px] text-[#C59B4B] font-bold uppercase">{item.product.subcategory}</span>
                            <h4 className="font-serif text-sm font-bold text-[#2B2625]">{item.product.name}</h4>
                            <div className="text-xs text-[#781D2A] font-bold">
                              ₹{item.product.price.toLocaleString('en-IN')} • Size: {item.selectedSize}
                            </div>
                            <div className="text-[11px] text-[#385E48] flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>Rack: <strong>{item.product.storeLocation}</strong></span>
                            </div>
                          </div>
                        </div>

                        {/* Item Preparation Toggle Buttons */}
                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => onUpdateItemStatus(item.id, 'READY')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              item.preparationStatus === 'READY'
                                ? 'bg-[#385E48] text-white'
                                : 'bg-[#F5EFEB] text-[#385E48] hover:bg-[#385E48]/10'
                            }`}
                          >
                            ✓ Ready in Suite
                          </button>

                          <button
                            onClick={() => onUpdateItemStatus(item.id, 'PREPARING')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              item.preparationStatus === 'PREPARING'
                                ? 'bg-[#C59B4B] text-white'
                                : 'bg-[#F5EFEB] text-[#C59B4B] hover:bg-[#C59B4B]/10'
                            }`}
                          >
                            ⏳ Preparing
                          </button>

                          <button
                            onClick={() => {
                              const note = prompt('Enter alternative note for customer:', 'Size 40 unavailable; alternative shade 40 placed in suite.');
                              if (note !== null) {
                                onUpdateItemStatus(item.id, 'UNAVAILABLE', note);
                              }
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              item.preparationStatus === 'UNAVAILABLE'
                                ? 'bg-[#781D2A] text-white'
                                : 'bg-[#F5EFEB] text-[#781D2A] hover:bg-[#781D2A]/10'
                            }`}
                          >
                            ✕ Unavailable (Alt)
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* In-Store Checkout & Reward Credit Recorder */}
              <div className="bg-[#FAF7F2] rounded-2xl border-2 border-[#C59B4B]/40 p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#C59B4B]" />
                  <h3 className="font-serif text-lg font-bold text-[#2B2625]">
                    Record In-Store Purchase & Award Tirumala Coins
                  </h3>
                </div>
                <p className="text-xs text-[#7A726B]">
                  When the customer completes their in-store fitting and billing, enter their final purchase total. 
                  5% of the invoice amount is automatically credited as Tirumala Coins to their account.
                </p>

                {purchaseSuccess && (
                  <div className="bg-[#385E48]/15 border border-[#385E48] text-[#385E48] p-3 rounded-lg text-xs font-bold">
                    {purchaseSuccess}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative w-full sm:w-64">
                    <span className="absolute left-3 top-2.5 text-xs text-[#7A726B] font-bold">₹</span>
                    <input
                      type="number"
                      value={purchaseAmount}
                      onChange={(e) => setPurchaseAmount(Number(e.target.value))}
                      placeholder="Invoice amount"
                      className="w-full pl-7 pr-3 py-2 text-xs bg-white border border-[#E8DFD4] rounded-lg font-bold text-[#781D2A] focus:outline-none focus:border-[#781D2A]"
                    />
                  </div>

                  <button
                    onClick={() => handleCompletePurchase(currentAppointment.id)}
                    className="w-full sm:w-auto bg-[#385E48] hover:bg-[#2D4A3E] text-white px-5 py-2 rounded-lg text-xs font-bold transition-all shadow flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#DFC07A]" />
                    <span>Record Purchase & Credit 5% Coins ({Math.round(purchaseAmount * 0.05)} Coins)</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      ) : (
        /* Inspiration Requests Management Desk */
        <div className="space-y-6">
          <h3 className="font-serif text-2xl font-bold text-[#2B2625]">
            Customer Private Inspiration Consultation Requests ({inspirationRequests.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inspirationRequests.map(req => (
              <div
                key={req.id}
                className="bg-[#FAF7F2] rounded-xl border border-[#E8DFD4] p-5 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[#F5EFEB] mb-3">
                    <img src={req.imageUrl} alt="Customer inspiration" className="w-full h-full object-cover" />
                  </div>

                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase text-[#C59B4B]">
                      {req.category} • {req.style}
                    </span>
                    <span className="text-[10px] bg-[#781D2A]/10 text-[#781D2A] px-2 py-0.5 rounded font-bold">
                      {req.status}
                    </span>
                  </div>

                  <h4 className="font-serif text-base font-bold text-[#2B2625]">
                    {req.customerName} ({req.customerPhone})
                  </h4>

                  <div className="text-xs text-[#781D2A] font-semibold">
                    Budget: {req.approxBudget} • Color: {req.preferredColor}
                  </div>

                  <p className="text-xs text-[#7A726B] italic mt-2 bg-[#F5EFEB] p-2.5 rounded-lg border border-[#E8DFD4]">
                    "{req.description}"
                  </p>
                </div>

                {/* Staff Actions */}
                <div className="pt-3 border-t border-[#E8DFD4] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#7A726B]">Update Status:</span>
                    <select
                      value={req.status}
                      onChange={(e) => onUpdateInspirationStatus(req.id, e.target.value)}
                      className="text-xs bg-white border border-[#E8DFD4] rounded px-2 py-1 font-bold text-[#781D2A]"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="REVIEWING">REVIEWING</option>
                      <option value="PREPARING">PREPARING</option>
                      <option value="READY">READY</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="DECLINED">DECLINED</option>
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      const msg = prompt('Enter customer update message:', 'We have pulled 3 matching handloom weaves for your trial.');
                      if (msg) onUpdateInspirationStatus(req.id, req.status, undefined, msg);
                    }}
                    className="w-full py-1.5 bg-[#F5EFEB] hover:bg-[#EBDDCF] border border-[#E8DFD4] text-xs font-semibold text-[#2B2625] rounded-lg"
                  >
                    + Send Message to Customer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
