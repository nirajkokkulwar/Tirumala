import React from 'react';
import { 
  UploadCloud, 
  Lock, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { InspirationRequest } from '../types';

interface MyRequestsViewProps {
  requests: InspirationRequest[];
  onOpenNewRequest: () => void;
  onScheduleVisit: () => void;
}

export const MyRequestsView: React.FC<MyRequestsViewProps> = ({
  requests,
  onOpenNewRequest,
  onScheduleVisit
}) => {
  return (
    <div id="my-requests-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left">
      
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-[#E8DFD4] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C59B4B]/15 text-[#781D2A] text-xs font-semibold uppercase tracking-wider mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>Private Consultations</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#2B2625]">
            My Inspiration Requests
          </h1>
          <p className="text-xs sm:text-sm text-[#7A726B] mt-1 max-w-xl">
            Track private styling references you submitted. Our master drapers handpick matching weaves and notify you when ready for trial.
          </p>
        </div>

        <button
          onClick={onOpenNewRequest}
          className="bg-[#781D2A] hover:bg-[#58121D] text-white px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all shadow-sm flex items-center gap-2"
        >
          <UploadCloud className="w-4 h-4 text-[#DFC07A]" />
          <span>Submit New Inspiration</span>
        </button>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-20 bg-[#FAF7F2] rounded-2xl border border-dashed border-[#E8DFD4] p-8 max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#F5EFEB] flex items-center justify-center mx-auto text-[#C59B4B]">
            <UploadCloud className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-[#2B2625]">
              No inspiration references submitted yet.
            </h3>
            <p className="text-xs sm:text-sm text-[#7A726B] mt-1.5 leading-relaxed">
              Have a photo of a bridal lehenga, sherwani, or temple border saree you saw? Upload it privately, and our drapers will find matching options.
            </p>
          </div>
          <button
            onClick={onOpenNewRequest}
            className="inline-flex items-center gap-2 bg-[#781D2A] hover:bg-[#58121D] text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-all shadow-sm"
          >
            <span>Bring Your Inspiration</span>
            <Sparkles className="w-3.5 h-3.5 text-[#DFC07A]" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map(req => {
            const isReady = req.status === 'READY';
            const isPreparing = req.status === 'PREPARING';

            return (
              <div
                key={req.id}
                className="bg-[#FAF7F2] rounded-2xl border border-[#E8DFD4] p-5 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div>
                  {/* Photo with Private Badge */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#F5EFEB] mb-3">
                    <img src={req.imageUrl} alt="Customer inspiration reference" className="w-full h-full object-cover" />
                    <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                      <Lock className="w-3 h-3 text-[#DFC07A]" />
                      <span>Private Reference</span>
                    </span>
                  </div>

                  {/* Status & Category */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold text-[#C59B4B] tracking-wider">
                      {req.category} • {req.style}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isReady 
                        ? 'bg-[#385E48] text-white' 
                        : isPreparing 
                        ? 'bg-[#C59B4B] text-white'
                        : 'bg-[#781D2A]/10 text-[#781D2A]'
                    }`}>
                      {req.status}
                    </span>
                  </div>

                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-[#7A726B]">Approximate Budget:</span>
                      <strong className="text-[#781D2A]">{req.approxBudget}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A726B]">Preferred Color:</span>
                      <strong className="text-[#2B2625]">{req.preferredColor}</strong>
                    </div>
                  </div>

                  <p className="text-xs text-[#2B2625] italic bg-[#F5EFEB] p-3 rounded-lg border border-[#E8DFD4] mt-3">
                    "{req.description}"
                  </p>

                  {/* Draper response message if present */}
                  {req.customerMessage && (
                    <div className="mt-3 bg-[#EDF3EF] border border-[#385E48]/20 p-3 rounded-lg text-xs text-[#385E48] space-y-1">
                      <div className="flex items-center gap-1.5 font-bold">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Stylist Update from Store Floor:</span>
                      </div>
                      <p className="text-[11px] leading-relaxed">
                        {req.customerMessage}
                      </p>
                    </div>
                  )}
                </div>

                {/* Plan Visit CTA */}
                <div className="pt-3 border-t border-[#E8DFD4]">
                  <button
                    onClick={onScheduleVisit}
                    className="w-full py-2 bg-[#F5EFEB] hover:bg-[#EBDDCF] border border-[#E8DFD4] text-[#781D2A] text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#385E48]" />
                    <span>Schedule Trial For This Style</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
