import { ChevronUp, Heart, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { CV_DATA } from '../data';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-slate-950 text-white py-16 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          
          {/* Left: Brand */}
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-xl font-bold font-display tracking-tight text-white">{CV_DATA.name}</h3>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Tailoring lightning-fast, secure, and conversion-optimized WordPress & WooCommerce solutions for global businesses.
            </p>
          </div>

          {/* Center/Right: Quick Action */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#about"
              className="px-3.5 py-2 text-xs font-medium text-slate-450 hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="#projects"
              className="px-3.5 py-2 text-xs font-medium text-slate-450 hover:text-white transition-colors"
            >
              Projects
            </a>
            <a
              href="#estimator"
              className="px-3.5 py-2 text-xs font-medium text-slate-450 hover:text-white transition-colors"
            >
              Estimator
            </a>
            <a
              href="#contact"
              className="px-3.5 py-2 text-xs font-medium text-slate-450 hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>

        </div>

        {/* Bottom Metadata */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} Kinza Murtaza. All rights reserved.</p>
          
          <div className="flex items-center gap-1">
            <span>Built with React & Tailwind</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Global Excellence</span>
          </div>

          <button
            id="scroll-to-top-btn"
            onClick={handleScrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer bg-slate-905 border border-slate-800 px-3 py-1.5 rounded-xl text-xs"
          >
            <span>Scroll to Top</span>
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* FLOATING ACTION BADGE: Sticky Floating WhatsApp Button in the bottom-right corner */}
      <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
        <motion.a
          id="sticky-whatsapp-badge"
          href={CV_DATA.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4.5 py-3.5 rounded-full shadow-2xl hover:shadow-emerald-500/20 shadow-emerald-950/40 relative group decoration-none border border-emerald-500/20"
          style={{ minWidth: "50px", minHeight: "50px" }}
        >
          <div className="relative flex items-center justify-center">
            {/* Pulsing indicator circle behind widget */}
            <span className="absolute -inset-1 rounded-full bg-emerald-500 animate-ping opacity-25" />
            <MessageSquare className="w-6 h-6 shrink-0 relative z-10" />
          </div>
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 text-sm font-semibold whitespace-nowrap hidden sm:inline-block">
            Chat on WhatsApp ({CV_DATA.phoneDisplay})
          </span>
        </motion.a>
      </div>

    </footer>
  );
}
