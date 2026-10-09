import React from 'react';
import { Bookmark, Heart, MapPin, Eye, Check, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isSavedForVisit: boolean;
  isInWishlist: boolean;
  onSaveForVisit: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isSavedForVisit,
  isInWishlist,
  onSaveForVisit,
  onToggleWishlist,
  onViewDetails
}) => {
  return (
    <div 
      id={`product-card-${product.id}`}
      className="group bg-[#FAF7F2] rounded-xl border border-[#E8DFD4] hover:border-[#C59B4B]/50 transition-all duration-300 hover:shadow-lg flex flex-col justify-between overflow-hidden"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[3/4] bg-[#F5EFEB] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Subtle Dark Gradient Overlay at bottom for readable badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {product.isFeatured ? (
            <span className="bg-[#781D2A] text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded shadow-sm">
              Featured Weave
            </span>
          ) : product.isNewArrival ? (
            <span className="bg-[#385E48] text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded shadow-sm">
              New Arrival
            </span>
          ) : (
            <span className="bg-[#2B2625]/80 backdrop-blur-sm text-[#DFC07A] text-[10px] uppercase font-semibold px-2 py-0.5 rounded">
              {product.subcategory}
            </span>
          )}

          {/* Quick Wishlist Icon Button (Discreet secondary action) */}
          <button
            id={`wishlist-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`pointer-events-auto w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isInWishlist
                ? 'bg-[#781D2A] text-white shadow-md'
                : 'bg-[#FAF7F2]/90 hover:bg-white text-[#7A726B] hover:text-[#781D2A]'
            }`}
            title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Physical Store Location Tag (Emphasizes physical boutique presence) */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px]">
          <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-medium text-[#FAF7F2]">
            <MapPin className="w-3 h-3 text-[#DFC07A]" />
            <span className="truncate max-w-[150px]">{product.storeLocation.split('—')[0]}</span>
          </span>

          <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-1.5 py-1 rounded text-[10px] font-semibold text-[#DFC07A]">
            <Star className="w-3 h-3 fill-current text-[#DFC07A]" />
            <span>{product.rating}</span>
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-grow justify-between text-left space-y-3">
        <div>
          {/* Fabric & Subtitle */}
          <div className="text-[11px] uppercase tracking-wider text-[#C59B4B] font-semibold truncate">
            {product.fabric}
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => onViewDetails(product)}
            className="font-serif text-base font-bold text-[#2B2625] hover:text-[#781D2A] transition-colors cursor-pointer line-clamp-1 mt-0.5"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Price & Occasion */}
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="text-lg font-bold text-[#781D2A]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#7A726B] line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            <span className="text-[10px] text-[#385E48] font-medium uppercase tracking-wider ml-auto">
              In Store
            </span>
          </div>

          {/* Available Sizes preview */}
          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            <span className="text-[10px] text-[#7A726B]">Sizes:</span>
            {product.availableSizes.slice(0, 3).map(size => (
              <span key={size} className="text-[10px] bg-[#F5EFEB] text-[#2B2625] px-1.5 py-0.5 rounded border border-[#E8DFD4]">
                {size}
              </span>
            ))}
            {product.availableSizes.length > 3 && (
              <span className="text-[10px] text-[#7A726B]">+{product.availableSizes.length - 3}</span>
            )}
          </div>
        </div>

        {/* Action Buttons: Physical Store First */}
        <div className="pt-2 border-t border-[#E8DFD4] space-y-2">
          {/* Primary Action: SAVE FOR VISIT */}
          <button
            id={`save-for-visit-btn-${product.id}`}
            onClick={() => onSaveForVisit(product)}
            className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-2 ${
              isSavedForVisit
                ? 'bg-[#385E48] text-white shadow-sm'
                : 'bg-[#781D2A] hover:bg-[#58121D] text-white shadow-sm hover:shadow'
            }`}
          >
            {isSavedForVisit ? (
              <>
                <Check className="w-4 h-4 text-[#DFC07A]" />
                <span>Saved for Store Visit</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4 text-[#DFC07A]" />
                <span>Save for Visit</span>
              </>
            )}
          </button>

          {/* Secondary Action: See It in Store / View Details */}
          <button
            id={`see-in-store-btn-${product.id}`}
            onClick={() => onViewDetails(product)}
            className="w-full py-2 px-3 rounded-lg text-xs font-medium text-[#2B2625] bg-[#F5EFEB] hover:bg-[#EBDDCF] border border-[#E8DFD4] transition-colors flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-[#7A726B]" />
            <span>See It in Store</span>
          </button>
        </div>
      </div>
    </div>
  );
};
