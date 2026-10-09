import React from 'react';
import { MapPin, Phone, Clock, Mail, ShieldCheck, Sparkles, Calendar, Compass, ExternalLink } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenSchedule: () => void;
  onOpenInspiration: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenSchedule,
  onOpenInspiration
}) => {
  const canonicalAddress = "Near Shivaji Chowk, Narayankhed Road, Jamgi, Aurad Taluk, Bidar District, Karnataka, India";
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Tirumala Cloth Store, ${canonicalAddress}`)}`;
  const mapsDirUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`Tirumala Cloth Store, ${canonicalAddress}`)}`;
  const whatsappUrl = `https://wa.me/919980546374?text=${encodeURIComponent(
    'Hello Srinivas Sir, I would like to know more about Tirumala Cloth Store and the available collection.'
  )}`;

  return (
    <footer id="tirumala-store-footer" className="bg-[#2B2625] text-[#FAF7F2] pt-16 pb-12 border-t border-[#3E3836]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10 text-left">
          
          {/* Col 1: Brand & Heritage */}
          <div className="lg:col-span-4 space-y-4">
            <Logo invert />
            <p className="text-xs sm:text-sm text-[#FAF7F2]/75 leading-relaxed font-light">
              Since 1984, Tirumala Cloth Store in Jamgi, Bidar has brought together the finest authentic Indian weaves, 
              master draping, and personalized store preparation. We bridge convenient digital discovery with 
              the warmth of a real boutique visit.
            </p>
            <div className="flex items-center gap-2.5 text-xs text-[#DFC07A]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>100% Handloom & Pure Silk Assurance</span>
            </div>

            {/* Instagram Link */}
            <div className="pt-2">
              <a 
                href="https://www.instagram.com/tirumala_cloth" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-[#DFC07A] hover:text-white transition-colors bg-white/5 px-3 py-1.5 rounded-lg border border-white/10"
              >
                <span>Follow on Instagram:</span>
                <span className="font-semibold text-white">@tirumala_cloth</span>
                <ExternalLink className="w-3 h-3 text-[#DFC07A]" />
              </a>
            </div>
          </div>

          {/* Col 2: Boutique Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold tracking-wider text-[#DFC07A] uppercase">
              Boutique
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF7F2]/80">
              <li>
                <button onClick={() => onNavigate('collection')} className="hover:text-white transition-colors">
                  Curated Collection
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('style-assistant')} className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Style Assistant</span>
                  <Sparkles className="w-3 h-3 text-[#DFC07A]" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('saved-visit')} className="hover:text-white transition-colors">
                  Save for Visit
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('my-visit')} className="hover:text-white transition-colors">
                  My Visit Hub
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('rewards')} className="hover:text-white transition-colors">
                  Tirumala Rewards (5%)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Leadership / People Behind Tirumala */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold tracking-wider text-[#DFC07A] uppercase">
              The People Behind Tirumala
            </h4>
            <div className="space-y-3 text-xs text-[#FAF7F2]/85">
              <div>
                <span className="block font-medium text-white">Srinivas Kokkulwar</span>
                <span className="text-[11px] text-[#FAF7F2]/60">Founder & Master Draper</span>
              </div>
              <div>
                <span className="block font-medium text-white">Niraj Kokkulwar</span>
                <span className="text-[11px] text-[#FAF7F2]/60">Technology & Digital Management</span>
                <a 
                  href="https://www.instagram.com/niraj_kokkulwar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-[10px] text-[#DFC07A] hover:underline"
                >
                  @niraj_kokkulwar
                </a>
              </div>
              <div>
                <span className="block font-medium text-white">Shiva Kokkulwar</span>
                <span className="text-[11px] text-[#FAF7F2]/60">Business Management</span>
                <a 
                  href="https://www.instagram.com/shiva_kokkulwar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-[10px] text-[#DFC07A] hover:underline"
                >
                  @shiva_kokkulwar
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Canonical Store Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold tracking-wider text-[#DFC07A] uppercase">
              Visit Tirumala
            </h4>
            <div className="space-y-2.5 text-xs text-[#FAF7F2]/85">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#DFC07A] shrink-0 mt-0.5" />
                <span>
                  Near Shivaji Chowk, Narayankhed Road, Jamgi, Aurad Taluk, Bidar District, Karnataka, India
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#DFC07A] shrink-0" />
                <span className="font-medium text-white">OPEN DAILY: 9:00 AM — 9:00 PM</span>
              </div>

              <div className="flex flex-col gap-1 pt-1">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#DFC07A] shrink-0" />
                  <span>Srinivas Kokkulwar: <a href="tel:9980546374" className="hover:text-white font-medium">+91 99805 46374</a></span>
                </div>
                <div className="flex items-center gap-2 pl-6 text-[#FAF7F2]/70 text-[11px]">
                  <span>Alternate: <a href="tel:8660491825" className="hover:text-white">+91 86604 91825</a></span>
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-2 flex flex-col gap-2">
                <a 
                  href={mapsDirUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-[#FAF7F2] px-3 py-2 rounded-lg text-xs font-semibold transition-colors border border-white/10"
                >
                  <Compass className="w-3.5 h-3.5 text-[#DFC07A]" />
                  <span>Get Directions on Google Maps</span>
                </a>

                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#128C7E] text-white px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>WhatsApp the Store</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#FAF7F2]/60">
          <div>
            © 1984–{new Date().getFullYear()} Tirumala Cloth Store. All rights reserved. Handcrafted Heritage Weaves.
          </div>
          <div className="flex items-center gap-4">
            <a href={mapsSearchUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Google Maps Location
            </a>
            <span>•</span>
            <a href="https://www.instagram.com/tirumala_cloth" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Instagram @tirumala_cloth
            </a>
            <span>•</span>
            <span className="hover:text-white">Jamgi, Aurad Taluk, Bidar</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
