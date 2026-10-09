import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Search, 
  Sparkles, 
  X, 
  SlidersHorizontal, 
  Tag, 
  Bookmark, 
  Heart, 
  Eye, 
  ChevronDown 
} from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface CollectionViewProps {
  products: Product[];
  savedItemIds: string[];
  wishlistIds: string[];
  onSaveForVisit: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onAssistantSearch: () => void;
}

export const CollectionView: React.FC<CollectionViewProps> = ({
  products,
  savedItemIds,
  wishlistIds,
  onSaveForVisit,
  onToggleWishlist,
  onViewDetails,
  onAssistantSearch
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(35000);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
        if (selectedGender !== 'all' && p.gender !== selectedGender) return false;
        if (selectedStyle !== 'all' && p.style !== selectedStyle) return false;
        if (selectedOccasion !== 'all' && !p.occasion.includes(selectedOccasion)) return false;
        if (p.price > maxPrice) return false;
        if (onlyInStock && !p.inStock) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchFabric = p.fabric.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchColor = p.color.toLowerCase().includes(q);
          const matchSub = p.subcategory.toLowerCase().includes(q);
          if (!matchName && !matchFabric && !matchDesc && !matchColor && !matchSub) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, selectedGender, selectedStyle, selectedOccasion, maxPrice, onlyInStock, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedGender('all');
    setSelectedStyle('all');
    setSelectedOccasion('all');
    setMaxPrice(35000);
    setOnlyInStock(false);
    setSearchQuery('');
  };

  const hasActiveFilters = 
    selectedCategory !== 'all' || 
    selectedGender !== 'all' || 
    selectedStyle !== 'all' || 
    selectedOccasion !== 'all' || 
    maxPrice < 35000 || 
    onlyInStock || 
    searchQuery.length > 0;

  return (
    <div id="collection-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left">
      
      {/* Top Banner */}
      <div className="mb-8 pb-6 border-b border-[#E8DFD4] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#781D2A] block mb-1">
            Authentic Handcrafted Weaves
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#2B2625]">
            The Tirumala Collection
          </h1>
          <p className="text-xs sm:text-sm text-[#7A726B] mt-1 max-w-xl">
            Save any garment to your private trial suite. Our master drapers prepare your selection before your store arrival.
          </p>
        </div>

        {/* Style Assistant Shortcut */}
        <button
          onClick={onAssistantSearch}
          className="self-start md:self-auto bg-[#F5EFEB] hover:bg-[#EBDDCF] border border-[#C59B4B]/50 px-4 py-2 rounded-xl text-xs font-semibold text-[#781D2A] transition-all flex items-center gap-2 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-[#C59B4B]" />
          <span>Need Guidance? Ask Style Assistant</span>
        </button>
      </div>

      {/* Search & Quick Controls Bar */}
      <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8DFD4] mb-8 space-y-4 shadow-sm">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-grow max-w-lg">
            <Search className="w-4 h-4 text-[#7A726B] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by fabric (e.g. Silk, Banarasi), color, or style..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-[#E8DFD4] rounded-xl text-xs sm:text-sm text-[#2B2625] placeholder-[#7A726B] focus:outline-none focus:border-[#781D2A]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-[#7A726B] hover:text-[#2B2625]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector & Filter Toggle */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 text-xs text-[#7A726B]">
              <span className="hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-[#E8DFD4] rounded-lg px-2.5 py-2 text-xs font-semibold text-[#2B2625] focus:outline-none focus:border-[#781D2A]"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Filter Toggle Button for Mobile */}
            <button
              onClick={() => setShowFilterDrawer(!showFilterDrawer)}
              className="lg:hidden flex items-center gap-1.5 bg-[#F5EFEB] border border-[#E8DFD4] px-3 py-2 rounded-lg text-xs font-semibold text-[#2B2625]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Desktop Quick Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {[
            { key: 'all', label: 'All Garments' },
            { key: 'women', label: 'Women (Sarees & Lehengas)' },
            { key: 'men', label: 'Men (Kurtas & Sherwanis)' },
            { key: 'kids', label: 'Kids & Junior Heritage' }
          ].map(cat => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 ${
                selectedCategory === cat.key
                  ? 'bg-[#781D2A] text-white shadow-sm'
                  : 'bg-[#F5EFEB] hover:bg-[#EBDDCF] text-[#2B2625]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid with Sidebar Filter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Filter Sidebar (Desktop or Opened Drawer) */}
        <div className={`lg:col-span-3 space-y-6 ${showFilterDrawer ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E8DFD4] space-y-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD4]">
              <div className="flex items-center gap-2 font-serif font-bold text-[#2B2625] text-base">
                <Filter className="w-4 h-4 text-[#781D2A]" />
                <span>Refine Collection</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-[#781D2A] hover:underline font-semibold"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Style Filter */}
            <div className="space-y-2 text-xs">
              <span className="font-bold uppercase tracking-wider text-[#2B2625] block">
                Heritage Style:
              </span>
              <div className="space-y-1.5">
                {[
                  { key: 'all', label: 'All Styles' },
                  { key: 'traditional', label: 'Traditional Handloom' },
                  { key: 'royal-ethnic', label: 'Royal Wedding' },
                  { key: 'festive', label: 'Festive & Ceremony' },
                  { key: 'modern-ethnic', label: 'Modern Ethnic Fusion' },
                  { key: 'casual-ethnic', label: 'Everyday Breathable' }
                ].map(s => (
                  <label key={s.key} className="flex items-center gap-2 cursor-pointer hover:text-[#781D2A]">
                    <input
                      type="radio"
                      name="styleFilter"
                      checked={selectedStyle === s.key}
                      onChange={() => setSelectedStyle(s.key)}
                      className="accent-[#781D2A]"
                    />
                    <span className={selectedStyle === s.key ? 'font-bold text-[#781D2A]' : 'text-[#7A726B]'}>
                      {s.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Occasion Filter */}
            <div className="space-y-2 text-xs pt-3 border-t border-[#E8DFD4]">
              <span className="font-bold uppercase tracking-wider text-[#2B2625] block">
                Occasion:
              </span>
              <div className="space-y-1.5">
                {[
                  { key: 'all', label: 'All Occasions' },
                  { key: 'wedding', label: 'Grand Wedding' },
                  { key: 'reception', label: 'Evening Reception' },
                  { key: 'festival', label: 'Festivals (Diwali / Puja)' },
                  { key: 'engagement', label: 'Engagement Ceremony' },
                  { key: 'ceremony', label: 'Naming & Family Pooja' }
                ].map(occ => (
                  <label key={occ.key} className="flex items-center gap-2 cursor-pointer hover:text-[#781D2A]">
                    <input
                      type="radio"
                      name="occasionFilter"
                      checked={selectedOccasion === occ.key}
                      onChange={() => setSelectedOccasion(occ.key)}
                      className="accent-[#781D2A]"
                    />
                    <span className={selectedOccasion === occ.key ? 'font-bold text-[#781D2A]' : 'text-[#7A726B]'}>
                      {occ.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Max Budget Slider */}
            <div className="space-y-2 text-xs pt-3 border-t border-[#E8DFD4]">
              <div className="flex justify-between items-center">
                <span className="font-bold uppercase tracking-wider text-[#2B2625]">
                  Max Price:
                </span>
                <span className="font-bold text-[#781D2A]">
                  ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min={2000}
                max={35000}
                step={1000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#781D2A]"
              />
              <div className="flex justify-between text-[10px] text-[#7A726B]">
                <span>₹2,000</span>
                <span>₹35,000</span>
              </div>
            </div>

            {/* In-Stock Toggle */}
            <div className="pt-3 border-t border-[#E8DFD4] text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="accent-[#385E48] rounded"
                />
                <span className="text-[#2B2625] font-medium">Ready in Flagship Racks Only</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Product Grid (9 Cols) */}
        <div className="lg:col-span-9 space-y-6">
          <div className="flex items-center justify-between text-xs text-[#7A726B]">
            <span>Showing <strong>{filteredProducts.length}</strong> handcrafted garments</span>
            {hasActiveFilters && (
              <span className="text-[#781D2A] font-semibold">Filtered results</span>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-[#FAF7F2] rounded-2xl border border-dashed border-[#E8DFD4] p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F5EFEB] flex items-center justify-center mx-auto text-[#781D2A]">
                <Search className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#2B2625]">
                  No exact weaves match your current filters.
                </h3>
                <p className="text-xs sm:text-sm text-[#7A726B] mt-1 max-w-sm mx-auto">
                  Try clearing some filter criteria or ask our Style Assistant for customized alternatives.
                </p>
              </div>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-[#781D2A] text-white text-xs font-semibold rounded-lg shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isSavedForVisit={savedItemIds.includes(product.id)}
                  isInWishlist={wishlistIds.includes(product.id)}
                  onSaveForVisit={onSaveForVisit}
                  onToggleWishlist={onToggleWishlist}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
