import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Check, 
  Bookmark, 
  UploadCloud, 
  MapPin, 
  Phone, 
  ShieldCheck,
  Download
} from 'lucide-react';
import { Appointment, InspirationRequest, SavedVisitItem } from '../types';

interface ScheduleVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedVisitItems: SavedVisitItem[];
  inspirationRequests: InspirationRequest[];
  onBookAppointment: (payload: {
    date: string;
    timeSlot: string;
    visitNotes?: string;
    budgetRange?: string;
    selectedItemIds?: string[];
    inspirationRequestId?: string;
  }) => Promise<Appointment>;
}

const AVAILABLE_SLOTS = [
  '10:30 AM – 11:30 AM',
  '12:00 PM – 01:00 PM',
  '02:30 PM – 03:30 PM',
  '04:00 PM – 05:00 PM',
  '05:30 PM – 06:30 PM (Evening Peak)',
  '07:00 PM – 08:00 PM'
];

export const ScheduleVisitModal: React.FC<ScheduleVisitModalProps> = ({
  isOpen,
  onClose,
  savedVisitItems,
  inspirationRequests,
  onBookAppointment
}) => {
  if (!isOpen) return null;

  // Defaults
  const todayStr = new Date(Date.now() + 86400000).toISOString().split('T')[0]; // Tomorrow
  const [date, setDate] = useState(todayStr);
  const [timeSlot, setTimeSlot] = useState(AVAILABLE_SLOTS[0]);
  const [visitNotes, setVisitNotes] = useState('Wedding shopping for family reception.');
  const [budgetRange, setBudgetRange] = useState('₹5,000–₹15,000');
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>(
    savedVisitItems.map(item => item.id)
  );
  const [inspirationRequestId, setInspirationRequestId] = useState<string>(
    inspirationRequests[0]?.id || ''
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState<Appointment | null>(null);

  const toggleItemSelection = (id: string) => {
    if (selectedItemIds.includes(id)) {
      setSelectedItemIds(selectedItemIds.filter(i => i !== id));
    } else {
      setSelectedItemIds([...selectedItemIds, id]);
    }
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const created = await onBookAppointment({
        date,
        timeSlot,
        visitNotes,
        budgetRange,
        selectedItemIds,
        inspirationRequestId: inspirationRequestId || undefined
      });
      setBookedAppointment(created);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      id="schedule-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6"
      onClick={onClose}
    >
      <div 
        id="schedule-modal-container"
        className="bg-[#FAF7F2] rounded-2xl max-w-2xl w-full border border-[#E8DFD4] shadow-2xl overflow-hidden relative my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E8DFD4] flex items-start justify-between text-left bg-[#F5EFEB]/50">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-[#781D2A] bg-[#781D2A]/10 px-2.5 py-0.5 rounded-full mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Physical Store Consultation</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#2B2625]">
              {bookedAppointment ? 'Consultation Confirmed' : 'Schedule a Boutique Store Visit'}
            </h2>
            <p className="text-xs sm:text-sm text-[#7A726B] mt-0.5">
              {bookedAppointment 
                ? 'Your dressing suite and master stylist have been assigned.'
                : 'Reserve your trial suite so our drapers can prepare your garments prior to arrival.'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#E8DFD4] flex items-center justify-center text-[#2B2625] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Confirmation Screen */}
        {bookedAppointment ? (
          <div className="p-6 sm:p-8 space-y-6 text-left">
            <div className="bg-[#EDF3EF] border border-[#385E48]/30 rounded-xl p-5 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#385E48] text-white flex items-center justify-center shrink-0">
                <Check className="w-6 h-6 text-[#DFC07A]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-[#385E48]">
                  Appointment Successfully Scheduled
                </h3>
                <p className="text-xs text-[#2B2625] leading-relaxed">
                  We look forward to hosting you on <strong className="text-[#781D2A]">{bookedAppointment.date}</strong> at <strong className="text-[#781D2A]">{bookedAppointment.timeSlot}</strong>.
                </p>
                <div className="text-[11px] text-[#7A726B] pt-1">
                  Preparation Status: <span className="text-[#385E48] font-bold">PREPARING (Drapers Assigned)</span>
                </div>
              </div>
            </div>

            {/* Preparation Summary */}
            <div className="bg-[#F5EFEB] rounded-xl p-4 border border-[#E8DFD4] space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#781D2A] block">
                Appointment Summary & Trial Suite Allocation
              </span>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#7A726B] block">Date & Time:</span>
                  <span className="font-semibold text-[#2B2625]">{bookedAppointment.date} • {bookedAppointment.timeSlot}</span>
                </div>
                <div>
                  <span className="text-[#7A726B] block">Boutique Suite:</span>
                  <span className="font-semibold text-[#385E48]">Suite #3 (Silk Draper Suite)</span>
                </div>
                <div>
                  <span className="text-[#7A726B] block">Assigned Draper:</span>
                  <span className="font-semibold text-[#2B2625]">{bookedAppointment.assignedStylist || 'Priya Sundaram'}</span>
                </div>
                <div>
                  <span className="text-[#7A726B] block">Products Prepared:</span>
                  <span className="font-semibold text-[#781D2A]">{bookedAppointment.savedItemIds.length} Garments reserved</span>
                </div>
              </div>

              {bookedAppointment.visitNotes && (
                <div className="pt-2 border-t border-[#E8DFD4] text-xs">
                  <span className="text-[#7A726B] block">Consultation Focus:</span>
                  <span className="text-[#2B2625] italic">"{bookedAppointment.visitNotes}"</span>
                </div>
              )}
            </div>

            {/* Physical Store Directions */}
            <div className="bg-[#FAF7F2] rounded-xl p-4 border border-[#E8DFD4] flex items-start gap-3 text-xs text-[#2B2625]">
              <MapPin className="w-5 h-5 text-[#C59B4B] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-[#781D2A] block">Tirumala Store Location:</span>
                <p className="text-[#7A726B] leading-relaxed">
                  Near Shivaji Chowk, Narayankhed Road, Jamgi, Aurad Taluk, Bidar District, Karnataka.
                </p>
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#385E48] font-semibold pt-0.5">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#781D2A]" /> Srinivas Kokkulwar: +91 99805 46374
                  </span>
                  <span className="text-[#7A726B] font-normal">•</span>
                  <span className="text-[#7A726B]">Open 9:00 AM – 9:00 PM</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="bg-[#781D2A] hover:bg-[#58121D] text-white px-6 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm"
              >
                Done • View in My Visit
              </button>
            </div>
          </div>
        ) : (
          /* Form Screen */
          <form onSubmit={handleBooking} className="p-6 space-y-5 text-left max-h-[80vh] overflow-y-auto">
            
            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#2B2625] block mb-1">
                  Preferred Date:
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-[#E8DFD4] rounded-lg focus:outline-none focus:border-[#781D2A]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#2B2625] block mb-1">
                  Preferred Time Slot:
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-[#E8DFD4] rounded-lg focus:outline-none focus:border-[#781D2A]"
                >
                  {AVAILABLE_SLOTS.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Visit Purpose & Approximate Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#2B2625] block mb-1">
                  Visit Purpose / Notes:
                </label>
                <input
                  type="text"
                  value={visitNotes}
                  onChange={(e) => setVisitNotes(e.target.value)}
                  placeholder="e.g. Wedding shopping, Sangeet reception..."
                  className="w-full text-xs px-3 py-2 bg-white border border-[#E8DFD4] rounded-lg focus:outline-none focus:border-[#781D2A]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#2B2625] block mb-1">
                  Approximate Budget:
                </label>
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-[#E8DFD4] rounded-lg focus:outline-none focus:border-[#781D2A]"
                >
                  <option value="Under ₹3,000">Under ₹3,000</option>
                  <option value="₹3,000–₹5,000">₹3,000–₹5,000</option>
                  <option value="₹5,000–₹15,000">₹5,000–₹15,000</option>
                  <option value="₹15,000–₹30,000">₹15,000–₹30,000</option>
                  <option value="₹30,000+ (Bridal / Royal)">₹30,000+ (Bridal / Royal)</option>
                </select>
              </div>
            </div>

            {/* Products to Try Section (Pre-selected from Save for Visit) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#2B2625]">
                  Select Garments for Trial Suite Preparation:
                </label>
                <span className="text-[11px] text-[#781D2A] font-semibold">
                  {selectedItemIds.length} Selected
                </span>
              </div>

              {savedVisitItems.length === 0 ? (
                <div className="p-4 bg-[#F5EFEB] rounded-lg border border-[#E8DFD4] text-xs text-[#7A726B]">
                  You have no items in "Save for Visit" yet. You can still book an appointment, and our stylist will curate selections upon arrival.
                </div>
              ) : (
                <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                  {savedVisitItems.map(item => {
                    const isSelected = selectedItemIds.includes(item.id);

                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleItemSelection(item.id)}
                        className={`p-2.5 rounded-lg border cursor-pointer flex items-center justify-between transition-all ${
                          isSelected 
                            ? 'bg-[#F5EFEB] border-[#781D2A]' 
                            : 'bg-white border-[#E8DFD4] opacity-75'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img 
                            src={item.product.images[0]} 
                            alt={item.product.name} 
                            className="w-10 h-10 object-cover rounded" 
                          />
                          <div className="text-xs">
                            <span className="font-semibold text-[#2B2625] block line-clamp-1">
                              {item.product.name}
                            </span>
                            <span className="text-[#7A726B]">
                              Size: {item.selectedSize} • ₹{item.product.price.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        <div className={`w-5 h-5 rounded flex items-center justify-center ${
                          isSelected ? 'bg-[#781D2A] text-white' : 'border border-[#E8DFD4]'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Optional Inspiration Request Link */}
            {inspirationRequests.length > 0 && (
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#2B2625] block mb-1">
                  Link Private Inspiration Request (Optional):
                </label>
                <select
                  value={inspirationRequestId}
                  onChange={(e) => setInspirationRequestId(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-[#E8DFD4] rounded-lg focus:outline-none focus:border-[#781D2A]"
                >
                  <option value="">No reference linked</option>
                  {inspirationRequests.map(req => (
                    <option key={req.id} value={req.id}>
                      {req.category} • {req.style} ({req.approxBudget})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-3 border-t border-[#E8DFD4] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-[#7A726B] hover:text-[#2B2625]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-[#781D2A] hover:bg-[#58121D] text-white text-xs font-bold rounded-lg transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
              >
                <Calendar className="w-3.5 h-3.5 text-[#DFC07A]" />
                <span>{isSubmitting ? 'Reserving Suite...' : 'Confirm Store Appointment'}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
