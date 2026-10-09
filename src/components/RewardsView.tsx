import React from 'react';
import { 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  ArrowRight, 
  Store, 
  ShieldCheck, 
  Coins 
} from 'lucide-react';
import { RewardTransaction, UserProfile } from '../types';

interface RewardsViewProps {
  user: UserProfile;
  rewardsData: {
    balance: number;
    tier: string;
    history: RewardTransaction[];
  };
  onScheduleVisit: () => void;
  onExploreCollection: () => void;
}

export const RewardsView: React.FC<RewardsViewProps> = ({
  user,
  rewardsData,
  onScheduleVisit,
  onExploreCollection
}) => {
  return (
    <div id="rewards-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left">
      
      {/* Top Banner */}
      <div className="mb-8 pb-6 border-b border-[#E8DFD4] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C59B4B]/15 text-[#781D2A] text-xs font-semibold uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5 text-[#C59B4B]" />
            <span>Tirumala Heritage Privileges</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#2B2625]">
            Tirumala Rewards
          </h1>
          <p className="text-xs sm:text-sm text-[#7A726B] mt-1 max-w-xl">
            Earn 5% in Tirumala Reward Coins whenever you purchase in-store. Redeem directly against your bespoke wedding couture or daily weaves.
          </p>
        </div>

        <button
          onClick={onScheduleVisit}
          className="bg-[#781D2A] hover:bg-[#58121D] text-white px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all shadow-sm flex items-center gap-2"
        >
          <Calendar className="w-4 h-4 text-[#DFC07A]" />
          <span>Plan In-Store Shopping Visit</span>
        </button>
      </div>

      {/* Rewards Status Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
        
        {/* Balance Card */}
        <div className="md:col-span-6 bg-gradient-to-br from-[#781D2A] to-[#58121D] text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 bg-[radial-gradient(#DFC07A_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-widest text-[#DFC07A]">
                Active Balance
              </span>
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#DFC07A] border border-white/20">
                {rewardsData.tier} Member
              </span>
            </div>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-5xl font-serif font-bold text-white">
                {rewardsData.balance.toLocaleString('en-IN')}
              </span>
              <span className="text-sm uppercase tracking-wider text-[#DFC07A] font-semibold">
                Tirumala Coins
              </span>
            </div>

            <p className="text-xs text-[#FAF7F2]/80 mt-2 font-light">
              Equivalent to ₹{rewardsData.balance.toLocaleString('en-IN')} store credit towards your next boutique invoice.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-white/15 flex items-center justify-between text-xs">
            <span>Primary Member: <strong>{user.name}</strong></span>
            <span className="text-[#DFC07A]">1 Coin = ₹1.00 INR</span>
          </div>
        </div>

        {/* Earning Formula & Privileges */}
        <div className="md:col-span-6 bg-[#FAF7F2] rounded-2xl border border-[#E8DFD4] p-6 sm:p-8 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#2B2625] mb-2">
              How Tirumala Rewards Work
            </h3>
            <div className="space-y-2.5 text-xs text-[#2B2625]">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#385E48]/10 text-[#385E48] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  ✓
                </div>
                <span><strong>5% Direct Cashback:</strong> Every in-store trial and purchase earns 5% in digital coins automatically recorded by our store staff.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#385E48]/10 text-[#385E48] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  ✓
                </div>
                <span><strong>Instant Bill Redemption:</strong> Tell the concierge desk to apply your coins at checkout with zero restrictions.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#385E48]/10 text-[#385E48] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  ✓
                </div>
                <span><strong>Priority Fitting Suites:</strong> Gold tier members enjoy complimentary weekend VIP dressing room reservations.</span>
              </div>
            </div>
          </div>

          <button
            onClick={onExploreCollection}
            className="w-full py-2.5 bg-[#F5EFEB] hover:bg-[#EBDDCF] border border-[#E8DFD4] text-[#781D2A] text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <span>Browse Collection & Save for Visit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Transaction History */}
      <div className="space-y-4">
        <h3 className="font-serif text-2xl font-bold text-[#2B2625]">
          Rewards Ledger & In-Store History
        </h3>

        <div className="bg-[#FAF7F2] rounded-2xl border border-[#E8DFD4] overflow-hidden shadow-sm">
          <div className="divide-y divide-[#E8DFD4]">
            {rewardsData.history.map(tx => (
              <div key={tx.id} className="p-4 sm:p-5 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    tx.coins > 0 ? 'bg-[#385E48]/10 text-[#385E48]' : 'bg-[#781D2A]/10 text-[#781D2A]'
                  }`}>
                    <Coins className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#2B2625] block text-sm">
                      {tx.description}
                    </span>
                    <span className="text-[#7A726B] text-[11px]">
                      {new Date(tx.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`font-bold text-sm block ${
                    tx.coins > 0 ? 'text-[#385E48]' : 'text-[#781D2A]'
                  }`}>
                    {tx.coins > 0 ? `+${tx.coins}` : tx.coins} Coins
                  </span>
                  <span className="text-[10px] text-[#7A726B] uppercase font-semibold">
                    {tx.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
