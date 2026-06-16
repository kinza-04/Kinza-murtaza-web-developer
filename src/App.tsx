/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutAndSkills from './components/AboutAndSkills';
import Projects from './components/Projects';
import SpeedSandbox from './components/SpeedSandbox';
import SiteAuditor from './components/SiteAuditor';
import DBDoctor from './components/DBDoctor';
import Experience from './components/Experience';
import PricingCalculator from './components/PricingCalculator';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div id="root-app-layout" className="min-h-screen bg-slate-950 font-sans antialiased text-slate-200">
      
      {/* Dynamic Header */}
      <Navbar />

      {/* Hero Welcome Deck */}
      <Hero />

      {/* About & Skill Matrix */}
      <AboutAndSkills />

      {/* Filterable Projects Showcase */}
      <Projects />

      {/* Core Web Vitals Speed Performance Sandbox */}
      <SpeedSandbox />

      {/* WordPress & Web SEO Live Auditor */}
      <SiteAuditor />

      {/* MySQL / WooCommerce Table Optimizer DB Doctor */}
      <DBDoctor />

      {/* Timeline Milestones */}
      <Experience />

      {/* Interactive Fee Estimator & Plan Tool */}
      <PricingCalculator />

      {/* Reviews & Client Feedback */}
      <Testimonials />

      {/* Direct Contact & Storage Proposal Form */}
      <Contact />

      {/* Footer & Global Sticky WhatsApp Floating Actions */}
      <Footer />

    </div>
  );
}

