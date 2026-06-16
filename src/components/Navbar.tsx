import { useState, useEffect } from 'react';
import { Menu, X, MessageSquare, Code, Cpu, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CV_DATA } from '../data';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Speed Sandbox', href: '#speedsandbox' },
    { label: 'SEO Auditor', href: '#siteauditor' },
    { label: 'DB Doctor', href: '#dbdoctor' },
    { label: 'Experience', href: '#experience' },
    { label: 'Cost Estimator', href: '#estimator' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center overflow-hidden shadow-md group-hover:scale-105 group-hover:border-accent-teal/50 transition-all duration-300 shrink-0">
                <img 
                  src="/src/assets/images/developer_coding_dp_1781616366646.jpg" 
                  alt={CV_DATA.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold text-white tracking-tight group-hover:text-accent-teal transition-colors duration-300">
                  {CV_DATA.name}
                </span>
                <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">
                  WordPress Expert
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-3">
            {menuItems.map((item) => (
              <a
                id={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Header Action CTA */}
          <div className="hidden md:block">
            <a
              id="nav-cta-whatsapp"
              href={CV_DATA.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md shadow-emerald-950/20 hover:-translate-y-0.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Discuss Project</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-expanded="false"
            >
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-b border-slate-800"
          >
            <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="block px-4 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 px-4">
                <a
                  id="mobile-nav-cta"
                  href={CV_DATA.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-xl text-base font-semibold shadow-md transition-colors"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Chat on WhatsApp ({CV_DATA.phoneDisplay})</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
