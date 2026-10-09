import React, { useState } from 'react';
import { 
  X, 
  UploadCloud, 
  Lock, 
  ShieldCheck, 
  Image as ImageIcon, 
  Check, 
  Calendar,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { Appointment } from '../types';

interface BringInspirationModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
  onSubmit: (payload: {
    imageUrl: string;
    category: string;
    gender: string;
    style: string;
    approxBudget: string;
    preferredColor: string;
    description: string;
    preferredVisitDate: string;
    appointmentId?: string;
  }) => Promise<void>;
}

// Sample inspiration reference presets for quick testing
const INSPIRATION_PRESETS = [
  {
    name: 'Royal Heritage Brocade Sherwani',
    url: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=1000&q=80',
    category: 'men',
    style: 'traditional',
    budget: '₹15,000–₹25,000',
    color: 'Ivory & Gold',
    desc: 'Looking for a regal Banarasi brocade sherwani for my brother’s wedding.'
  },
  {
    name: 'Temple Zari Kanchipuram Silk Saree',
    url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
    category: 'women',
    style: 'traditional',
    budget: '₹15,000–₹20,000',
    color: 'Crimson Maroon & Temple Gold',
    desc: 'Looking for authentic Korvai temple border pure silk saree for engagement pooja.'
  },
  {
    name: 'Handcrafted Chanderi Silk Kurta & Jacket',
    url: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80',
    category: 'men',
    style: 'festive',
    budget: '₹3,000–₹5,000',
    color: 'Sage Green & Cream',
    desc: 'Need a comfortable layered ensemble for an outdoor sangeet reception.'
  }
];

export const BringInspirationModal: React.FC<BringInspirationModalProps> = ({
  isOpen,
  onClose,
  appointments,
  onSubmit
}) => {
  if (!isOpen) return null;

  const [imageUrl, setImageUrl] = useState(INSPIRATION_PRESETS[0].url);
  const [category, setCategory] = useState<'men' | 'women' | 'kids'>('men');
  const [gender, setGender] = useState('men');
  const [style, setStyle] = useState('traditional');
  const [approxBudget, setApproxBudget] = useState('₹2,000–₹3,000');
  const [preferredColor, setPreferredColor] = useState('Cream / White with Gold');
  const [description, setDescription] = useState('Looking for something similar to this for a family wedding.');
  const [preferredVisitDate, setPreferredVisitDate] = useState('Upcoming Saturday, 5:30 PM');
  const [appointmentId, setAppointmentId] = useState<string>(appointments[0]?.id || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [previewError, setPreviewError] = useState('');

  const handleApplyPreset = (preset: typeof INSPIRATION_PRESETS[0]) => {
    setImageUrl(preset.url);
    setCategory(preset.category as any);
    setGender(preset.category);
    setStyle(preset.style);
    setApproxBudget(preset.budget);
    setPreferredColor(preset.color);
    setDescription(preset.desc);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        setPreviewError('Please choose an image under 8MB');
        return;
      }
      setPreviewError('');
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({
        imageUrl,
        category,
        gender,
        style,
        approxBudget,
        preferredColor,
        description,
        preferredVisitDate,
        appointmentId: appointmentId || undefined
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1600);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      id="inspiration-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6"
      onClick={onClose}
    >
      <div
        id="inspiration-modal-container"
        className="bg-[#FAF7F2] rounded-2xl max-w-2xl w-full border border-[#E8DFD4] shadow-2xl overflow-hidden relative my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E8DFD4] flex items-start justify-between text-left bg-[#F5EFEB]/50">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-[#781D2A] bg-[#781D2A]/10 px-2.5 py-0.5 rounded-full mb-1">
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Private Stylist Consultation</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#2B2625]">
              Bring Your Inspiration
            </h2>
            <p className="text-xs sm:text-sm text-[#7A726B] mt-1">
              Show us what you're looking for. We'll help you find something that feels right for you.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#E8DFD4] flex items-center justify-center text-[#2B2625] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-[#385E48]/15 text-[#385E48] rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#2B2625]">
              Inspiration Request Received!
            </h3>
            <p className="text-xs sm:text-sm text-[#7A726B] max-w-md mx-auto">
              Our senior styling team will review your reference and curate matching weaves and styles for your upcoming visit.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 text-left max-h-[80vh] overflow-y-auto">
            
            {/* Privacy Guarantee Pill */}
            <div className="flex items-center gap-2 bg-[#EDF3EF] p-3 rounded-lg border border-[#385E48]/20 text-xs text-[#385E48]">
              <Lock className="w-4 h-4 text-[#385E48] shrink-0" />
              <span>
                <strong>Strict Privacy Guarantee:</strong> Your reference image is confidential. It will NEVER appear in community feeds or public galleries.
              </span>
            </div>

            {/* Image Preview & Upload Stage */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#2B2625] block">
                Reference Image:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                {/* Preview Box */}
                <div className="sm:col-span-4 aspect-[4/3] rounded-xl overflow-hidden bg-[#F5EFEB] border border-[#E8DFD4] relative shadow-inner">
                  <img src={imageUrl} alt="Inspiration preview" className="w-full h-full object-cover" />
                </div>

                {/* Upload & Presets */}
                <div className="sm:col-span-8 space-y-2.5">
                  <label className="flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-dashed border-[#C59B4B] bg-white hover:bg-[#FAF7F2] rounded-xl text-xs font-semibold text-[#781D2A] cursor-pointer transition-all">
                    <ImageIcon className="w-4 h-4 text-[#C59B4B]" />
                    <span>Upload Your Reference Photo</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>

                  {previewError && (
                    <p className="text-[11px] text-red-600">{previewError}</p>
                  )}

                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#7A726B] block mb-1">
                      Or select a sample consultation reference:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {INSPIRATION_PRESETS.map((p, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleApplyPreset(p)}
                          className="text-[10px] bg-[#F5EFEB] hover:bg-[#EBDDCF] border border-[#E8DFD4] px-2 py-1 rounded text-[#2B2625]"
                        >
                          {p.name.split(' ')[0]} {p.name.split(' ')[1]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Category & Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#2B2625] block mb-1">
                  Category:
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value as any);
                    setGender(e.target.value);
                  }}
                  className="w-full text-xs px-3 py-2 bg-white border border-[#E8DFD4] rounded-lg focus:outline-none focus:border-[#781D2A]"
                >
                  <option value="men">Men's Apparel</option>
                  <option value="women">Women's Couture & Sarees</option>
                  <option value="kids">Kids & Junior Heritage</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#2B2625] block mb-1">
                  Style Preference:
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-[#E8DFD4] rounded-lg focus:outline-none focus:border-[#781D2A]"
                >
                  <option value="traditional">Traditional & Temple Weave</option>
                  <option value="royal-ethnic">Royal Wedding Ensemble</option>
                  <option value="festive">Festive & Function</option>
                  <option value="modern-ethnic">Modern Ethnic & Fusion</option>
                  <option value="casual-ethnic">Casual Everyday Elegance</option>
                </select>
              </div>
            </div>

            {/* Budget & Preferred Color */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#2B2625] block mb-1">
                  Approximate Budget:
                </label>
                <input
                  type="text"
                  value={approxBudget}
                  onChange={(e) => setApproxBudget(e.target.value)}
                  placeholder="e.g. ₹2,000–₹3,000 or ₹10,000+"
                  className="w-full text-xs px-3 py-2 bg-white border border-[#E8DFD4] rounded-lg focus:outline-none focus:border-[#781D2A]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#2B2625] block mb-1">
                  Preferred Color Tone:
                </label>
                <input
                  type="text"
                  value={preferredColor}
                  onChange={(e) => setPreferredColor(e.target.value)}
                  placeholder="e.g. Cream / Maroon / Forest Green"
                  className="w-full text-xs px-3 py-2 bg-white border border-[#E8DFD4] rounded-lg focus:outline-none focus:border-[#781D2A]"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#2B2625] block mb-1">
                Tell Us What You're Looking For:
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Looking for something similar to this for a wedding. Want breathable fabric with subtle gold zari..."
                className="w-full text-xs px-3 py-2 bg-white border border-[#E8DFD4] rounded-lg focus:outline-none focus:border-[#781D2A]"
                required
              />
            </div>

            {/* Preferred Visit Date & Optional Appointment Link */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#2B2625] block mb-1">
                  Preferred Store Visit Timing:
                </label>
                <input
                  type="text"
                  value={preferredVisitDate}
                  onChange={(e) => setPreferredVisitDate(e.target.value)}
                  placeholder="e.g. Upcoming Saturday afternoon"
                  className="w-full text-xs px-3 py-2 bg-white border border-[#E8DFD4] rounded-lg focus:outline-none focus:border-[#781D2A]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#2B2625] block mb-1">
                  Link to Scheduled Appointment:
                </label>
                <select
                  value={appointmentId}
                  onChange={(e) => setAppointmentId(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-[#E8DFD4] rounded-lg focus:outline-none focus:border-[#781D2A]"
                >
                  <option value="">No appointment yet (Review first)</option>
                  {appointments.map(a => (
                    <option key={a.id} value={a.id}>
                      {a.date} ({a.timeSlot})
                    </option>
                  ))}
                </select>
              </div>
            </div>

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
                <Sparkles className="w-3.5 h-3.5 text-[#DFC07A]" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Inspiration Request'}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
