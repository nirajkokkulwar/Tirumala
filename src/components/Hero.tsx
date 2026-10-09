import React from 'react';
import { ArrowRight, Calendar, MessageCircle, UploadCloud, MapPin, Clock } from 'lucide-react';
import heroImg from '../assets/images/hero_mens_kurta_1789814299237.jpg';

interface HeroProps {
  onExplore: () => void;
  onPlanVisit: () => void;
  onBringInspiration: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onPlanVisit, onBringInspiration }) => {
  const whatsappUrl = `https://wa.me/919980546374?text=${encodeURIComponent(
    'Hello Srinivas Sir, I would like to know more about Tirumala Cloth Store and the available collection.'
  )}`;

  return (
    <section id="hero-section" className="relative overflow-hidden bg-[#FAF7F2] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#E8DFD4]">
      {/* Subtle traditional architectural arch motif background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#781D2A_1px,transparent_1px)] [background-size:24px_24px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Heritage Badge with Location & Hours */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5EFEB] border border-[#E8DFD4] text-[#781D2A] text-xs font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#C59B4B]" />
              <span>ESTD. 1984 • TIRUMALA CLOTH STORE</span>
              <span className="hidden sm:inline text-[#7A726B] font-normal">•</span>
              <span className="hidden sm:inline text-[11px] text-[#385E48] font-medium flex items-center gap-1">
                <Clock className="w-3 h-3 inline" /> 9 AM – 9 PM Daily
              </span>
            </div>

            {/* Canonical Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#2B2625] leading-[1.12] tracking-tight">
              Clothing That Belongs to Your Story.
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-[#7A726B] font-light max-w-2xl leading-relaxed">
              Discover traditional and contemporary styles, save what you love, and experience them in store. 
              Authentic handlooms, rich textures, and attentive personal boutique hospitality in Jamgi, Bidar.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                id="hero-primary-cta"
                onClick={onExplore}
                className="inline-flex items-center justify-center gap-2.5 bg-[#781D2A] hover:bg-[#58121D] text-white px-7 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-lg active:scale-[0.99]"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 text-[#DFC07A]" />
              </button>

              <button
                id="hero-secondary-cta"
                onClick={onPlanVisit}
                className="inline-flex items-center justify-center gap-2.5 bg-[#F5EFEB] hover:bg-[#EBDDCF] border border-[#C59B4B]/50 text-[#781D2A] px-6 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all shadow-sm"
              >
                <Calendar className="w-4 h-4 text-[#385E48]" />
                <span>Plan a Store Visit</span>
              </button>

              <a
                id="hero-whatsapp-cta"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-xs font-semibold text-[#25D366] hover:text-[#128C7E] bg-white border border-[#25D366]/30 hover:border-[#25D366] transition-all shadow-sm"
                title="Direct WhatsApp with Srinivas Kokkulwar"
              >
                <MessageCircle className="w-4 h-4 fill-[#25D366] text-white" />
                <span>WhatsApp the Store</span>
              </a>
            </div>

            {/* Inspiration Sub-Link */}
            <div className="pt-1">
              <button
                id="hero-inspiration-cta"
                onClick={onBringInspiration}
                className="inline-flex items-center gap-2 text-xs font-medium text-[#7A726B] hover:text-[#781D2A] transition-colors group"
              >
                <UploadCloud className="w-4 h-4 text-[#C59B4B] group-hover:scale-110 transition-transform" />
                <span className="underline underline-offset-4 decoration-[#C59B4B]/60">
                  Have a specific reference or photo? Bring Your Inspiration →
                </span>
              </button>
            </div>

            {/* Store Highlights & Location Note */}
            <div className="pt-6 border-t border-[#E8DFD4] grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
              <div>
                <span className="block font-serif text-xl font-bold text-[#781D2A]">40+ Years</span>
                <span className="text-xs text-[#7A726B]">Master Draper Heritage</span>
              </div>
              <div>
                <span className="block font-serif text-xl font-bold text-[#781D2A]">100% Pure</span>
                <span className="text-xs text-[#7A726B]">Certified Handloom & Silk</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="block font-serif text-xl font-bold text-[#385E48]">Jamgi, Bidar</span>
                <span className="text-xs text-[#7A726B]">Near Shivaji Chowk</span>
              </div>
            </div>
          </div>

          {/* Right Image Presentation: Traditional Indian Men's Kurta Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Frame */}
              <div className="absolute -inset-3 bg-[#F5EFEB] rounded-2xl -rotate-1 border border-[#E8DFD4] -z-10" />
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#DFC07A]/40 aspect-[3/4] bg-[#E8DFD4]">
                <img
                  src={heroImg}
                  alt="Distinguished gentleman in authentic traditional Indian navy blue silk kurta at Tirumala Cloth Store"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Boutique Experience Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#FAF7F2]/95 backdrop-blur-md p-3.5 rounded-xl border border-[#C59B4B]/40 shadow-lg text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#781D2A]">
                        Signature Collection
                      </span>
                      <p className="text-xs font-semibold text-[#2B2625] mt-0.5">
                        Handcrafted Kurtas & Pure Weaves
                      </p>
                      <p className="text-[10px] text-[#7A726B]">
                        Pre-arranged in your personal trial suite
                      </p>
                    </div>
                    <span className="text-[11px] bg-[#385E48] text-white px-2 py-0.5 rounded-full font-medium">
                      Store Trial
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
