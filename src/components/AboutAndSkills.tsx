import { useState } from 'react';
import { Award, GraduationCap, ArrowUpRight, CheckCircle2, Sliders, Smartphone, Laptop, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { TECHNICAL_SKILLS, CV_DATA } from '../data';

export default function AboutAndSkills() {
  const [activeTab, setActiveTab] = useState<'skills' | 'education'>('skills');

  // Interactive Auditing State Simulator
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditProgress, setAuditProgress] = useState(0);
  const [lcp, setLcp] = useState(4.2); // seconds (poor/needs improvement)
  const [fid, setFid] = useState(120); // ms
  const [cls, setCls] = useState(0.28); // layout shift

  const runAuditSimulation = () => {
    setIsAuditing(true);
    setAuditProgress(10);
    
    const interval = setInterval(() => {
      setAuditProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLcp(1.1); // optimized
          setFid(18); // optimized
          setCls(0.04); // optimized
          setIsAuditing(false);
          return 100;
        }
        return prev + 15;
      });
    }, 200);
  };

  const getLcpColor = (val: number) => val <= 2.5 ? 'text-emerald-500 bg-emerald-500/10' : 'text-amber-500 bg-amber-500/10';
  const getFidColor = (val: number) => val <= 100 ? 'text-emerald-500 bg-emerald-500/10' : 'text-amber-500 bg-amber-500/10';
  const getClsColor = (val: number) => val <= 0.1 ? 'text-emerald-500 bg-emerald-500/10' : 'text-amber-500 bg-amber-500/10';

  return (
    <section id="about" className="py-24 bg-slate-900 text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(30,41,59,0.5),transparent)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono tracking-widest text-accent-teal uppercase">ABOUT & AUDITS</h2>
          <p className="mt-3 text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
            Technical Skillset & Performance Mastery
          </p>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            I don't just drag-and-drop templates. I craft highly responsive layouts, audit underlying PHP processes, secure WooCommerce checkouts, and clean up inline CSS blocks for maximum performance.
          </p>
        </div>

        {/* Info & Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-start">
          
          {/* Left Column: Skill Matrix & Education */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex border-b border-slate-800 pb-px">
              <button
                id="tab-skills"
                onClick={() => setActiveTab('skills')}
                className={`py-3 px-6 text-sm font-semibold border-b-2 transition-all ${
                  activeTab === 'skills'
                    ? 'border-accent-teal text-white bg-slate-800/30'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Core Competencies
              </button>
              <button
                id="tab-education"
                onClick={() => setActiveTab('education')}
                className={`py-3 px-6 text-sm font-semibold border-b-2 transition-all ${
                  activeTab === 'education'
                    ? 'border-accent-teal text-white bg-slate-800/30'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Academic Credentials
              </button>
            </div>

            {/* TAB CONTENT: Skills */}
            {activeTab === 'skills' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {TECHNICAL_SKILLS.map((item, idx) => (
                  <motion.div
                    key={item.category}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-slate-950/50 p-5 rounded-2xl border border-slate-800/60 hover:border-slate-800 transition-colors"
                  >
                    <h3 className="text-sm font-mono text-accent-teal uppercase tracking-wider mb-4 border-l-2 border-accent-teal pl-3">
                      {item.category}
                    </h3>
                    <ul className="space-y-2.5">
                      {item.skills.map((skill) => (
                        <li key={skill} className="flex items-center gap-2 text-sm text-slate-300">
                          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: Education */}
            {activeTab === 'education' && (
              <div className="space-y-6 pt-2">
                {CV_DATA.education.map((edu, idx) => (
                  <motion.div
                    key={edu.degree}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-4 p-5 bg-slate-950/50 rounded-2xl border border-slate-800/60"
                  >
                    <div className="w-12 h-12 bg-primary-600/20 text-primary-400 rounded-xl flex items-center justify-center shrink-0 border border-primary-500/20">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-slate-400">{edu.period}</span>
                      <h4 className="text-base font-bold text-white font-display mt-0.5">{edu.degree}</h4>
                      <p className="text-sm text-slate-350">{edu.institution}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Dynamic Speed Audit Widget (Conversion Weapon) */}
          <div id="skills-optimizer-card" className="lg:col-span-5">
            <div className="bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Sliders className="w-40 h-40" />
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 bg-accent-teal/20 rounded-lg flex items-center justify-center border border-accent-teal/30 text-accent-teal">
                  <Zap className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display">Core Web Vitals Optimizer</h3>
                  <p className="text-xs text-slate-400 font-mono">Live Structural Tuning Simulator</p>
                </div>
              </div>

              <p className="text-xs text-slate-350 mb-6 leading-relaxed">
                Most WordPress developers load heavy plugins which ruin client retention. Click the button to inspect how I clean render blocks and scale speed scores:
              </p>

              {/* Progress Bar under simulation */}
              {isAuditing && (
                <div className="mb-6 space-y-1">
                  <div className="flex justify-between items-center text-[11px] font-mono text-slate-400">
                    <span>AUDITING THEME DATABASE...</span>
                    <span>{auditProgress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-accent-teal rounded-full transition-all duration-150" style={{ width: `${auditProgress}%` }} />
                  </div>
                </div>
              )}

              {/* Metric Row: LCP */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3.5 rounded-lg bg-slate-900/50 border border-slate-850">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block">LCP (Largest Contentful Paint)</span>
                    <span className="text-xs text-slate-400">Main banner image load metrics.</span>
                  </div>
                  <div className={`px-2.5 py-1.5 rounded-md font-mono text-xs font-semibold ${getLcpColor(lcp)}`}>
                    {lcp}s {lcp <= 2.5 ? '✓ Good' : '✗ Slow'}
                  </div>
                </div>

                {/* Metric Row: FID */}
                <div className="flex items-center justify-between p-3.5 rounded-lg bg-slate-900/50 border border-slate-850">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block">FID (First Input Delay)</span>
                    <span className="text-xs text-slate-400">Browser response to user taps.</span>
                  </div>
                  <div className={`px-2.5 py-1.5 rounded-md font-mono text-xs font-semibold ${getFidColor(fid)}`}>
                    {fid}ms {fid <= 100 ? '✓ Good' : '✗ Slow'}
                  </div>
                </div>

                {/* Metric Row: CLS */}
                <div className="flex items-center justify-between p-3.5 rounded-lg bg-slate-900/50 border border-slate-850">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block">CLS (Cumulative Layout Shift)</span>
                    <span className="text-xs text-slate-400">Unstable structural layout elements.</span>
                  </div>
                  <div className={`px-2.5 py-1.5 rounded-md font-mono text-xs font-semibold ${getClsColor(cls)}`}>
                    {cls} {cls <= 0.1 ? '✓ Stable' : '✗ Unstable'}
                  </div>
                </div>
              </div>

              {/* Simulator trigger button */}
              <div className="mt-6 pt-2">
                <button
                  id="btn-run-audit-simulator"
                  onClick={runAuditSimulation}
                  disabled={isAuditing}
                  className={`w-full py-3.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all duration-200 ${
                    lcp <= 2.5 
                      ? 'bg-slate-900 text-emerald-400 border border-emerald-500/30 font-semibold cursor-not-allowed text-center'
                      : 'bg-gradient-to-r from-accent-teal to-primary-500 hover:from-teal-400 hover:to-primary-400 text-white cursor-pointer hover:shadow-lg shadow-teal-900/20 text-center flex items-center justify-center gap-2'
                  }`}
                >
                  {isAuditing ? 'Executing Code Audits...' : lcp <= 2.5 ? 'Optimizations Active - 99.8%' : 'Optimize Core Web Vitals Now'}
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
