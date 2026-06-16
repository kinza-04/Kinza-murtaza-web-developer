import { Calendar, Building, Briefcase, ChevronRight, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { WORK_EXPERIENCE, CV_DATA } from '../data';

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-slate-950 text-white relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-xs font-mono tracking-widest text-accent-teal uppercase">PROFESSIONAL JOURNEY</h2>
          <p className="mt-3 text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
            Work History & Milestones
          </p>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            Over {new Date().getFullYear() - 2021}+ years of industry alignment building security audits, high fidelity checkout engines, and performance optimizations.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l border-slate-800 max-w-4xl mx-auto pl-6 sm:pl-10 space-y-16">
          
          {WORK_EXPERIENCE.map((exp, index) => (
            <motion.div
              id={`experience-timeline-node-${exp.id}`}
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              
              {/* Timeline Indicator Node Pin */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1 w-4 h-4 rounded-full bg-slate-950 border-3 border-accent-teal group-hover:scale-125 transition-transform duration-300" />
              
              <div className="space-y-4">
                {/* Job Title Metadata Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-accent-teal font-mono text-xs border border-slate-800">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>{exp.role}</span>
                    </span>
                    <h3 className="text-xl font-bold font-display text-white mt-1 flex items-center gap-2">
                      <Building className="w-4.5 h-4.5 text-slate-400" />
                      <span>{exp.company}</span>
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-slate-400 font-mono text-xs sm:text-sm bg-slate-900 border border-slate-850 px-3 py-1.5 rounded-xl shrink-0">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </span>
                </div>

                {/* Job Responsibilities */}
                <ul className="space-y-3 pt-2 text-slate-350 text-sm leading-relaxed pl-1">
                  {exp.description.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <ChevronRight className="w-4.5 h-4.5 text-accent-teal shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Achievements block */}
                <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                    Key Performance Achievements:
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills Gained Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {exp.skillsGained.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white transition-colors text-xs font-mono border border-slate-850"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>

            </motion.div>
          ))}

        </div>

        {/* Call to action card inside timeline section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 max-w-2xl mx-auto p-6 md:p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 text-center space-y-5"
        >
          <h3 className="text-xl font-bold font-display">Need a certified developer to optimize or migrate your WordPress site?</h3>
          <p className="text-slate-450 text-sm leading-normal max-w-lg mx-auto">
            I offer secure site backups, zero-downtime hosting migrations, visual overhauls, and detailed Speed Optimization guarantees starting this week.
          </p>
          <div className="pt-2">
            <a
              id="experience-cta-whatsapp"
              href={CV_DATA.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3.5 rounded-xl text-sm transition-all shadow-md shadow-emerald-950/20"
            >
              <MessageSquare className="w-4.5 h-4.5" />
              <span>Discuss Integration on WhatsApp ({CV_DATA.phoneDisplay})</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
