import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  Filter, 
  Bookmark, 
  Eye, 
  Calendar, 
  Check, 
  Tag, 
  RefreshCw,
  HelpCircle
} from 'lucide-react';
import { Product, StyleAssistantQuery } from '../types';
import { api } from '../services/api';

interface StyleAssistantViewProps {
  onSaveForVisit: (product: Product) => void;
  onViewProduct: (product: Product) => void;
  onScheduleVisit: () => void;
  savedItemIds: string[];
}

const SAMPLE_QUERIES = [
  'Show traditional sarees under 15000',
  'Blue kurta for wedding reception',
  'Dress for child\'s naming ceremony',
  'Men\'s festive wear under 5000',
  'Something royal for engagement'
];

export const StyleAssistantView: React.FC<StyleAssistantViewProps> = ({
  onSaveForVisit,
  onViewProduct,
  onScheduleVisit,
  savedItemIds
}) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StyleAssistantQuery | null>(null);

  const handleSearch = async (queryString: string) => {
    if (!queryString.trim()) return;
    setQuery(queryString);
    setLoading(true);
    try {
      const res = await api.searchStyleAssistant(queryString);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="style-assistant-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left">
      
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C59B4B]/15 text-[#781D2A] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#C59B4B]" />
          <span>Curated Heritage Discovery</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif text-[#2B2625]">
          Tirumala Style Assistant
        </h1>
        <p className="text-sm sm:text-base text-[#7A726B] font-light leading-relaxed">
          Tell us what you're dressing for in plain words. Our intelligent stylist parses occasions, fabrics, styles, 
          and budgets to bring you our finest matching boutique garments.
        </p>
      </div>

      {/* Natural Language Query Bar */}
      <div className="max-w-3xl mx-auto mb-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(query);
          }}
          className="relative flex items-center"
        >
          <input
            id="style-assistant-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Traditional silk saree under 15000 or Festive blue kurta..."
            className="w-full pl-5 pr-28 sm:pr-36 py-4 bg-[#FAF7F2] border-2 border-[#E8DFD4] focus:border-[#781D2A] rounded-2xl text-sm sm:text-base text-[#2B2625] placeholder-[#7A726B] shadow-sm focus:outline-none transition-all"
          />
          <button
            id="style-assistant-submit-btn"
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute right-2.5 bg-[#781D2A] hover:bg-[#58121D] disabled:opacity-50 text-white px-5 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow flex items-center gap-2"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin text-[#DFC07A]" />
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#DFC07A]" />
                <span>Search</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Sample Queries */}
        <div className="flex items-center gap-2 mt-3 flex-wrap text-xs text-[#7A726B]">
          <span className="font-semibold text-[#2B2625]">Try asking:</span>
          {SAMPLE_QUERIES.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => handleSearch(sample)}
              className="bg-[#F5EFEB] hover:bg-[#EBDDCF] border border-[#E8DFD4] px-2.5 py-1 rounded-full text-xs text-[#2B2625] transition-colors"
            >
              "{sample}"
            </button>
          ))}
        </div>
      </div>

      {/* Results Presentation */}
      {result && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Assistant Understanding Card */}
          <div className="bg-[#FAF7F2] rounded-2xl border border-[#DFC07A]/40 p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8DFD4] pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#C59B4B]" />
                <h3 className="font-serif text-lg font-bold text-[#2B2625]">
                  Stylist's Understanding & Parameters
                </h3>
              </div>
              <span className="text-xs bg-[#385E48]/10 text-[#385E48] px-3 py-1 rounded-full font-bold">
                {result.results.length} Suitable Matches Found
              </span>
            </div>

            {/* Parsed Chips */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              {result.parsedParameters.category && (
                <span className="bg-[#F5EFEB] border border-[#E8DFD4] px-3 py-1 rounded-lg">
                  Category: <strong className="text-[#781D2A] capitalize">{result.parsedParameters.category}</strong>
                </span>
              )}
              {result.parsedParameters.style && (
                <span className="bg-[#F5EFEB] border border-[#E8DFD4] px-3 py-1 rounded-lg">
                  Style: <strong className="text-[#781D2A] capitalize">{result.parsedParameters.style}</strong>
                </span>
              )}
              {result.parsedParameters.occasion && (
                <span className="bg-[#F5EFEB] border border-[#E8DFD4] px-3 py-1 rounded-lg">
                  Occasion: <strong className="text-[#781D2A] capitalize">{result.parsedParameters.occasion}</strong>
                </span>
              )}
              {result.parsedParameters.maxPrice && (
                <span className="bg-[#F5EFEB] border border-[#E8DFD4] px-3 py-1 rounded-lg">
                  Budget Ceiling: <strong className="text-[#781D2A]">₹{result.parsedParameters.maxPrice.toLocaleString('en-IN')}</strong>
                </span>
              )}
              {result.parsedParameters.color && (
                <span className="bg-[#F5EFEB] border border-[#E8DFD4] px-3 py-1 rounded-lg">
                  Tone: <strong className="text-[#781D2A] capitalize">{result.parsedParameters.color}</strong>
                </span>
              )}
            </div>

            {/* Clarifying Stylist Question if available */}
            {result.clarifyingQuestions && result.clarifyingQuestions.length > 0 && (
              <div className="bg-[#F5EFEB] p-3.5 rounded-xl border border-[#E8DFD4] flex items-start gap-2 text-xs">
                <HelpCircle className="w-4 h-4 text-[#C59B4B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#781D2A]">Stylist Refinement Tip:</span>
                  <p className="text-[#2B2625] mt-0.5">
                    {result.clarifyingQuestions[0]}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Product Matches */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-[#2B2625]">
              Curated Garments for "{result.queryText}"
            </h3>

            {result.results.length === 0 ? (
              <div className="text-center py-12 bg-[#FAF7F2] rounded-xl border border-[#E8DFD4] p-6">
                <p className="text-sm text-[#7A726B]">
                  No exact matches found for that criteria. Try broadening your keywords (e.g. "saree" or "kurta").
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {result.results.map(product => {
                  const isSaved = savedItemIds.includes(product.id);

                  return (
                    <div
                      key={product.id}
                      className="bg-[#FAF7F2] rounded-xl border border-[#E8DFD4] overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between"
                    >
                      <div className="relative aspect-[3/4] bg-[#F5EFEB]">
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-full h-full object-cover" 
                        />
                        <span className="absolute top-3 left-3 bg-[#781D2A] text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded">
                          {product.subcategory}
                        </span>
                      </div>

                      <div className="p-4 space-y-3">
                        <div>
                          <span className="text-[11px] text-[#C59B4B] font-semibold uppercase tracking-wider block">
                            {product.fabric}
                          </span>
                          <h4 
                            onClick={() => onViewProduct(product)}
                            className="font-serif text-base font-bold text-[#2B2625] hover:text-[#781D2A] cursor-pointer line-clamp-1 mt-0.5"
                          >
                            {product.name}
                          </h4>
                          <div className="flex items-baseline justify-between mt-1">
                            <span className="text-base font-bold text-[#781D2A]">
                              ₹{product.price.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[11px] text-[#385E48]">
                              📍 In Store
                            </span>
                          </div>
                        </div>

                        {/* Physical Store First CTAs */}
                        <div className="space-y-2 pt-2 border-t border-[#E8DFD4]">
                          <button
                            onClick={() => onSaveForVisit(product)}
                            className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                              isSaved
                                ? 'bg-[#385E48] text-white'
                                : 'bg-[#781D2A] hover:bg-[#58121D] text-white'
                            }`}
                          >
                            {isSaved ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Saved for Store Visit</span>
                              </>
                            ) : (
                              <>
                                <Bookmark className="w-3.5 h-3.5" />
                                <span>Save for Visit</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => onViewProduct(product)}
                            className="w-full py-1.5 px-3 rounded-lg text-xs font-medium bg-[#F5EFEB] hover:bg-[#EBDDCF] text-[#2B2625] flex items-center justify-center gap-1.5"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#7A726B]" />
                            <span>See It in Store</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Bottom Plan Visit Prompt */}
            <div className="mt-8 bg-[#F5EFEB] p-6 rounded-2xl border border-[#DFC07A]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <h4 className="font-serif text-lg font-bold text-[#781D2A]">
                  Like these recommendations?
                </h4>
                <p className="text-xs text-[#7A726B]">
                  Schedule an appointment and our master stylists will have them steam-pressed for trial in your suite.
                </p>
              </div>
              <button
                onClick={onScheduleVisit}
                className="bg-[#781D2A] hover:bg-[#58121D] text-white px-5 py-2.5 rounded-lg text-xs font-semibold shrink-0 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#DFC07A]" />
                <span>Schedule Visit</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
