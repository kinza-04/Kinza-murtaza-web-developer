import { useState, useEffect } from 'react';
import { HelpCircle, Calculator, Rocket, Shield, Clock, Send, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { CV_DATA } from '../data';

export default function PricingCalculator() {
  const [projectType, setProjectType] = useState<'landing' | 'ecommerce' | 'corporate' | 'migration'>('corporate');
  const [pagesCount, setPagesCount] = useState<number>(5);
  const [optimizationRequired, setOptimizationRequired] = useState<boolean>(true);
  const [supportMonth, setSupportMonth] = useState<number>(1);
  const [clientBudget, setClientBudget] = useState<string>('mid'); // 'low' | 'mid' | 'high'
  const [estimatedCost, setEstimatedCost] = useState<number>(450);
  const [estimatedDays, setEstimatedDays] = useState<number>(10);

  // Recalculate budget and days based on client variables
  useEffect(() => {
    let baseRate = 250;
    let days = 5;

    switch (projectType) {
      case 'landing':
        baseRate = 180;
        days = 4;
        break;
      case 'corporate':
        baseRate = 350;
        days = 8;
        break;
      case 'ecommerce':
        baseRate = 550;
        days = 14;
        break;
      case 'migration':
        baseRate = 150;
        days = 3;
        break;
    }

    // Adjust for pages count
    const pageMultiplier = pagesCount <= 1 ? 0 : (pagesCount - 1) * 35;
    baseRate += pageMultiplier;
    days += Math.floor(pagesCount / 3);

    // Speed optimization premium check
    if (optimizationRequired) {
      baseRate += 90;
      days += 2;
    }

    // Post support months adjustment
    if (supportMonth > 0) {
      baseRate += supportMonth * 40;
    }

    setEstimatedCost(baseRate);
    setEstimatedDays(days);
  }, [projectType, pagesCount, optimizationRequired, supportMonth]);

  const handleShareToWhatsApp = () => {
    const typeLabel = {
      landing: "One-Page Landing Resource",
      corporate: "Corporate Multi-page Portal",
      ecommerce: "WooCommerce Digital Store",
      migration: "Site/Hosting Server Migration"
    }[projectType];

    const message = `Assalamu Alaikum Kinza! 
I calculated an instant project estimate via your portfolio:

*Project details:*
- *Type:* ${typeLabel}
- *Pages:* ${pagesCount} pages
- *Speed Optimization:* ${optimizationRequired ? 'Lighthouse Gold (95+)' : 'Standard'}
- *Support:* ${supportMonth} months update buffer
- *Estimated Cost:* approx $${estimatedCost}
- *Estimated Timing:* approx ${estimatedDays} business days

I would love to finalize the specific scope and negotiate the actual parameters. Please let me know your availability!`;

    const encodedMsg = encodeURIComponent(message);
    const waLink = `https://wa.me/923002473592?text=${encodedMsg}`;
    window.open(waLink, '_blank');
  };

  return (
    <section id="estimator" className="py-24 bg-slate-50 text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Copy */}
        <div className="text-center max-w-3xl mx-auto mb-16 px-4">
          <h2 className="text-xs font-mono tracking-widest text-primary-600 uppercase">INSTANT PROJECT PLANNER</h2>
          <p className="mt-3 text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-slate-900">
            Interactive Project & Cost Estimator
          </p>
          <p className="mt-4 text-slate-500 text-sm sm:text-base">
            Configure your development scope, page requirements, and post-launch support details to receive a transparent cost & timeframe estimate right now.
          </p>
        </div>

        {/* Calculator Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Controls Panel */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            
            {/* Project Type Grid */}
            <div className="space-y-3">
              <label className="text-xs font-bold font-mono text-slate-500 uppercase">1. SELECT PLATFORM MODEL:</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'landing', label: 'Landing Page' },
                  { id: 'corporate', label: 'Corporate Website' },
                  { id: 'ecommerce', label: 'E-Commerce Store' },
                  { id: 'migration', label: 'Backup & Migration' }
                ].map((type) => (
                  <button
                    id={`calc-type-${type.id}`}
                    key={type.id}
                    onClick={() => setProjectType(type.id as any)}
                    className={`p-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer text-center ${
                      projectType === type.id
                        ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                        : 'border-slate-200 hover:border-slate-350 bg-white text-slate-700'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Range of Pages slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold font-mono text-slate-500 uppercase">2. TOTAL WEBSITE PAGES:</label>
                <span className="text-sm font-bold text-slate-900">{pagesCount} Page{pagesCount > 1 ? 's' : ''}</span>
              </div>
              <input
                id="calc-pages-slider"
                type="range"
                min="1"
                max="25"
                value={pagesCount}
                onChange={(e) => setPagesCount(Number(e.target.value))}
                className="w-full accent-slate-900 bg-slate-100 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>1 Page</span>
                <span>10 Pages</span>
                <span>25 Pages Max</span>
              </div>
            </div>

            {/* Performance Selection */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold font-mono text-slate-500 uppercase">3. HIGH-SPEED TUNING (CORE WEB VITALS EXTREME):</label>
              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200/80 bg-slate-50">
                <div className="max-w-[80%]">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <Rocket className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Gold Pagespeed Optimization (+95 Score)</span>
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-1">Rebuilds style pathways, asynchronous loading, assets WebP compression, caching.</p>
                </div>
                <button
                  id="calc-toggle-opt"
                  onClick={() => setOptimizationRequired(!optimizationRequired)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-all cursor-pointer ${
                    optimizationRequired ? 'bg-slate-950 px-1 justify-end' : 'bg-slate-200 px-1 justify-start'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-white shadow-sm" />
                </button>
              </div>
            </div>

            {/* Support Selection slider/options */}
            <div className="space-y-3">
              <label className="text-xs font-bold font-mono text-slate-500 uppercase">4. PROFESSIONAL SUPPORT TERMS:</label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { m: 0, label: 'No Support' },
                  { m: 1, label: '1 Month' },
                  { m: 3, label: '3 Months' }
                ].map((item) => (
                  <button
                    id={`calc-support-${item.m}`}
                    key={item.m}
                    onClick={() => setSupportMonth(item.m)}
                    className={`p-3 rounded-lg border text-xs font-semibold text-center transition-all cursor-pointer ${
                      supportMonth === item.m
                        ? 'border-slate-800 bg-slate-800 text-white shadow-sm'
                        : 'border-slate-200 bg-white text-slate-650 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Results Display Panel */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
            
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-accent-teal" />
              <h3 className="text-base font-bold font-display">Calculated Solution:</h3>
            </div>

            <div className="border-t border-b border-slate-800 py-6 space-y-6">
              
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-mono text-slate-400">ESTIMATED INVESTMENT:</span>
                <div className="text-right">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white font-display">${estimatedCost}</span>
                  <span className="block text-[10px] text-slate-400 font-mono">USD Total</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-mono uppercase mb-1">
                    <Clock className="w-3.5 h-3.5 text-accent-teal" />
                    <span>TIMEFRAME</span>
                  </div>
                  <span className="text-sm font-bold text-white">{estimatedDays} Business Days</span>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-mono uppercase mb-1">
                    <Rocket className="w-3.5 h-3.5 text-emerald-400" />
                    <span>PAGESPEED</span>
                  </div>
                  <span className="text-sm font-bold text-white">{optimizationRequired ? '98-100%' : '90%+ Standard'}</span>
                </div>
              </div>

            </div>

            {/* Key Assurance bullet points */}
            <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-850">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
                <Shield className="w-4 h-4" />
                <span>INCLUDED SECURE DELIVERABLES:</span>
              </div>
              <ul className="text-xs text-slate-400 space-y-2.5 pl-1 leading-relaxed">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  <span>Interactive Contact & WhatsApp Integrations</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  <span>Pixel-Perfect Mobile Audit Adjustments</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  <span>Complete Database/Themes Redundancy Backup</span>
                </li>
              </ul>
            </div>

            {/* Primary Action Button */}
            <button
              id="calc-submit-whatsapp"
              onClick={handleShareToWhatsApp}
              className="w-full flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-950/40 cursor-pointer"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Discuss Quote on WhatsApp</span>
            </button>

            <p className="text-[11px] text-slate-500 text-center font-mono">
              Prices represent local and remote project averages. Feel free to request customized packages!
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
