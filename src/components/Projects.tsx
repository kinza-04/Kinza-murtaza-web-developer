import { useState, useEffect, FormEvent } from 'react';
import { ExternalLink, CheckCircle, Smartphone, Laptop, Filter, Zap, ArrowUpRight, Lock, Unlock, Plus, Trash2, X, PlusCircle, Sparkles, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../data';
import { Project, ContactMessage } from '../types';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Dynamic Projects State loaded from localStorage
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('km_custom_projects_list_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return PROJECTS;
  });

  // Admin access state
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('km_is_developer_authenticated') === 'true';
    } catch {}
    return false;
  });

  // Local Inbound Messages
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [activeAdminTab, setActiveAdminTab] = useState<'projects' | 'messages'>('projects');

  useEffect(() => {
    if (isAdmin) {
      try {
        const stored = localStorage.getItem('km_contact_messages');
        if (stored) {
          setMessages(JSON.parse(stored));
        }
      } catch {}
    }
  }, [isAdmin]);

  const handleDeleteMessage = (id: string) => {
    if (confirm('Are you absolutely sure you want to delete this inbound message lead?')) {
      const updated = messages.filter(m => m.id !== id);
      setMessages(updated);
      try {
        localStorage.setItem('km_contact_messages', JSON.stringify(updated));
      } catch {}
    }
  };

  // Auth Modal State
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Add Project Creator State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newLongDescription, setNewLongDescription] = useState('');
  const [newUrl, setNewUrl] = useState('https://');
  const [newCategory, setNewCategory] = useState<'ecommerce' | 'corporate' | 'legal' | 'tech'>('corporate');
  const [newTags, setNewTags] = useState('');
  const [newTechUsed, setNewTechUsed] = useState('');
  const [newKeyAchievement, setNewKeyAchievement] = useState('');
  const [newPerformanceScore, setNewPerformanceScore] = useState(95);
  const [newImageSeed, setNewImageSeed] = useState('shopping');

  // Sync state to localStorage
  const saveProjects = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
    try {
      localStorage.setItem('km_custom_projects_list_v1', JSON.stringify(updatedProjects));
    } catch {}
  };

  const handleAuthenticate = (e: FormEvent) => {
    e.preventDefault();
    setAuthError('');
    
    // Developer Secret Key
    if (passcode.trim() === 'kinza123') {
      setIsAdmin(true);
      try {
        localStorage.setItem('km_is_developer_authenticated', 'true');
      } catch {}
      setShowAuthModal(false);
      setPasscode('');
    } else {
      setAuthError('Ghalt passcode! Please enter correct master key.');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    try {
      localStorage.removeItem('km_is_developer_authenticated');
    } catch {}
    setShowAddForm(false);
  };

  const handleAddProject = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim() || !newUrl.trim()) {
      alert('Must complete Project Title, short description, and correct URL link.');
      return;
    }

    const tagsArray = newTags.split(',').map(t => t.trim()).filter(Boolean);
    const techArray = newTechUsed.split(',').map(t => t.trim()).filter(Boolean);

    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: newTitle,
      description: newDescription,
      longDescription: newLongDescription || 'Custom development layouts tuned for secure cross-device load support.',
      url: newUrl,
      category: newCategory,
      tags: tagsArray.length > 0 ? tagsArray : ['WordPress', 'Elementor', 'Speed-Tuned'],
      techUsed: techArray.length > 0 ? techArray : ['WordPress', 'Elementor Pro', 'Custom CSS'],
      keyAchievement: newKeyAchievement || 'Enhanced template response and visual responsiveness by 40%.',
      performanceScore: Number(newPerformanceScore) || 95,
      mobileOptimized: true,
      imageSeed: newImageSeed || 'shopping'
    };

    const updated = [newProj, ...projects];
    saveProjects(updated);

    // Reset Form fields
    setNewTitle('');
    setNewDescription('');
    setNewLongDescription('');
    setNewUrl('https://');
    setNewTags('');
    setNewTechUsed('');
    setNewKeyAchievement('');
    setShowAddForm(false);
  };

  const handleDeleteProject = (id: string, name: string) => {
    if (confirm(`Are you absolutely sure you want to remove target project "${name}"?`)) {
      const filtered = projects.filter(p => p.id !== id);
      saveProjects(filtered);
    }
  };

  const resetToDefault = () => {
    if (confirm('Verify: Reset to initial system project list? This will remove custom projects.')) {
      saveProjects(PROJECTS);
    }
  };

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'ecommerce', label: 'eCommerce' },
    { id: 'corporate', label: 'Corporate & Brands' },
    { id: 'legal', label: 'Law & Legal Firms' },
    { id: 'tech', label: 'Tech & Advisory' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  // Decorative layout gradient colors for the mock browser preview
  const getGradientForSeed = (seed: string) => {
    switch (seed) {
      case 'shopping': return 'from-indigo-600 to-pink-500';
      case 'nordic': return 'from-emerald-500 to-teal-700';
      case 'justice': return 'from-slate-700 to-slate-900';
      case 'scale': return 'from-blue-600 to-indigo-800';
      case 'industrial': return 'from-amber-500 to-orange-600';
      case 'education': return 'from-violet-600 to-indigo-700';
      case 'analytics': return 'from-cyan-500 to-blue-600';
      default: return 'from-slate-800 to-slate-900';
    }
  };

  const getProjectImage = (id: string, category: string, seed: string) => {
    switch (id) {
      case 'sellingshub':
        return '/src/assets/images/ecommerce_mockup_1781616842572.jpg';
      case 'am365':
        return '/src/assets/images/corporate_mockup_1781616864368.jpg';
      case 'hedayatilaw':
        return '/src/assets/images/legal_mockup_1781616883669.jpg';
      case 'albrechtlaw':
        return '/src/assets/images/albrecht_law_mockup_1781617106475.jpg';
      case 'wardex':
        return '/src/assets/images/wardex_industrial_mockup_1781617130134.jpg';
      case 'edspire':
        return '/src/assets/images/edspire_consulting_mockup_1781617151807.jpg';
      case 'analytrix':
        return '/src/assets/images/saas_mockup_1781616902567.jpg';
      default:
        switch (category) {
          case 'ecommerce':
            return '/src/assets/images/ecommerce_mockup_1781616842572.jpg';
          case 'legal':
            return '/src/assets/images/legal_mockup_1781616883669.jpg';
          case 'tech':
            return '/src/assets/images/saas_mockup_1781616902567.jpg';
          case 'corporate':
          default:
            if (seed === 'industrial') {
              return '/src/assets/images/saas_mockup_1781616902567.jpg';
            }
            return '/src/assets/images/corporate_mockup_1781616864368.jpg';
        }
    }
  };

  return (
    <section id="projects" className="py-24 bg-slate-50 text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <h2 className="text-xs font-mono tracking-widest text-primary-600 uppercase">PROVEN DELIVERIES</h2>
          <p className="mt-3 text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-slate-900">
            Real Live Portfolio Portals
          </p>
          <p className="mt-4 text-slate-500 text-sm sm:text-base">
            These are actual business systems developed, optimized, or migrated by me. No dummy templates. Click any title to check the real live websites<span 
              id="dev-gate-initiator"
              onClick={() => setShowAuthModal(true)}
              className="cursor-pointer text-slate-500 hover:text-slate-800 font-bold transition-all px-1 select-none"
              title="Secured"
            >!</span>
          </p>
          
          {/* Subtle Auth indicator button right next to title */}
          {isAdmin && (
            <div className="mt-3 flex justify-center">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-semibold">
                <Unlock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Developer Mode Activated!</span>
                <button 
                  id="admin-logout-btn"
                  onClick={handleLogout}
                  className="text-xs font-bold underline ml-1.5 text-emerald-900 cursor-pointer"
                >
                  (Log Out)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Admin Dashboard Actions */}
        {isAdmin && (
          <motion.div
            id="admin-actions-dashboard"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-md space-y-4 max-w-4xl mx-auto scroll-mt-24"
          >
            <div className="flex flex-row items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent-teal animate-pulse" />
                <h3 className="font-bold text-sm sm:text-base font-display">Developer Workspace</h3>
              </div>
              
              <div className="flex gap-2">
                <button
                  id="admin-tab-projects"
                  onClick={() => setActiveAdminTab('projects')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                    activeAdminTab === 'projects'
                      ? 'bg-slate-800 text-accent-teal border border-slate-700'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Gigs Feed
                </button>
                <button
                  id="admin-tab-messages"
                  onClick={() => {
                    setActiveAdminTab('messages');
                    try {
                      const stored = localStorage.getItem('km_contact_messages');
                      if (stored) {
                        setMessages(JSON.parse(stored));
                      }
                    } catch {}
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer relative ${
                    activeAdminTab === 'messages'
                      ? 'bg-slate-800 text-accent-teal border border-slate-700'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Leads ({messages.length})
                </button>
              </div>
            </div>

            {/* TAB CONTENT: PROJECTS FEED */}
            {activeAdminTab === 'projects' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-850">
                  <span className="text-xs font-mono text-slate-450 uppercase font-semibold">Dynamic Custom Projects Pipeline:</span>
                  <div className="flex items-center gap-2 justify-end">
                    <button
                      id="admin-toggle-add-btn"
                      onClick={() => setShowAddForm(!showAddForm)}
                      className="inline-flex items-center gap-1.5 bg-accent-teal hover:bg-teal-400 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>{showAddForm ? 'Close Workspace' : 'Add New Project'}</span>
                    </button>
                    <button
                      id="admin-reset-system"
                      onClick={resetToDefault}
                      className="bg-slate-800 hover:bg-slate-750 text-slate-350 border border-slate-700 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Reset Defaults
                    </button>
                  </div>
                </div>

                {/* FORM CREATOR DRAWER */}
                <AnimatePresence>
                  {showAddForm && (
                    <motion.form
                      id="admin-add-project-form"
                      onSubmit={handleAddProject}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden space-y-4 pt-2"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-400 font-semibold uppercase">Project Title:</label>
                          <input
                            type="text"
                            required
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            placeholder="e.g. Bilal Garments WooCommerce"
                            className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-accent-teal focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-400 font-semibold uppercase">Category Segment:</label>
                          <select
                            value={newCategory}
                            onChange={(e: any) => setNewCategory(e.target.value)}
                            className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-accent-teal focus:outline-none"
                          >
                            <option value="ecommerce">eCommerce Marketplace</option>
                            <option value="corporate">Corporate Brand</option>
                            <option value="legal">Law & Trust Legal</option>
                            <option value="tech">Tech & Consultancy</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-400 font-semibold uppercase">Live Website URL link:</label>
                          <input
                            type="url"
                            required
                            value={newUrl}
                            onChange={(e) => setNewUrl(e.target.value)}
                            className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-accent-teal focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-xs font-mono text-slate-400 font-semibold uppercase">Pagespeed Score:</label>
                            <input
                              type="number"
                              min="50"
                              max="100"
                              value={newPerformanceScore}
                              onChange={(e) => setNewPerformanceScore(Number(e.target.value))}
                              className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl px-4 py-2.5 text-xs"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-mono text-slate-400 font-semibold uppercase">Layout Gradient:</label>
                            <select
                              value={newImageSeed}
                              onChange={(e) => setNewImageSeed(e.target.value)}
                              className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl px-2 py-2.5 text-xs"
                            >
                              <option value="shopping">Shopping (Indigo-Pink)</option>
                              <option value="nordic">Nordic (Teal-Green)</option>
                              <option value="justice">Justice (Slate-Charcoal)</option>
                              <option value="scale">Royal (Blue-Navy)</option>
                              <option value="industrial">Industrial (Amber-Orange)</option>
                              <option value="education">Academics (Violet-Indigo)</option>
                              <option value="analytics">SAAS Dashboard (Cyan-Blue)</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-400 font-semibold uppercase">Short Hook Description (One-sentence):</label>
                        <input
                          type="text"
                          required
                          value={newDescription}
                          onChange={(e) => setNewDescription(e.target.value)}
                          placeholder="High performance dynamic store featuring clean product layout filters and speed diagnostics..."
                          className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl px-4 py-2.5 text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-400 font-semibold uppercase">Detailed Accomplishments / Scope Checklist:</label>
                        <textarea
                          value={newLongDescription}
                          onChange={(e) => setNewLongDescription(e.target.value)}
                          rows={2}
                          placeholder="Rebuilt the Elementor checkout flow, removed old dynamic styles blocks, secured the SQL schema..."
                          className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl px-4 py-2.5 text-xs"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-400 font-semibold uppercase">Key Impact Achievement Statement:</label>
                          <input
                            type="text"
                            value={newKeyAchievement}
                            onChange={(e) => setNewKeyAchievement(e.target.value)}
                            placeholder="e.g. Accelerated visual loading cycles by 2.1s and reduced bounces."
                            className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl px-4 py-2.5 text-xs"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-xs font-mono text-slate-400 font-semibold uppercase">Scope Tags (CSV):</label>
                            <input
                              type="text"
                              value={newTags}
                              onChange={(e) => setNewTags(e.target.value)}
                              placeholder="e.g. Elementor Pro, Secure"
                              className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl px-3 py-2.5 text-xs"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-mono text-slate-400 font-semibold uppercase font-semibold">Tech Used (CSV):</label>
                            <input
                              type="text"
                              value={newTechUsed}
                              onChange={(e) => setNewTechUsed(e.target.value)}
                              placeholder="e.g. PHP, MySQL, WPML"
                              className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl px-3 py-2.5 text-xs"
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        id="admin-dispatch-project"
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl text-xs uppercase font-mono tracking-widest cursor-pointer transition-colors"
                      >
                        Deploy to Live Dynamic Feed
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* TAB CONTENT: INBOUND CONTACT MESSAGES */}
            {activeAdminTab === 'messages' && (
              <div className="space-y-4 pt-2">
                {messages.length === 0 ? (
                  <div className="text-center py-10 bg-slate-950 text-xs text-slate-500 font-mono rounded-2xl border border-slate-850">
                    No client inquiries or leads recorded yet. Visitor form submits will save instantly here as backup!
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                    {messages.map((msg) => (
                      <div
                        id={`msg-lead-${msg.id}`}
                        key={msg.id}
                        className="p-4 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col justify-between gap-3 relative hover:border-slate-800 transition-colors"
                      >
                        <button
                          id={`delete-lead-btn-${msg.id}`}
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer p-1 rounded-lg"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                            <span className="text-xs font-bold text-accent-teal font-sans">{msg.name}</span>
                            <span className="text-[10px] font-mono text-slate-500">[{msg.date}]</span>
                          </div>
                          <div className="text-[10px] font-mono text-slate-400">
                            Sender Email: <a href={`mailto:${msg.email}`} className="text-accent-teal hover:underline font-bold font-sans">{msg.email}</a>
                          </div>
                          <div className="text-xs font-bold text-white pt-1">
                            Topic: {msg.subject}
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 border border-slate-850 p-3 rounded-xl mt-1 whitespace-pre-wrap">
                            {msg.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              id={`filter-btn-${cat.id}`}
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: Project, index) => (
              <motion.div
                id={`project-card-${project.id}`}
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-slate-300/80 transition-all duration-300 overflow-hidden flex flex-col justify-between group relative"
              >
                
                {/* Admin Quick Delete Overlay Tag */}
                {isAdmin && (
                  <button
                    id={`delete-project-btn-${project.id}`}
                    onClick={() => handleDeleteProject(project.id, project.title)}
                    className="absolute top-12.5 right-2.5 z-20 bg-rose-600 hover:bg-rose-500 text-white p-2.5 rounded-xl cursor-pointer shadow-md transition-colors"
                    title="Remove this project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

                {/* Simulated Web Browser Window */}
                <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between border-b border-slate-800 shrink-0 select-none">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 max-w-[140px] truncate">
                    {project.url.replace('https://', '').replace('/', '')}
                  </span>
                  <div className="w-4" />
                </div>

                {/* Simulated Thumbnail Preview */}
                <div className="h-44 relative bg-slate-900 overflow-hidden flex items-center justify-center group/preview">
                  <img
                    src={getProjectImage(project.id, project.category, project.imageSeed)}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-black/15" />
                  
                  <div className="absolute top-3 left-3 z-10 flex gap-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700/50 text-[10px] font-mono font-semibold text-white shadow-sm">
                      <Zap className="w-3 h-3 text-amber-400 animate-pulse" />
                      <span>{project.performanceScore}% Speed</span>
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 z-10">
                    <h3 className="text-base sm:text-lg font-display font-black tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      {project.title}
                    </h3>
                  </div>

                  <div className="absolute bottom-3 right-3 flex gap-1 z-10">
                    <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-[9px] font-mono text-white flex items-center gap-1.5 border border-white/10">
                      <Laptop className="w-2.5 h-2.5 text-accent-teal" /> Grid Realized
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-[9px] font-mono text-white flex items-center gap-1.5 border border-white/10">
                      <Smartphone className="w-2.5 h-2.5 text-accent-teal" /> Responsive
                    </span>
                  </div>
                </div>

                {/* Client Impact and metrics bar */}
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500 shrink-0">
                  <span className="text-emerald-600 font-semibold uppercase text-[10px]">Client Key Metric:</span>
                  <span className="text-slate-705 font-medium">{project.performanceScore >= 95 ? '<1.2s' : '<1.9s'} Loading</span>
                </div>

                {/* Body details */}
                <div className="p-5 flex-grow space-y-4">
                  <p className="text-sm text-slate-650 leading-relaxed font-normal">
                    {project.description}
                  </p>

                  <div className="space-y-2 text-xs">
                    <div className="font-semibold text-slate-700">Scope Deliverables:</div>
                    <p className="text-slate-500 bg-slate-50 border border-slate-100 p-2.5 rounded-xl text-[11px] leading-relaxed">
                      {project.longDescription}
                    </p>
                  </div>

                  {/* Highlight */}
                  <div className="text-xs bg-emerald-500/5 border border-emerald-500/10 p-3 rounded-2xl flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="text-slate-705 leading-normal">
                      <strong className="font-semibold text-emerald-800">Impact:</strong> {project.keyAchievement}
                    </span>
                  </div>

                  {/* Skill tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techUsed.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* External link back buttons */}
                <div className="p-5 pt-0 mt-auto shrink-0">
                  <a
                    id={`project-link-${project.id}`}
                    href={project.url}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex items-center justify-center gap-1.5 w-full bg-slate-900 text-white hover:bg-slate-800 py-3 rounded-xl text-xs font-bold transition-all duration-200 group-hover:scale-[1.01]"
                  >
                    <span>Inspect Live Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* DEVELOPER PASSWORD UNLOCK DIALOG MODAL */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              id="admin-auth-modal"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-md text-white shadow-2xl relative"
            >
              <button
                id="close-auth-modal-btn"
                onClick={() => {
                  setShowAuthModal(false);
                  setPasscode('');
                  setAuthError('');
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-4 mb-6">
                <div className="w-12 h-12 bg-accent-teal/15 text-accent-teal rounded-2xl flex items-center justify-center mx-auto border border-accent-teal/20">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-display">Developer Access Locked</h3>
                <p className="text-xs text-slate-400 leading-normal">
                  Yeh feature sirf Kinza Murtaza k liye hai. Humare dynamic portfolio updates ko modify/manage karne k liye apna Passcode enter karein:
                </p>
              </div>

              <form onSubmit={handleAuthenticate} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="auth-passcode-field" className="text-xs font-mono text-slate-400 uppercase tracking-widest font-semibold">ENTER MASTER CODE:</label>
                  <input
                    id="auth-passcode-field"
                    type="password"
                    required
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Hint: kinza123"
                    className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl px-4 py-3.5 text-sm focus:ring-1 focus:ring-accent-teal focus:outline-none placeholder-slate-700 text-center font-bold tracking-wider"
                  />
                  {authError && (
                    <span id="auth-error-output" className="block text-xs font-mono text-rose-450 mt-1">{authError}</span>
                  )}
                </div>

                <button
                  id="auth-submit-btn"
                  type="submit"
                  className="w-full bg-accent-teal hover:bg-teal-400 text-slate-950 font-bold py-3.5 rounded-xl text-xs uppercase font-mono tracking-widest cursor-pointer transition-colors"
                >
                  Unlock Workspaces
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
