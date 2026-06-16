import { useState } from 'react';
import { MessageSquare, Calendar, Copy, Check, ArrowRight, ShieldCheck, Zap, Layers, Code } from 'lucide-react';
import { motion } from 'motion/react';
import { CV_DATA } from '../data';

export default function Hero() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-slate-950 pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden flex items-center bg-grid-pattern"
    >
      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[300px] h-[300px] bg-accent-teal/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Main Copy */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-medium text-slate-300">
                Available for Custom WordPress & WooCommerce Gigs
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.1]"
            >
              Crafting High-Speed, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-teal to-primary-400">
                Professional WordPress
              </span> <br />
              Websites That Convert
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-350 font-normal leading-relaxed max-w-2xl"
            >
              Hi, I am <strong className="text-white font-semibold">Kinza Murtaza</strong>. I engineer secure, lightweight, and custom-tailored eCommerce & corporate portals with 4+ years of proven expertise. I optimize core metrics to guarantee <span className="text-accent-teal font-medium">Lighthouse scores above 90+</span>.
            </motion.p>

            {/* CTA action buttons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <a
                id="hero-cta-whatsapp"
                href={`https://wa.me/923002473592?text=Hi%2520Kinza,%2520I%2520saw%2520your%2520portfolio%2520and%2520would%2520like%2520to%2520hire%2520you%2520for%2520a%2520WordPress%2520project!`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-base px-6 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-950/30 hover:-translate-y-0.5"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Let's Talk WhatsApp (0300-2473592)</span>
              </a>

              <button
                id="hero-cta-estimator"
                onClick={() => scrollToSection('#estimator')}
                className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium border border-slate-800 text-base px-6 py-4 rounded-xl transition-all duration-200"
              >
                <span>Calculate Project Cost</span>
                <ArrowRight className="w-4 h-4 text-accent-teal" />
              </button>
            </motion.div>

            {/* Quick credentials copy desk */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-slate-400 font-mono tracking-tight pt-4"
            >
              <div className="flex items-center gap-2">
                <span className="text-slate-500">EMAIL:</span>
                <button
                  id="copy-email-btn"
                  onClick={() => copyToClipboard(CV_DATA.email, 'email')}
                  className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer bg-slate-900 border border-slate-800 px-2 py-1 rounded"
                >
                  <span>{CV_DATA.email}</span>
                  {copiedEmail ? <Check className="w-3 text-emerald-500" /> : <Copy className="w-3" />}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-500">WHATSAPP:</span>
                <button
                  id="copy-phone-btn"
                  onClick={() => copyToClipboard(CV_DATA.phone, 'phone')}
                  className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer bg-slate-900 border border-slate-800 px-2 py-1 rounded"
                >
                  <span>{CV_DATA.phoneDisplay}</span>
                  {copiedPhone ? <Check className="w-3 text-emerald-500" /> : <Copy className="w-3" />}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Hero Creative Side Asset Card */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full max-w-sm rounded-3xl bg-slate-900/40 border border-slate-800/80 p-6 backdrop-blur-md shadow-2xl"
            >
              {/* Profile Image Simulation / Graphic layout of a top web developer */}
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-accent-teal/25 rounded-2xl flex items-center justify-center border border-accent-teal/40">
                <Zap className="w-6 h-6 text-accent-teal" />
              </div>

              <div className="space-y-6">
                <div id="hero-mini-profile" className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden shadow-inner hover:scale-105 transition-all duration-300 shrink-0">
                    <img 
                      src="/src/assets/images/developer_coding_dp_1781616366646.jpg" 
                      alt="Kinza Murtaza"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-display">Kinza Murtaza</h3>
                    <p className="text-sm text-accent-teal font-mono">Senior WordPress Dev</p>
                  </div>
                </div>

                <div className="border-t border-slate-850 pt-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-1 rounded bg-slate-800/80">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-200">Elementor Pro Custom Theme Mastery</h4>
                      <p className="text-xs text-slate-400">Zero template dependency. Custom css variables design structure.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-1 rounded bg-slate-800/80">
                      <Layers className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-200">WooCommerce Specialists</h4>
                      <p className="text-xs text-slate-400">Highly converting checkout integrations, advanced database setup.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-1 rounded bg-slate-800/80">
                      <Zap className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-200">Google Core Web Vitals Audited</h4>
                      <p className="text-xs text-slate-400">Advanced server-side caching, optimization, image-sizing pipelines.</p>
                    </div>
                  </div>
                </div>

                {/* Score bar presentation */}
                <div className="pt-2 bg-slate-900/60 p-4 rounded-2xl border border-slate-800/60 space-y-2">
                  <div className="flex justify-between items-center text-xs text-slate-300 font-mono">
                    <span>GOOGLE PAGESPEED MAX:</span>
                    <span className="text-emerald-400 font-bold">99+ Optimal</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-accent-teal rounded-full w-[96%]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Counters Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-900/40 border border-slate-800/80 p-6 md:p-8 rounded-2xl backdrop-blur-sm"
        >
          <div className="text-center md:border-r md:border-slate-800 last:border-0 py-2">
            <h3 className="text-4xl font-extrabold text-white font-display">4+</h3>
            <p className="text-xs font-mono tracking-wider text-slate-400 uppercase mt-2">Years Experience</p>
          </div>
          <div className="text-center md:border-r md:border-slate-800 last:border-0 py-2">
            <h3 className="text-4xl font-extrabold text-white font-display">50+</h3>
            <p className="text-xs font-mono tracking-wider text-slate-400 uppercase mt-2">Websites Completed</p>
          </div>
          <div className="text-center md:border-r md:border-slate-800 last:border-0 py-2">
            <h3 className="text-4xl font-extrabold text-white font-display">98%</h3>
            <p className="text-xs font-mono tracking-wider text-slate-400 uppercase mt-2">Lighthouse Score Max</p>
          </div>
          <div className="text-center py-2">
            <h3 className="text-4xl font-extrabold text-white font-display">100%</h3>
            <p className="text-xs font-mono tracking-wider text-slate-400 uppercase mt-2">On-Time Delivery</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
