import { Star, Quote, Flag } from 'lucide-react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  return (
    <section id="reviews" className="py-24 bg-slate-900 text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(30,41,59,0.3),transparent)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-xs font-mono tracking-widest text-accent-teal uppercase">CLIENT APPRECIATION</h2>
          <p className="mt-3 text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
            International Client Feedbacks
          </p>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            Read actual verified reviews from business organizations across Sweden, USA, UK, and Pakistan praising performance transformations and custom Elementor workflows.
          </p>
        </div>

        {/* Testimonials Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              id={`review-card-${testimonial.id}`}
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-850 shadow-md relative hover:border-slate-800 transition-all duration-300 flex flex-col justify-between group"
            >
              
              {/* Quote Background Decorative */}
              <div className="absolute top-6 right-6 text-slate-850 opacity-15 pointer-events-none group-hover:scale-110 transition-transform duration-300">
                <Quote className="w-16 h-16" />
              </div>

              <div className="space-y-4">
                {/* Review Stars bar */}
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Main feedback text */}
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal italic relative z-10">
                  "{testimonial.feedback}"
                </p>
              </div>

              {/* Author Profile Metadata */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-900 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-700 font-display font-bold text-white flex items-center justify-center text-lg border border-slate-800">
                  {testimonial.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-display">{testimonial.name}</h4>
                  <p className="text-xs text-slate-400">{testimonial.role}, <span className="text-accent-teal">{testimonial.company}</span></p>
                  <span className="inline-flex items-center gap-1 text-[10px] text-slate-500 font-mono mt-0.5">
                    <span>📍 {testimonial.country}</span>
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
