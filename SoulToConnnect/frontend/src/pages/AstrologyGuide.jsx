import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * WhyAstrologyMatters Component
 * 
 * This component renders the 'Why Astrology Matters' editorial page using the refined
 * Celestial Ember design system tokens (CSS variables) provided. 
 * It features an immersive hero, editorial pillars, and deep-dive comparison sections.
 */
const WhyAstrologyMatters = () => {
  const navigate = useNavigate();
  const pillars = [
    {
      title: 'Destiny',
      desc: 'Recognizing the inherent potential woven into the fabric of your inception. It is the roadmap of your spirit\'s evolution.',
      icon: '✨'
    },
    {
      title: 'Alignment',
      desc: 'Synchronizing personal actions with universal cycles to ride the waves of cosmic momentum instead of struggling against them.',
      icon: '⭐'
    },
    {
      title: 'Clarity',
      desc: 'Gaining objective perspective on life\'s challenges through a lens that transcends the immediate ego and emotional noise.',
      icon: '🪔'
    },
    {
      title: 'Soul Purpose',
      desc: 'Uncovering the North Node path—the specific direction your soul is meant to grow toward in this incarnation.',
      icon: '🔮'
    }
  ];

  return (
    <div className="min-h-screen selection:bg-[var(--primary-light)] selection:text-white" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      {/* Dynamic Tonal Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[20%] w-[50%] h-[50%] rounded-full opacity-20 blur-[120px]" style={{ background: 'radial-gradient(circle, var(--primary-light), transparent 70%)' }}></div>
        <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] rounded-full opacity-10 blur-[100px]" style={{ background: 'radial-gradient(circle, var(--primary), transparent 70%)' }}></div>
      </div>

     

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="section max-w-7xl mx-auto text-center px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-bg)] border border-[var(--accent-border)] mb-8">
            <span className="material-icons text-sm" style={{ color: 'var(--primary)' }}>flare</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--primary)' }}>The Celestial Prism</span>
          </div>
          <h1 className="text-6xl lg:text-8xl font-bold mb-8 leading-[1.05] font-['Poppins']" style={{ color: 'var(--text-heading)' }}>
            Deciphering the <br />
            <span className="italic font-light" style={{ color: 'var(--primary)' }}>Language of Light</span>
          </h1>
          <p className="text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto mb-12" style={{ color: 'var(--text-muted)' }}>
            A cosmic cartography designed to illuminate your path through the geometry of time and the architecture of the soul.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button onClick={()=>navigate('/pooja')} className="btn-primary px-10 py-4 cursor-pointer">Begin Your Journey</button>
            <button onClick={()=>navigate('/blog')} className="flex items-center justify-center gap-2 text-sm font-bold group transition-all hover:gap-3 cursor-pointer" style={{ color: 'var(--text-heading)' }}>
              Explore Ancient Wisdom
              {/* <span className="material-icons text-sm">arrow_forward</span> */}
            </button>
          </div>

          <div className="mt-24 relative rounded-[2.5rem] overflow-hidden shadow-[var(--shadow-lg)] border border-[var(--border-soft)] aspect-[21/9]">
            <img 
              src="https://res.cloudinary.com/dqzin6dfk/image/upload/v1776112936/Gemini_Generated_Image_rduq4yrduq4yrduq_gxbf2w.png" 
              alt="Cosmic Star Field" 
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent"></div>
          </div>
        </section>

        {/* Pillars Section */}
        <section className="section max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-4 block">Foundations</span>
            <h2 className="text-4xl font-bold font-['Poppins']" style={{ color: 'var(--text-heading)' }}>The Planetary Pillars</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="card group">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-8 transition-colors group-hover:bg-[var(--primary)] group-hover:text-white" style={{ backgroundColor: 'var(--bg-soft)', color: 'var(--primary)' }}>
                  <span className="material-icons">{pillar.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-4 font-['Poppins']" style={{ color: 'var(--text-heading)' }}>{pillar.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Synthesis Section */}
        <section className="section bg-[var(--bg-soft)] overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-6 block">The Synthesis</span>
              <h2 className="text-4xl lg:text-5xl font-bold mb-12 leading-tight font-['Poppins']" style={{ color: 'var(--text-heading)' }}>
                Bridging the <br />Terrestrial & Divine
              </h2>
              
              <div className="space-y-12">
                <div className="flex gap-6">
                  <span className="text-4xl font-black opacity-10 font-['Poppins']">01</span>
                  <div>
                    <h4 className="text-lg font-bold mb-3 font-['Poppins']" style={{ color: 'var(--text-heading)' }}>The Mathematical</h4>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      Rigorous Ephemeris data provides the coordinates. Astrology is built on the precise measurement of planetary angles and celestial cycles across the ecliptic plane.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <span className="text-4xl font-black opacity-10 font-['Poppins']">02</span>
                  <div>
                    <h4 className="text-lg font-bold mb-3 font-['Poppins']" style={{ color: 'var(--text-heading)' }}>The Archetypal</h4>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      Meaning is found in the pattern. We interpret these positions through Jungian archetypes and ancient myth, translating cold data into lived human wisdom.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative grid grid-cols-2 gap-4">
               <div className="space-y-4 pt-12">
                 <div className="card-soft aspect-square overflow-hidden p-0 rounded-[2rem]">
                   <img src="https://res.cloudinary.com/dqzin6dfk/image/upload/v1776113160/i1_wr4vqc.jpg" alt="Technical Chart" className="w-full h-full object-cover opacity-60" />
                 </div>
                 <div className="card aspect-[3/4] flex flex-col justify-end p-8">
                   <span className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--primary)' }}>Rigorous Data</span>
                   <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Calculation of orbital resonance and planetary aspects within 0.1 degree accuracy.</p>
                 </div>
               </div>
               <div className="space-y-4">
                 <div className="card flex flex-col justify-end p-8 aspect-[3/4] bg-[var(--primary)] ">
                   <span className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 opacity-60">Poetic Insight</span>
                   <p className="">The soul\'s journey articulated through the resonance of Mars and Venus.</p>
                 </div>
                 <div className="card-soft aspect-square overflow-hidden p-0 rounded-[2rem]">
                   <img src="https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&q=80&w=800" alt="Mystical Art" className="w-full h-full object-cover opacity-60" />
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="section py-32 text-center max-w-4xl mx-auto px-6">
          <span className="material-icons text-4xl mb-8 opacity-20" style={{ color: 'var(--primary)' }}>format_quote</span>
          <h2 className="text-5xl lg:text-7xl font-bold mb-12 leading-tight font-['Poppins']" style={{ color: 'var(--text-heading)' }}>
            "The stars incline, but they <span className="italic font-light" style={{ color: 'var(--primary)' }}>do not compel</span>. "
          </h2>
          <p className="text-xs font-bold uppercase tracking-[0.4em] opacity-40">Ancient Hermetic Proverb</p>
        </section>

        {/* CTA Banner */}
        <section className="section max-w-7xl mx-auto px-6">
          <div className="relative rounded-[3rem] overflow-hidden p-12 lg:p-20 gradient-primary shadow-[var(--shadow-lg)] group">
            <div className="absolute top-0 right-0 w-[40%] h-full opacity-10 pointer-events-none transform translate-x-1/4 group-hover:translate-x-1/3 transition-transform duration-700">
               <span className="material-icons text-[400px] leading-none">star</span>
            </div>
            <div className="relative z-10 max-w-2xl text-center mx-auto lg:text-left lg:mx-0">
               <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8 font-['Poppins']">Your Personal Blueprint Await</h2>
               <p className="text-white/80 text-lg mb-12 max-w-xl">
                 Generate your comprehensive natal chart analysis. Discover the placements that define your potential and the transits that shape your current reality.
               </p>
               <div className="flex flex-col sm:flex-row gap-4">
                 <button onClick={()=>navigate('/kundli')} className="bg-white text-[var(--primary)] px-10 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-transform cursor-pointer">Calculate My Chart</button>
                 <button onClick={()=>navigate('/blog')} className="bg-transparent border border-white/30 text-white px-10 py-4 rounded-full font-bold backdrop-blur-sm hover:bg-white/10 transition-colors curosr-pointer">Learn More</button>
               </div>
            </div>
          </div>
        </section>
      </main>

     
    </div>
  );
};

export default WhyAstrologyMatters;
