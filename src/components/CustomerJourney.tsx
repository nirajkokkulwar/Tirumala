import React from 'react';
import { 
  Compass, 
  Sparkles, 
  Bookmark, 
  Calendar, 
  CheckCircle2, 
  Store, 
  Award,
  ArrowRight
} from 'lucide-react';

interface CustomerJourneyProps {
  onExplore: () => void;
  onAssistant: () => void;
  onSchedule: () => void;
}

export const CustomerJourney: React.FC<CustomerJourneyProps> = ({
  onExplore,
  onAssistant,
  onSchedule
}) => {
  const steps = [
    {
      num: '01',
      title: 'Discover',
      desc: 'Explore clothing curated by Tirumala across sarees, kurtas, bandhgalas & junior ensembles.',
      icon: Compass,
      color: 'text-[#781D2A]',
      bg: 'bg-[#781D2A]/10'
    },
    {
      num: '02',
      title: 'Find Your Style',
      desc: 'Use fine-tuned filters or our intuitive Tirumala Style Assistant to pinpoint your exact occasion.',
      icon: Sparkles,
      color: 'text-[#C59B4B]',
      bg: 'bg-[#C59B4B]/15'
    },
    {
      num: '03',
      title: 'Save for Visit',
      desc: 'Wishlist pieces you admire, or tag items specifically to be placed in your private fitting room.',
      icon: Bookmark,
      color: 'text-[#781D2A]',
      bg: 'bg-[#781D2A]/10'
    },
    {
      num: '04',
      title: 'Plan',
      desc: 'Schedule a physical store appointment at your preferred date, time, and budget consultation.',
      icon: Calendar,
      color: 'text-[#385E48]',
      bg: 'bg-[#385E48]/10'
    },
    {
      num: '05',
      title: 'Prepare',
      desc: 'Our master drapers inspect and prepare your selected garments, checking sizes and alternatives.',
      icon: CheckCircle2,
      color: 'text-[#385E48]',
      bg: 'bg-[#385E48]/10'
    },
    {
      num: '06',
      title: 'Visit',
      desc: 'Walk into Tirumala Cloth Store. Your garments are ready for trial in a dedicated suite.',
      icon: Store,
      color: 'text-[#781D2A]',
      bg: 'bg-[#781D2A]/10'
    },
    {
      num: '07',
      title: 'Reward',
      desc: 'Earn 5% Tirumala Reward Coins on in-store purchases and enjoy seamless lifetime privileges.',
      icon: Award,
      color: 'text-[#C59B4B]',
      bg: 'bg-[#C59B4B]/15'
    }
  ];

  return (
    <section id="customer-journey-section" className="py-16 sm:py-20 bg-[#F5EFEB] border-b border-[#E8DFD4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#781D2A]">
            The Boutique Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#2B2625]">
            From Digital Discovery to the Physical Fitting Room
          </h2>
          <p className="text-sm sm:text-base text-[#7A726B] font-light leading-relaxed">
            We don’t just sell clothes online. We make your physical store experience seamless, 
            personalized, and prepared before you even step through our doors.
          </p>
        </div>

        {/* Visual Journey Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 lg:gap-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-[#FAF7F2] rounded-xl p-5 border border-[#E8DFD4] relative hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono font-bold text-[#C59B4B] tracking-wider">
                      {step.num}
                    </span>
                    <div className={`w-8 h-8 rounded-lg ${step.bg} flex items-center justify-center ${step.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#2B2625] mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[#7A726B] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Subtle indicator arrow between steps on desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                    <span className="text-[#C59B4B] text-xs font-bold">›</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Banner */}
        <div className="mt-12 bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-[#DFC07A]/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif text-xl font-bold text-[#781D2A]">
              Planning to visit Tirumala this week?
            </h4>
            <p className="text-xs sm:text-sm text-[#7A726B]">
              Browse our collection, tap <span className="font-semibold text-[#781D2A]">"Save for Visit"</span>, and our master stylists will prepare your selection.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onAssistant}
              className="px-4 py-2.5 bg-[#F5EFEB] hover:bg-[#EBDDCF] border border-[#E8DFD4] text-[#2B2625] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C59B4B]" />
              <span>Ask Style Assistant</span>
            </button>

            <button
              onClick={onSchedule}
              className="px-5 py-2.5 bg-[#781D2A] hover:bg-[#58121D] text-white text-xs font-semibold rounded-lg transition-all shadow-sm flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-[#DFC07A]" />
              <span>Schedule Boutique Visit</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
