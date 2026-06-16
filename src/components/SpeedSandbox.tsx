import { useState, useEffect } from 'react';
import { Cpu, Zap, Database, Globe, Sparkles, RefreshCw, Play, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function SpeedSandbox() {
  // Option Toggles
  const [imageOpt, setImageOpt] = useState(false);
  const [stylePrune, setStylePrune] = useState(false);
  const [redisCache, setRedisCache] = useState(false);
  const [cdnEdge, setCdnEdge] = useState(false);

  // Simulation State
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState<number>(0);
  const [simLogs, setSimLogs] = useState<string[]>([]);
  const [simComplete, setSimComplete] = useState(false);

  // Derive Metrices
  // Default values when bloated: Score: 18, Size: 14.8 MB, TTI: 7.2s, TTFB: 1.4s
  const baseScore = 18;
  const baseSize = 14.8;
  const baseTTI = 7.2;
  const baseTTFB = 1400;

  // Let's compute actual optimization contributions
  const scoreAddition = 
    (imageOpt ? 35 : 0) + 
    (stylePrune ? 22 : 0) + 
    (redisCache ? 15 : 0) + 
    (cdnEdge ? 10 : 0);
  
  const currentScore = Math.min(99, baseScore + scoreAddition);
  // Perfect 100% score bonus if all toggles are active
  const finalScore = (imageOpt && stylePrune && redisCache && cdnEdge) ? 100 : currentScore;

  // Sizes in Megabytes
  const currentSize = Math.max(0.42, baseSize - (imageOpt ? 11.2 : 0) - (stylePrune ? 2.5 : 0));
  
  // TTI in seconds
  const currentTTI = Math.max(0.3, baseTTI - (imageOpt ? 3.4 : 0) - (stylePrune ? 1.8 : 0) - (redisCache ? 1.1 : 0) - (cdnEdge ? 0.6 : 0));
  
  // TTFB in milliseconds
  const currentTTFB = Math.max(35, baseTTFB - (redisCache ? 950 : 0) - (cdnEdge ? 385 : 0));

  // Auto Reset Helper
  const resetToggles = () => {
    setImageOpt(false);
    setStylePrune(false);
    setRedisCache(false);
    setCdnEdge(false);
    setSimLogs([]);
    setSimComplete(false);
    setSimStep(0);
  };

  const setOptimizeAll = () => {
    setImageOpt(true);
    setStylePrune(true);
    setRedisCache(true);
    setCdnEdge(true);
  };

  // Run the Visual loading simulation sequence
  const handleStartSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimComplete(false);
    setSimStep(1);
    setSimLogs([]);

    const logs: string[] = [];
    
    // Step 1: Initialize audits
    setTimeout(() => {
      logs.push("🔍 Initiating mobile audit benchmark on client servers...");
      setSimLogs([...logs]);
      setSimStep(2);
    }, 700);

    // Step 2: TTFB / Host response simulation
    setTimeout(() => {
      if (redisCache || cdnEdge) {
        logs.push(`⚡ TTFB Server response detected in a crisp ${currentTTFB}ms! (Redis cache and edge cache active)`);
      } else {
        logs.push("🐌 High TTFB latency! Server spent 1.4 seconds calculating dynamic database routines on load.");
      }
      setSimLogs([...logs]);
      setSimStep(3);
    }, 1500);

    // Step 3: Graphic loading
    setTimeout(() => {
      if (imageOpt) {
        logs.push("⚡ WebP converted graphics compressed successfully! Loaded 12 items securely [Weight: " + currentSize.toFixed(2) + "MB - saving 95.4%].");
      } else {
        logs.push("⚠️ Unoptimized hero-marketing.jpg (6.2MB) is blocking main thread. Heavy layout shift recorded.");
      }
      setSimLogs([...logs]);
      setSimStep(4);
    }, 2400);

    // Step 4: Asset scripts evaluation
    setTimeout(() => {
      if (stylePrune) {
        logs.push("⚡ Styles compilation verified. Eliminated 2.5MB of redundant template assets. Core web vital flags green!");
      } else {
        logs.push("😰 Loaded 42 separate WP plugins & active JS files. Main thread is locking down (CPU Execution delay: 3500ms).");
      }
      setSimLogs([...logs]);
      setSimStep(5);
    }, 3200);

    // Step 5: Final Evaluation Score
    setTimeout(() => {
      logs.push(`🏆 Audit completed successfully! Page Speed Perf Score: ${finalScore}/100. Time-To-Interactive: ${currentTTI.toFixed(1)}s.`);
      setSimLogs([...logs]);
      setIsSimulating(false);
      setSimComplete(true);
    }, 4000);
  };

  return (
    <section id="speedsandbox" className="py-24 bg-slate-950 text-slate-200 relative overflow-hidden border-t border-slate-900 scroll-mt-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(20,184,166,0.04),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-800/40 text-xs font-mono font-bold text-accent-teal uppercase mb-4 animate-pulse">
            <Cpu className="w-3.5 h-3.5 text-accent-teal" />
            <span>Interactive Dev Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-white">
            Core Web Vitals Optimizer Portal
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Many default WordPress layouts score horribly due to heavy plugin overhead and bloated media. 
            Toggle Kinza's real-time core performance solutions below to watch the speeds and metrics shift live!
          </p>
        </div>

        {/* Dashboard Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          
          {/* LEFT COL: Toggles and Options (7 cols on large screens) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-slate-900/45 p-5 rounded-2xl border border-slate-800/80">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Configure Optimizations:</span>
                <div className="flex gap-2">
                  <button 
                    onClick={resetToggles}
                    className="text-[10px] font-mono font-bold text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-850 cursor-pointer transition-colors"
                  >
                    Set Bloated (Reset)
                  </button>
                  <button 
                    onClick={setOptimizeAll}
                    className="text-[10px] font-mono font-bold text-slate-950 bg-accent-teal hover:bg-teal-400 px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors"
                  >
                    Optimize Everything
                  </button>
                </div>
              </div>

              {/* Toggles List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Toggle 1 */}
                <button
                  onClick={() => setImageOpt(!imageOpt)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 ${
                    imageOpt
                      ? 'bg-slate-900 border-accent-teal/50 shadow-[0_0_15px_rgba(20,184,166,0.05)]'
                      : 'bg-slate-950/70 border-slate-850 hover:border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className={`p-2 rounded-lg ${imageOpt ? 'bg-teal-950/80 text-accent-teal' : 'bg-slate-900 text-slate-500'}`}>
                      <Zap className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold uppercase font-mono tracking-wide text-white">Media Compression</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Converts bulky JPGs/PNGs into highly efficient next-gen **WebP** formats and sets modern native **lazy-loading** attributes.
                  </p>
                  <div className="mt-3 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-500">Page Load Save:</span>
                    <span className="text-accent-teal font-bold">-11.2 MB</span>
                  </div>
                </button>

                {/* Toggle 2 */}
                <button
                  onClick={() => setStylePrune(!stylePrune)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 ${
                    stylePrune
                      ? 'bg-slate-900 border-accent-teal/50 shadow-[0_0_15px_rgba(20,184,166,0.05)]'
                      : 'bg-slate-950/70 border-slate-850 hover:border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className={`p-2 rounded-lg ${stylePrune ? 'bg-teal-950/80 text-accent-teal' : 'bg-slate-900 text-slate-500'}`}>
                      <Cpu className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold uppercase font-mono tracking-wide text-white">Script Pruning</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Excludes bloated theme block elements, unifies stylesheet calls into a single asset request, and defers bulky render-blocking JS.
                  </p>
                  <div className="mt-3 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-500">Unused Styles Pruned:</span>
                    <span className="text-accent-teal font-bold">-2.5 MB</span>
                  </div>
                </button>

                {/* Toggle 3 */}
                <button
                  onClick={() => setRedisCache(!redisCache)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 ${
                    redisCache
                      ? 'bg-slate-900 border-accent-teal/50 shadow-[0_0_15px_rgba(20,184,166,0.05)]'
                      : 'bg-slate-950/70 border-slate-850 hover:border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className={`p-2 rounded-lg ${redisCache ? 'bg-teal-950/80 text-accent-teal' : 'bg-slate-900 text-slate-500'}`}>
                      <Database className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold uppercase font-mono tracking-wide text-white">Redis Object Cache</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Buffers heavy WooCommerce metadata queries directly inside server RAM. Resolves infinite DB lookups on checkout triggers.
                  </p>
                  <div className="mt-3 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-500">DB Response Speed:</span>
                    <span className="text-accent-teal font-bold">~35ms Avg</span>
                  </div>
                </button>

                {/* Toggle 4 */}
                <button
                  onClick={() => setCdnEdge(!cdnEdge)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 ${
                    cdnEdge
                      ? 'bg-slate-900 border-accent-teal/50 shadow-[0_0_15px_rgba(20,184,166,0.05)]'
                      : 'bg-slate-950/70 border-slate-850 hover:border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className={`p-2 rounded-lg ${cdnEdge ? 'bg-teal-950/80 text-accent-teal' : 'bg-slate-900 text-slate-500'}`}>
                      <Globe className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold uppercase font-mono tracking-wide text-white">Global Cloudflare CDN</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Prerenders full HTML output across Cloudflare edge nodes, routing requests instantly to user local clusters worldwide.
                  </p>
                  <div className="mt-3 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-500">Global TTFB Save:</span>
                    <span className="text-accent-teal font-bold">-385ms</span>
                  </div>
                </button>

              </div>
            </div>

            {/* Simulated Live Terminal output / Loading simulator */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 flex flex-col h-64 justify-between relative">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-bold ml-1.5">Load Performance Console Simulator:</span>
                </div>
                <span className="text-[9px] font-mono text-slate-500">Live Web Benchmarks</span>
              </div>

              {/* Console Logs display */}
              <div className="flex-1 overflow-y-auto font-mono text-xs text-slate-350 space-y-2.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-900/80 select-none">
                {simLogs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center py-8 text-slate-500">
                    <p className="text-xs font-mono">Setup optimizations above, then hit audit to simulate visual site loading.</p>
                  </div>
                ) : (
                  simLogs.map((log, index) => (
                    <div key={index} className="flex items-start gap-1.5 leading-relaxed">
                      {log.startsWith("❌") || log.startsWith("⚠️") || log.startsWith("🐌") || log.startsWith("😰") ? (
                        <span className="text-rose-500 text-sm leading-none shrink-0 font-sans">✕</span>
                      ) : log.startsWith("⚡") || log.startsWith("🏆") ? (
                        <span className="text-accent-teal text-sm leading-none shrink-0 font-sans">✓</span>
                      ) : (
                        <span className="text-slate-500 shrink-0 font-sans">»</span>
                      )}
                      <p className="text-[11px] font-mono">{log}</p>
                    </div>
                  ))
                )}
                {isSimulating && (
                  <div className="flex items-center gap-2 text-accent-teal max-w-fit px-2 py-0.5 rounded bg-teal-950/25 border border-teal-800/10 text-[10px] uppercase font-mono font-bold animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-teal animate-ping" />
                    <span>Processing audit rules...</span>
                  </div>
                )}
              </div>

              {/* Simulation Trigger Button */}
              <button
                id="sandbox-run-simulation"
                onClick={handleStartSimulation}
                disabled={isSimulating}
                className={`w-full text-xs font-mono font-bold text-center py-3 rounded-xl uppercase flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  isSimulating 
                    ? 'bg-slate-900 border border-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-slate-900 border border-slate-800 text-white hover:border-slate-700/80 hover:bg-slate-850'
                }`}
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="w-4 h-4 text-accent-teal animate-spin" />
                    <span>Measuring responsive latency logs...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 text-emerald-400" />
                    <span>Run Speed Loading Simulation Audit</span>
                  </>
                )}
              </button>

            </div>

          </div>

          {/* RIGHT COL: Live gauges, scores, & Metrics (5 cols on large screens) */}
          <div className="lg:col-span-5 bg-slate-900 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-6">
            
            {/* PageSpeed Performance Circle Gauge */}
            <div className="flex flex-col items-center justify-center text-center space-y-4 pt-2">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">PageSpeed Optimization:</span>
              
              {/* Dynamic SVG Gauge */}
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Background track circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-slate-950 fill-transparent"
                    strokeWidth="8"
                  />
                  {/* Foreground indicator circle with custom dashes */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className={`fill-transparent transition-all duration-700 ${
                      finalScore >= 90
                        ? 'stroke-emerald-500'
                        : finalScore >= 50
                        ? 'stroke-amber-500'
                        : 'stroke-rose-500'
                    }`}
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * finalScore) / 100}
                    strokeLinecap="round"
                  />
                </svg>

                {/* Score numbers inside */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-4xl font-extrabold font-display transition-colors duration-700 ${
                    finalScore >= 90
                      ? 'text-emerald-400'
                      : finalScore >= 50
                      ? 'text-amber-400'
                      : 'text-rose-400 font-bold'
                  }`}>
                    {finalScore}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 font-semibold tracking-wide">Out of 100</span>
                </div>
              </div>

              {/* Assessment Message */}
              <div className="space-y-1">
                <span className={`text-xs ml-1.5 uppercase tracking-wide font-black font-mono inline-flex items-center gap-1.5 ${
                  finalScore >= 90
                    ? 'text-emerald-400'
                    : finalScore >= 50
                    ? 'text-amber-400'
                    : 'text-rose-400'
                }`}>
                  {finalScore >= 90 ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Lighthouse Gold (Passed)</span>
                    </>
                  ) : finalScore >= 50 ? (
                    <>
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>Needs Improvement</span>
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>Warning: Poor Performance</span>
                    </>
                  )}
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed px-4">
                  {finalScore >= 90
                    ? "Exceptional load speeds. Retains visitor attention immediately and ranks flawlessly on SEO crawls."
                    : finalScore >= 50
                    ? "Average. Some uncompiled styles and image bloat are triggering mobile check-out abandonment."
                    : "Severely bloated. Expecting massive 50%+ bounce rates on mobile and checkout page crashes."}
                </p>
              </div>

            </div>

            {/* Simulated Live Benchmarks Comparison (Linear graphical bars) */}
            <div className="space-y-4 border-t border-slate-800/80 pt-6">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1">Key Visual Metrics comparison:</span>
              
              {/* Metric 1 - Total Page bytes */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-mono">1. Loaded Site Assets Weight:</span>
                  <span className="font-bold text-white font-mono">{currentSize.toFixed(2)} MB</span>
                </div>
                {/* Horizontal bar comparison */}
                <div className="h-2 bg-slate-950 rounded-full overflow-hidden flex">
                  {/* Optimized bar portion */}
                  <div 
                    className="h-full bg-accent-teal rounded-full transition-all duration-500"
                    style={{ width: `${(currentSize / baseSize) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[9px] font-mono text-slate-500">
                  <span>Target: &lt;500KB</span>
                  <span>Unoptimized Weight: {baseSize}MB</span>
                </div>
              </div>

              {/* Metric 2 - Time to Interactive */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-mono">2. Time-To-Interactive (TTI):</span>
                  <span className="font-bold text-white font-mono">{currentTTI.toFixed(2)}s</span>
                </div>
                {/* Horizontal bar comparison */}
                <div className="h-2 bg-slate-950 rounded-full overflow-hidden flex">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      currentTTI <= 2
                        ? 'bg-emerald-500'
                        : currentTTI <= 4.5
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${(currentTTI / baseTTI) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[9px] font-mono text-slate-400">
                  <span className="text-emerald-400 font-bold">Passed Limit: &lt;1.2s</span>
                  <span className="text-slate-500 font-mono">Original: {baseTTI}s</span>
                </div>
              </div>

            </div>

            {/* Connect CTA Info Block */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex items-center justify-between text-xs gap-3">
              <div className="space-y-0.5">
                <span className="font-bold block text-white font-sans">Like these performance solutions?</span>
                <span className="text-[11px] text-slate-400">I can optimize your existing WordPress or Web setup immediately.</span>
              </div>
              <a 
                href="#contact"
                className="p-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white shrink-0 hover:translate-x-0.5 transition-transform"
                title="Secure Optimizer Audit Now"
              >
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
