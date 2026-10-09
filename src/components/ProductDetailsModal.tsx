import React, { useState, useEffect } from 'react';
import { 
  X, 
  Bookmark, 
  Heart, 
  MapPin, 
  Check, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  Star, 
  Clock,
  Shirt,
  Info,
  MessageCircle
} from 'lucide-react';
import { Product } from '../types';
import { api } from '../services/api';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  isSavedForVisit: boolean;
  isInWishlist: boolean;
  onSaveForVisit: (product: Product, selectedSize?: string, customerNote?: string) => void;
  onToggleWishlist: (product: Product) => void;
  onScheduleVisit: () => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
  isSavedForVisit,
  isInWishlist,
  onSaveForVisit,
  onToggleWishlist,
  onScheduleVisit,
  onSelectProduct
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.availableSizes[0]);
  const [customerNote, setCustomerNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loadingRecs, setLoadingRecs] = useState(false);

  useEffect(() => {
    setSelectedImage(product.images[0]);
    setSelectedSize(product.availableSizes[0]);
    setCustomerNote('');
    setShowNoteInput(false);

    // Fetch rule-based recommendations: "You May Also Like"
    setLoadingRecs(true);
    api.getRecommendations(product.id)
      .then(recs => setRecommendations(recs))
      .catch(err => console.error(err))
      .finally(() => setLoadingRecs(false));
  }, [product]);

  return (
    <div 
      id="product-details-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6"
      onClick={onClose}
    >
      <div 
        id="product-details-modal-container"
        className="bg-[#FAF7F2] rounded-2xl max-w-4xl w-full border border-[#E8DFD4] shadow-2xl overflow-hidden relative my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#FAF7F2]/80 backdrop-blur-sm hover:bg-[#F5EFEB] border border-[#E8DFD4] flex items-center justify-center text-[#2B2625] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Left: Photography Stage */}
          <div className="md:col-span-6 bg-[#F5EFEB] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E8DFD4]">
            <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-[#E8DFD4] shadow-inner">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 bg-[#781D2A] text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded shadow-sm">
                {product.subcategory}
              </span>
            </div>

            {/* Thumbnail selector if multiple images */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImage === img ? 'border-[#781D2A] shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Store Location Notice */}
            <div className="mt-4 bg-[#FAF7F2] p-3 rounded-lg border border-[#E8DFD4] flex items-start gap-2.5 text-xs text-[#2B2625]">
              <MapPin className="w-4 h-4 text-[#C59B4B] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#781D2A]">Physical Store Location:</span>
                <p className="text-[#7A726B] mt-0.5">{product.storeLocation}</p>
              </div>
            </div>
          </div>

          {/* Right: Details & Physical Store Consultation */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between text-left space-y-6 max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#C59B4B]">
                  {product.category}’s Couture • {product.style.replace('-', ' ')}
                </span>
                <div className="flex items-center gap-1 text-xs text-[#781D2A] font-semibold bg-[#F5EFEB] px-2 py-0.5 rounded">
                  <Star className="w-3.5 h-3.5 fill-current text-[#DFC07A]" />
                  <span>{product.rating}</span>
                  <span className="text-[#7A726B] font-normal">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2B2625] mt-2">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-2xl font-bold text-[#781D2A]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#7A726B] line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs bg-[#385E48]/10 text-[#385E48] font-semibold px-2 py-0.5 rounded">
                  Available in Boutique
                </span>
              </div>

              {/* Fabric & Craft details */}
              <div className="mt-4 p-3.5 rounded-xl bg-[#F5EFEB] border border-[#E8DFD4] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#7A726B]">Fabric & Weave:</span>
                  <span className="font-semibold text-[#2B2625]">{product.fabric}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#7A726B]">Primary Color:</span>
                  <span className="font-semibold text-[#2B2625]">{product.color}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#7A726B]">Occasions:</span>
                  <span className="font-semibold text-[#781D2A] capitalize">
                    {product.occasion.join(', ')}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mt-4 space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A726B]">
                  Draper Notes & Weave Heritage
                </h4>
                <p className="text-xs sm:text-sm text-[#2B2625] leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Size Selector */}
              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2B2625]">
                    Select Size for Trial Room:
                  </label>
                  <span className="text-[11px] text-[#C59B4B] underline cursor-pointer">
                    Boutique Sizing Guide
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.availableSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                        selectedSize === size
                          ? 'bg-[#781D2A] text-white border-[#781D2A] shadow-sm'
                          : 'bg-[#FAF7F2] text-[#2B2625] border-[#E8DFD4] hover:bg-[#F5EFEB]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Note for Boutique Staff */}
              <div className="mt-4">
                {!showNoteInput ? (
                  <button
                    onClick={() => setShowNoteInput(true)}
                    className="text-xs text-[#781D2A] hover:underline font-medium flex items-center gap-1"
                  >
                    <span>+ Add request note for stylist (e.g. keep matching dupatta ready)</span>
                  </button>
                ) : (
                  <div className="space-y-1.5 animate-in fade-in">
                    <label className="text-xs font-medium text-[#7A726B]">
                      Note for Tirumala Drapers:
                    </label>
                    <input
                      type="text"
                      value={customerNote}
                      onChange={(e) => setCustomerNote(e.target.value)}
                      placeholder="e.g. Keep size 40 and 42 ready for trial, prefer matching shawl"
                      className="w-full px-3 py-2 text-xs bg-white border border-[#E8DFD4] rounded-lg focus:outline-none focus:border-[#781D2A]"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Physical-Store First CTAs */}
            <div className="pt-4 border-t border-[#E8DFD4] space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* PRIMARY CTA: Save for Visit */}
                <button
                  id="modal-save-for-visit-btn"
                  onClick={() => onSaveForVisit(product, selectedSize, customerNote)}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-2 ${
                    isSavedForVisit
                      ? 'bg-[#385E48] text-white shadow-md'
                      : 'bg-[#781D2A] hover:bg-[#58121D] text-white shadow-md hover:shadow-lg'
                  }`}
                >
                  {isSavedForVisit ? (
                    <>
                      <Check className="w-4 h-4 text-[#DFC07A]" />
                      <span>Ready for Next Store Visit</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4 text-[#DFC07A]" />
                      <span>Save for Visit</span>
                    </>
                  )}
                </button>

                {/* Secondary CTA: Plan / Schedule Store Visit */}
                <button
                  id="modal-plan-visit-btn"
                  onClick={() => {
                    onClose();
                    onScheduleVisit();
                  }}
                  className="w-full py-3 px-4 rounded-xl text-xs font-semibold tracking-wide bg-[#F5EFEB] hover:bg-[#EBDDCF] border border-[#C59B4B]/40 text-[#781D2A] transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#385E48]" />
                  <span>Book Trial Room Visit</span>
                </button>
              </div>

              {/* Wishlist Toggle Button & WhatsApp Concierge Enquiry */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1">
                <button
                  onClick={() => onToggleWishlist(product)}
                  className="inline-flex items-center gap-1.5 text-xs text-[#7A726B] hover:text-[#781D2A] transition-colors"
                >
                  <Heart className={`w-3.5 h-3.5 ${isInWishlist ? 'fill-[#781D2A] text-[#781D2A]' : ''}`} />
                  <span>{isInWishlist ? 'Saved in Personal Wishlist' : 'Add to Wishlist'}</span>
                </button>

                <a
                  id="product-whatsapp-inquiry-btn"
                  href={`https://wa.me/919980546374?text=${encodeURIComponent(
                    `Hello Srinivas Sir, I am interested in "${product.name}" (₹${product.price}) and would like to know more for my store visit.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#25D366] hover:text-[#128C7E] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-[#25D366] text-white" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>

            {/* Rule-Based Recommendations: "You May Also Like" */}
            {recommendations.length > 0 && (
              <div className="pt-4 border-t border-[#E8DFD4] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-serif font-bold text-[#2B2625]">
                    You May Also Like
                  </span>
                  <span className="text-[10px] text-[#C59B4B] font-semibold uppercase tracking-wider">
                    Curated Pairings
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {recommendations.slice(0, 3).map(rec => (
                    <div
                      key={rec.id}
                      onClick={() => onSelectProduct(rec)}
                      className="group/rec bg-[#F5EFEB] p-2 rounded-lg border border-[#E8DFD4] hover:border-[#781D2A] cursor-pointer transition-all text-left"
                    >
                      <div className="aspect-[3/4] rounded-md overflow-hidden bg-white mb-1.5">
                        <img 
                          src={rec.images[0]} 
                          alt={rec.name} 
                          className="w-full h-full object-cover group-hover/rec:scale-105 transition-transform" 
                        />
                      </div>
                      <h5 className="text-[11px] font-semibold text-[#2B2625] truncate">{rec.name}</h5>
                      <span className="text-[10px] font-bold text-[#781D2A]">
                        ₹{rec.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
