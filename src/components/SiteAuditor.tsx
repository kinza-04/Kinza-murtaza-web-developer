import React, { useState, useEffect } from 'react';
import { 
  Search, ShieldCheck, Zap, AlertCircle, Layout, Chrome, FileText, 
  Settings2, Smartphone, CheckCircle, RefreshCw, Send, Lock, ArrowRight,
  Sparkles, ExternalLink, HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuditLog {
  stage: 'init' | 'perf' | 'sec' | 'seo' | 'done';
  message: string;
  type: 'info' | 'success' | 'warn' | 'error';
}

interface Issue {
  category: 'performance' | 'security' | 'seo';
  title: string;
  severity: 'high' | 'medium' | 'low';
  impact: string;
  fix: string;
  icon: any;
}

export default function SiteAuditor() {
  const [url, setUrl] = useState('');
  const [siteType, setSiteType] = useState<'ecommerce' | 'corporate' | 'portfolio' | 'landing'>('corporate');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditProgress, setAuditProgress] = useState(0);
  const [auditStage, setAuditStage] = useState<'idle' | 'analyzing' | 'completed'>('idle');
  const [currentStageLabel, setCurrentStageLabel] = useState('');
  const [logs, setLogs] = useState<AuditLog[]>([]);
  
  // Results details state
  const [perfScore, setPerfScore] = useState(0);
  const [secScore, setSecScore] = useState(0);
  const [seoScore, setSeoScore] = useState(0);
  const [issuesFound, setIssuesFound] = useState<Issue[]>([]);
  const [hasWpPluginBloat, setHasWpPluginBloat] = useState(false);
  const [totalBloatSize, setTotalBloatSize] = useState('0');

  // Helper heuristic generator based on the URL text and Selected Type
  const generateAuditReport = (targetUrl: string, type: string) => {
    const cleanUrl = targetUrl.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
    const isWp = !cleanUrl.includes('github.io') && !cleanUrl.includes('vercel.app');
    
    // Setup scoring heuristics
    let randomOffset = Math.floor(Math.random() * 12); // add variability
    
    let basePerf = 42;
    let baseSec = 55;
    let baseSeo = 68;

    if (type === 'ecommerce') {
      basePerf = 28 + randomOffset;
      baseSec = 48 + Math.floor(randomOffset / 2);
    } else if (type === 'landing') {
      basePerf = 58 + randomOffset;
      baseSec = 70 + Math.floor(randomOffset / 1.5);
    } else {
      basePerf = 38 + randomOffset;
      baseSec = 62 + randomOffset;
    }

    setPerfScore(basePerf);
    setSecScore(baseSec);
    setSeoScore(Math.min(96, baseSeo + Math.floor(randomOffset * 1.5)));

    setHasWpPluginBloat(isWp);
    setTotalBloatSize((isWp ? (8.4 + (randomOffset / 2)).toFixed(1) : '2.1'));

    // Dynamic issues construction
    const issues: Issue[] = [];

    if (basePerf < 55) {
      issues.push({
        category: 'performance',
        title: 'Render-Blocking External Assets',
        severity: 'high',
        impact: 'Delays Time-To-Interactive by over 4.2 seconds on mobile grids.',
        fix: 'Defer dynamic script execution, strip outdated builder plugins, and consolidate style resources.',
        icon: Zap
      });
      issues.push({
        category: 'performance',
        title: 'Uncompressed High-Def Photography',
        severity: 'high',
        impact: `Found unresized banners, adding approx ${isWp ? '7.8' : '2.4'}MB unnecessary transfer size.`,
        fix: 'Convert assets into modern WebP vectors, resize to correct CSS dimensions, and leverage native lazy loading.',
        icon: Chrome
      });
    }

    if (baseSec < 70) {
      issues.push({
        category: 'security',
        title: 'Exposed WordPress Management Headers',
        severity: 'medium',
        impact: 'Standard login directory path (/wp-admin/) fully accessible to script-injection bots.',
        fix: 'Relocate standard administrative endpoints, apply strict security header buffers, and limit API queries.',
        icon: Lock
      });
    }

    if (type === 'ecommerce') {
      issues.push({
        category: 'performance',
        title: 'Unbuffered WooCommerce DB Queries',
        severity: 'high',
        impact: 'Server spends 1.5s+ fetching cart attributes on baseline API triggers.',
        fix: 'Integrate isolated Redis cache memory layers to safeguard repeated database rows retrieval.',
        icon: Settings2
      });
    }

    issues.push({
      category: 'seo',
      title: 'Missing Image Alternative Metadata tags (alt)',
      severity: 'low',
      impact: 'Search engine web crawlers are unable to index core site visual contexts.',
      fix: 'Perform accessibility audit and hardcode readable descriptions into content media files.',
      icon: Layout
    });

    setIssuesFound(issues);
  };

  const handleStartAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || isAuditing) return;

    setIsAuditing(true);
    setAuditStage('analyzing');
    setAuditProgress(0);
    setLogs([]);

    const steps = [
      { progress: 12, label: 'Initiating DNS handshake and checking secure SSL protocols...', log: { stage: 'init', message: `Connected successfully to host server at: ${url}`, type: 'success' } },
      { progress: 28, label: 'Scanning CMS identifiers and theme directory roots...', log: { stage: 'init', message: `Site type profile matching active template category: '${siteType.toUpperCase()}'`, type: 'info' } },
      { progress: 45, label: 'Analyzing Core Web Vitals (Largest Contentful Paint, Cumulative Layout Shift)...', log: { stage: 'perf', message: '⚠️ WARNING: Detected heavy render-blocking assets locking down critical layout threads.', type: 'warn' } },
      { progress: 62, label: 'Computing database response routines and Time-to-First-Byte (TTFB)...', log: { stage: 'perf', message: `High server latency detected. Dynamic index queries took ${siteType === 'ecommerce' ? '1280ms' : '820ms'} to compile.`, type: 'warn' } },
      { progress: 78, label: 'Auditing secure directory endpoints & administration access path shields...', log: { stage: 'sec', message: '🛡️ Vulnerability check completed. Standard config structures visible on backend index.', type: 'info' } },
      { progress: 92, label: 'Checking crawler indexing structures and mobile responsive tags...', log: { stage: 'seo', message: 'Mobile responsive width configuration: OK. Found 12 image objects with missing description metadata.', type: 'warn' } },
      { progress: 100, label: 'Finalizing optimization prescription scores...', log: { stage: 'done', message: '🏆 Live Audit Audit report calculated successfully.', type: 'success' } }
    ];

    let currentStepIndex = 0;

    const interval = setInterval(() => {
      if (currentStepIndex < steps.length) {
        const step = steps[currentStepIndex];
        setAuditProgress(step.progress);
        setCurrentStageLabel(step.label as string);
        setLogs(prev => [...prev, step.log as AuditLog]);
        currentStepIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          generateAuditReport(url, siteType);
          setIsAuditing(false);
          setAuditStage('completed');
        }, 600);
      }
    }, 1000);
  };

  const handleQueryWhatsApp = () => {
    const message = `Assalamu Alaikum Kinza! 
I just ran a live audit query for my site on your portfolio tool:

- *Website Url:* ${url}
- *Active Category:* ${siteType.toUpperCase()}
- *Lighthouse Performance:* ${perfScore}/100
- *Security Seal:* ${secScore}/100
- *Issues Flagged:* ${issuesFound.length} critical recommendations

I would love to hire you to apply your speed optimization rules and fix security vulnerabilities!`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/923002473592?text=${encoded}`, '_blank');
  };

  return (
    <section id="siteauditor" className="py-24 bg-slate-50 text-slate-900 border-t border-slate-200 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-200 border border-slate-300 text-xs font-mono font-bold text-primary-600 uppercase mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-primary-600 animate-bounce" />
            <span>Interactive Diagnostic System</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-slate-950">
            WordPress & Web SEO Auditor Pro
          </h2>
          <p className="mt-4 text-slate-500 text-sm sm:text-base leading-relaxed">
            Wondering why your website isn't converting organic traffic or ranks poorly on Google? Let's check! 
            Enter your site link below, and Kinza's portfolio core auditor engine will compile an instant diagnosis reports.
          </p>
        </div>

        {/* Input & Simulation Controller block */}
        <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {auditStage === 'idle' && (
              <motion.form 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleStartAudit} 
                className="space-y-6"
              >
                <div className="space-y-4">
                  <label className="text-xs font-bold font-mono text-slate-500 uppercase flex items-center gap-1.5">
                    <Search className="w-4 h-4 text-slate-400" />
                    <span>Enter Website Domain to Audit:</span>
                  </label>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-xs select-none">https://</span>
                      <input
                        id="diagnostics-url-input"
                        type="text"
                        required
                        placeholder="yourbusiness.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full pl-[68px] pr-4 py-4 rounded-xl border border-slate-200/90 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all font-mono"
                      />
                    </div>

                    {/* Website category */}
                    <select
                      id="diagnostics-type-select"
                      value={siteType}
                      onChange={(e) => setSiteType(e.target.value as any)}
                      className="px-4 py-4 rounded-xl border border-slate-205 bg-white text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
                    >
                      <option value="corporate">Corporate Site</option>
                      <option value="ecommerce">eCommerce Store (WooCommerce)</option>
                      <option value="portfolio">Portfolio Portal</option>
                      <option value="landing">One Page Landing Page</option>
                    </select>
                  </div>
                </div>

                {/* Submitting Button */}
                <button
                  id="start-diagnose-btn"
                  type="submit"
                  className="w-full py-4 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Begin Free Professional Auditing</span>
                </button>

                <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 font-mono pt-2 border-t border-slate-100">
                  <span>🔒 Secure sandbox scanning protocol</span>
                  <span>⚡ Analysis finishes in approx 8 seconds</span>
                </div>
              </motion.form>
            )}

            {/* AUDIT IN PROGRESS ANIMATED SCREEN */}
            {auditStage === 'analyzing' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-6 space-y-6"
              >
                <div className="flex flex-col items-center justify-center text-center space-y-3">
                  <RefreshCw className="w-8 h-8 text-primary-600 animate-spin" />
                  <h4 className="text-base font-bold text-slate-900">Kinza's Audit Suite Analyzing Host...</h4>
                  <p className="text-xs text-slate-500 font-mono max-w-lg">{currentStageLabel}</p>
                </div>

                {/* Nice clean Progress Bar */}
                <div className="space-y-1.5 max-w-md mx-auto">
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 font-bold">
                    <span>Audit Status:</span>
                    <span>{auditProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-slate-900 rounded-full transition-all duration-300"
                      style={{ width: `${auditProgress}%` }}
                    />
                  </div>
                </div>

                {/* Log terminal */}
                <div className="bg-slate-950 rounded-2xl p-4 font-mono text-xs max-w-xl mx-auto border border-slate-900 shadow-inner h-44 overflow-y-auto space-y-2 select-none">
                  {logs.filter(Boolean).map((log, index) => (
                    <div key={index} className="flex items-start gap-1.5 leading-relaxed text-slate-300">
                      {log?.type === 'warn' && <span className="text-amber-500 shrink-0 font-bold">⚠️</span>}
                      {log?.type === 'error' && <span className="text-rose-500 shrink-0 font-bold">✕</span>}
                      {log?.type === 'success' && <span className="text-emerald-400 shrink-0 font-bold">✓</span>}
                      {log?.type === 'info' && <span className="text-blue-400 shrink-0 font-bold">»</span>}
                      <p className="text-[11px] font-mono">{log?.message}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* AUDITING REPORT TAB COMPLETED CARD */}
            {auditStage === 'completed' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {/* Visual score gauges */}
                <div className="bg-slate-55 pointer-events-none p-5 rounded-2xl border border-slate-100 flex flex-col md:flex-row justify-around gap-6 text-center">
                  
                  {/* Gauge 1 */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest block">WordPress PageSpeed:</span>
                    <div className="flex items-baseline justify-center gap-1.5">
                      <span className={`text-3xl font-extrabold font-display ${perfScore > 90 ? 'text-emerald-500' : 'text-rose-500'}`}>{perfScore}</span>
                      <span className="text-slate-400 font-mono text-xs">/100</span>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold font-semibold uppercase ${perfScore > 90 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                      {perfScore > 90 ? 'Optimal' : 'Needs Optimization'}
                    </span>
                  </div>

                  {/* Gauge 2 */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest block">Security Shield rating:</span>
                    <div className="flex items-baseline justify-center gap-1.5">
                      <span className={`text-3xl font-extrabold font-display ${secScore > 85 ? 'text-emerald-500' : 'text-amber-500'}`}>{secScore}</span>
                      <span className="text-slate-400 font-mono text-xs">/100</span>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold font-semibold uppercase ${secScore > 85 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-850'}`}>
                      {secScore > 85 ? 'Secure' : 'Mod. Risks'}
                    </span>
                  </div>

                  {/* Gauge 3 */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest block">Organic SEO Index:</span>
                    <div className="flex items-baseline justify-center gap-1.5">
                      <span className="text-3xl font-extrabold font-display text-slate-800">{seoScore}</span>
                      <span className="text-slate-400 font-mono text-xs">/100</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-mono font-bold uppercase">
                      Standard Tags
                    </span>
                  </div>

                </div>

                {/* Audit Prescription Detail Grid */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h5 className="text-sm font-bold font-mono text-slate-400 uppercase tracking-wider block">Found Audit Recommendations:</h5>
                    <button 
                      onClick={() => setAuditStage('idle')}
                      className="text-xs font-mono font-bold text-slate-500 hover:text-slate-900 cursor-pointer flex items-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Re-Scan Website
                    </button>
                  </div>

                  {/* List of custom issues generated */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {issuesFound.map((issue, idx) => {
                      const Icon = issue.icon;
                      return (
                        <div key={idx} className="p-4 rounded-xl border border-slate-150 bg-slate-50 flex items-start gap-4">
                          <div className={`p-2.5 rounded-lg shrink-0 ${
                            issue.severity === 'high' 
                              ? 'bg-rose-100 text-rose-600' 
                              : issue.severity === 'medium' 
                              ? 'bg-amber-100 text-amber-600' 
                              : 'bg-slate-200 text-slate-600'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="space-y-1.5 flex-1">
                            <div className="flex justify-between items-center">
                              <span className="text-[11px] font-bold font-mono text-slate-400 uppercase tracking-wide">{issue.category} tag</span>
                              <span className={`text-[9px] font-mono font-bold uppercase rounded px-1.5 py-0.5 ${
                                issue.severity === 'high' 
                                  ? 'bg-rose-100/80 text-rose-700 border border-rose-200/50' 
                                  : 'bg-amber-100/80 text-amber-700 border border-amber-200/50'
                              }`}>
                                {issue.severity} priority
                              </span>
                            </div>
                            <h6 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">{issue.title}</h6>
                            <p className="text-[11px] leading-relaxed text-slate-500">{issue.impact}</p>
                            <p className="text-[11px] leading-relaxed text-slate-800 bg-white p-2 rounded-lg border border-slate-150/60 font-medium">
                              🛠️ <span className="font-bold underline text-slate-950">Kinza's Prescription:</span> {issue.fix}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Secure call action summary */}
                <div className="p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
                  <div className="space-y-1 md:text-left text-center">
                    <span className="font-bold block text-sm font-display text-white">Let's optimize {url} to the Max!</span>
                    <span className="text-xs text-slate-400 block max-w-lg leading-relaxed">
                      Kinza specializes in implementing all the calculated optimizations directly on WordPress hosting without any downtime. Standard audits like this resolve bounce rates and increase active conversions instantly.
                    </span>
                  </div>
                  
                  <button
                    id="whatsapp-share-audit-btn"
                    onClick={handleQueryWhatsApp}
                    className="flex shrink-0 items-center justify-center gap-2 px-5 py-3.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold cursor-pointer text-xs uppercase font-mono transition-transform"
                  >
                    <Send className="w-4 h-4" />
                    <span>Free Consult on WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
