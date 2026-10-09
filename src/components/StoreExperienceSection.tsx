import React from 'react';
import { MapPin, Phone, Clock, ExternalLink, MessageCircle, Compass, ShieldCheck, Instagram, Sparkles, User } from 'lucide-react';

interface StoreExperienceSectionProps {
  onScheduleVisit: () => void;
  onOpenInspiration: () => void;
}

export const StoreExperienceSection: React.FC<StoreExperienceSectionProps> = ({
  onScheduleVisit,
  onOpenInspiration
}) => {
  const canonicalAddress = "Near Shivaji Chowk, Narayankhed Road, Jamgi, Aurad Taluk, Bidar District, Karnataka, India";
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Tirumala Cloth Store, ${canonicalAddress}`)}`;
  const mapsDirUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`Tirumala Cloth Store, ${canonicalAddress}`)}`;
  
  const generalWhatsappUrl = `https://wa.me/919980546374?text=${encodeURIComponent(
    'Hello Srinivas Sir, I would like to know more about Tirumala Cloth Store and the available collection.'
  )}`;

  const visitWhatsappUrl = `https://wa.me/919980546374?text=${encodeURIComponent(
    'Hello Srinivas Sir, I would like to enquire about my Tirumala store visit.'
  )}`;

  return (
    <div id="store-experience-hub" className="space-y-0">
      
      {/* 1. VISIT TIRUMALA / PHYSICAL STORE LOCATION */}
      <section id="visit-tirumala-section" className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DFD4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#781D2A]">
              Physical Store Experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#2B2625]">
              Visit Tirumala Cloth Store
            </h2>
            <p className="text-sm text-[#7A726B] font-light">
              Experience the unmatched luxury of feeling handwoven fabrics in person. Our master drapers are ready to assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Location & Details Card */}
            <div className="lg:col-span-6 bg-[#F5EFEB] rounded-2xl p-6 sm:p-8 border border-[#E8DFD4] flex flex-col justify-between space-y-6 text-left">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E8DFD4] text-[#781D2A] text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#385E48]" />
                  <span>OPEN DAILY • 9:00 AM — 9:00 PM</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-serif font-bold text-[#2B2625]">
                    Tirumala Cloth Store
                  </h3>
                  <div className="flex items-start gap-3 text-sm text-[#2B2625]/90 leading-relaxed">
                    <MapPin className="w-5 h-5 text-[#781D2A] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#781D2A]">Near Shivaji Chowk, Narayankhed Road</p>
                      <p className="text-[#7A726B]">Jamgi, Aurad Taluk, Bidar District</p>
                      <p className="text-[#7A726B]">Karnataka, India</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#DFC07A]/40 space-y-2">
                  <span className="text-xs font-bold text-[#781D2A] uppercase tracking-wider block">
                    Store Assistance & In-Person Trials
                  </span>
                  <p className="text-xs text-[#7A726B] leading-relaxed">
                    Save items online before your trip, and our specialists will have every piece pressed, 
                    sized, and ready in your private dressing suite upon your arrival.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    id="store-get-directions-btn"
                    href={mapsDirUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#781D2A] hover:bg-[#58121D] text-white py-3 px-4 rounded-xl text-xs font-semibold tracking-wide transition-all shadow-sm"
                  >
                    <Compass className="w-4 h-4 text-[#DFC07A]" />
                    <span>Get Directions</span>
                  </a>

                  <a
                    id="store-whatsapp-btn"
                    href={generalWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-3 px-4 rounded-xl text-xs font-semibold tracking-wide transition-all shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>WhatsApp the Store</span>
                  </a>
                </div>

                <div className="flex items-center justify-between text-xs text-[#7A726B] pt-1 px-1">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#781D2A]" />
                    <span>Primary: <a href="tel:9980546374" className="text-[#781D2A] font-bold hover:underline">9980546374</a></span>
                  </div>
                  <span>Alternate: <a href="tel:8660491825" className="text-[#781D2A] font-medium hover:underline">8660491825</a></span>
                </div>
              </div>
            </div>

            {/* Right: Interactive Architectural / Map Card */}
            <div className="lg:col-span-6 bg-[#F5EFEB] rounded-2xl p-6 sm:p-8 border border-[#E8DFD4] flex flex-col justify-between text-left relative overflow-hidden">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#781D2A]">
                    Interactive Landmark Guide
                  </span>
                  <span className="text-[11px] bg-[#385E48]/10 text-[#385E48] font-semibold px-2 py-0.5 rounded">
                    Jamgi Hub
                  </span>
                </div>

                <div className="relative rounded-xl overflow-hidden border border-[#E8DFD4] bg-[#FAF7F2] p-6 space-y-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#781D2A] text-white flex items-center justify-center shrink-0 shadow">
                      <MapPin className="w-5 h-5 text-[#DFC07A]" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-base text-[#2B2625]">
                        Tirumala Landmark Position
                      </h4>
                      <p className="text-xs text-[#7A726B]">
                        Located on Narayankhed Road, right near Shivaji Chowk
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-3 rounded-lg bg-[#F5EFEB] border border-[#E8DFD4]">
                      <span className="block font-bold text-[#781D2A]">Shivaji Chowk</span>
                      <span className="text-[11px] text-[#7A726B]">Key junction in Jamgi</span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#F5EFEB] border border-[#E8DFD4]">
                      <span className="block font-bold text-[#781D2A]">Narayankhed Road</span>
                      <span className="text-[11px] text-[#7A726B]">Direct arterial road</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#7A726B] leading-relaxed pt-1">
                    Ample street-side parking and convenient access for families visiting from Aurad, 
                    Bidar town, Narayankhed, and surrounding taluks.
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <a
                  id="google-maps-view-btn"
                  href={mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FAF7F2] text-[#2B2625] border border-[#C59B4B]/40 hover:border-[#781D2A] py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  <span>Open in Google Maps Application</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#C59B4B]" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. TIRUMALA CONCIERGE (PERSONAL ASSISTANCE) */}
      <section id="concierge-section" className="py-14 sm:py-16 bg-[#F5EFEB] border-b border-[#E8DFD4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAF7F2] rounded-2xl p-8 sm:p-12 border border-[#DFC07A]/50 shadow-sm text-center md:text-left flex flex-col lg:flex-row items-center justify-between gap-8">
            
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#781D2A]/10 text-[#781D2A] text-xs font-semibold">
                <MessageCircle className="w-3.5 h-3.5 text-[#781D2A]" />
                <span>Direct Boutique Consultation</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2B2625]">
                Tirumala Concierge Desk
              </h3>
              <p className="text-sm text-[#7A726B] leading-relaxed">
                Need help choosing an outfit for a family wedding or festival? 
                Speak directly with <strong className="text-[#2B2625]">Srinivas Kokkulwar</strong> and our senior draper team 
                to discuss fabric availability, custom tailoring, or sizing before your store visit.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <a
                id="concierge-whatsapp-btn"
                href={visitWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3.5 rounded-xl text-xs font-bold tracking-wide transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp (+91 99805 46374)</span>
              </a>

              <a
                id="concierge-call-btn"
                href="tel:9980546374"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F5EFEB] border border-[#E8DFD4] text-[#2B2625] px-5 py-3.5 rounded-xl text-xs font-semibold transition-colors"
              >
                <Phone className="w-4 h-4 text-[#781D2A]" />
                <span>Call Store</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 3. THE PEOPLE BEHIND TIRUMALA (LEADERSHIP) */}
      <section id="leadership-section" className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DFD4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#781D2A]">
              Trust & Craftsmanship
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#2B2625]">
              The People Behind Tirumala
            </h2>
            <p className="text-sm text-[#7A726B] font-light">
              Family-owned and rooted in Jamgi for four decades, guided by personal attention and textile excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Founder: Srinivas Kokkulwar */}
            <div className="bg-[#F5EFEB] rounded-xl p-6 border border-[#E8DFD4] text-left flex flex-col justify-between space-y-4 hover:border-[#DFC07A] transition-colors">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#781D2A]/10 border border-[#781D2A]/20 flex items-center justify-center text-[#781D2A]">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#2B2625]">
                    Srinivas Kokkulwar
                  </h3>
                  <span className="text-xs font-semibold text-[#781D2A]">
                    Founder & Master Draper
                  </span>
                </div>
                <p className="text-xs text-[#7A726B] leading-relaxed">
                  Founded Tirumala Cloth Store with a commitment to pure weaves and personal relationship with every customer.
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8DFD4] flex items-center justify-between text-xs">
                <span className="text-[#7A726B]">Primary Contact:</span>
                <a href="tel:9980546374" className="font-bold text-[#781D2A] hover:underline">
                  +91 99805 46374
                </a>
              </div>
            </div>

            {/* Tech: Niraj Kokkulwar */}
            <div className="bg-[#F5EFEB] rounded-xl p-6 border border-[#E8DFD4] text-left flex flex-col justify-between space-y-4 hover:border-[#DFC07A] transition-colors">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#385E48]/10 border border-[#385E48]/20 flex items-center justify-center text-[#385E48]">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#2B2625]">
                    Niraj Kokkulwar
                  </h3>
                  <span className="text-xs font-semibold text-[#385E48]">
                    Technology & Digital Management
                  </span>
                </div>
                <p className="text-xs text-[#7A726B] leading-relaxed">
                  Steering Tirumala’s modern digital store experience, pre-visit preparation workflows, and customer digital touchpoints.
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8DFD4] flex items-center justify-between text-xs">
                <span className="text-[#7A726B]">Instagram:</span>
                <a 
                  href="https://www.instagram.com/niraj_kokkulwar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-semibold text-[#781D2A] hover:underline flex items-center gap-1"
                >
                  <span>@niraj_kokkulwar</span>
                  <ExternalLink className="w-3 h-3 text-[#C59B4B]" />
                </a>
              </div>
            </div>

            {/* Business: Shiva Kokkulwar */}
            <div className="bg-[#F5EFEB] rounded-xl p-6 border border-[#E8DFD4] text-left flex flex-col justify-between space-y-4 hover:border-[#DFC07A] transition-colors">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#C59B4B]/15 border border-[#C59B4B]/30 flex items-center justify-center text-[#C59B4B]">
                  <ShieldCheck className="w-6 h-6 text-[#781D2A]" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#2B2625]">
                    Shiva Kokkulwar
                  </h3>
                  <span className="text-xs font-semibold text-[#781D2A]">
                    Business Management
                  </span>
                </div>
                <p className="text-xs text-[#7A726B] leading-relaxed">
                  Managing supplier quality, handloom procurement from authentic Indian craft clusters, and in-store operations.
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8DFD4] flex items-center justify-between text-xs">
                <span className="text-[#7A726B]">Instagram:</span>
                <a 
                  href="https://www.instagram.com/shiva_kokkulwar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-semibold text-[#781D2A] hover:underline flex items-center gap-1"
                >
                  <span>@shiva_kokkulwar</span>
                  <ExternalLink className="w-3 h-3 text-[#C59B4B]" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. INSTAGRAM FEATURE SECTION */}
      <section id="instagram-showcase-section" className="py-14 sm:py-16 bg-[#F5EFEB] border-b border-[#E8DFD4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#781D2A]">
              Social & Community
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#2B2625]">
              Follow Our Journey on Instagram
            </h2>
            <p className="text-xs sm:text-sm text-[#7A726B] max-w-lg mx-auto">
              New arrivals, authentic handloom weaves, draping tutorials, and glimpses from inside our Jamgi boutique.
            </p>
          </div>

          <div>
            <a
              id="instagram-official-btn"
              href="https://www.instagram.com/tirumala_cloth"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FAF7F2] hover:bg-white text-[#2B2625] px-6 py-3 rounded-xl border border-[#DFC07A]/50 text-xs font-bold transition-all shadow-sm hover:shadow"
            >
              <Instagram className="w-4 h-4 text-[#781D2A]" />
              <span>Connect on Instagram: @tirumala_cloth</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#C59B4B]" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
