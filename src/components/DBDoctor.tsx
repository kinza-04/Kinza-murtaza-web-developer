import React, { useState } from 'react';
import { 
  Database, Trash2, ShieldCheck, Zap, Server, AlertCircle, Sparkles, 
  CheckCircle2, RefreshCw, Send, ArrowRight, TableProperties, CircleEllipsis
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DBTable {
  name: string;
  type: string;
  rows: number;
  size: string;
  overhead: string;
  description: string;
  isBloated: boolean;
}

interface DBLog {
  action: string;
  status: 'info' | 'success' | 'warning';
}

export default function DBDoctor() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [complete, setComplete] = useState(false);
  const [logs, setLogs] = useState<DBLog[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  // Initial database rows state (bloated)
  const initialTables: DBTable[] = [
    { name: 'wp_posts', type: 'Post Revisions', rows: 1420, size: '284 MB', overhead: '185 MB', description: 'Leftover autosaves and massive page revision increments.', isBloated: true },
    { name: 'wp_options', type: 'Orphaned Transients', rows: 6840, size: '192 MB', overhead: '124 MB', description: 'Deactivated plugin options & continuous cache variables.', isBloated: true },
    { name: 'wp_woocommerce_sessions', type: 'Expired Cart Sessions', rows: 8430, size: '155 MB', overhead: '110 MB', description: 'Abandoned buyer carts and session traces older than 30 days.', isBloated: true },
    { name: 'wp_commentmeta', type: 'Spam Metadata', rows: 2900, size: '82 MB', overhead: '68 MB', description: 'Trash comments or deleted spam trackbacks records.', isBloated: true },
    { name: 'wp_users', type: 'Active Subscribers', rows: 85, size: '1.2 MB', overhead: '0 MB', description: 'Protected client metadata rows (Always preserved safely).', isBloated: false },
  ];

  const [tables, setTables] = useState<DBTable[]>(initialTables);

  // Dynamic Metrics deriving
  const currentTotalSize = tables.reduce((acc, table) => {
    const szVal = parseFloat(table.size.split(' ')[0]);
    return acc + szVal;
  }, 0);

  const currentTotalOverhead = tables.reduce((acc, table) => {
    const ovVal = parseFloat(table.overhead.split(' ')[0]);
    return acc + ovVal;
  }, 0);

  const startOptimization = () => {
    if (isOptimizing) return;
    setIsOptimizing(true);
    setComplete(false);
    setLogs([]);
    setCurrentStep(1);

    const stages = [
      { action: '🔍 Initiating safe database tables mapping on MySQL port...', status: 'info' as const },
      { action: '🧹 TRUNCATING expired rows in wp_woocommerce_sessions... (Reclaimed 110MB)', status: 'success' as const },
      { action: '🗑️ DELETE FROM wp_posts WHERE post_type="revision"... (Removed 1420 entries)', status: 'success' as const },
      { action: '⚡ PRUNING expired transients from wp_options table...', status: 'success' as const },
      { action: '🛡️ VACUUM & OPTIMIZE tables with indexing buffers applied...', status: 'info' as const },
      { action: '🏆 All relational database tables fully optimized. Engine responsive!', status: 'success' as const }
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < stages.length) {
        setLogs(prev => [...prev, stages[index]]);
        index++;
        setCurrentStep(index);
      } else {
        clearInterval(interval);
        
        // After execution, update our tables states to represent cleaned sizes
        const cleanTables = tables.map(t => {
          if (t.isBloated) {
            const currentSizeVal = parseFloat(t.size.split(' ')[0]);
            const overheadVal = parseFloat(t.overhead.split(' ')[0]);
            const newSize = (currentSizeVal - overheadVal).toFixed(1);
            return {
              ...t,
              rows: Math.max(0, Math.floor(t.rows * 0.08)), // shrink list items
              size: `${newSize} MB`,
              overhead: '0 MB',
              isBloated: false
            };
          }
          return t;
        });

        setTimeout(() => {
          setTables(cleanTables);
          setIsOptimizing(false);
          setComplete(true);
        }, 500);
      }
    }, 900);
  };

  const handleReset = () => {
    setTables(initialTables);
    setLogs([]);
    setComplete(false);
    setCurrentStep(0);
  };

  const handleConsultWhatsApp = () => {
    const totalOldSize = initialTables.reduce((a, c) => a + parseFloat(c.size.split(' ')[0]), 0).toFixed(0);
    const totalNewSize = (parseFloat(totalOldSize) - initialTables.reduce((a, c) => a + parseFloat(c.overhead.split(' ')[0]), 0)).toFixed(0);
    const message = `Assalamu Alaikum Kinza!
I tried your interactive *WordPress DB Doctor* sandbox tool! It simulated:
- *Original Bloated Database:* ${totalOldSize} MB
- *Cleaned Optimized size:* ${totalNewSize} MB
- *Query Speed Drop:* From 680ms down to 12ms!

My live site is scaling up, and I want to securely clean and index my database tables to boost site responsive speeds. Can we talk?`;
    
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/923002473592?text=${encoded}`, '_blank');
  };

  return (
    <section id="dbdoctor" className="py-24 bg-slate-900 text-slate-100 relative overflow-hidden border-t border-slate-800 scroll-mt-20">
      {/* Visual neon grids */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.04),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-800/40 text-xs font-mono font-bold text-indigo-400 uppercase mb-4">
            <Database className="w-3.5 h-3.5 text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Advanced DB Doctor Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-white">
            MySQL / WooCommerce Table Optimizer
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            As online eCommerce catalogs grow, leftover plugin variables and expired sessions clog server memories. 
            Test how Kinza's expert queries safely purge useless rows without breaking live orders.
          </p>
        </div>

        {/* Diagnostic Dashboard Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          
          {/* Left panel: Live bloated schema list */}
          <div className="lg:col-span-8 bg-slate-950/85 rounded-2xl border border-slate-850 p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <TableProperties className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-mono font-bold uppercase text-slate-400">Target Database Tables Scan:</span>
                </div>
                <div className="flex items-center gap-2">
                  {complete ? (
                    <button 
                      onClick={handleReset}
                      className="text-[10px] font-mono font-bold text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer"
                    >
                      Reset State
                    </button>
                  ) : (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/15 animate-pulse uppercase font-semibold">
                      Bloat Detected
                    </span>
                  )}
                </div>
              </div>

              {/* Grid Tables rows list */}
              <div className="space-y-3">
                {tables.map((table, ind) => (
                  <div 
                    key={table.name}
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      table.isBloated 
                        ? 'bg-slate-900/40 border-slate-850 hover:border-slate-800' 
                        : 'bg-indigo-950/10 border-indigo-900/35'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2.5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <code className="text-xs font-mono font-bold text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-800">{table.name}</code>
                          <span className="text-[10px] font-mono text-indigo-400 font-semibold">{table.type}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-normal">{table.description}</p>
                      </div>

                      {/* Info badges */}
                      <div className="flex items-center gap-3 self-end sm:self-auto text-xs font-mono">
                        <div className="text-right">
                          <span className="text-[10px] text-slate-500 block">Row Count:</span>
                          <span className="text-white font-bold">{table.rows.toLocaleString()}</span>
                        </div>
                        <div className="text-right bg-slate-900/60 px-3 py-1 rounded border border-slate-800/80 min-w-20">
                          <span className="text-[10px] text-slate-500 block">Overhead/Trash:</span>
                          <span className={`font-bold ${table.isBloated ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {table.overhead}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Run optimizer bottom CTA */}
            <div className="mt-8 pt-6 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-bold block">Pruning Safe Guard:</span>
                <span className="text-xs text-slate-400 block max-w-md">No system metadata or user orders records are deleted. Runs clean index vacuums matching native protocols.</span>
              </div>
              
              <button
                id="execute-db-optimizer-btn"
                onClick={startOptimization}
                disabled={isOptimizing || complete}
                className={`px-6 py-3.5 rounded-xl text-xs uppercase font-mono font-black tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                  isOptimizing
                    ? 'bg-slate-905 border border-slate-800 text-slate-500 cursor-not-allowed'
                    : complete
                    ? 'bg-emerald-600 border border-emerald-500 text-white cursor-default'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-700 hover:translate-x-0.5'
                }`}
              >
                {isOptimizing ? (
                  <>
                    <RefreshCw className="w-4 h-4 text-indigo-300 animate-spin" />
                    <span>Cleaning MySQL Tables...</span>
                  </>
                ) : complete ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>Optimized Successfully</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 text-white" />
                    <span>Purge Revisions & Garbage Rows</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Right panel: Live query benchmarks & Diagnostics Log Console */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            
            {/* Live Analytics box */}
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-5">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Live Query Benchmark:</span>
              
              {/* Score comparisons */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* Size block */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 text-center">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block">Total DB Size Size</span>
                  <span className={`text-2xl font-display font-extrabold ${complete ? 'text-emerald-400' : 'text-amber-500'}`}>
                    {currentTotalSize.toFixed(0)} MB
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono mt-1">
                    {complete ? '🎉 Perfect Limit' : `Overhead: ${currentTotalOverhead.toFixed(0)}MB`}
                  </span>
                </div>

                {/* Speed block */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 text-center">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block">Dynamic Latency</span>
                  <span className={`text-2xl font-display font-bold ${complete ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {complete ? '12ms' : '680ms'}
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono mt-1">
                    {complete ? '⚡ 98% faster' : '🐌 Crawling DB'}
                  </span>
                </div>

              </div>

              {/* Progress visual indicator bar */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800/60">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                  <span>Server Execution Quality:</span>
                  <span className={complete ? 'text-emerald-400' : 'text-amber-500'}>
                    {complete ? '100% Buffered Cache' : '32% Heavy Overwrite'}
                  </span>
                </div>
                <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-700 rounded-full ${complete ? 'bg-emerald-500' : 'bg-rose-500'}`}
                    style={{ width: complete ? '100%' : '32%' }}
                  />
                </div>
              </div>
            </div>

            {/* Execution Logs */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 flex-1 flex flex-col justify-between min-h-60">
              <div className="flex items-center gap-1.5 mb-3 border-b border-slate-900 pb-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                <span className="text-[10px] font-mono text-slate-400 uppercase font-black uppercase">Operation DB Logs:</span>
              </div>

              {/* Logs print */}
              <div className="flex-1 space-y-2 h-36 overflow-y-auto select-none font-mono">
                {logs.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-10 text-slate-600 text-[11px] font-mono">
                    <CircleEllipsis className="w-6 h-6 mb-1 text-slate-700" />
                    <p>Execute safe table optimizer to trigger live server query vacuum analytics logs.</p>
                  </div>
                ) : (
                  logs.filter(Boolean).map((log, index) => (
                    <div key={index} className="flex gap-1.5 leading-normal text-[10px]">
                      {log?.status === 'success' ? (
                        <span className="text-emerald-400">✓</span>
                      ) : (
                        <span className="text-indigo-400">»</span>
                      )}
                      <span className="text-slate-300 font-mono">{log?.action}</span>
                    </div>
                  ))
                )}
              </div>

              {/* CTA Whatsapp */}
              <button
                id="whatsapp-db-cons-btn"
                onClick={handleConsultWhatsApp}
                className="w-full mt-4 py-3 bg-indigo-950 border border-indigo-900 hover:border-indigo-800 text-indigo-300 hover:text-white rounded-xl text-xs uppercase font-mono font-bold flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Enquire DB Service</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
